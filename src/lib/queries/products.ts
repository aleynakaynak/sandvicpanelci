import { supabase } from '@/lib/supabase';
import type {
  ProductCard,
  ProductDetail,
  FilterGroup,
  ActiveFilters,
  AttributeDefinition,
  ProductRow,
  ProductAttribute,
} from '@/lib/types/product.types';

// ── Kategori slug zincirinden category_id bul ─────────────────
export async function getCategoryBySlug(slug: string): Promise<number | null> {
  const { data } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  return data?.id ?? null;
}

// ── O kategoriye ve alt kategorilerine ait tüm category_id'leri getir ──
export async function getCategoryIds(categoryId: number): Promise<number[]> {
  // Recursive ile kendi + tüm torunları
  const { data } = await supabase
    .from('categories')
    .select('id')
    .or(`id.eq.${categoryId},parent_id.eq.${categoryId}`);
  return (data ?? []).map((r) => r.id);
}

// ── Ürün listesi (kategoriye + filtrelere göre) ───────────────
export async function getProductsByCategory(
  categoryId: number,
  activeFilters: ActiveFilters = {}
): Promise<ProductCard[]> {
  const categoryIds = await getCategoryIds(categoryId);

  // 1. Filtreye uyan product_id'leri bul
  let filteredProductIds: number[] | null = null;

  const filterEntries = Object.entries(activeFilters).filter(([, vals]) => vals.length > 0);

  if (filterEntries.length > 0) {
    for (const [key, values] of filterEntries) {
      const { data } = await supabase
        .from('product_attributes')
        .select('product_id')
        .eq('attr_key', key)
        .in('attr_value', values);

      const ids = (data ?? []).map((r) => r.product_id);
      filteredProductIds =
        filteredProductIds === null
          ? ids
          : filteredProductIds.filter((id) => ids.includes(id));
    }
  }

  // 2. Ürünleri çek
  let query = supabase
    .from('products')
    .select('id, name, slug, short_desc, image_url, base_price, price_unit, category_id, sort_order')
    .in('category_id', categoryIds)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (filteredProductIds !== null) {
    query = query.in('id', filteredProductIds.length > 0 ? filteredProductIds : [-1]);
  }

  const { data: products } = await query;
  if (!products || products.length === 0) return [];

  // 3. Attribute'ları çek
  const productIds = products.map((p) => p.id);
  const { data: attrs } = await supabase
    .from('product_attributes')
    .select('product_id, attr_key, attr_value')
    .in('product_id', productIds);

  const attrMap: Record<number, Record<string, string>> = {};
  for (const attr of attrs ?? []) {
    if (!attrMap[attr.product_id]) attrMap[attr.product_id] = {};
    attrMap[attr.product_id][attr.attr_key] = attr.attr_value;
  }

  return products.map((p) => ({
    ...p,
    image_url: p.slug === 'pur-pir-yalitimli-cati-panelleri'
      ? '/images/products/3hadvepir.png'
      : p.slug === 'ekonomik-cati-panel'
        ? '/images/products/eko-panel.jpg'
        : p.slug === 'ekonomik-cephe-panel'
          ? '/images/products/pur-cephe-paneli.jpg'
          : p.slug === 'plywood'
            ? '/images/products/plywood-film-kapli.jpg'
            : p.image_url,
    attributes: attrMap[p.id] ?? {},
  })) as ProductCard[];
}

// ── Filtre grupları (sol sidebar) ─────────────────────────────
export async function getFilterGroups(categoryId: number): Promise<FilterGroup[]> {
  const categoryIds = await getCategoryIds(categoryId);

  // Attribute definitions
  const { data: defs } = await supabase
    .from('attribute_definitions')
    .select('*')
    .in('category_id', [categoryId, ...categoryIds])
    .eq('is_filterable', true)
    .order('sort_order', { ascending: true });

  if (!defs || defs.length === 0) return [];

  // Bu kategorideki ürünlerin ID'leri
  const { data: prodIds } = await supabase
    .from('products')
    .select('id')
    .in('category_id', categoryIds)
    .eq('is_active', true);

  const productIds = (prodIds ?? []).map((p) => p.id);
  if (productIds.length === 0) return [];

  // Tüm attribute değerlerini çek
  const { data: allAttrs } = await supabase
    .from('product_attributes')
    .select('attr_key, attr_value')
    .in('product_id', productIds);

  // Key → unique values + count
  const optionMap: Record<string, Record<string, number>> = {};
  for (const attr of allAttrs ?? []) {
    if (!optionMap[attr.attr_key]) optionMap[attr.attr_key] = {};
    optionMap[attr.attr_key][attr.attr_value] =
      (optionMap[attr.attr_key][attr.attr_value] ?? 0) + 1;
  }

  return (defs as AttributeDefinition[])
    .filter((def) => optionMap[def.key] && Object.keys(optionMap[def.key]).length > 0)
    .map((def) => ({
      key: def.key,
      label: def.label,
      unit: def.unit,
      input_type: def.input_type,
      options: Object.entries(optionMap[def.key] ?? {})
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => a.label.localeCompare(b.label, 'tr')),
    }));
}

// ── Tekil ürün detayı (slug ile) ─────────────────────────────
export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!product) return null;

  const [{ data: attrs }, { data: variants }, { data: specs }] = await Promise.all([
    supabase.from('product_attributes').select('*').eq('product_id', product.id),
    supabase.from('product_variants').select('*').eq('product_id', product.id).eq('is_active', true).order('sort_order'),
    supabase.from('product_technical_specs').select('*').eq('product_id', product.id).order('thickness_mm'),
  ]);

  const attributeMap: Record<string, string> = {};
  for (const a of attrs ?? []) attributeMap[a.attr_key] = a.attr_value;

  const updatedProduct = { ...product };
  if (updatedProduct.slug === 'pur-pir-yalitimli-cati-panelleri') {
    updatedProduct.image_url = '/images/products/3hadvepir.png';
  } else if (updatedProduct.slug === 'ekonomik-cati-panel') {
    updatedProduct.image_url = '/images/products/eko-panel.jpg';
  } else if (updatedProduct.slug === 'ekonomik-cephe-panel') {
    updatedProduct.image_url = '/images/products/pur-cephe-paneli.jpg';
  } else if (updatedProduct.slug === 'plywood') {
    updatedProduct.image_url = '/images/products/plywood-film-kapli.jpg';
  }

  // Veritabanından gelen yanlış şablon başlıklarını düzeltme
  if (updatedProduct.long_desc) {
    if (updatedProduct.slug === 'ekonomik-cephe-panel') {
      updatedProduct.long_desc = updatedProduct.long_desc.replace(/Mahyalar ve Biten Elemanları/gi, 'Ekonomik Cephe Paneli Özellikleri');
    } else if (updatedProduct.slug === 'plywood') {
      updatedProduct.long_desc = updatedProduct.long_desc.replace(/Trapez Sac Yüzey ve Renk Seçenekleri/gi, 'Film Kaplı Plywood Özellikleri');
    } else if (updatedProduct.slug === 'osb') {
      updatedProduct.long_desc = updatedProduct.long_desc.replace(/Döşeme ve Taşıyıcı Trapez Saclar/gi, 'OSB Teknik Özellikleri');
    } else if (updatedProduct.slug === 'rulo-bobin-sac') {
      updatedProduct.long_desc = updatedProduct.long_desc.replace(/Soğuk Oda ve Dondurucu Panelleri/gi, 'Rulo Bobin Sac Özellikleri');
    } else if (updatedProduct.slug === 'kenet-levhalar') {
      updatedProduct.long_desc = updatedProduct.long_desc.replace(/Akustik Paneller/gi, 'Kenet Sistem Detayları');
    }
  }

  return {
    ...updatedProduct,
    attributes: attributeMap,
    variants: variants ?? [],
    technical_specs: specs ?? [],
  } as ProductDetail;
}
