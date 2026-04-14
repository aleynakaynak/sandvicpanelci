import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash } from 'lucide-react';
import * as store from '@/lib/store';
import { deleteProductAction } from '@/app/actions';

export default async function ProductsPage() {
    // Fetch data directly in Server Component
    // Note: In Next.js 13+, we can await this.
    const products = await store.getProducts();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ürün Yönetimi</h1>
                <Link href="/admin/products/new" style={{
                    backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500'
                }}>
                    <Plus size={18} /> Yeni Ürün Ekle
                </Link>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600', color: '#6b7280' }}>Ürün Adı</th>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600', color: '#6b7280' }}>Fiyat</th>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600', color: '#6b7280' }}>Kategori</th>
                            <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: '600', color: '#6b7280' }}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody style={{}}>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                                    Henüz ürün bulunmamaktadır.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px 24px', color: '#111827', fontWeight: '500' }}>{product.title}</td>
                                    <td style={{ padding: '12px 24px', color: '#4b5563' }}>{product.price}</td>
                                    <td style={{ padding: '12px 24px', color: '#6b7280' }}>{product.categorySlug}</td>
                                    <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                            <Link href={`/admin/products/${product.id}`} style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Edit size={16} /> Düzenle
                                            </Link>
                                            <form action={deleteProductAction.bind(null, product.id)}>
                                                <button type="submit" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Trash size={16} /> Sil
                                                </button>
                                            </form>
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
