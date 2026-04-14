'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Home, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
    const pathname = usePathname();
    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>

                    {/* Column 1: Company Info */}
                    <div className={styles.company_info}>
                        <div className={styles.heading_left}>
                            SANDVİÇ PANELCİ
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#d32f2f', margin: 0 }}>SANDVİÇ PANELCİ</h2>
                        </div>

                        <p className={styles.intro}>
                            En iyi yalıtım ve cephe sistemleri için Türkiye'nin dört bir yanına hizmet veriyoruz. Sandviç Panelci kalitesi ve güvencesiyle daima yanınızdayız.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className={styles.heading}>HIZLI ERİŞİM</h3>
                        <div className={styles.links}>
                            <Link href="/sandvic-panel" className={styles.footer_link}>Sandviç Panel</Link>
                            <Link href="/betopan" className={styles.footer_link}>Betopan Fiyatları</Link>
                            <Link href="/camyunu" className={styles.footer_link}>İzocam Camyünü Fiyatları</Link>
                            <Link href="/onduline" className={styles.footer_link}>Onduline Fiyatları</Link>
                            <Link href="/cati-kaplama" className={styles.footer_link}>Çatı Kaplama Malzemeleri</Link>
                            <Link href="/tasyunu" className={styles.footer_link}>Taşyünü Fiyatları</Link>
                            <Link href="/cephe-panel" className={styles.footer_link}>Cephe Panel</Link>
                            <Link href="/osb-levha" className={styles.footer_link}>Osb Levha</Link>
                            <Link href="/blog" className={styles.footer_link}>Blog</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className={styles.heading}>İLETİŞİM</h3>

                        <div className={styles.contact_text}>
                            <strong>Merkez :</strong> Hadımköy
                        </div>

                        <div className={styles.contact_text}>
                            <strong>Depo :</strong> Çorlu
                        </div>

                        <div className={styles.contact_text}>
                            <span style={{ color: '#3b9eff' }}>WhatsApp :</span> <a href="https://wa.me/905319308500">+90 531 930 85 00</a>
                        </div>

                        <div className={styles.contact_text}>
                            <span style={{ color: '#3b9eff' }}>Telefon :</span> <a href="tel:+905319308500">+90 531 930 85 00</a>
                        </div>

                        <div className={styles.contact_text}>
                            <span style={{ color: '#3b9eff' }}>E-Posta :</span> <a href="mailto:info@sadvicpanelyapi.com.tr">info@sadvicpanelyapi.com.tr</a>
                        </div>
                    </div>

                </div>
            </div>
            {/* Bottom Bar is not clearly visible/separate in "ANASAYFA - END" screenshot but usually standard */}
        </footer>
    );
};

export default Footer;
