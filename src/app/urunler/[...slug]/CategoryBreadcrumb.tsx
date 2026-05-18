import React, { Fragment } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ChevronRight, Home } from 'lucide-react';

interface Props {
  slugChain: string[];
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

async function resolveBreadcrumbs(slugChain: string[]): Promise<BreadcrumbItem[]> {
  if (slugChain.length === 0) return [];

  const { data } = await supabase
    .from('categories')
    .select('name, slug')
    .in('slug', slugChain);

  const map: Record<string, string> = {};
  for (const row of data ?? []) map[row.slug] = row.name;

  const items: BreadcrumbItem[] = [];
  for (let i = 0; i < slugChain.length; i++) {
    const slug = slugChain[i];
    items.push({
      name: map[slug] ?? slug,
      href: `/urunler/${slugChain.slice(0, i + 1).join('/')}`,
    });
  }

  return items;
}

export default async function CategoryBreadcrumb({ slugChain }: Props) {
  const items = await resolveBreadcrumbs(slugChain);

  return (
    <nav aria-label="Breadcrumb">
      <ol style={{
        listStyle: 'none', display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', gap: 4, margin: 0, padding: 0,
        fontSize: 12, color: '#888',
      }}>
        <li>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#888', textDecoration: 'none', fontWeight: 600 }}>
            <Home size={13} /> Ana Sayfa
          </Link>
        </li>
        <li><ChevronRight size={12} color="#ccc" /></li>
        <li>
          <Link href="/urunler" style={{ color: '#888', textDecoration: 'none', fontWeight: 600 }}>
            Ürünler
          </Link>
        </li>
        {items.map((item, i) => (
          <Fragment key={item.href}>
            <li><ChevronRight size={12} color="#ccc" /></li>
            <li>
              {i === items.length - 1 ? (
                <span style={{ color: '#d32f2f', fontWeight: 700 }}>{item.name}</span>
              ) : (
                <Link href={item.href} style={{ color: '#888', textDecoration: 'none', fontWeight: 600 }}>
                  {item.name}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
