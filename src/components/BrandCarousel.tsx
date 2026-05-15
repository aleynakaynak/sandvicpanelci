import React from 'react';
import styles from './BrandCarousel.module.css';
import { Reference } from '@/lib/types';

interface BrandCarouselProps {
    references: Reference[];
}

const BrandCarousel = ({ references }: BrandCarouselProps) => {
    if (!references || references.length === 0) return null;

    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">REFERANSLARIMIZ</h2>
                <div className={styles.scroll_container}>
                    <div className={styles.track}>
                        {references.map((brand, i) => (
                            <div key={brand.id || i} className={styles.brand_card}>
                                {brand.imageUrl ? (
                                    <img src={brand.imageUrl} alt={brand.title} className={styles.brand_img} />
                                ) : (
                                    <span className={styles.brand_text}>{brand.title}</span>
                                )}
                            </div>
                        ))}
                        {/* Duplicate for infinite loop */}
                        {references.map((brand, i) => (
                            <div key={`dup-${brand.id || i}`} className={styles.brand_card}>
                                {brand.imageUrl ? (
                                    <img src={brand.imageUrl} alt={brand.title} className={styles.brand_img} />
                                ) : (
                                    <span className={styles.brand_text}>{brand.title}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandCarousel;
