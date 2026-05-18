// ============================================================
// Sandviç Panelci Yapı Market — Product TypeScript Types
// ============================================================

import type { CategoryRow } from './category.types';

// ─── Ham veritabanı satırları ────────────────────────────────

export interface ProductRow {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  short_desc: string | null;
  long_desc: string | null;
  image_url: string | null;
  gallery_urls: string[];
  base_price: number | null;
  price_unit: string;
  is_active: boolean;
  is_featured: boolean;
  seo_title: string | null;
  seo_desc: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AttributeDefinition {
  id: number;
  category_id: number | null;
  key: string;
  label: string;
  input_type: 'select' | 'multiselect' | 'range' | 'text' | 'boolean';
  unit: string | null;
  is_filterable: boolean;
  sort_order: number;
}

export interface ProductAttribute {
  id: number;
  product_id: number;
  attr_key: string;
  attr_value: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku: string | null;
  variant_label: string;
  thickness_mm: number | null;
  metal_top_mm: number | null;
  metal_bot_mm: number | null;
  ral_color: string | null;
  width_mm: number | null;
  price_delta: number;
  stock_status: 'available' | 'on_order' | 'out_of_stock';
  is_active: boolean;
  sort_order: number;
}

export interface ProductTechnicalSpec {
  id: number;
  product_id: number;
  thickness_mm: number;
  lambda_value: number | null;   // λ W/(m·K)
  u_value: number | null;        // U W/(m²·K)
  fire_class: string | null;
  density_kg_m3: number | null;
  compressive_kpa: number | null;
  sound_reduction_db: number | null;
}

// ─── Zenginleştirilmiş (joined) tipler ───────────────────────

/** Ürün + tüm alt ilişkiler (detay sayfası için) */
export interface ProductDetail extends ProductRow {
  category: CategoryRow;
  attributes: Record<string, string>;   // { thickness_mm: '80', fire_class: 'A1' }
  variants: ProductVariant[];
  technical_specs: ProductTechnicalSpec[];
}

/** Ürün kartı için hafif tip (listeleme sayfası) */
export interface ProductCard {
  id: number;
  name: string;
  slug: string;
  short_desc: string | null;
  image_url: string | null;
  base_price: number | null;
  price_unit: string;
  category_id: number;
  attributes: Record<string, string>;
}

// ─── Filtre tipleri ──────────────────────────────────────────

/** Tek bir filtrenin seçenekleri */
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

/** Bir filtre grubu (sol sidebar'da bir bölüm) */
export interface FilterGroup {
  key: string;
  label: string;
  unit: string | null;
  input_type: AttributeDefinition['input_type'];
  options: FilterOption[];
}

/** URL search params'dan parse edilen aktif filtreler */
export type ActiveFilters = Record<string, string[]>;

// ─── Teklif formu ────────────────────────────────────────────

export interface QuoteRequestPayload {
  product_id: number | null;
  product_name: string;
  variant_label: string;
  length_m: number;
  width_m: number;
  thickness_mm: number;
  ral_color: string;
  quantity_m2: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  company_name?: string;
  city?: string;
  notes?: string;
}

export interface QuoteFormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

// ─── U-Değeri hesaplama ──────────────────────────────────────

export interface UValueResult {
  thickness_mm: number;
  lambda: number;
  u_value: number;
  fire_class: string;
  fire_class_label: string;
  density: number;
  description: string;
}
