import React from 'react';
import Link from 'next/link';
import { Home, Droplets, Thermometer, BrickWall, TreePine, GalleryVerticalEnd, Layers, Grid, ChevronRight } from 'lucide-react';
import styles from './Categories.module.css';

const categories = [
    { id: 1, name: 'Çatı Kaplama', icon: <Home size={32} />, link: '/category/roofing' },
    { id: 2, name: 'Su Yalıtımı', icon: <Droplets size={32} />, link: '/category/waterproofing' },
    { id: 3, name: 'Isı Yalıtımı', icon: <Thermometer size={32} />, link: '/category/insulation' },
    { id: 4, name: 'Duvar ve Cephe', icon: <BrickWall size={32} />, link: '/category/facade' },
    { id: 5, name: 'Ahşap Ürünler', icon: <TreePine size={32} />, link: '/category/wood' },
    { id: 6, name: 'Profil ve Sac', icon: <GalleryVerticalEnd size={32} />, link: '/category/sheet-metal' },
    { id: 7, name: 'Polikarbon', icon: <Grid size={32} />, link: '/category/polycarbonate' },
    { id: 8, name: 'Aksesuarlar', icon: <Layers size={32} />, link: '/category/accessories' },
];

const Categories = () => {
    return (
        <section className={styles.categories}>
            <div className="container">
                <h2 className="section-title">Ürün Kategorileri</h2>
                <div className={styles.grid}>
                    {categories.map((cat) => (
                        <Link key={cat.id} href={cat.link} className={styles.card}>
                            <div className={styles.icon_wrapper}>
                                {cat.icon}
                            </div>
                            <h3 className={styles.card_title}>{cat.name}</h3>
                            <span className={styles.card_link}>
                                İncele <ChevronRight size={16} />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
