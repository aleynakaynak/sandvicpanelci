import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import styles from './BlogPreview.module.css';

const blogPosts = [
    "Trapez Saç İzmir",
    "Betopan Nedir Nerede Kullanılır",
    "Havalandırma Bacası",
    "Tayrot Mili",
    "Cam Tuğla Fiyatları Koçtaş",
    "BTM Membran Fiyatları",
    "Dış Cephe Köpük Fiyatları",
    "Osb Fiyatları Ankara",
    "Alüminyum Sac Fiyatları",
    "Çimento Fiyatları"
];

const BlogPreview = () => {
    return (
        <section className="section" style={{ backgroundColor: '#f9f9f9' }}>
            <div className="container">
                <h2 className="section-title">KÜÇÜKDEVECİ BLOG</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    <div className={styles.blog_list}>
                        {blogPosts.slice(0, 5).map((post, i) => (
                            <a key={i} href="#" className={styles.blog_item}>
                                <ArrowRight size={16} className={styles.icon} />
                                {post}
                            </a>
                        ))}
                    </div>

                    <div className={styles.blog_list}>
                        {blogPosts.slice(5).map((post, i) => (
                            <a key={i} href="#" className={styles.blog_item}>
                                <ArrowRight size={16} className={styles.icon} />
                                {post}
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
