import React from 'react';
import HeroSlider from '@/components/HeroSlider';
import StartCategories from '@/components/StartCategories';
import BrandCarousel from '@/components/BrandCarousel';
import { Truck, ShieldCheck, CheckCircle, Star } from 'lucide-react';
import styles from './page.module.css';
import * as store from '@/lib/store';
import Link from 'next/link';

export default async function Home() {
  const blogPosts = await store.getBlogPosts();
  const references = await store.getReferences();

  // If no blog posts, use placeholders
  const displayPosts = blogPosts.length > 0 ? blogPosts : [
    { title: 'Trapez Sac İzmir', imageUrl: '', slug: '#' },
    { title: 'Betopan Nedir Nerede Kullanılır', imageUrl: '', slug: '#' },
    { title: 'Havalandırma Bacası', imageUrl: '', slug: '#' }
  ];

  return (
    <main>

      <HeroSlider />

      {/* Category Grid Section */}
      <StartCategories />

      <div className="container">

        {/* Sandviç Panel Satışı ve Montajı – SEO odaklı açıklama blou */}
        <section className={styles.home_block} aria-label="Sandviç Panel Satışı ve Montajı">
          <h2 className={styles.block_title}>Sandviç Panel Satışı ve Montajı</h2>
          <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', maxWidth: '820px', marginBottom: '24px' }}>
            <strong>Sandviç Panelci</strong> olarak Türkiye genelinde{' '}
            <strong>sandviç panel satışı ve montajı</strong> hizmeti sunuyoruz.
            Çatı paneli, cephe paneli, soğuk oda paneli ve daha fazlası için uygun fiyat teklifi almak için
            hemen iletişime geçin.
          </p>
        </section>

        {/* Online Satış Features */}
        <div className={styles.home_block}>
          <h2 className={styles.block_title}>Sandviç Panelci Güvencesi</h2>
          <div className={styles.feature_grid}>
            <div className={styles.feature_item}>
              <CheckCircle size={32} color="#666" />
              <span className={styles.feature_text}>ORJİNAL <br /> ÜRÜN GARANTİSİ</span>
            </div>
            <div className={styles.feature_item}>
              <Truck size={32} color="#666" />
              <span className={styles.feature_text}>TÜRKİYE'NİN HERYERİNE <br /> KARGO</span>
            </div>
            <div className={styles.feature_item}>
              <ShieldCheck size={32} color="#666" />
              <span className={styles.feature_text}>%100 GÜVENLİ <br /> ALİŞVERİŞ</span>
            </div>
            <div className={styles.feature_item}>
              <Star size={32} color="#666" />
              <span className={styles.feature_text}>PROFESYONEL <br /> MONTAJ HİZMETİ</span>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className={styles.home_block}>
          <h2 className={styles.block_title}>Sandviç Panelci Blog</h2>
          <div className={styles.blog_grid}>
            {displayPosts.slice(0, 3).map((b, i) => (
              <Link href={`/blog/${b.slug}`} key={i} className={styles.blog_item} style={{ textDecoration: 'none' }}>
                <div className={styles.blog_img}>
                  <img
                    src={b.imageUrl || `https://placehold.co/400x200?text=${encodeURIComponent(b.title)}`}
                    alt={b.title}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.blog_title}>{b.title}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* References Section */}
        <BrandCarousel references={references} />

      </div>

    </main>
  );
}
