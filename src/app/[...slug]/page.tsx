import React from 'react';
import CategorySidebar from '@/components/CategorySidebar';
import SidebarRight from '@/components/SidebarRight';
import ProductCard from '@/components/ProductCard';
import ProductDetail from '@/components/ProductDetail';
import Breadcrumb from '@/components/Breadcrumb';
import SubCategoryGrid from '@/components/SubCategoryGrid';
import PriceTable from '@/components/PriceTable';
import SandvicPanelCalculator from '@/components/SandvicPanelCalculator';
import styles from '@/components/PageHeader.module.css';
import gridStyles from '@/components/ProductGrid.module.css';

// --- DATA WAREHOUSE FOR ALL CATEGORIES ---
const data: Record<string, any> = {
    // 1. SU YALITIM > MEMBRAN
    'membran': {
        title: 'Membran Fiyatları',
        parent: 'su-yalitim',
        type: 'list',
        subCategories: [
            { title: 'Arduazlı - Kumlu', count: 4, link: '/arduazli', img: '/images/products/membran.jpg' },
            { title: 'Cam Tülü Taşıyıcılı', count: 2, link: '/cam-tulu', img: '/images/products/membran.jpg' },
            { title: 'Folyolu', count: 2, link: '/folyolu', img: '/images/products/membran.jpg' },
            { title: 'Likit Membran', count: 2, link: '/likit-membran', img: '/images/products/likit-membran.jpg' },
        ],
        relatedProducts: [
            { id: 101, title: 'Bitüself Su Yalıtım Bandı', price: 'Fiyat Sorunuz', img: '/images/products/bitusesf.jpg' },
            { id: 102, title: 'Likit Membran 20kg', price: 'Fiyat Sorunuz', img: '/images/products/likit-membran.jpg' },
            { id: 103, title: 'P3000 Membran', price: 'Fiyat Sorunuz', img: '/images/products/membran.jpg' },
        ],
        infoTitle: 'Membran Uygulama Alanları',
        infoText: `Temel çerçevresinde uygulanacak olan drenaj bölgelerinde...`
    },
    // 2. DUVAR VE CEPHE KAPLAMA
    'duvar-cephe': {
        title: 'Duvar ve Cephe Kaplama',
        parent: 'home',
        type: 'list',
        subCategories: [
            { title: 'Alçıpan Levha Fiyatları', count: 4, link: '/alcipan', img: '/images/products/alcipan.jpg' },
            { title: 'Betopan Fiyatları', count: 9, link: '/betopan', img: '/images/products/betopan.jpg' },
            { title: 'Cephe Panel', count: 2, link: '/cephe-panel', img: '/images/products/sandvic-panel.jpg' }
        ],
        relatedProducts: [
            { id: 201, title: 'Sandviç Panel 8.00 mt', price: 'Fiyat Sorunuz', img: '/images/products/sandvic-panel.jpg' },
            { id: 202, title: 'İzopak Likit Astar', price: 'Fiyat Sorunuz', img: '/images/products/membran.jpg' },
            { id: 203, title: 'Kırmızı-Beyaz Boyalı Trapez', price: 'Fiyat Sorunuz', img: '/images/products/boyali-trapez.jpg' },
            { id: 204, title: 'Onduline PP400 Membran', price: 'Fiyat Sorunuz', img: '/images/products/onduline.jpg' },
        ]
    },
    // 3. ÇATI KAPLAMA MALZEMELERİ
    'cati-kaplama': {
        title: 'Çatı Kaplama Malzemeleri',
        parent: 'home',
        type: 'list',
        subCategories: [
            { title: 'Sandviç Panel', count: 5, link: '/sandvic-panel', img: '/images/products/sandvic-panel.jpg' },
            { title: 'Osb Levha', count: 6, link: '/osb-levha', img: '/images/products/osb-levha.jpg' },
            { title: 'Shingle (Şıngıl) Fiyatları', count: 4, link: '/shingle', img: '/images/products/shingle.jpg' },
            { title: 'Polikarbon Levha Fiyatları', count: 9, link: '/polyester', img: '/images/products/polikarbon.jpg' },
            { title: 'Eternit Fiyatları', count: 3, link: '/eternit', img: '/images/products/eternit.jpg' },
            { title: 'Onduline Fiyatları', count: 3, link: '/onduline', img: '/images/products/onduline.jpg' }
        ],
        relatedProducts: [
            { id: 301, title: 'Çatı Paneli 40mm', price: 'Fiyat Sorunuz', img: '/images/products/sandvic-panel.jpg' },
            { id: 302, title: 'Osb-3 11mm', price: 'Fiyat Sorunuz', img: '/images/products/osb-levha.jpg' },
            { id: 303, title: 'Trapez Vida 100 Adet', price: 'Fiyat Sorunuz', img: '' }
        ]
    },
    'isi-yalitim': {
        title: 'Isı Yalıtımı Çözümleri',
        parent: 'home',
        type: 'list',
        subCategories: [
            { title: 'Taşyünü Fiyatları', count: 14, link: '/tasyunu', img: '/images/products/tas-yunu.jpg' },
            { title: 'İzocam Camyünü', count: 8, link: '/camyunu', img: '/images/products/cam-yunu.jpg' },
            { title: 'Strafor Köpük (EPS)', count: 20, link: '/strafor', img: '/images/products/eps.jpg' },
            { title: 'XPS Köpük', count: 12, link: '/xps', img: '/images/products/xps.jpg' }
        ],
        relatedProducts: [
            { id: 401, title: 'İzocam Camyünü Şilte', price: 'Fiyat Sorunuz', img: '/images/products/cam-yunu.jpg' },
            { id: 402, title: 'XPS Foamboard 3cm', price: 'Fiyat Sorunuz', img: '/images/products/xps.jpg' },
            { id: 403, title: 'Taşyünü Cephe 50mm', price: 'Fiyat Sorunuz', img: '/images/products/tas-yunu.jpg' }
        ],
        infoTitle: 'Neden Isı Yalıtımı Yapılmalı?',
        infoText: 'Isı yalıtımı, binalarda enerji tasarrufu sağlamanın en etkili yoludur. Doğru yalıtım malzemeleri kışın sıcak, yazın ise serin bir iç mekan konforu sağlar.'
    },
    'su-yalitim': {
        title: 'Su Yalıtımı Sistemleri',
        parent: 'home',
        type: 'list',
        subCategories: [
            { title: 'Desenli Membran', count: 6, link: '/desenli-membran', img: '/images/products/membran.jpg' },
            { title: 'Membran Fiyatları', count: 25, link: '/membran', img: '/images/products/membran.jpg' },
            { title: 'Likit Membranlar', count: 10, link: '/likit-membran', img: '/images/products/likit-membran.jpg' }
        ],
        relatedProducts: [
            { id: 501, title: 'P3000 Membran Cam Tülü', price: 'Fiyat Sorunuz', img: '/images/products/membran.jpg' },
            { id: 502, title: 'Bitümlü Astar 15L', price: 'Fiyat Sorunuz', img: '/images/products/likit-membran.jpg' }
        ]
    },
    'profil-sac': {
        title: 'Bağlantı Elemanları ve Profil Saclar',
        parent: 'home',
        type: 'list',
        subCategories: [
            { title: 'Köşebent Demir', count: 15, link: '/kosebent', img: '/images/products/kosebent.jpg' },
            { title: 'Demir Kutu Profil', count: 30, link: '/kutu-profil', img: '/images/products/kutu-profil.jpg' },
            { title: 'Galvaniz Sac', count: 12, link: '/galvaniz-sac', img: '/images/products/galvaniz-sac.jpg' }
        ],
        relatedProducts: [
            { id: 601, title: '40x40 Kutu Profil 2mm', price: 'Fiyat Sorunuz', img: '/images/products/kutu-profil.jpg' },
            { id: 602, title: 'Galvaniz Trapez Sac 0.50mm', price: 'Fiyat Sorunuz', img: '/images/products/galvaniz-sac.jpg' }
        ]
    },
    'aksesuar': {
        title: 'İnşaat Aksesuarları ve Ek Ürünler',
        parent: 'home',
        type: 'list',
        subCategories: [
            { title: 'Ahşap Ürünler', count: 8, link: '/ahsap-urunler', img: '/images/products/plywood.jpg' },
            { title: 'Çatı Çıkış Kapakları', count: 4, link: '/cati-cikis', img: '/images/products/cati-cikis-kapagi.jpg' },
            { title: 'Panel ve Trapez Vidaları', count: 15, link: '/vidalar', img: '' }
        ],
        relatedProducts: [
            { id: 701, title: 'Panel Vidası 5.5 x 60mm', price: 'Fiyat Sorunuz', img: '' },

        ]
    },
    'ahsap-urunler': {
        title: 'Kereste ve Ahşap Levhalar',
        parent: 'aksesuar',
        type: 'list',
        subCategories: [
            { title: 'Plywood Fiyatları', count: 6, link: '/plywood', img: '/images/products/plywood.jpg' },
            { title: 'İnşaatlık Kereste', count: 10, link: '/kereste', img: '/images/products/kereste.jpg' }
        ],
        relatedProducts: [
            { id: 801, title: 'Filipin Plywood 18mm', price: 'Fiyat Sorunuz', img: '/images/products/plywood.jpg' },
            { id: 802, title: '5x10 İnşaatlık Kereste', price: 'Fiyat Sorunuz', img: '/images/products/kereste.jpg' }
        ]
    },
    // --- EXPLICIT PRODUCT DETAIL PAGES ---
    'sandvic-panel': {
        title: 'Sandviç Panel',
        price: 'Fiyat Sorunuz',
        img: '/images/products/sandvic-panel.jpg',
        type: 'product_detail',
        category: 'Çatı Kaplama',
        categorySlug: 'cati-kaplama'
    },
    'osb-levha': {
        title: 'OSB Levha',
        price: 'Fiyat Sorunuz',
        img: '/images/products/osb-levha.jpg',
        type: 'product_detail',
        category: 'Ahşap Ürünler',
        categorySlug: 'ahsap-urunler'
    },
    'betopan': {
        title: 'Betopan',
        price: 'Fiyat Sorunuz',
        img: '/images/products/betopan.jpg',
        type: 'product_detail',
        category: 'Duvar ve Cephe',
        categorySlug: 'duvar-cephe'
    },
    'plywood': {
        title: 'Plywood',
        price: 'Fiyat Sorunuz',
        img: '/images/products/plywood.jpg',
        type: 'product_detail',
        category: 'Ahşap Ürünler',
        categorySlug: 'ahsap-urunler'
    },
    'shingle': {
        title: 'Shingle (Şıngıl)',
        price: 'Fiyat Sorunuz',
        img: '/images/products/shingle.jpg',
        type: 'product_detail',
        category: 'Çatı Kaplama',
        categorySlug: 'cati-kaplama'
    },
    'camyunu': {
        title: 'Camyünü',
        price: 'Fiyat Sorunuz',
        img: '/images/products/cam-yunu.jpg',
        type: 'product_detail',
        category: 'Isı Yalıtım',
        categorySlug: 'isi-yalitim'
    },
    'tasyunu': {
        title: 'Taşyünü',
        price: 'Fiyat Sorunuz',
        img: '/images/products/tas-yunu.jpg',
        type: 'product_detail',
        category: 'Isı Yalıtım',
        categorySlug: 'isi-yalitim'
    },
    'xps': {
        title: 'XPS Foamboard',
        price: 'Fiyat Sorunuz',
        img: '/images/products/xps.jpg',
        type: 'product_detail',
        category: 'Isı Yalıtım',
        categorySlug: 'isi-yalitim'
    },
    'boardex': {
        title: 'Boardex Dış Cephe Levhası',
        price: 'Fiyat Sorunuz',
        img: '/images/products/boardex.jpg',
        type: 'product_detail',
        category: 'Duvar ve Cephe',
        categorySlug: 'duvar-cephe'
    }
    // Add sub-listings as needed (e.g. /alcipan could be a list if it has items, or just generic products)
};

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;

    // LOGIC:
    // We check the LAST segment of the URL against our 'data' map.
    // Exception: /su-yalitim/membran-fiyatlari -> last is membran-fiyatlari. Map to 'membran'.

    let pageKey = slug[slug.length - 1];

    // Intercept calculator route (e.g. /maliyet-hesaplama or /sandvic-panel-maliyet-hesaplama)
    if (pageKey === 'maliyet-hesaplama' || pageKey === 'sandvic-panel-hesap' || pageKey === 'sandvic-panel-maliyet-hesaplama') {
        const SidebarRight = (await import('@/components/SidebarRight')).default;
        return (
            <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '50px' }}>
                <Breadcrumb />
                <div className="container responsive-page-layout" style={{ marginTop: '30px' }}>
                    <div style={{ flex: 1 }}>
                        <SandvicPanelCalculator />
                    </div>
                    <div className="responsive-sidebar" style={{ width: '300px', flexShrink: 0 }}>
                        <SidebarRight />
                    </div>
                </div>
            </div>
        );
    }

    // Normalization
    if (pageKey === 'membran-fiyatlari') pageKey = 'membran';

    // Lookup
    let content = data[pageKey];

    // FALLBACK GENERIC LOGIC OR PRODUCT LOOKUP
    if (!content) {
        // Try to find if this is a product from relatedProducts
        let foundProduct: any = null;
        let parentCategory: any = null;
        
        if (pageKey.startsWith('urun-')) {
            const productId = parseInt(pageKey.replace('urun-', ''), 10);
            for (const [key, categoryData] of Object.entries(data)) {
                if (categoryData.relatedProducts) {
                    const p = categoryData.relatedProducts.find((rp: any) => rp.id === productId);
                    if (p) {
                        foundProduct = p;
                        parentCategory = categoryData;
                        break;
                    }
                }
            }
        }

        if (foundProduct) {
            content = {
                title: foundProduct.title,
                price: foundProduct.price || 'Fiyat Sorunuz',
                img: foundProduct.img,
                shortDesc: `${foundProduct.title} hakkında detaylı bilgi için bize ulaşın.`,
                category: parentCategory.title,
                categorySlug: slug.length > 1 ? slug[slug.length - 2] : 'genel',
                type: 'product_detail',
                relatedProducts: parentCategory.relatedProducts.filter((rp: any) => rp.id !== foundProduct.id)
            };
        } else {
            const title = pageKey.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            content = {
                title: title,
                price: 'Fiyat Sorunuz',
                shortDesc: `${title} hakkında detaylı bilgi için bize ulaşın.`,
                category: 'Genel',
                categorySlug: slug.length > 1 ? slug[slug.length - 2] : 'genel',
                type: 'product_detail',
                relatedProducts: []
            };
        }
    }

    const isListView = content.type === 'list';

    // --- RENDER LIST VIEW ---
    if (isListView) {
        return (
            <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '50px' }}>

                {/* Title Strip */}
                <div className={styles.page_title_section}>
                    <h1 className={styles.page_title}>{content.title}</h1>
                </div>

                <Breadcrumb currentName={content.title} />

                <div className="container responsive-page-layout" style={{ marginTop: '20px' }}>

                    {/* Left Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>

                        {/* 1. SubCategories Grid */}
                        {content.subCategories && content.subCategories.length > 0 && (
                            <SubCategoryGrid items={content.subCategories} />
                        )}

                        {/* 2. Related Products Title & Grid */}
                        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#333', marginBottom: '20px' }}>
                            {content.title} ile İlgili Ürünler
                        </h3>

                        <div className={gridStyles.product_grid}>
                            {(content.relatedProducts || []).map((p: any) => (
                                <ProductCard 
                                    key={p.id} 
                                    title={p.title} 
                                    price={p.price} 
                                    image={p.img || ''}
                                    link={`/${slug.join('/')}/urun-${p.id}`} 
                                />
                            ))}
                            {(!content.relatedProducts || content.relatedProducts.length === 0) && (
                                <p style={{ color: '#999', padding: '20px', textAlign: 'center', width: '100%', border: '1px dashed #eee' }}>
                                    Bu kategoride şu an vitrin ürünü bulunmamaktadır. Tüm ürünleri görmek için alt kategorileri inceleyiniz.
                                </p>
                            )}
                        </div>

                        {/* 3. Info Text (Optional) */}
                        {content.infoTitle && (
                            <div style={{ marginBottom: '30px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>{content.infoTitle}</h3>
                                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{content.infoText}</p>
                            </div>
                        )}

                        {/* 4. Price Table (Specific to Membran usually) */}
                        {(pageKey === 'membran') && <PriceTable />}

                        {/* 5. Bottom SEO Content */}
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '40px', padding: '20px', backgroundColor: '#fafafa', border: '1px solid #eee', borderRadius: '8px' }}>
                            <div style={{ width: '120px', height: '80px', flexShrink: 0, overflow: 'hidden', borderRadius: '4px' }}>
                                <img src={content.img || "/images/products/sandvic-panel.jpg"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '5px' }}>{content.title} Hakkında</h4>
                                <p style={{ fontSize: '13px', color: '#666' }}>
                                    Sandviç Panelci olarak en kaliteli {content.title} ürünlerini uzman ekibimiz ve hızlı sevkiyat ağımız ile en uygun fiyatlarla sunuyoruz. Detaylı teknik bilgi ve özel ödeme seçenekleri için hemen bizimle iletişime geçebilirsiniz.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar */}
                    <div className="responsive-sidebar" style={{ width: '270px', flexShrink: 0 }}>
                        <SidebarRight />
                    </div>

                </div>
            </div>
        );
    }

    // --- RENDER PRODUCT VIEW ---
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '50px' }}>
            <Breadcrumb currentName={content.title} />
            <div className="container responsive-page-layout" style={{ marginTop: '20px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <ProductDetail product={content} />
                </div>
                <div className="responsive-sidebar" style={{ width: '270px', flexShrink: 0 }}>
                    <SidebarRight />
                </div>
            </div>
        </div>
    );
}
