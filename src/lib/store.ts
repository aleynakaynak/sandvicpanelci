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
        return fallbackProducts;
    }

    return data.map((p: any) => ({
        id: p.id.toString(),
        title: p.title,
        slug: p.slug,
        price: p.price || 'Fiyat Sorunuz', 
        categorySlug: p.category_slug || '',
        description: p.short_description || '',
        imageUrl: p.image_url || '',
        active: p.is_active,
    }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();

    if (error || !data) {
        return fallbackProducts.find(p => p.slug === slug) || null;
    }

    return {
        id: data.id.toString(),
        title: data.title,
        slug: data.slug,
        price: data.price || 'Fiyat Sorunuz',
        categorySlug: data.category_slug || '',
        description: data.short_description || '',
        longDescription: data.description || '',
        imageUrl: data.image_url || '',
        active: data.is_active,
    };
}

export async function saveProduct(product: Product) {
    // Implementation for saving product
    const supabase = await createClient();
    if (product.id && product.id.trim() !== '') {
        await supabase.from('products').update({
            title: product.title,
            slug: product.slug,
            price: product.price,
            category_slug: product.categorySlug,
            short_description: product.description,
            description: product.longDescription,
            image_url: product.imageUrl,
            is_active: product.active
        }).eq('id', product.id);
    } else {
        await supabase.from('products').insert([{
            title: product.title,
            slug: product.slug,
            price: product.price,
            category_slug: product.categorySlug,
            short_description: product.description,
            description: product.longDescription,
            image_url: product.imageUrl,
            is_active: product.active
        }]);
    }
}

export async function deleteProduct(id: string) {
    const supabase = await createClient();
    await supabase.from('products').delete().eq('id', id);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*').eq('slug', slug).single();

    if (error || !data) {
        const cats = await getCategories();
        return cats.find(c => c.slug === slug) || null;
    }

    return {
        id: data.id.toString(),
        slug: data.slug,
        title: data.name,
        parentId: data.parent_id?.toString(),
        imageUrl: data.image_url || '',
        order: data.display_order
    };
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
    const supabase = await createClient();
    
    // First, try to fetch products directly assigned to this category
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_slug', categorySlug)
        .eq('is_active', true);

    if (error || !data || data.length === 0) {
        // Fallback: Check fallbackProducts
        const filtered = fallbackProducts.filter(p => p.categorySlug === categorySlug);
        if (filtered.length > 0) return filtered;

        // If no products found, try to find products in subcategories if this is a parent category
        return [];
    }

    return data.map((p: any) => ({
        id: p.id.toString(),
        title: p.title,
        slug: p.slug,
        price: p.price || 'Fiyat Sorunuz',
        categorySlug: p.category_slug || '',
        description: p.short_description || '',
        imageUrl: p.image_url || '',
        active: p.is_active,
    }));
}

const fallbackProducts: Product[] = [
    {
        id: 'p1',
        title: 'PUR Yalıtımlı Çatı Paneli',
        slug: 'pur-yalitimli-cati-paneli',
        price: 'Fiyat Sorunuz',
        categorySlug: 'cati-panelleri',
        description: '3 Hadveli PUR yalıtımlı endüstriyel çatı paneli.',
        imageUrl: '/images/products/sandvic-panel.jpg',
        active: true
    },
    {
        id: 'p2',
        title: 'Mineral Yünlü Cephe Paneli',
        slug: 'mineral-yunlu-cephe-paneli',
        price: 'Fiyat Sorunuz',
        categorySlug: 'cephe-panelleri',
        description: 'Yangın dayanımlı mineral yün dolgulu cephe paneli.',
        imageUrl: '/images/products/sandvic-panel.jpg',
        active: true
    },
    {
        id: 'p3',
        title: '27/200 Trapez Sac',
        slug: '27-200-trapez-sac',
        price: 'Fiyat Sorunuz',
        categorySlug: 'trapez-saclar',
        description: '0.50mm kalınlığında boyalı galvaniz trapez sac.',
        imageUrl: '/images/products/trapez-sac.jpg',
        active: true
    }
];

export async function getCategories(): Promise<Category[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*').order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
        return [
            { id: '1', title: 'Çatı Panelleri', slug: 'cati-panelleri', order: 1 },
            { id: '2', title: 'Cephe Panelleri', slug: 'cephe-panelleri', order: 2 },
            { id: '3', title: 'Trapez Saclar', slug: 'trapez-saclar', order: 3 },
            { id: '4', title: 'Yalıtım Malzemeleri', slug: 'yalitim-malzemeleri', order: 4 },
            { id: '5', title: 'OSB ve Plywood', slug: 'osb-plywood', order: 5 },
            { id: '6', title: 'Boyalı Profiller ve Galvanizli Saclar', slug: 'profil-sac', order: 6 },
            { id: '7', title: 'Aksesuarlar ve Ek Ürünler', slug: 'aksesuar', order: 7 }
        ];
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
    try {
        const supabase = await createClient();
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false })
            .abortSignal(controller.signal);
        clearTimeout(timeout);

        if (error || !data || data.length === 0) {
            return fallbackBlogPosts();
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
    } catch {
        // Supabase unreachable or timed out — return static fallback
    }
    return fallbackBlogPosts();
}

function fallbackBlogPosts(): BlogPost[] {
    return [
        {
            id: '1',
            slug: 'trapez-sac-ve-kullanim-alanlari',
            title: 'Trapez Sac Nedir ve Nerelerde Kullanılır?',
            excerpt: 'Endüstriyel yapılardan prefabrik yapılara kadar geniş bir kullanım alanına sahip olan trapez saclar hakkında bilmeniz gereken her şey.',
            content: `<p><strong>Trapez sac</strong>, inşaat sektöründe hem çatı hem de cephe kaplamalarında en çok tercih edilen, mukavemeti yüksek ve ekonomik yapı malzemelerinden biridir. Genellikle galvanizli sac veya boyalı galvaniz sac bobinlerin soğuk haddelenerek (roll-forming) şekillendirilmesiyle üretilir.</p>
<h3>Trapez Sacın Avantajları Nelerdir?</h3>
<ul>
  <li><strong>Hafiflik:</strong> Taşıyıcı sisteme ek yük bindirmez, nakliyesi ve montajı son derece kolaydır.</li>
  <li><strong>Korozyon Dayanımı:</strong> Galvaniz kaplama ve polyester boya katmanları sayesinde paslanmaya karşı yüksek direnç gösterir.</li>
  <li><strong>Uzun Ömürlüdür:</strong> Atmosferik şartlara, rüzgara ve kar yüküne karşı yıllarca yapısını korur.</li>
  <li><strong>Sızdırmazlık:</strong> Doğru eğim ve montaj aksesuarlarıyla birlikte mükemmel su yalıtımı sağlar.</li>
</ul>
<h3>Kullanım Alanları</h3>
<p>Trapez saclar; sanayi yapılarından tarım hangarlarına, prefabrik binalardan şantiye çevre çitlerine kadar çok geniş bir alanda kullanılır. Özellikle endüstriyel çatılar, otopark gölgelikleri ve depo duvarlarında pratik bir kaplama çözümüdür.</p>
<h3>Önemli Teknik Detaylar (Formlar ve Kalınlıklar)</h3>
<p>Piyasada en yaygın kullanılan trapez sac formları <strong>27/200</strong>, <strong>38/151</strong> ve <strong>55/300</strong> olarak adlandırılır. Buradaki ilk rakam hatve yüksekliğini (mm), ikinci rakam ise hatveler arası mesafeyi ifade eder. Sac kalınlığı genellikle 0.30 mm ile 1.00 mm arasında değişir. Yüksek taşıma kapasitesi gereken açıklıklarda daha kalın sac ve daha yüksek hatveli (örn. 55/300) trapezler tercih edilmelidir.</p>`,
            date: new Date().toISOString(),
            imageUrl: '/images/products/trapez-sac.jpg'
        },
        {
            id: '2',
            slug: 'sandvic-panel-avantajlari',
            title: 'Sandviç Panel Kullanımının Avantajları',
            excerpt: 'Isı ve ses yalıtımında üstün performans sağlayan sandviç panellerin projenize katacağı değerleri inceleyelim.',
            content: `<p><strong>Sandviç panel</strong>, iki metal levha (genellikle boyalı galvaniz sac veya alüminyum) arasında yer alan yoğun yalıtım dolgusuyla üretilen kompozit bir yapı malzemesidir. Modern endüstriyel binaların, depoların ve soğuk hava depolarının vazgeçilmez kaplama elemanıdır.</p>
<h3>1. Üstün Isı Yalıtımı</h3>
<p>Sandviç panellerin en büyük avantajı, ısı köprüleri oluşturmadan kesintisiz yalıtım sunmasıdır. Dolgu malzemesi olarak kullanılan PUR/PIR veya EPS, binaların kışın sıcak, yazın soğuk kalmasını sağlayarak ısıtma ve soğutma giderlerini ciddi oranda düşürür.</p>
<h3>2. Yangın Güvenliği</h3>
<p>Özellikle <strong>Taşyünü (Mineral Yün)</strong> dolgulu sandviç paneller, A1 sınıfı yanmazlık özelliğine sahiptir. Yangının yayılmasını önleyerek binayı ve içerisindekileri korur, acil durumlarda tahliye süresi kazandırır.</p>
<h3>3. Hızlı ve Pratik Montaj</h3>
<p>Fabrika ortamında projenize özel ölçülerde üretilen paneller, şantiyede hazır olarak gelir. Birbirine geçmeli klik sistemleri (gizli vidalı veya standart) sayesinde çok kısa sürede geniş alanlar kaplanabilir. Bu da işçilik ve zamandan büyük tasarruf sağlar.</p>
<h3>4. Hafiflik ve Yüksek Taşıma Kapasitesi</h3>
<p>Sandviç yapısı gereği hem son derece hafif hem de bükülmeye karşı son derece dayanıklıdır. Ağır beton veya tuğla duvarlara kıyasla taşıyıcı çelik konstrüksiyon maliyetlerini minimize eder.</p>`,
            date: new Date(Date.now() - 86400000).toISOString(),
            imageUrl: '/images/products/sandvic-panel.jpg'
        },
        {
            id: '3',
            slug: 'isi-yalitiminda-dikkat-edilmesi-gerekenler',
            title: 'Çatı ve Isı Yalıtımında Püf Noktalar',
            excerpt: 'Enerji tasarrufu sağlamak ve bina ömrünü uzatmak için doğru yalıtım malzemesi seçimi nasıl yapılmalı?',
            content: `<p>Binalarda harcanan enerjinin yaklaşık %30'a yakını çatı ve duvar yalıtımı yetersizliğinden dolayı kaybolmaktadır. Doğru ısı yalıtımı, hem konforlu bir yaşam alanı sunar hem de enerji faturalarını kalıcı olarak düşürür. İşte çatı ve ısı yalıtımında dikkat etmeniz gereken püf noktalar:</p>
<h3>Doğru Malzeme Seçimi</h3>
<p>Yalıtım yapılacak alanın ihtiyacına göre malzeme seçimi kritik önem taşır:</p>
<ul>
  <li><strong>Taşyünü:</strong> Yangın dayanımı ve ses yalıtımı öncelikli olan çatılar ve bölme duvarlar için idealdir.</li>
  <li><strong>XPS:</strong> Suya ve neme karşı yüksek direnç gösteren, yüksek basınç dayanımı olan zemin ve teras çatılarda tercih edilir.</li>
  <li><strong>Camyünü:</strong> Asma tavanlar, şilte biçiminde çatı şiltesi uygulamaları için ekonomik ve etkilidir.</li>
</ul>
<h3>Isı Köprülerine Dikkat Edin</h3>
<p>Yalıtım levhalarının birleşim yerlerinde boşluk kalması veya montaj vidalarının yalıtımı kesintiye uğratması "ısı köprüleri" oluşturur. Isı köprüleri, yoğuşmaya ve dolayısıyla küf/nem oluşumuna zemin hazırlar. Levhaların birbirine tam yanaşacak şekilde, boşluksuz döşenmesi gerekir.</p>
<h3>Buhar Dengeleyici ve Su Yalıtımı Uyumu</h3>
<p>Çatı yalıtımında sadece ısıyı değil, nemi ve suyu da kontrol etmelisiniz. Yalıtım malzemesinin altına buhar kesici örtü, üzerine ise nefes alan su yalıtım membranı serilmelidir. Bu sayede bina içindeki nem dışarı atılırken dışarıdan su girmesi engellenir ve yalıtım malzemesinin ömrü uzar.</p>`,
            date: new Date(Date.now() - 172800000).toISOString(),
            imageUrl: '/images/products/tas-yunu.jpg'
        }
    ];
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

// --- HELPERS ---
export function getCategoryTree(categories: Category[]) {
    const map: { [key: string]: any } = {};
    const tree: any[] = [];

    categories.forEach(cat => {
        map[cat.id] = { ...cat, children: [] };
    });

    categories.forEach(cat => {
        if (cat.parentId && map[cat.parentId]) {
            map[cat.parentId].children.push(map[cat.id]);
        } else {
            tree.push(map[cat.id]);
        }
    });

    return tree;
}
