// Statik kategori haritası — DB bağımsız
export interface CatNode {
  slug: string;
  name: string;
  description: string;
  image: string;
  children: CatNode[];
}

export const CATEGORY_MAP: Record<string, CatNode> = {
  'sandvic-panel-kaplama-malzemeleri': {
    slug: 'sandvic-panel-kaplama-malzemeleri',
    name: 'Sandviç Panel Kaplama Malzemeleri',
    description: 'Endüstriyel yapılar için yüksek performanslı sandviç panel çözümleri.',
    image: '/images/products/sandvic-panel.jpg',
    children: [
      { slug: 'cati-panelleri', name: 'Çatı Panelleri', description: 'Her türlü çatı için yalıtımlı panel sistemleri.', image: '/images/products/3hadvepir.png', children: [] },
      { slug: 'cephe-panelleri', name: 'Cephe Panelleri', description: 'Modern cephe kaplama ve yalıtım panelleri.', image: '/images/products/ekonomik-cephe-panel.jpg', children: [] },
    ],
  },
  'cati-panelleri': {
    slug: 'cati-panelleri',
    name: 'Çatı Panelleri',
    description: 'Yüksek yalıtım değeri ve uzun ömürlü çatı paneli çözümleri.',
    image: '/images/products/3hadvepir.png',
    children: [
      { slug: 'pur-pir-yalitimli-cati-panelleri', name: 'PUR/PIR Yalıtımlı Çatı Panelleri', description: 'En yüksek ısı yalıtım performansı.', image: '/images/products/3hadvepir.png', children: [] },
      { slug: 'mineral-yun-yalitimli-cati-panelleri', name: 'Mineral Yün Yalıtımlı Çatı Panelleri', description: 'A1 yangın sınıfı mineral yün dolgulu panel.', image: '/images/products/mineral-cati.png', children: [] },
      { slug: 'ekonomik-cati-panel', name: 'Ekonomik Çatı Panel', description: 'Bütçe dostu, kaliteli çatı paneli seçeneği.', image: '/images/products/ekonomik-cephe-panel.jpg', children: [] },
    ],
  },
  'cephe-panelleri': {
    slug: 'cephe-panelleri',
    name: 'Cephe Panelleri',
    description: 'Estetik ve yalıtımlı cephe kaplama sistemleri.',
    image: '/images/products/pur-cephe-paneli.jpg',
    children: [
      { slug: 'pur-pir-yalitimli-cephe-panelleri', name: 'PUR/PIR Yalıtımlı Cephe Panelleri', description: 'Yüksek performanslı PUR/PIR cephe paneli.', image: '/images/products/pur-cephe-paneli.jpg', children: [] },
      { slug: 'mineral-yun-yalitimli-cephe-panelleri', name: 'Mineral Yün Yalıtımlı Cephe Panelleri', description: 'Yangına dayanıklı mineral yün cephe paneli.', image: '/images/products/mineral-cephe.jpg', children: [] },
      { slug: 'ekonomik-cephe-panel', name: 'Ekonomik Cephe Panel', description: 'Uygun fiyatlı cephe kaplama çözümü.', image: '/images/products/ekonomik-cephe-panel.jpg', children: [] },
    ],
  },
  'trapez-saclar': {
    slug: 'trapez-saclar',
    name: 'Trapez Saclar',
    description: 'Her ölçüde çatı ve cephe trapez sac profilleri.',
    image: '/images/products/trapez-sac.jpg',
    children: [
      { slug: '27-200-1000', name: '27/200 Trapez Sac', description: 'Standart çatı trapeziği, 27mm yükseklik, 200mm aks aralığı.', image: '/images/products/27-200.webp', children: [] },
      { slug: '38-151-906', name: '38/151 Trapez Sac', description: 'Yüksek taşıma kapasiteli, 38mm yükseklik profil.', image: '/images/products/38-151-trapez.webp', children: [] },
      { slug: '55-300-900', name: '55/300 Döşeme Trapezi', description: 'Ağır yük taşıyıcı, 55mm yükseklik trapez sac.', image: '/images/products/55-300-trapez.webp', children: [] },
      { slug: 'rulo-bobin-sac', name: 'Rulo Bobin Sac', description: 'İstenilen ölçüde kesim imkânı sunan bobin sac.', image: '/images/products/rulo-bobin-sac.webp', children: [] },
    ],
  },
  'kenet-sistemleri': {
    slug: 'kenet-sistemleri',
    name: 'Kenet Sistemleri',
    description: 'Estetik ve sızdırmaz kenet çatı ve cephe kaplama çözümleri.',
    image: '/images/1-duz-kenet-fotograf-1-1536x864.webp',
    children: [
      { slug: 'duz-kenet-levha', name: 'Düz Kenet Levha', description: 'Düz yüzeyli çatı ve cephe uygulamalarında kullanılan kenet levha çözümüdür.', image: '/images/1-duz-kenet-fotograf-1-1536x864.webp', children: [] },
      { slug: 'kilit-gecme-sistem-panel', name: 'Kilit Geçme Sistem Panel', description: 'Kilit geçme bağlantı yapısıyla hızlı montaj sağlayan panel sistemidir.', image: '/images/30Kilit-gecme-sistem-1536x864.webp', children: [] },
      { slug: 'yuksek-kulak-kenet-levha', name: 'Yüksek Kulak Kenet Levha', description: 'Geniş açıklıklı çatı kaplamalarında kullanılan, yüksek kulak formuna sahip kenet levha sistemidir.', image: '/images/35-50-475-1536x864.webp', children: [] },
    ],
  },
  'osb-ve-plywood': {
    slug: 'osb-ve-plywood',
    name: 'OSB ve Plywood',
    description: 'Yapı sektörünün vazgeçilmez ahşap levha çözümleri.',
    image: '/images/products/osb-levha.jpg',
    children: [
      { slug: 'osb', name: 'OSB Levha', description: 'Yapısal ve çatı uygulamaları için OSB levha.', image: '/images/products/osb-levha.jpg', children: [] },
      { slug: 'plywood', name: 'Plywood / Kontrplak', description: 'Beton kalıp ve genel amaçlı film kaplı kontrplak.', image: '/images/products/plywood-film-kapli.jpg', children: [] },
    ],
  },
  'yalitim-malzemeleri': {
    slug: 'yalitim-malzemeleri',
    name: 'Yalıtım Malzemeleri',
    description: 'Isı ve su yalıtımı için kapsamlı çözümler.',
    image: '/images/products/tas-yunu.jpg',
    children: [
      { slug: 'isi-yalitimi', name: 'Isı Yalıtımı', description: 'Taşyünü, XPS, Camyünü, EPS levha sistemleri.', image: '/images/products/tas-yunu.jpg', children: [] },
      { slug: 'su-yalitimi', name: 'Su Yalıtımı', description: 'Membran, likit ve desenli su yalıtım sistemleri.', image: '/images/products/membran.jpg', children: [] },
    ],
  },
  'isi-yalitimi': {
    slug: 'isi-yalitimi',
    name: 'Isı Yalıtımı',
    description: 'Enerji tasarrufu için yüksek performanslı ısı yalıtım malzemeleri.',
    image: '/images/products/tas-yunu.jpg',
    children: [
      { slug: 'tasyunu', name: 'Taşyünü', description: 'A1 yangın sınıfı kaya yünü levha.', image: '/images/products/tas-yunu.jpg', children: [] },
      { slug: 'xps', name: 'XPS Foamboard', description: 'Yüksek basınç dayanımlı XPS levha.', image: '/images/products/xps.jpg', children: [] },
      { slug: 'camyunu', name: 'Camyünü', description: 'Ekonomik cam yünü rulo ve levha.', image: '/images/products/cam-yunu.jpg', children: [] },
      { slug: 'eps', name: 'EPS (Strafor)', description: 'Hafif ve ekonomik EPS ısı yalıtım levhası.', image: '/images/products/eps.jpg', children: [] },
    ],
  },
  'su-yalitimi': {
    slug: 'su-yalitimi',
    name: 'Su Yalıtımı',
    description: 'Çatı ve temel su yalıtımı için güvenilir membran sistemleri.',
    image: '/images/products/membran.jpg',
    children: [
      { slug: 'membran', name: 'Membran', description: 'APP ve SBS modifiyeli bitümlü membran.', image: '/images/products/membran.jpg', children: [] },
      { slug: 'likit-membran', name: 'Likit Membran', description: 'Fırçayla uygulanan sıvı su yalıtımı.', image: '/images/products/likit-membran.webp', children: [] },
      { slug: 'desenli-membran', name: 'Desenli Membran', description: 'Estetik görünümlü özel yüzeyli membran.', image: '/images/products/desenli-membran.jpg', children: [] },
    ],
  },
  'boyali-profiller-galvanizli-saclar': {
    slug: 'boyali-profiller-galvanizli-saclar',
    name: 'Boyalı Profiller ve Galvanizli Saclar',
    description: 'Uzun ömürlü boyalı ve galvanizli sac profil çözümleri.',
    image: '/images/products/boyali-profil.jpg',
    children: [
      { slug: 'boyali-profiller', name: 'Boyalı Profiller', description: 'PE ve PVDF boyalı Z, C, Sigma profiller.', image: '/images/products/boyali-profil.jpg', children: [] },
      { slug: 'galvanizli-saclar', name: 'Galvanizli Saclar', description: 'DX51D sıcak daldırma galvanizli sac.', image: '/images/products/galvaniz-rulo-sac.webp', children: [] },
    ],
  },
  'aksesuarlar-ve-ek-urunler': {
    slug: 'aksesuarlar-ve-ek-urunler',
    name: 'Aksesuarlar ve Ek Ürünler',
    description: 'Montaj ve tamamlama için gerekli tüm aksesuarlar.',
    image: '/images/products/vidalar.jpg',
    children: [
      { slug: 'vidalar', name: 'Vidalar', description: 'Sandviç panel ve trapez sac vidaları.', image: '/images/products/vidalar.jpg', children: [] },
      { slug: 'cati-cikis-kapaklari', name: 'Çatı Çıkış Kapakları', description: 'Güvenli çatı erişim kapak sistemleri.', image: '/images/products/cati-cikis-kapagi.jpg', children: [] },
    ],
  },
};

// Slug zincirinden kısa yol oluştur
export function buildHref(slugChain: string[]): string {
  return `/urunler/${slugChain.join('/')}`;
}
