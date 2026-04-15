'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, ChevronRight, Phone, MapPin, Clock } from 'lucide-react';
import styles from './Header.module.css';

interface MenuItem {
    id: string;
    title: string;
    link: string;
    children?: MenuItem[];
}

interface HeaderProps {
    menuData?: MenuItem[];
}

const Header: React.FC<HeaderProps> = ({ menuData }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    if (pathname && pathname.startsWith('/admin')) return null;

    const renderMenuItem = (item: MenuItem) => {
        const hasChildren = item.children && item.children.length > 0;

        return (
            <li className={styles.nav_item} key={item.id}>
                <Link href={item.link} className={`${styles.nav_link} ${isActive(item.link) ? styles.active : ''}`}>
                    <span dangerouslySetInnerHTML={{ __html: item.title.replace(/\n/g, '<br/>') }}></span>
                    {hasChildren && <ChevronDown size={12} className={styles.arrow_icon} />}
                </Link>

                {hasChildren && (
                    <div className={styles.dropdown}>
                        {item.children!.map(child => {
                            const hasGrandChildren = child.children && child.children.length > 0;

                            if (hasGrandChildren) {
                                return (
                                    <div className={styles.dropdown_item_group} key={child.id}>
                                        <Link href={child.link} className={styles.dropdown_link_parent}>
                                            {child.title}
                                            <ChevronRight size={14} className={styles.arrow_icon_right} />
                                        </Link>
                                        <div className={styles.nested_dropdown}>
                                            {child.children!.map(grandChild => (
                                                <Link href={grandChild.link} className={styles.dropdown_link} key={grandChild.id}>
                                                    {grandChild.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <Link href={child.link} className={styles.dropdown_link} key={child.id}>
                                        {child.title}
                                    </Link>
                                );
                            }
                        })}
                    </div>
                )}
            </li>
        );
    };

    const menuToRender = menuData && menuData.length > 0 ? menuData : [
        {
            id: '1', title: 'ÇATI KAPLAMA MALZEMELERİ', link: '/cati-kaplama', children: [
                { id: '1-1', title: 'SANDVİÇ PANEL', link: '/sandvic-panel' },
                { id: '1-2', title: 'OSB LEVHA', link: '/osb-levha' },
                { id: '1-3', title: 'SHINGLE (ŞINGIL) FİYATLARI', link: '/shingle' },
            ]
        },
        {
            id: '2', title: 'DUVAR VE CEPHE KAPLAMA', link: '/duvar-cephe', children: [
                { id: '2-1', title: 'CEPHE PANEL', link: '/cephe-panel' },
                { id: '2-2', title: 'BETOPAN FİYATLARI', link: '/betopan' },
            ]
        },
        {
            id: '3', title: 'SU YALITIMI', link: '/su-yalitim', children: [
                { id: '3-1', title: 'DESENLİ MEMBRAN', link: '/desenli-membran' },
                {
                    id: '3-2', title: 'MEMBRAN FİYATLARI', link: '/membran', children: [
                        { id: '3-2-1', title: 'ARDUAZLI – KUMLU', link: '/arduazli' },
                        { id: '3-2-2', title: 'CAM TÜLÜ TAŞIYICILI', link: '/cam-tulu' },
                    ]
                },
            ]
        }
    ];

    return (
        <header className={styles.header}>
            <div className={styles.top_strip}>
                <div className={styles.container}>
                    <div className={styles.top_links}>
                        <Link href="/blog">Blog</Link>
                        <Link href="/about">Hakkımızda</Link>
                        <Link href="/contact">İletişim</Link>
                    </div>
                </div>
            </div>

            <div className={styles.main_header}>
                <div className={styles.main_header_content + ' ' + styles.container}>
                    <Link href="/" className={styles.logo_container}>
                        <div className={styles.logo_text}>
                            <span className={styles.logo_main}>SANDVİÇ</span>
                            <span className={styles.logo_sub}>PANELCİ</span>
                        </div>
                    </Link>

                    <div className={styles.contact_info}>
                        <div className={styles.contact_item}>
                            <Phone size={24} className={styles.icon} />
                            <div>
                                <div className={styles.contact_label}>
                                    <a href="tel:+905319308500" style={{ textDecoration: 'none', color: 'inherit' }}>0531 930 85 00</a>
                                </div>
                                <div className={styles.contact_sub}>info@sandvicpanelyapi.com.tr</div>
                            </div>
                        </div>
                        <div className={styles.contact_item}>
                            <MapPin size={24} className={styles.icon} />
                            <div>
                                <div className={styles.contact_label}>Merkez: Hadımköy</div>
                                <div className={styles.contact_sub}>Depo: Çorlu</div>
                            </div>
                        </div>
                        <div className={styles.contact_item}>
                            <Clock size={24} className={styles.icon} />
                            <div>
                                <div className={styles.contact_label}>Pzt - Cmtsi 8.00 - 18.00</div>
                                <div className={styles.contact_sub}>Pazar KAPALI</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mobile_menu_btn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Menu size={28} />
                    </div>
                </div>
            </div>

            <nav className={`${styles.nav_bar} ${isMobileMenuOpen ? styles.nav_bar_open : ''}`}>
                <div className={styles.nav_container}>
                    <ul className={styles.nav_list}>
                        {menuToRender.map(item => renderMenuItem(item))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
