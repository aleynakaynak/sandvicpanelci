'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, Search, ChevronRight } from 'lucide-react';
import styles from './SidebarRight.module.css';

const categories = [
    { name: 'Çatı Kaplama Malzemeleri', slug: 'urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri' },
    { name: 'Aksesuar – Ek Ürünler', slug: 'urunler/aksesuarlar-ve-ek-urunler' },
    { name: 'Isı Yalıtım', slug: 'isi-yalitim' },
    { name: 'Su Yalıtım', slug: 'su-yalitim' },
    { name: 'Duvar Ve Cephe Kaplama', slug: 'urunler/sandvic-panel-kaplama-malzemeleri/cephe-panelleri' },
    { name: 'Ahşap Ürünler', slug: 'ahsap-urunler' },
    { name: 'Profil Ve Galvaniz Sac', slug: 'profil-sac' },
    { name: 'Polikarbon Levha', slug: 'polikarbon' },
];

const recommendedCati = [
    { title: 'PUR/PIR Çatı Paneli', price: 'Fiyat Sorunuz', img: '/images/products/3hadvepir.png', link: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri/pur-pir-yalitimli-cati-panelleri' },
    { title: 'Ekonomik Çatı Paneli', price: '400 TL + KDV / m²', img: '/images/products/ekonomik-cati-gallery.png', link: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri/ekonomik-cati-panel' },
];

const recommendedCephe = [
    { title: 'PUR/PIR Cephe Paneli', price: 'Fiyat Sorunuz', img: '/images/products/sandvic-panel.jpg', link: '/urunler/sandvic-panel-kaplama-malzemeleri/cephe-panelleri/pur-pir-yalitimli-cephe-panelleri' },
    { title: 'Ekonomik Cephe Paneli', price: '400 TL + KDV / m²', img: '/images/products/ekonomik-cephe-gallery.jpg', link: '/urunler/sandvic-panel-kaplama-malzemeleri/cephe-panelleri/ekonomik-cephe-panel' },
];

const recommendedAksesuar = [
    { title: 'Kenet Levhalar', price: 'Fiyat Sorunuz', img: '/images/products/kenet.png', link: '/urunler/aksesuarlar-ve-ek-urunler/kenet-levhalar' },
];

const recommendedDefault = [
    { title: 'PUR/PIR Çatı Paneli', price: 'Fiyat Sorunuz', img: '/images/products/3hadvepir.png', link: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri/pur-pir-yalitimli-cati-panelleri' },
];

const SidebarRight = () => {
    const pathname = usePathname() || '';
    
    let topRated = recommendedDefault;
    if (pathname.includes('cati')) {
        topRated = recommendedCati;
    } else if (pathname.includes('cephe')) {
        topRated = recommendedCephe;
    } else if (pathname.includes('aksesuar')) {
        topRated = recommendedAksesuar;
    }

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
            {topRated.length > 0 && (
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
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.img} alt={item.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '4px' }} />
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
