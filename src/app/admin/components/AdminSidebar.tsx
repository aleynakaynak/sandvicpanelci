'use client';

import { LayoutDashboard, Package, FolderTree, FileText, Settings, LogOut, Globe, Image } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Ürünler', icon: Package, href: '/admin/products' },
    { name: 'Kategoriler', icon: FolderTree, href: '/admin/categories' },
    { name: 'Blog Yazıları', icon: FileText, href: '/admin/blog' },
    { name: 'Referanslar', icon: Image, href: '/admin/reference' }, // Use Image icon
    { name: 'Ayarlar', icon: Settings, href: '/admin/settings' },
];

export default function AdminSidebar() {
    return (
        <aside style={{ width: '260px', height: '100vh', backgroundColor: '#1e1e2d', color: '#fff', display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0 }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #333' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Admin Panel</h2>
                <div style={{ fontSize: '12px', color: '#888' }}>Sandviç Panelci Yönetim</div>
            </div>

            <nav style={{ flex: 1, padding: '20px 0' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 25px',
                                color: '#a2a3b7',
                                textDecoration: 'none',
                                transition: '0.2s',
                                fontSize: '14px'
                            }}
                                // Add active styling logic if needed, simplify for now
                                onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.backgroundColor = '#1b1b28'; }}
                                onMouseOut={(e) => { e.currentTarget.style.color = '#a2a3b7'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <a href="/" target="_blank" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 25px',
                            color: '#3b9eff',
                            textDecoration: 'none',
                            fontSize: '14px',
                            marginTop: '20px'
                        }}>
                            <Globe size={18} />
                            Siteyi Görüntüle
                        </a>
                    </li>
                </ul>
            </nav>

            <div style={{ padding: '20px', borderTop: '1px solid #333' }}>
                <button
                    onClick={async () => {
                        const { createClient } = await import('@/lib/supabase/client');
                        const supabase = createClient();
                        await supabase.auth.signOut();
                        window.location.href = '/admin/login';
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'none',
                        border: 'none',
                        color: '#ff5b57',
                        cursor: 'pointer',
                        fontSize: '14px',
                        width: '100%'
                    }}>
                    <LogOut size={18} /> Çıkış Yap
                </button>
            </div>
        </aside>
    );
}
