import React from 'react';
import HeroSlider from '@/components/HeroSlider';
import StartCategories from '@/components/StartCategories';
import { Truck, ShieldCheck, CheckCircle } from 'lucide-react';
import styles from './page.module.css';
import * as store from '@/lib/store';
import Link from 'next/link';

export default async function Home() {
  const blogPosts = await store.getBlogPosts();

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

        {/* Online Satış Features */}
        <div className={styles.home_block}>
          <h2 className={styles.block_title}>Sandviç Panelci Gösterimde</h2>
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
              <span className={styles.feature_text}>%100 GÜVENLİ <br /> ALIŞVERİŞ</span>
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
                  {/* Fallback image */}
                  <img src={b.imageUrl || `https://placehold.co/400x200?text=${encodeURIComponent(b.title)}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className={styles.blog_title}>{b.title}</div>
              </Link>
            ))}
          </div>
        </div>



      </div>

    </main>
  );
}
