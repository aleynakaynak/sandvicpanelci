import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    En Uygun Çatı ve Cephe <br />
                    <span style={{ color: 'var(--secondary)' }}>Kaplama Çözümleri</span>
                </h1>
                <p className={styles.subtitle}>
                    Isı yalıtımı, su yalıtımı ve çatı malzemelerinde 50 yılı aşkın tecrübe ile en kaliteli ürünleri en uygun fiyatlarla sunuyoruz.
                </p>
                <div className={styles.cta_group}>
                    <Link href="/products" className="btn btn-primary" style={{ backgroundColor: 'var(--secondary)', border: 'none' }}>
                        Ürünleri İncele <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                    </Link>
                    <Link href="/contact" className="btn btn-secondary" style={{ backgroundColor: 'transparent', border: '2px solid white' }}>
                        İletişime Geç
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
