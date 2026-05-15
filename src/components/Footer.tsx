'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Home, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';
import { Category, SiteSettings } from '@/lib/types';

interface FooterProps {
    categories: Category[];
    settings: SiteSettings;
}

const Footer = ({ categories, settings }: FooterProps) => {
    const pathname = usePathname();
    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    // Filter main categories for footer links (max 8-9)
    const footerCategories = categories
        .filter(c => !c.parentId)
        .sort((a, b) => a.order - b.order)
        .slice(0, 9);

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>

                    {/* Column 1: Company Info */}
                    <div className={styles.company_info}>
                        <Link href="/" className={styles.footer_logo_link}>
                            <div className={styles.heading_left}>
                                SANDVİÇ PANELCİ
                            </div>
                        </Link>

                        <p className={styles.intro}>
                            En iyi yalıtım ve cephe sistemleri için Türkiye'nin dört bir yanına hizmet veriyoruz. Sandviç Panelci kalitesi ve güvencesiyle daima yanınızdayız.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className={styles.heading}>HIZLI ERİŞİM</h3>
                        <div className={styles.links}>
                            {footerCategories.map(cat => (
                                <Link key={cat.id} href={`/${cat.slug}`} className={styles.footer_link}>
                                    {cat.title}
                                </Link>
                            ))}
                            <Link href="/blog" className={styles.footer_link}>Blog</Link>
                            <Link href="/about" className={styles.footer_link}>Hakkımızda</Link>
                            <Link href="/contact" className={styles.footer_link}>İletişim</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className={styles.heading}>İLETİŞİM</h3>

                        <div className={styles.contact_text}>
                            <strong>Adres :</strong> {settings.address1}
                        </div>

                        {settings.address2 && (
                            <div className={styles.contact_text}>
                                <strong>Depo :</strong> {settings.address2}
                            </div>
                        )}

                        <div className={styles.contact_text}>
                            <span style={{ color: '#3b9eff' }}>WhatsApp :</span> <a href={`https://wa.me/${settings.whatsapp1.replace(/\s+/g, '')}`}>{settings.whatsapp1}</a>
                        </div>

                        <div className={styles.contact_text}>
                            <span style={{ color: '#3b9eff' }}>Telefon :</span> <a href={`tel:${settings.contactPhone1.replace(/\s+/g, '')}`}>{settings.contactPhone1}</a>
                        </div>

                        <div className={styles.contact_text}>
                            <span style={{ color: '#3b9eff' }}>E-Posta :</span> <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
