import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import * as store from '@/lib/store';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await store.getBlogPost(slug);
    const domain = 'https://www.sandvicpanelyapi.com.tr';
    const canonicalUrl = `${domain}/blog/${slug}`;

    if (!post) {
        return {
            title: 'Yazı Bulunamadı | Sandviç Panelci',
            alternates: { canonical: canonicalUrl }
        };
    }

    return {
        title: `${post.title} | Sandviç Panelci Blog`,
        description: post.excerpt || `${post.title} hakkında detaylı bilgi ve sektörel ipuçları. Sandviç Panelci resmi blog sayfası.`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: canonicalUrl,
            images: post.imageUrl ? [{ url: post.imageUrl }] : [],
            type: 'article',
            publishedTime: post.date,
        },
    };
}

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

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        image: post.imageUrl,
        datePublished: post.date,
        author: {
            '@type': 'Person',
            name: 'Admin',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Sandviç Panelci',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.sandvicpanelyapi.com.tr/logo.png',
            },
        },
        description: post.excerpt,
    };

    return (
        <div className="section">
            <Script
                id="blog-article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <div className="container" style={{ maxWidth: '800px' }}>

                <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', marginBottom: '2rem' }}>
                    <ArrowLeft size={16} /> Blog'a Dön
                </Link>

                {post.imageUrl && (
                    <div style={{ width: '100%', height: '400px', marginBottom: '2rem', position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                        <Image 
                            src={post.imageUrl} 
                            alt={post.title} 
                            fill 
                            style={{ objectFit: 'cover' }}
                            priority
                        />
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
