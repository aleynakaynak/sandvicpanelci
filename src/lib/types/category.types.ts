// ============================================================
// Sandviç Panelci Yapı Market — Category TypeScript Interfaces
// ============================================================

/**
 * Supabase `categories` tablosundan gelen ham satır tipi.
 * Veritabanı kolonlarıyla birebir eşleşir.
 */
export interface CategoryRow {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  description: string | null;
  level: 1 | 2 | 3;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

/**
 * Ağaç yapısına dönüştürülmüş kategori tipi.
 * `children` alanı, alt kategorileri özyinelemeli olarak tutar.
 */
export interface CategoryNode extends CategoryRow {
  children: CategoryNode[];
}

/**
 * Sadece menü/navigasyon için gereken hafif kategori tipi.
 * Ağır veri yüklemeden kaçınmak için kullanılır.
 */
export interface CategoryMenuItem {
  id: number;
  name: string;
  slug: string;
  level: 1 | 2 | 3;
  sort_order: number;
  href: string; // /urunler/{l1-slug}/{l2-slug}/{l3-slug}
  children: CategoryMenuItem[];
}

/**
 * useCategories hook'unun döndürdüğü tip.
 */
export interface UseCategoriesReturn {
  /** Supabase'den gelen düz liste (ham veri) */
  flatCategories: CategoryRow[];
  /** Parent-children ilişkisine göre ağaç yapısı */
  categoryTree: CategoryNode[];
  /** Navigasyon için sadeleştirilmiş menü ağacı */
  menuTree: CategoryMenuItem[];
  /** Sadece level 1 ana kategoriler */
  rootCategories: CategoryRow[];
  /** Verinin yüklenip yüklenmediği */
  loading: boolean;
  /** Hata nesnesi, yoksa null */
  error: Error | null;
  /** Veriyi manuel olarak yeniden çeken fonksiyon */
  refetch: () => Promise<void>;
}
