'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ZoomIn, Phone } from 'lucide-react';
import ProductCard from './ProductCard';
import styles from './ProductDetail.module.css';
import gridStyles from './ProductGrid.module.css';

interface ProductDetailProps {
    product: any;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const [activeTab, setActiveTab] = useState('desc');

    // Prepare Related Products (Mock if not present)
    const relatedProducts = product.related || [
        { id: 101, title: 'İzopak PAL Folyolu', price: '850.00 ₺ / adet', img: '' }
    ];

    const isSandwichPanel = product.title?.toLowerCase().includes('sandviç') || 
                            product.title?.toLowerCase().includes('panel') || 
                            (product.category && product.category.toLowerCase().includes('sandviç'));
                            
    const priceText = isSandwichPanel ? "350₺ + KDV" : null;

    return (
        <div className={styles.product_wrapper}>

            {/* Top Section */}
            <div className={styles.top_section}>

                {/* Left: Image */}
                <div className={styles.image_column}>
                    <div className={styles.main_image_container}>
                        {/* Actual Image from data */}
                        {product.img || product.imageUrl || (product.images && product.images[0]) ? (
                            <img 
                                src={product.img || product.imageUrl || product.images[0]} 
                                alt={product.title} 
                                style={{ maxWidth: '100%', borderRadius: '8px' }} 
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
                    {priceText && <div className={styles.price}>{priceText}</div>}

                    <div className={styles.short_desc}>
                        {product.shortDesc || product.description || "Sandviç Panelci güvencesiyle en kaliteli ürünleri en uygun fiyatlarla sunuyoruz. Detaylı bilgi için bizimle iletişime geçebilirsiniz."}
                    </div>

                    {/* Meta */}
                    <div className={styles.meta_row}>
                        Kategoriler:
                        <Link href={`/${product.categorySlug || 'kategori'}`} className={styles.meta_link}>
                            {product.category || 'Genel'}
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <Link href="/contact" className={styles.contact_btn}>
                            İLETİŞİME GEÇ
                        </Link>
                        <a
                            href={`https://wa.me/905319308500?text=Sipariş vermek istiyorum: ${product.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.whatsapp_btn}
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
                        className={`${styles.tab_btn} ${activeTab === 'reviews' ? styles.active : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        YORUMLAR (0)
                    </button>
                </div>

                <div className={styles.tab_content}>
                    {activeTab === 'desc' && (
                        <div>
                            <h3 className={styles.tab_title}>{product.title} Açıklama</h3>
                            <div className="content-body">
                                <p>{product.fullDesc || product.shortDesc || "Detaylı açıklama bulunmamaktadır."}</p>
                                {/* Mock extra content if needed */}
                                <h4 style={{ marginTop: '20px', marginBottom: '10px', fontSize: '16px', fontWeight: '700', color: '#333' }}>Ürün Özellikleri</h4>
                                <p>Kaliteli malzeme, uzun ömürlü kullanım.</p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div>
                            <p>Henüz yorum yapılmamış.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            <div className={styles.related_section}>
                <h3 className={styles.related_title}>{product.title} İle İlgili Ürünler</h3>
                <div className={gridStyles.product_grid}>
                    {(product.relatedProducts || []).map((p: any) => (
                        <ProductCard
                            key={p.id}
                            title={p.title}
                            price={p.price}
                            image={p.img || p.imageUrl}
                            link={`/${product.categorySlug || 'kategori'}/urun-${p.id}`}
                        />
                    ))}
                    {(!product.relatedProducts || product.relatedProducts.length === 0) && null}
                </div>
            </div>

        </div>
    );
};

export default ProductDetail;
