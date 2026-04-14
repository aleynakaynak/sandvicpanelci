'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import styles from './CategorySidebar.module.css';

// Categories matching the new URL structure
// Parent slugs: cati-kaplama, su-yalitim, etc.
// Child slugs: sandvic-panel, membran-fiyatlari, etc.
const categories = [
    {
        name: 'Çatı Kaplama Malzemeleri',
        slug: 'cati-kaplama',
        subs: [
            { name: 'Sandviç Panel', slug: 'sandvic-panel' },
            { name: 'Osb Levha', slug: 'osb-levha' },
            { name: 'Shingle (Şıngıl) Fiyatları', slug: 'shingle' },
            { name: 'Polikarbon Levha Fiyatları', slug: 'polyester' },
            { name: 'Eternit Fiyatları', slug: 'eternit' },
            { name: 'Onduline Fiyatları', slug: 'onduline' },
        ]
    },
    {
        name: 'Duvar Ve Cephe Kaplama',
        slug: 'duvar-cephe',
        subs: [
            { name: 'Cephe Panel', slug: 'cephe-panel' },
            { name: 'Betopan Fiyatları', slug: 'betopan' },
            { name: 'Alçıpan Levha Fiyatları', slug: 'alcipan' },
        ]
    },
    {
        name: 'Isı Yalıtım',
        slug: 'isi-yalitim',
        subs: [
            { name: 'Taşyünü Fiyatları', slug: 'tasyunu' },
            { name: 'İzocam Camyünü Fiyatları', slug: 'camyunu' },
            { name: 'Strafor Köpük Fiyatları', slug: 'strafor' },
            { name: 'XPS Köpük Fiyatları', slug: 'xps' },
        ]
    },
    {
        name: 'Su Yalıtım',
        slug: 'su-yalitim',
        subs: [
            { name: 'Desenli Membran', slug: 'desenli-membran' },
            { name: 'Membran Fiyatları', slug: 'membran-fiyatlari' }, // UPDATED SLUG
            { name: 'Likit Membran', slug: 'likit-membran' },
        ]
    },
    {
        name: 'Profil Ve Galvaniz Sac',
        slug: 'profil-sac',
        subs: [
            { name: 'Köşebent Demir', slug: 'kosebent' },
            { name: 'Demir Kutu Profil Fiyatları', slug: 'kutu-profil' },
            { name: 'NPI Profil Fiyatları', slug: 'npi-profil' },
            { name: 'Galvaniz Sac Fiyatları', slug: 'galvaniz-sac' },
        ]
    },
    {
        name: 'Aksesuar – Ek Ürünler',
        slug: 'aksesuar',
        subs: [
            { name: 'Ahşap Ürünler', slug: 'ahsap-urunler' },
            { name: 'Çatı Çıkış Kapağı', slug: 'cati-cikis' },
            { name: 'Vidalar', slug: 'vidalar' },
        ]
    },
];

const CategorySidebar = ({ activeSlug, parentSlug }: { activeSlug?: string, parentSlug?: string }) => {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // Open the drawer if there is a matching parent
        // 1. If parentSlug is provided (top level), open it.
        // 2. Or find parent by scanning subs.
        if (parentSlug) {
            setOpenItems(prev => ({ ...prev, [parentSlug]: true }));
        } else if (activeSlug) {
            // Reverse lookup
            const parent = categories.find(c => c.subs.some(s => s.slug === activeSlug));
            if (parent) {
                setOpenItems(prev => ({ ...prev, [parent.slug]: true }));
            }
        }
    }, [activeSlug, parentSlug]);

    const toggle = (slug: string) => {
        setOpenItems(prev => ({ ...prev, [slug]: !prev[slug] }));
    };

    return (
        <aside className={styles.sidebar_container}>
            <div className={styles.sidebar_header}>
                KATEGORİLER
                <Minus size={14} />
            </div>

            <div className={styles.accordion}>
                {categories.map((cat) => {
                    // Active Parent Logic: If we are on this category page OR a sub page
                    // e.g. parentSlug matches cat.slug
                    const isActiveHeader = (parentSlug === cat.slug);

                    return (
                        <div key={cat.slug} className={styles.accordion_item}>
                            <button
                                className={`${styles.accordion_trigger} ${isActiveHeader ? styles.active_parent : ''}`}
                                onClick={() => toggle(cat.slug)}
                            >
                                {cat.name}
                                {openItems[cat.slug] ? <Minus size={12} /> : <Plus size={12} />}
                            </button>

                            <div className={`${styles.accordion_content} ${openItems[cat.slug] ? styles.open : ''}`}>
                                {cat.subs && cat.subs.map(sub => (
                                    <Link
                                        key={sub.slug}
                                        href={`/${cat.slug}/${sub.slug}`} // Correct nested URL
                                        className={`${styles.sub_link} ${activeSlug === sub.slug ? styles.active : ''}`}
                                    >
                                        {sub.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default CategorySidebar;
