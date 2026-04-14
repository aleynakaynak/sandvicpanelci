'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, Minus } from 'lucide-react';
import styles from './StartCategories.module.css';

const defaultCategories = [
    { name: 'Osb Levha', img: '/images/products/osb-levha.jpg', link: '/osb-levha' },
    { name: 'Sandviç Panel', img: '/images/products/sandvic-panel.jpg', link: '/sandvic-panel' },
    { name: 'Shingle', img: '/images/products/shingle.jpg', link: '/shingle' },
    { name: 'Plywood', img: '/images/products/plywood.jpg', link: '/plywood' },
    { name: 'Çatı Malzemeleri', img: '/images/products/sandvic-panel.jpg', link: '/cati-kaplama' },
    { name: 'Camyünü', img: '/images/products/cam-yunu.jpg', link: '/camyunu' },
    { name: 'Boyalı Profil', img: '/images/products/boyali-profil.jpg', link: '/profil-sac' },
    { name: 'Betopan', img: '/images/products/betopan.jpg', link: '/betopan' },
    { name: 'Taşyünü', img: '/images/products/tas-yunu.jpg', link: '/tasyunu' },
    { name: 'Xps-Foamboard', img: '/images/products/xps.jpg', link: '/xps' },
    { name: 'Membran', img: '/images/products/membran.jpg', link: '/membran' },
    { name: 'Boardex', img: '/images/products/boardex.jpg', link: '/boardex' },
];

const categoryDataMap: Record<string, { name: string, img: string, link: string }[]> = {
    '/cati-kaplama': [
        { name: 'Sandviç Panel', img: '/images/products/sandvic-panel.jpg', link: '/sandvic-panel' },
        { name: 'Osb Levha', img: '/images/products/osb-levha.jpg', link: '/osb-levha' },
        { name: 'Shingle', img: '/images/products/shingle.jpg', link: '/shingle' },
        { name: 'Polikarbon Levha Fiyatları', img: '/images/products/polikarbon.jpg', link: '/polyester' },
        { name: 'Eternit', img: '/images/products/eternit.jpg', link: '/eternit' },
        { name: 'Onduline', img: '/images/products/onduline.jpg', link: '/onduline' }
    ],
    '/isi-yalitim': [
        { name: 'Taşyünü', img: '/images/products/tas-yunu.jpg', link: '/tasyunu' },
        { name: 'Camyünü', img: '/images/products/cam-yunu.jpg', link: '/camyunu' },
        { name: 'Xps-Foamboard', img: '/images/products/xps.jpg', link: '/xps' },
        { name: 'Strafor EPS', img: '/images/products/eps.jpg', link: '/strafor' },
    ],
    '/su-yalitim': [
        { name: 'Membran', img: '/images/products/membran.jpg', link: '/membran' },
        { name: 'Desenli Membran', img: '/images/products/membran.jpg', link: '/desenli-membran' },
        { name: 'Likit Membran', img: '/images/products/likit-membran.jpg', link: '/likit-membran' },
    ],
    '/duvar-cephe': [
        { name: 'Betopan', img: '/images/products/betopan.jpg', link: '/betopan' },
        { name: 'Cephe Panel', img: '/images/products/sandvic-panel.jpg', link: '/cephe-panel' },
        { name: 'Alçıpan', img: '/images/products/alcipan.jpg', link: '/alcipan' },
        { name: 'Boardex', img: '/images/products/boardex.jpg', link: '/boardex' },
    ],
    '/profil-sac': [
        { name: 'Boyalı Profil', img: '/images/products/boyali-profil.jpg', link: '/profil-sac' },
        { name: 'Köşebent', img: '/images/products/kosebent.jpg', link: '/kosebent' },
        { name: 'Kutu Profil', img: '/images/products/kutu-profil.jpg', link: '/kutu-profil' },
        { name: 'Galvaniz Sac', img: '/images/products/galvaniz-sac.jpg', link: '/galvaniz-sac' },
    ],
    '/aksesuar': [
        { name: 'Çatı Çıkış Kapakları', img: '/images/products/cati-cikis-kapagi.jpg', link: '/cati-cikis' },
        { name: 'Vidalar', img: '', link: '/vidalar' },
    ],
    '/ahsap-urunler': [
        { name: 'Plywood', img: '/images/products/plywood.jpg', link: '/plywood' },
        { name: 'Kereste', img: '/images/products/kereste.jpg', link: '/kereste' },
    ],
    '/polikarbon': [
        { name: 'Polikarbon Levha', img: '/images/products/polikarbon.jpg', link: '/polikarbon' }
    ]
};

const sideMenuResponse = [
    { title: 'Çatı Kaplama Malzemeleri', link: '/cati-kaplama' },
    { title: 'Aksesuar – Ek Ürünler', link: '/aksesuar' },
    { title: 'Isı Yalıtım', link: '/isi-yalitim' },
    { title: 'Su Yalıtım', link: '/su-yalitim' },
    { title: 'Duvar ve Cephe Kaplama', link: '/duvar-cephe' },
    { title: 'Ahşap Ürünler', link: '/ahsap-urunler' },
    { title: 'Profil ve Galvaniz Sac', link: '/profil-sac' },
    { title: 'Polikarbon Levha Fiyatları', link: '/polikarbon' } /* Assuming this is correct from screenshot */
];

const StartCategories = () => {
    const [selectedLink, setSelectedLink] = useState<string | null>(null);

    const displayCategories = selectedLink && categoryDataMap[selectedLink] 
        ? categoryDataMap[selectedLink] 
        : defaultCategories;

    return (
        <section className="section" style={{ backgroundColor: '#fff', padding: '60px 0' }}>
            <div className="container">
                <h2 style={{ textAlign: 'center', fontSize: '14px', letterSpacing: '1px', color: '#666', marginBottom: '40px', fontWeight: '700', textTransform: 'uppercase' }}>
                    SANDVİÇ PANELCİ YAPI MARKET
                </h2>

                <div className={styles.layoutFlex}>

                    {/* LEFT SIDE DRAWER MENU (Accordion style visuals as per screenshot) */}
                    <div className={styles.leftSidebar}>
                        {sideMenuResponse.map((item, i) => (
                            <div 
                                key={i} 
                                onClick={() => setSelectedLink(item.link)}
                                style={{
                                    backgroundColor: selectedLink === item.link ? '#505a64' : '#343a40',
                                    color: '#fff',
                                    marginBottom: '2px',
                                    padding: '12px 15px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                <span style={{ color: 'white', textDecoration: 'none', flex: 1 }}>{item.title}</span>
                                <Plus size={14} color="#fff" />
                            </div>
                        ))}
                    </div>

                    {/* RIGHT SIDE GRID */}
                    <div className={styles.gridContainer}>
                        {displayCategories.map((cat, idx) => (
                            <Link key={idx} href={cat.link} style={{ textDecoration: 'none', textAlign: 'center' }}>
                                {/* Image Container */}
                                <div style={{
                                    height: '140px',
                                    backgroundColor: '#fff',
                                    marginBottom: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                {/* Title */}
                                <h3 style={{ fontSize: '16px', color: '#333', fontWeight: '400', fontFamily: 'serif' }}>{cat.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartCategories;
