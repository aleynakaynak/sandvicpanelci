import React from 'react';
import { updateBlogPost } from '@/app/actions';
import * as store from '@/lib/store';
import Link from 'next/link';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
    const post = await store.getBlogPost(params.id);

    if (!post) {
        return <div>Yazı bulunamadı.</div>;
    }

    return (
        <div style={{ maxWidth: '800px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Blog Yazısını Düzenle</h1>

            <form action={updateBlogPost.bind(null, post.id)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Başlık</label>
                    <input type="text" name="title" defaultValue={post.title} required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Slug (URL)</label>
                    <input type="text" name="slug" defaultValue={post.slug} required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Özet</label>
                    <textarea name="excerpt" rows={3} defaultValue={post.excerpt} required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}></textarea>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Görsel URL</label>
                    <input type="text" name="imageUrl" defaultValue={post.imageUrl} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>İçerik</label>
                    <textarea name="content" rows={15} defaultValue={post.content} required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}></textarea>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <button type="submit" style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 25px', borderRadius: '6px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
                        Güncelle
                    </button>
                    <Link href="/admin/blog" style={{ backgroundColor: '#fff', color: '#374151', padding: '10px 25px', borderRadius: '6px', border: '1px solid #d1d5db', textDecoration: 'none', fontWeight: '600' }}>
                        İptal
                    </Link>
                </div>
            </form>
        </div>
    );
}
