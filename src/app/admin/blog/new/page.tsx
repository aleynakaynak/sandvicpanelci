import React from 'react';
import { createBlogPost } from '@/app/actions';

export default function NewBlogPostPage() {
    return (
        <div style={{ maxWidth: '800px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Yeni Blog Yazısı</h1>

            <form action={createBlogPost} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Başlık</label>
                    <input type="text" name="title" required placeholder="Yazı başlığı" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Slug (URL)</label>
                    <input type="text" name="slug" required placeholder="yazi-basligi-url" style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Özet (Kısa Açıklama)</label>
                    <textarea name="excerpt" rows={3} required placeholder="Kısa özet..." style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}></textarea>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Görsel URL</label>
                    <input type="text" name="imageUrl" placeholder="https://..." style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>İçerik</label>
                    <textarea name="content" rows={15} required placeholder="Yazı içeriği..." style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}></textarea>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <button type="submit" style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 25px', borderRadius: '6px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
                        Kaydet
                    </button>
                    <a href="/admin/blog" style={{ backgroundColor: '#fff', color: '#374151', padding: '10px 25px', borderRadius: '6px', border: '1px solid #d1d5db', textDecoration: 'none', fontWeight: '600' }}>
                        İptal
                    </a>
                </div>
            </form>
        </div>
    );
}
