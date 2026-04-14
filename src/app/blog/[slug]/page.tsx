import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';

import * as store from '@/lib/store';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await store.getBlogPost(slug);

    if (!post) {
        return (
            <div className="section">
                <div className="container">
                    <h1>Yazı bulunamadı.</h1>
                    <Link href="/blog">Blog'a dön</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '800px' }}>

                <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', marginBottom: '2rem' }}>
                    <ArrowLeft size={16} /> Blog'a Dön
                </Link>

                {post.imageUrl && (
                    <div style={{ width: '100%', height: '400px', marginBottom: '2rem' }}>
                        <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                )}

                <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>{post.title}</h1>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#888', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {new Date(post.date).toLocaleDateString('tr-TR')}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> Admin</span>
                </div>

                <div 
                    style={{ lineHeight: '1.8', color: '#444', fontSize: '1.1rem' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

            </div>
        </div>
    );
}
