import React from 'react';
import styles from './BrandCarousel.module.css';

const brands = [
    "İzocam", "Ekobord", "Knauf", "Dalsan Alçı", "Tosçelik",
    "Onduline", "Teknopanel", "Tekiz", "Fixa", "Sumaş", "Kronospan"
];

const BrandCarousel = () => {
    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">REFERANSLARIMIZ</h2>
                <div className={styles.scroll_container}>
                    <div className={styles.track}>
                        {brands.map((brand, i) => (
                            <div key={i} className={styles.brand_card}>
                                <span className={styles.brand_text}>{brand}</span>
                            </div>
                        ))}
                        {/* Duplicate for infinite loop */}
                        {brands.map((brand, i) => (
                            <div key={`dup-${i}`} className={styles.brand_card}>
                                <span className={styles.brand_text}>{brand}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandCarousel;
