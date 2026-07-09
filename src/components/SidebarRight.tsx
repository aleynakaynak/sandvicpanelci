'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus } from 'lucide-react';
import styles from './SidebarRight.module.css';
import { CATEGORY_MAP } from '@/lib/categoryMap';

// Ana kategori menüsü — gerçek /urunler/... rotalarına karşılık gelen, CATEGORY_MAP kaynaklı slug'lar.
// Buradaki her slug page.tsx'in çözebildiği bir CATEGORY_MAP anahtarıdır, ölü link üretmez.
const MAIN_CATEGORY_SLUGS = [
    'sandvic-panel-kaplama-malzemeleri',
    'trapez-saclar',
    'kenet-sistemleri',
    'osb-ve-plywood',
    'yalitim-malzemeleri',
    'boyali-profiller-galvanizli-saclar',
    'aksesuarlar-ve-ek-urunler',
];

const menuCategories = MAIN_CATEGORY_SLUGS
    .map((slug) => CATEGORY_MAP[slug])
    .filter((cat): cat is NonNullable<typeof cat> => Boolean(cat))
    .map((cat) => ({ name: cat.name, href: `/urunler/${cat.slug}` }));

const SidebarRight = () => {
    const pathname = usePathname() || '';

    // Şu an gezinilen ana kategoriyi bul; bulunamazsa "İlgili Ürünler" hiç gösterilmez
    // (alakasız/rastgele ürün göstermek yerine boş bırakmak tercih edilir).
    const activeMainSlug = MAIN_CATEGORY_SLUGS.find((slug) => pathname.includes(slug));
    const activeCategory = activeMainSlug ? CATEGORY_MAP[activeMainSlug] : null;
    const relatedItems = activeCategory?.children ?? [];

    return (
        <aside className={styles.sidebar}>
            {/* Categories Menu */}
            <div className={styles.category_menu}>
                {menuCategories.map((cat) => (
                    <div key={cat.href} className={styles.menu_item}>
                        <Link href={cat.href} className={styles.menu_link}>
                            {cat.name}
                            <Plus size={14} className={styles.icon} />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className={styles.widget}>
                <h3 className={styles.widget_title}>Arama</h3>
                <div className={styles.search_box}>
                    <input type="text" placeholder="Ürünlerde ara..." className={styles.search_input} />
                    <button className={styles.search_btn}>Ara</button>
                </div>
            </div>

            {/* İlgili Ürünler — yalnızca aktif kategori netse gösterilir */}
            {activeMainSlug && relatedItems.length > 0 && (
                <div className={styles.widget}>
                    <h3 className={styles.widget_title}>İlgili Ürünler</h3>
                    <div className={styles.top_rated_list}>
                        {relatedItems.map((item) => (
                            <div key={item.slug} className={styles.top_rated_item}>
                                <div className={styles.item_info}>
                                    <Link href={`/urunler/${activeMainSlug}/${item.slug}`} className={styles.item_title}>
                                        {item.name}
                                    </Link>
                                </div>
                                <div className={styles.item_thumb}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
};

export default SidebarRight;
