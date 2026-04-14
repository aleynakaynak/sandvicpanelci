import React from 'react';
import { LayoutDashboard, Package, Tag, MessageSquare, LogOut } from 'lucide-react';
import styles from './Dashboard.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.dashboard_layout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebar_header}>
                    KÜÇÜKDEVECİ
                </div>
                <nav className={styles.nav_list}>
                    <div className={`${styles.nav_item} ${styles.active}`}>
                        <LayoutDashboard size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Dashboard
                    </div>
                    <div className={styles.nav_item}>
                        <Package size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Ürünler
                    </div>
                    <div className={styles.nav_item}>
                        <Tag size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Kategoriler
                    </div>
                    <div className={styles.nav_item}>
                        <MessageSquare size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Mesajlar
                    </div>
                    <div className={styles.nav_item} style={{ marginTop: 'auto', borderTop: '1px solid #444' }}>
                        <LogOut size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Çıkış Yap
                    </div>
                </nav>
            </aside>

            <main className={styles.main_content}>
                <div className={styles.top_bar}>
                    <h1 className={styles.page_title}>Dashboard</h1>
                    <div className={styles.user_info}>
                        <span>Admin User</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ddd' }}></div>
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
}
