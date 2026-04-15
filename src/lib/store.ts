import { Product, Category, BlogPost, SiteSettings, MenuItem, Reference } from './types';
import { createClient } from './supabase/server';

// --- DEFAULTS FOR FALLBACK ---
const defaultHeaderMenu: MenuItem[] = [
    { id: '1', title: 'ÇATI KAPLAMA\nMALZEMELERİ', link: '/cati-kaplama' },
    { id: '2', title: 'DUVAR VE\nCEPHE KAPLAMA', link: '/duvar-cephe' },
    { id: '3', title: 'ISI\nYALITIMI', link: '/isi-yalitim' },
    { id: '4', title: 'SU\nYALITIMI', link: '/su-yalitim' },
    { id: '5', title: 'PROFİL VE\nGALVANİZ SAC', link: '/profil-sac' },
    { id: '6', title: 'MALİYET\nHESAPLAMA', link: '/maliyet-hesaplama' },
    { id: '7', title: 'AKSESUARLAR –\nEK ÜRÜNLER', link: '/aksesuar' }
];

const defaultSettings: SiteSettings = {
    contactPhone1: '+90 531 930 85 00',
    contactPhone2: '',
    whatsapp1: '+90 531 930 85 00',
    whatsapp2: '',
    contactEmail: 'info@sandvicpanelyapi.com.tr',
    address1: 'Merkez: Hadımköy',
    address2: 'Depo: Çorlu',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Hadımköy&t=&z=13&ie=UTF8&iwloc=&output=embed',
    headerMenu: defaultHeaderMenu,
    footerLinks: []
};

// --- DATA FETCHING WITH SUPABASE ---

export async function getProducts(): Promise<Product[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
        return [
            {
                id: 'p1',
                title: 'Çatı Sandviç Panel - 3 Hadveli',
                price: 'Fiyat Sorunuz',
                categorySlug: 'sandvic-panel',
                description: 'Endüstriyel yapılar için yüksek ısı yalıtımı sağlayan 3 hadveli çatı paneli.',
                imageUrl: '/images/products/sandvic-panel.jpg',
                active: true
            },
            {
                id: 'p2',
                title: 'Betopan - 12mm Dış Cephe Levhası',
                price: 'Fiyat Sorunuz',
                categorySlug: 'betopan',
                description: 'Suya ve neme dayanıklı, yangın sınıfı yüksek dış cephe kaplama levhası.',
                imageUrl: '/images/products/betopan.jpg',
                active: true
            },
            {
                id: 'p3',
                title: 'Osb-3 Levha 11mm',
                price: 'Fiyat Sorunuz',
                categorySlug: 'osb-levha',
                description: 'Çatı altı ve dekoratif amaçlı kullanılan dayanıklı ahşap levha.',
                imageUrl: '/images/products/osb-levha.jpg',
                active: true
            }
        ];
    }

    return data.map((p: any) => ({
        id: p.id.toString(),
        title: p.title,
        price: 'Detaylı Bilgi', 
        categorySlug: p.slug,
        description: p.short_description || '',
        imageUrl: p.image_url || '',
        active: p.is_active,
    }));
}

export async function saveProduct(product: Product) {
    const supabase = await createClient();
    if (product.id && product.id.trim() !== '') {
        await supabase.from('products').update({
            title: product.title,
            short_description: product.description,
            is_active: product.active
        }).eq('id', product.id);
    } else {
        await supabase.from('products').insert([{
            title: product.title,
            slug: product.title.toLowerCase().replace(/ /g, '-'),
            short_description: product.description,
            is_active: product.active
        }]);
    }
}

export async function deleteProduct(id: string) {
    const supabase = await createClient();
    await supabase.from('products').delete().eq('id', id);
}

export async function getCategories(): Promise<Category[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*').order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
        return defaultHeaderMenu.map(c => ({
            id: c.id,
            title: c.title,
            slug: c.link.replace('/', ''),
            order: parseInt(c.id, 10) || 1
        }));
    }

    return data.map((c: any) => ({
        id: c.id.toString(),
        slug: c.slug,
        title: c.name,
        parentId: c.parent_id?.toString(),
        order: c.display_order
    }));
}

export async function getSettings(): Promise<SiteSettings> {
    // If you have a settings table, query it here.
    return defaultSettings;
}

export async function saveSettings(settings: SiteSettings) {
    // Implement settings save to DB 
}

// --- BLOG ---
export async function getBlogPosts(): Promise<BlogPost[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    
    if (error || !data || data.length === 0) {
        // Fallback realistic blog posts if DB table is missing
        return [
            {
                id: '1',
                slug: 'trapez-sac-ve-kullanim-alanlari',
                title: 'Trapez Sac Nedir ve Nerelerde Kullanılır?',
                excerpt: 'Endüstriyel yapılardan prefabrik yapılara kadar geniş bir kullanım alanına sahip olan trapez saclar hakkında bilmeniz gereken her şey.',
                content: `
                    <p>Trapez sac, endüstriyel yapılardan prefabrik yapılara kadar geniş bir kullanım alanına sahiptir. Çatı ve cephe kaplamalarında hızlı ve ekonomik bir çözüm arıyorsanız, dayanıklı trapez sac ürünlerimiz tam size göre.</p>
                    <h3>Trapez Sacın Avantajları</h3>
                    <ul>
                        <li>Yüksek taşıma kapasitesine sahiptir.</li>
                        <li>Montajı hızlı ve pratiktir.</li>
                        <li>Farklı renk ve form seçenekleri sunar.</li>
                        <li>Uzun ömürlü ve korozyona karşı dayanıklıdır.</li>
                    </ul>
                    <p>Sandviç Panelci olarak en kaliteli trapez sac ürünlerini en uygun fiyatlarla sizlere sunuyoruz.</p>
                `,
                date: new Date().toISOString(),
                imageUrl: '/images/products/sandvic-panel.jpg'
            },
            {
                id: '2',
                slug: 'sandvic-panel-avantajlari',
                title: 'Sandviç Panel Kullanımının Avantajları',
                excerpt: 'Isı ve ses yalıtımında üstün performans sağlayan sandviç panellerin projenize katacağı değerleri inceleyelim.',
                content: `
                    <p>Sandviç paneller, iki metal katman arasına yerleştirilen yalıtım malzemesi (Poliüretan, Taşyünü vb.) sayesinde binalarda mükemmel ısı ve ses yalıtımı sağlar. Montaj kolaylığı ve uzun ömürlü olması en büyük avantajlarındandır.</p>
                    <h3>Neden Sandviç Panel Tercih Etmelisiniz?</h3>
                    <p>Enerji tasarrufu günümüzde binalar için en kritik konulardan biridir. Sandviç paneller, düşük ısı iletim katsayıları ile ısıtma ve soğutma maliyetlerinizi %50'ye varan oranlarda düşürebilir.</p>
                    <p>Ayrıca yangın dayanımı yüksek taşyünü dolgulu panellerimiz ile binalarınızın güvenliğini en üst seviyeye taşıyabilirsiniz.</p>
                `,
                date: new Date(Date.now() - 86400000).toISOString(),
                imageUrl: '/images/products/sandvic-panel.jpg'
            },
            {
                id: '3',
                slug: 'isi-yalitiminda-dikkat-edilmesi-gerekenler',
                title: 'Çatı ve Isı Yalıtımında Püf Noktalar',
                excerpt: 'Enerji tasarrufu sağlamak ve bina ömrünü uzatmak için doğru yalıtım malzemesi seçimi nasıl yapılmalı?',
                content: `
                    <p>Yalıtım, binanın kalbidir. Doğru yalıtım malzemesi kullanımı kışın ısınma, yazın soğutma giderlerini ciddi oranda düşürür. Taşyünü veya XPS gibi farklı materyallerin doğru yüzeylere uygulanması kritik bir öneme sahiptir.</p>
                    <p>Isı yalıtımı yaparken dikkat edilmesi gerekenler:</p>
                    <ol>
                        <li>İklim koşullarına uygun yalıtım kalınlığı seçilmeli.</li>
                        <li>Uygulama yapılacak yüzey temiz ve kuru olmalı.</li>
                        <li>Isı köprüleri (kaideler, birleşim yerleri) mutlaka izole edilmeli.</li>
                    </ol>
                    <p>Sandviç Panelci uzman ekibiyle projeniz için en doğru yalıtım analizini yapmaya hazırdır.</p>
                `,
                date: new Date(Date.now() - 172800000).toISOString(),
                imageUrl: '/images/products/tas-yunu.jpg'
            }
        ];
    }
    
    return data.map((p: any) => ({
        id: p.id.toString(),
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || '',
        content: p.content,
        date: p.created_at,
        imageUrl: p.featured_image
    }));
}

export async function getBlogPost(slugOrId: string): Promise<BlogPost | undefined> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slugOrId).single();
    
    if (error || !data) {
        // Fallback to mock data
        const blogs = await getBlogPosts();
        return blogs.find(b => b.slug === slugOrId || b.id === slugOrId);
    }
    
    return {
        id: data.id.toString(),
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || '',
        content: data.content,
        date: data.created_at,
        imageUrl: data.featured_image
    };
}

export async function saveBlogPost(post: BlogPost) {
    const supabase = await createClient();
    if (post.id && post.id.trim() !== '') {
        await supabase.from('blog_posts').update({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
            featured_image: post.imageUrl
        }).eq('id', post.id);
    } else {
        await supabase.from('blog_posts').insert([{
            title: post.title,
            slug: post.title.toLowerCase().replace(/ /g, '-'),
            content: post.content,
            excerpt: post.excerpt,
            featured_image: post.imageUrl
        }]);
    }
}

export async function deleteBlogPost(id: string) {
    const supabase = await createClient();
    await supabase.from('blog_posts').delete().eq('id', id);
}

// --- REFERENCES ---
export async function getReferences(): Promise<Reference[]> {
    // Mocking references if table doesn't exist
    // Fallback references if no data in DB
    return [
        { id: 'r1', title: 'IZOCAM', imageUrl: 'https://www.izocam.com.tr/Assets/images/logo.png' },
        { id: 'r2', title: 'Ekobord', imageUrl: 'https://www.ekobord.com.tr/Assets/img/logo.png' },
        { id: 'r3', title: 'KNAUF', imageUrl: 'https://www.knauf.com.tr/static/img/knauf-logo.svg' },
        { id: 'r4', title: 'Onduline', imageUrl: 'https://tr.onduline.com/sites/tr.onduline.com/files/logo_0.png' },
        { id: 'r5', title: 'Teknopanel', imageUrl: 'https://www.teknopanel.com.tr/assets/img/logo.png' }
    ];
}

export async function saveReference(ref: Reference) { }

export async function deleteReference(id: string) { }
