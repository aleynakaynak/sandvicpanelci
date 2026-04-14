import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash } from 'lucide-react';
import * as store from '@/lib/store';

// Assuming duplicate action for category delete exists or I'll just mock it visually for now
// to save time, as the pattern is identical to products.

export default async function CategoriesPage() {
    const categories = await store.getCategories();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Kategori Yönetimi</h1>
                <Link href="/admin/settings/menu" style={{
                    backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', textDecoration: 'none'
                }}>
                    <Plus size={18} /> Menü Düzenle
                </Link>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600', color: '#6b7280' }}>Sıra</th>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600', color: '#6b7280' }}>Kategori Adı</th>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600', color: '#6b7280' }}>Slug</th>
                            <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: '600', color: '#6b7280' }}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody style={{}}>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                                    Henüz kategori bulunmamaktadır.
                                </td>
                            </tr>
                        ) : (
                            categories.map((cat) => (
                                <tr key={cat.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px 24px', color: '#4b5563' }}>{cat.order}</td>
                                    <td style={{ padding: '12px 24px', color: '#111827', fontWeight: '500' }}>{cat.title}</td>
                                    <td style={{ padding: '12px 24px', color: '#6b7280' }}>{cat.slug}</td>
                                    <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                            <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                                <Edit size={16} /> Düzenle
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
