'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ZoomIn, Phone } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import styles from './ProductDetail.module.css';
import { trackWhatsAppClick, trackQuoteRequest } from '@/lib/gtag';
import { Product } from '@/lib/types';

interface ProductDetailProps {
    product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const [activeTab, setActiveTab] = useState('desc');

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.imageUrl,
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: 'Sandviç Panelci',
        },
        offers: {
            '@type': 'Offer',
            url: typeof window !== 'undefined' ? window.location.href : '',
            priceCurrency: 'TRY',
            price: product.price ? product.price.replace(/[^0-9]/g, '') : '0',
            availability: 'https://schema.org/InStock',
        },
    };

    return (
        <div className={styles.product_wrapper}>
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            {/* Top Section */}
            <div className={styles.top_section}>

                {/* Left: Image */}
                <div className={styles.image_column}>
                    <div className={styles.main_image_container}>
                        {product.imageUrl ? (
                            <Image 
                                src={product.imageUrl} 
                                alt={product.title} 
                                width={800}
                                height={600}
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                                priority
                            />
                        ) : (
                            <div className={styles.placeholder_box}>
                                <Search size={48} color="#ccc" />
                                <p>Görsel Hazırlanıyor</p>
                            </div>
                        )}
                        <ZoomIn className={styles.zoom_icon} size={24} />
                    </div>
                </div>

                {/* Right: Info */}
                <div className={styles.info_column}>
                    <h1 className={styles.title}>{product.title}</h1>

                    <div className={styles.price_tag}>
                        {product.price || 'Fiyat Sorunuz'}
                    </div>

                    <div className={styles.short_desc}>
                        {product.description || "Sandviç Panelci güvencesiyle en kaliteli ürünleri en uygun fiyatlarla sunuyoruz."}
                    </div>

                    {/* Meta */}
                    <div className={styles.meta_row}>
                        Kategori:
                        <Link href={`/${product.categorySlug}`} className={styles.meta_link}>
                            {product.categorySlug.replace(/-/g, ' ').toUpperCase()}
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <Link
                            href="/contact"
                            className={styles.contact_btn}
                            onClick={() => trackQuoteRequest({ product: product.title })}
                            id="product-teklif-al-btn"
                        >
                            TEKLİF AL
                        </Link>
                        <a
                            href={`https://wa.me/905319308500?text=Sipariş vermek istiyorum: ${product.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick({ source: 'product_detail_page', product: product.title })}
                            className={styles.whatsapp_btn}
                            id="product-whatsapp-btn"
                        >
                            <Phone size={18} fill="white" /> WHATSAPP SİPARİŞ
                        </a>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className={styles.tabs_container}>
                <div className={styles.tabs_header}>
                    <button
                        className={`${styles.tab_btn} ${activeTab === 'desc' ? styles.active : ''}`}
                        onClick={() => setActiveTab('desc')}
                    >
                        AÇIKLAMA
                    </button>
                    <button
                        className={`${styles.tab_btn} ${activeTab === 'specs' ? styles.active : ''}`}
                        onClick={() => setActiveTab('specs')}
                    >
                        TEKNİK ÖZELLİKLER
                    </button>
                </div>

                <div className={styles.tab_content}>
                    {activeTab === 'desc' && (
                        <div>
                            <h3 className={styles.tab_title}>{product.title} Hakkında</h3>
                            <div className="content-body">
                                <p>{product.longDescription || product.description || `${product.title} ürünlerimiz hakkında detaylı bilgi ve fiyat teklifi almak için bizimle iletişime geçebilirsiniz.`}</p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'specs' && (
                        <div>
                            <h3 className={styles.tab_title}>Teknik Detaylar</h3>
                            {product.specs ? (
                                <table className={styles.specs_table}>
                                    <tbody>
                                        {Object.entries(product.specs).map(([key, val]) => (
                                            <tr key={key}>
                                                <td><strong>{key}</strong></td>
                                                <td>{val}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>Bu ürün için teknik özellik tablosu henüz eklenmemiştir. Lütfen bilgi alınız.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
