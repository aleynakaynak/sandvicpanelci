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
        ? '/images/products/ekonomik-cephe-panel.jpg'
        : p.slug === 'ekonomik-cephe-panel'
          ? '/images/products/cephe-panel.jpg'
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

  if (!product) {
    if (slug === 'duz-kenet-levha') {
      return {
        id: -1,
        name: 'Düz Kenet Levha',
        slug: 'duz-kenet-levha',
        short_desc: 'Düz yüzeyli çatı ve cephe uygulamalarında kullanılan kenet levha çözümüdür.',
        long_desc: 'Düz yüzeyli çatı ve cephe uygulamalarında kullanılan kenet levha çözümüdür.',
        image_url: '/images/1-duz-kenet-fotograf-1-1536x864.webp',
        base_price: 0,
        price_unit: '₺ / m²',
        category_id: -1,
        is_active: true,
        is_featured: false,
        seo_title: null,
        seo_desc: null,
        gallery_urls: [],
        category: { id: -1, parent_id: null, name: 'Kenet Sistemleri', slug: 'kenet-sistemleri', image_url: null, description: null, is_active: true, display_order: 1, created_at: '', updated_at: '' } as any,
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        attributes: {},
        variants: [
          { id: -11, product_id: -1, sku: null, variant_label: '25 / 325', thickness_mm: null, metal_top_mm: null, metal_bot_mm: null, ral_color: null, width_mm: null, price_delta: 0, stock_status: 'available', sort_order: 1, is_active: true },
          { id: -12, product_id: -1, sku: null, variant_label: '25 / 425', thickness_mm: null, metal_top_mm: null, metal_bot_mm: null, ral_color: null, width_mm: null, price_delta: 0, stock_status: 'available', sort_order: 2, is_active: true },
          { id: -13, product_id: -1, sku: null, variant_label: '25 / 525', thickness_mm: null, metal_top_mm: null, metal_bot_mm: null, ral_color: null, width_mm: null, price_delta: 0, stock_status: 'available', sort_order: 3, is_active: true },
        ],
        technical_specs: []
      };
    } else if (slug === 'kilit-gecme-sistem-panel') {
      return {
        id: -2,
        name: 'Kilit Geçme Sistem Panel',
        slug: 'kilit-gecme-sistem-panel',
        short_desc: 'Kilit geçme bağlantı yapısıyla hızlı montaj sağlayan panel sistemidir.',
        long_desc: 'Kilit geçme bağlantı yapısıyla hızlı montaj sağlayan panel sistemidir.',
        image_url: '/images/30Kilit-gecme-sistem-1536x864.webp',
        base_price: 0,
        price_unit: '₺ / m²',
        category_id: -1,
        is_active: true,
        is_featured: false,
        seo_title: null,
        seo_desc: null,
        gallery_urls: [],
        category: { id: -1, parent_id: null, name: 'Kenet Sistemleri', slug: 'kenet-sistemleri', image_url: null, description: null, is_active: true, display_order: 1, created_at: '', updated_at: '' } as any,
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        attributes: {},
        variants: [],
        technical_specs: []
      };
    } else if (slug === 'yuksek-kulak-kenet-levha') {
      return {
        id: -3,
        name: 'Yüksek Kulak Kenet Levha',
        slug: 'yuksek-kulak-kenet-levha',
        short_desc: 'Geniş açıklıklı çatı kaplamalarında kullanılan, yüksek kulak formuna sahip kenet levha sistemidir.',
        long_desc: 'Geniş açıklıklı çatı kaplamalarında kullanılan, yüksek kulak formuna sahip kenet levha sistemidir.',
        image_url: '/images/35-50-475-1536x864.webp',
        base_price: 0,
        price_unit: '₺ / m²',
        category_id: -1,
        is_active: true,
        is_featured: false,
        seo_title: null,
        seo_desc: null,
        gallery_urls: ['/images/36-65-435-1536x864.webp'],
        category: { id: -1, parent_id: null, name: 'Kenet Sistemleri', slug: 'kenet-sistemleri', image_url: null, description: null, is_active: true, display_order: 1, created_at: '', updated_at: '' } as any,
        sort_order: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        attributes: {},
        variants: [
          { id: -31, product_id: -3, sku: null, variant_label: '50 / 475', thickness_mm: null, metal_top_mm: null, metal_bot_mm: null, ral_color: null, width_mm: null, price_delta: 0, stock_status: 'available', sort_order: 1, is_active: true },
          { id: -32, product_id: -3, sku: null, variant_label: '65 / 435', thickness_mm: null, metal_top_mm: null, metal_bot_mm: null, ral_color: null, width_mm: null, price_delta: 0, stock_status: 'available', sort_order: 2, is_active: true },
        ],
        technical_specs: []
      };
    }
    return null;
  }

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
    updatedProduct.image_url = '/images/products/ekonomik-cephe-panel.jpg';
    // Başlıkta yanlış hadve sayısı varsa düzelt (DB'den gelen 3 Hadveli → 7 Hadveli)
    if (updatedProduct.name) {
      updatedProduct.name = updatedProduct.name
        .replace(/3\s*[Hh]adveli/g, '7 Hadveli')
        .replace(/3\s*[Hh]adve/g, '7 Hadve');
    }
    if ((updatedProduct as any).title) {
      (updatedProduct as any).title = ((updatedProduct as any).title as string)
        .replace(/3\s*[Hh]adveli/g, '7 Hadveli')
        .replace(/3\s*[Hh]adve/g, '7 Hadve');
    }
  } else if (updatedProduct.slug === 'ekonomik-cephe-panel') {
    updatedProduct.image_url = '/images/products/cephe-panel.jpg';
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
