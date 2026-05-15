import React from 'react';
import { Metadata } from 'next';
import SidebarRight from '@/components/SidebarRight';
import ProductCard from '@/components/ProductCard';
import ProductDetail from '@/components/ProductDetail';
import Breadcrumb from '@/components/Breadcrumb';
import SandvicPanelCalculator from '@/components/SandvicPanelCalculator';
import styles from '@/components/PageHeader.module.css';
import gridStyles from '@/components/ProductGrid.module.css';
import { getCategoryBySlug, getProductBySlug, getProductsByCategory } from '@/lib/store';
import { Product, Category } from '@/lib/types';

// ─── METADATA ────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const lastSegment = slug[slug.length - 1];
  
  const category = await getCategoryBySlug(lastSegment);
  const product = await getProductBySlug(lastSegment);
  
  const domain = 'https://www.sandvicpanelyapi.com.tr';
  const currentPath = `/${slug.join('/')}`;
  const canonicalUrl = `${domain}${currentPath}`;

  if (category) {
    return {
      title: `${category.title} Modelleri ve Fiyatları | Sandviç Panelci`,
      description: `${category.title} ürünleri, güncel fiyat listesi ve teknik özellikleri. Uzman ekibimizden hemen teklif alın.`,
      alternates: { canonical: canonicalUrl }
    };
  }

  if (product) {
    return {
      title: `${product.title} | Sandviç Panelci`,
      description: product.description || `${product.title} modelleri ve güncel fiyatları. En uygun seçenekler ve uzman montaj desteği için hemen bilgi alın.`,
      alternates: { canonical: canonicalUrl }
    };
  }

  return {
    title: 'Sayfa Bulunamadı | Sandviç Panelci',
    alternates: { canonical: canonicalUrl }
  };
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const lastSegment = slug[slug.length - 1];

  // Intercept calculator route
  if (lastSegment === 'maliyet-hesaplama' || lastSegment === 'sandvic-panel-hesap' || lastSegment === 'sandvic-panel-maliyet-hesaplama') {
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

  // 1. Check if it's a CATEGORY
  const category = await getCategoryBySlug(lastSegment);
  if (category) {
    const products = await getProductsByCategory(category.slug);
    
    return (
      <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '50px' }}>
        {/* Title Strip */}
        <div className={styles.page_title_section}>
          <h1 className={styles.page_title}>{category.title}</h1>
        </div>

        <Breadcrumb currentName={category.title} />

        <div className="container responsive-page-layout" style={{ marginTop: '20px' }}>
          {/* Left Content: The Product Gallery */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#333', marginBottom: '20px' }}>
              {category.title} Ürün Vitrini
            </h3>
            
            {/* SAYFA BAŞI BİLGİ METNİ */}
            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderLeft: '4px solid #d32f2f', borderRadius: '4px' }}>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                <strong>Sandviç panel;</strong> yapıları dış etkenlerden koruyan, pratik ve ekonomik bir çözümdür. İki yüksek yoğunluklu metal yüzey arasına PUR, PIR, Mineral Yün veya EPS yalıtım dolgusu kullanılarak üretilir.
              </p>
            </div>

            <div className={gridStyles.product_grid}>
              {products.length > 0 ? (
                products.map((p) => (
                  <ProductCard 
                    key={p.id} 
                    title={p.title} 
                    price={p.price} 
                    image={p.imageUrl || ''}
                    link={`/${slug.join('/')}/${p.slug}`} 
                  />
                ))
              ) : (
                <p style={{ color: '#999', padding: '40px', textAlign: 'center', width: '100%', border: '1px dashed #eee', borderRadius: '8px' }}>
                  Bu kategoride henüz sergilenecek ürün bulunmamaktadır. <br/> Detaylı bilgi ve stok durumu için lütfen bizimle iletişime geçin.
                </p>
              )}
            </div>
            
            {/* TEKNİK ÖZELLİKLER VE BİLGİ ALANLARI (Kategori Altı) */}
            <div style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>Yalıtım Tipleri</h4>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>PUR, PIR, Mineral Yün ve EPS seçenekleri mevcuttur.</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>Kullanım Alanları</h4>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Endüstriyel Tesisler, Soğuk Depolar, Sosyal Yapılar ve Enerji Santralleri.</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>Teknik Not</h4>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Dış yüzey UV ışınlarına ve kimyasal etkilere; iç yüzey ise yoğuşmaya karşı dayanıklı olacak şekilde yapılandırılır.</p>
                </div>
            </div>

          </div>

          {/* Right Sidebar: Categories & Featured */}
          <div className="responsive-sidebar" style={{ width: '270px', flexShrink: 0 }}>
            <SidebarRight />
          </div>
        </div>
      </div>
    );
  }

  // 2. Check if it's a PRODUCT
  const product = await getProductBySlug(lastSegment);
  if (product) {
    return (
      <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '50px' }}>
        <Breadcrumb currentName={product.title} />
        <div className="container responsive-page-layout" style={{ marginTop: '20px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <ProductDetail product={product} />
            
            {/* TEKNİK ÖZELLİKLER VE BİLGİ ALANLARI (Ürün Altı) */}
            <div style={{ marginTop: '30px', padding: '25px', backgroundColor: '#fafafa', border: '1px solid #eaeaea', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#222', marginBottom: '20px', borderBottom: '2px solid #d32f2f', paddingBottom: '10px', display: 'inline-block' }}>Teknik Bilgiler</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ width: '150px', fontWeight: '700', color: '#444' }}>Yalıtım Tipleri:</div>
                  <div style={{ color: '#666' }}>PUR, PIR, Mineral Yün ve EPS seçenekleri mevcuttur.</div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ width: '150px', fontWeight: '700', color: '#444' }}>Kullanım Alanları:</div>
                  <div style={{ color: '#666' }}>Endüstriyel Tesisler, Soğuk Depolar, Sosyal Yapılar ve Enerji Santralleri.</div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ width: '150px', fontWeight: '700', color: '#444' }}>Teknik Not:</div>
                  <div style={{ color: '#666' }}>Dış yüzey UV ışınlarına ve kimyasal etkilere; iç yüzey ise yoğuşmaya karşı dayanıklı olacak şekilde yapılandırılır.</div>
                </div>
              </div>
            </div>
            
          </div>
          <div className="responsive-sidebar" style={{ width: '270px', flexShrink: 0 }}>
            <SidebarRight />
          </div>
        </div>
      </div>
    );
  }

  // 3. Fallback: 404 or Not Found
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '48px', color: '#d32f2f' }}>404</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>Aradığınız sayfa veya ürün bulunamadı.</p>
      <a href="/" style={{ color: '#222', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>Ana Sayfaya Dön</a>
    </div>
  );
}
