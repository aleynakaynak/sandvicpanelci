import { MetadataRoute } from 'next';
import * as store from '@/lib/store';

// We duplicate the keys here or we could ideally export them from the page file.
// For the sitemap, we want the most important routes.
const staticCategories = [
    'membran',
    'duvar-cephe',
    'cati-kaplama',
    'isi-yalitim',
    'su-yalitim',
    'profil-sac',
    'aksesuar',
    'ahsap-urunler',
    'sandvic-panel',
    'sandvic-panel-beyaz',
    'sandvic-panel-antrasit',
    'cephe-panel',
    'osb-levha',
    'betopan',
    'plywood',
    'shingle',
    'camyunu',
    'tasyunu',
    'xps',
    'boardex',
    'cati-cikis',
    'cati-cikis-panel',
    'cati-cikis-shingle',
    'cati-cikis-trapez',
    'trapez-sac',
    'vidalar'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const domain = 'https://www.sandvicpanelyapi.com.tr';

    // 1. Static Routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/blog',
        '/maliyet-hesaplama'
    ].map(route => ({
        url: `${domain}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Category & Product Routes (from our catch-all data)
    const categoryRoutes = staticCategories.map(slug => ({
        url: `${domain}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 3. Blog Post Routes
    const blogPosts = await store.getBlogPosts();
    const blogRoutes = blogPosts.map(post => ({
        url: `${domain}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...categoryRoutes, ...blogRoutes];
}
