'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type {
  CategoryRow,
  CategoryNode,
  CategoryMenuItem,
  UseCategoriesReturn,
} from '@/lib/types/category.types';

// ============================================================
// YARDIMCI FONKSİYONLAR
// ============================================================

/**
 * Bir kategorinin tam URL yolunu oluşturur.
 * Ağacı traversal yerine flatList üzerinden parent zinciri takip eder.
 *
 * Örnek çıktılar:
 *   level 1 → /urunler/sandvic-panel-kaplama-malzemeleri
 *   level 2 → /urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri
 *   level 3 → /urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri/5-hadveli-pur-pir-cati-paneli
 */
function buildHref(
  category: CategoryRow,
  lookupMap: Map<number, CategoryRow>
): string {
  const segments: string[] = [category.slug];
  let current: CategoryRow = category;

  while (current.parent_id !== null) {
    const parent = lookupMap.get(current.parent_id);
    if (!parent) break;
    segments.unshift(parent.slug);
    current = parent;
  }

  return `/urunler/${segments.join('/')}`;
}

/**
 * Supabase'den gelen düz kategori listesini (flat array)
 * parent-children ilişkisine sahip iç içe ağaca (tree) dönüştürür.
 *
 * Zaman karmaşıklığı: O(n) — her eleman yalnızca bir kez işlenir.
 */
export function buildCategoryTree(flatList: CategoryRow[]): CategoryNode[] {
  const nodeMap = new Map<number, CategoryNode>();

  // 1. Adım: Her öğeyi children dizisiyle birlikte Map'e aktar
  for (const row of flatList) {
    nodeMap.set(row.id, { ...row, children: [] });
  }

  const roots: CategoryNode[] = [];

  // 2. Adım: Parent-child ilişkisini kur
  for (const node of nodeMap.values()) {
    if (node.parent_id === null) {
      roots.push(node);
    } else {
      const parent = nodeMap.get(node.parent_id);
      if (parent) {
        parent.children.push(node);
      }
    }
  }

  // 3. Adım: Her seviyeyi sort_order'a göre sırala
  const sortNodes = (nodes: CategoryNode[]): CategoryNode[] =>
    nodes
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((node) => ({
        ...node,
        children: sortNodes(node.children),
      }));

  return sortNodes(roots);
}

/**
 * CategoryNode ağacını navigasyon için daha hafif olan
 * CategoryMenuItem ağacına dönüştürür.
 */
function buildMenuTree(
  nodes: CategoryNode[],
  lookupMap: Map<number, CategoryRow>
): CategoryMenuItem[] {
  return nodes.map((node) => ({
    id: node.id,
    name: node.name,
    slug: node.slug,
    level: node.level,
    sort_order: node.sort_order,
    href: buildHref(node, lookupMap),
    children: buildMenuTree(node.children, lookupMap),
  }));
}

// ============================================================
// SUPABASE VERİ ÇEKME FONKSİYONU
// ============================================================

/**
 * Supabase `categories` tablosundan yalnızca aktif kayıtları çeker.
 * `sort_order` ve `level`'a göre sıralar.
 */
async function fetchCategories(): Promise<CategoryRow[]> {
  const { data, error } = await supabase
    .from('categories')
    .select(`
      id,
      name,
      slug,
      parent_id,
      description,
      level,
      sort_order,
      is_active,
      created_at
    `)
    .eq('is_active', true)
    .order('level', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`Kategoriler yüklenirken hata: ${error.message}`);
  }

  return (data ?? []) as CategoryRow[];
}

// ============================================================
// CUSTOM HOOK
// ============================================================

/**
 * `useCategories` — Kategori verilerini Supabase'den çeken,
 * ağaç yapısına dönüştüren ve UI durumlarını yöneten custom hook.
 *
 * @example
 * ```tsx
 * const { categoryTree, menuTree, loading, error } = useCategories();
 *
 * if (loading) return <Spinner />;
 * if (error)   return <ErrorMessage message={error.message} />;
 *
 * return <MegaMenu items={menuTree} />;
 * ```
 */
export function useCategories(): UseCategoriesReturn {
  const [flatCategories, setFlatCategories] = useState<CategoryRow[]>([]);
  const [categoryTree, setCategoryTree] = useState<CategoryNode[]>([]);
  const [menuTree, setMenuTree] = useState<CategoryMenuItem[]>([]);
  const [rootCategories, setRootCategories] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const flat = await fetchCategories();

      // O(1) erişim için lookup map
      const lookupMap = new Map<number, CategoryRow>(
        flat.map((row) => [row.id, row])
      );

      const tree = buildCategoryTree(flat);
      const menu = buildMenuTree(tree, lookupMap);
      const roots = flat.filter((row) => row.level === 1);

      setFlatCategories(flat);
      setCategoryTree(tree);
      setMenuTree(menu);
      setRootCategories(roots);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    flatCategories,
    categoryTree,
    menuTree,
    rootCategories,
    loading,
    error,
    refetch: load,
  };
}

// ============================================================
// SERVER-SIDE YARDIMCI (SSR / RSC için)
// ============================================================

/**
 * Server Component veya getServerSideProps içinde doğrudan
 * kullanılabilecek asenkron fonksiyon.
 * Hook kurallarına tabi değildir.
 *
 * @example
 * ```tsx
 * // app/urunler/page.tsx  (Server Component)
 * import { getCategories } from '@/lib/hooks/useCategories';
 *
 * export default async function Page() {
 *   const { tree, menu } = await getCategories();
 *   return <MegaMenu items={menu} />;
 * }
 * ```
 */
export async function getCategories(): Promise<{
  flat: CategoryRow[];
  tree: CategoryNode[];
  menu: CategoryMenuItem[];
  roots: CategoryRow[];
}> {
  const flat = await fetchCategories();
  const lookupMap = new Map<number, CategoryRow>(
    flat.map((row) => [row.id, row])
  );
  const tree = buildCategoryTree(flat);
  const menu = buildMenuTree(tree, lookupMap);
  const roots = flat.filter((row) => row.level === 1);

  return { flat, tree, menu, roots };
}
