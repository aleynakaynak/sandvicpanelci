import React from 'react';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

import * as store from '@/lib/store';

export default async function BlogListPage() {
    const blog_posts = await store.getBlogPosts();

    return (
        <div className="section">
            <div className="container">
                <h1 className="section-title">BLOG</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {blog_posts.map((post) => (
                        <div key={post.slug} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <div style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
                                {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                                    <Link href={`/blog/${post.slug}`} style={{ color: '#333' }}>{post.title}</Link>
                                </h2>
                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#888', marginBottom: '1rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {new Date(post.date).toLocaleDateString('tr-TR')}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> Admin</span>
                                </div>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    {post.excerpt}
                                </p>
                                <Link href={`/blog/${post.slug}`} style={{ color: '#d32f2f', fontWeight: '600', fontSize: '0.9rem' }}>
                                    Devamını Oku &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
