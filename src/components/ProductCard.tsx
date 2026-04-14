'use client';

import React from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    title: string;
    category?: string; // Optional now as visual doesn't emphasize it highly
    description?: string; // Optional, maybe hidden in grid view
    link: string;
    price?: string;
    image?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, category, link, price, image }) => {
    const isSandwichPanel = title.toLowerCase().includes('sandviç') || 
                            title.toLowerCase().includes('panel') || 
                            (category && category.toLowerCase().includes('sandviç'));
                            
    const priceText = isSandwichPanel ? "350₺ + KDV" : null;

    return (
        <div className={styles.card}>
            <Link href={link} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className={styles.image_container}>
                    {image ? (
                        <img src={image} alt={title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                        <div className={styles.image_placeholder}>
                            <Package size={64} strokeWidth={1} />
                        </div>
                    )}
                </div>

                <div className={styles.details}>
                    <h3 className={styles.title}>{title}</h3>
                    {priceText && <div className={styles.price}>{priceText}</div>}

                    <div className={styles.button_container}>
                        <span className={styles.button}>ÜRÜNÜ İNCELE</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
