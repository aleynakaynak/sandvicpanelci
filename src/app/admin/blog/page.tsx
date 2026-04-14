import React from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash } from 'lucide-react';
import * as store from '@/lib/store';
import { deleteBlogPostAction } from '@/app/actions';

export default async function BlogAdminPage() {
    const posts = await store.getBlogPosts();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Blog Yönetimi</h1>
                <Link href="/admin/blog/new" style={{
                    backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500'
                }}>
                    <Plus size={18} /> Yeni Yazı Ekle
                </Link>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600', color: '#6b7280' }}>Başlık</th>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600', color: '#6b7280' }}>Slug</th>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: '600', color: '#6b7280' }}>Tarih</th>
                            <th style={{ padding: '12px 24px', textAlign: 'right', fontWeight: '600', color: '#6b7280' }}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>Henüz blog yazısı bulunmamaktadır.</td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px 24px', fontWeight: '500' }}>{post.title}</td>
                                    <td style={{ padding: '12px 24px', color: '#666' }}>{post.slug}</td>
                                    <td style={{ padding: '12px 24px', color: '#666' }}>{post.date}</td>
                                    <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                            <Link href={`/admin/blog/${post.id}`} style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                                                <Edit size={16} /> Düzenle
                                            </Link>
                                            <form action={deleteBlogPostAction.bind(null, post.id)}>
                                                <button type="submit" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', border: 'none', background: 'none', cursor: 'pointer' }}>
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
