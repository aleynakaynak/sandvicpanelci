'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, Search, ChevronRight } from 'lucide-react';
import styles from './SidebarRight.module.css';

const categories = [
    { name: 'Çatı Kaplama Malzemeleri', slug: 'cati-kaplama' },
    { name: 'Aksesuar – Ek Ürünler', slug: 'aksesuar' },
    { name: 'Isı Yalıtım', slug: 'isi-yalitim' },
    { name: 'Su Yalıtım', slug: 'su-yalitim' },
    { name: 'Duvar Ve Cephe Kaplama', slug: 'duvar-cephe' },
    { name: 'Ahşap Ürünler', slug: 'ahsap-urunler' },
    { name: 'Profil Ve Galvaniz Sac', slug: 'profil-sac' },
    { name: 'Polikarbon Levha Fiyatları', slug: 'polikarbon' },
];

const topRated = [
    { title: 'Çatı Paneli 3 Hadve', price: 'Fiyat Sorunuz', img: '/images/products/sandvic-panel.jpg', link: '/sandvic-panel' },
    { title: 'Betopan Dış Cephe', price: 'Fiyat Sorunuz', img: '/images/products/betopan.jpg', link: '/betopan' },
    { title: 'Osb-3 Yerli Levha', price: 'Fiyat Sorunuz', img: '/images/products/osb-levha.jpg', link: '/osb-levha' },
];

const SidebarRight = () => {
    return (
        <aside className={styles.sidebar}>
            {/* Categories Menu */}
            <div className={styles.category_menu}>
                {categories.map((cat) => (
                    <div key={cat.slug} className={styles.menu_item}>
                        <Link href={`/${cat.slug}`} className={styles.menu_link}>
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

            {/* Top Rated */}
            <div className={styles.widget}>
                <h3 className={styles.widget_title}>Öne Çıkan Ürünler</h3>
                <div className={styles.top_rated_list}>
                    {topRated.map((item, i) => (
                        <div key={i} className={styles.top_rated_item}>
                            <div className={styles.item_info}>
                                <Link href={item.link} className={styles.item_title}>{item.title}</Link>
                                <div className={styles.item_price}>{item.price}</div>
                            </div>
                            <div className={styles.item_thumb}>
                                <img src={item.img} alt={item.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '4px' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default SidebarRight;
