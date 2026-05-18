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
    image: 'https://placehold.co/800x400/d32f2f/ffffff?text=Sandvi%C3%A7+Panel',
    children: [
      { slug: 'cati-panelleri', name: 'Çatı Panelleri', description: 'Her türlü çatı için yalıtımlı panel sistemleri.', image: 'https://placehold.co/400x300/c62828/ffffff?text=%C3%87at%C4%B1+Panelleri', children: [] },
      { slug: 'cephe-panelleri', name: 'Cephe Panelleri', description: 'Modern cephe kaplama ve yalıtım panelleri.', image: 'https://placehold.co/400x300/b71c1c/ffffff?text=Cephe+Panelleri', children: [] },
    ],
  },
  'cati-panelleri': {
    slug: 'cati-panelleri',
    name: 'Çatı Panelleri',
    description: 'Yüksek yalıtım değeri ve uzun ömürlü çatı paneli çözümleri.',
    image: 'https://placehold.co/800x400/c62828/ffffff?text=%C3%87at%C4%B1+Panelleri',
    children: [
      { slug: 'pur-pir-yalitimli-cati-panelleri', name: 'PUR/PIR Yalıtımlı Çatı Panelleri', description: 'En yüksek ısı yalıtım performansı.', image: 'https://placehold.co/400x300/d32f2f/ffffff?text=PUR%2FPIR+%C3%87at%C4%B1', children: [] },
      { slug: 'mineral-yun-yalitimli-cati-panelleri', name: 'Mineral Yün Yalıtımlı Çatı Panelleri', description: 'A1 yangın sınıfı mineral yün dolgulu panel.', image: 'https://placehold.co/400x300/c62828/ffffff?text=Mineral+Y%C3%BCn+%C3%87at%C4%B1', children: [] },
      { slug: 'ekonomik-cati-panel', name: 'Ekonomik Çatı Panel', description: 'Bütçe dostu, kaliteli çatı paneli seçeneği.', image: 'https://placehold.co/400x300/b71c1c/ffffff?text=Ekonomik+%C3%87at%C4%B1', children: [] },
    ],
  },
  'cephe-panelleri': {
    slug: 'cephe-panelleri',
    name: 'Cephe Panelleri',
    description: 'Estetik ve yalıtımlı cephe kaplama sistemleri.',
    image: 'https://placehold.co/800x400/b71c1c/ffffff?text=Cephe+Panelleri',
    children: [
      { slug: 'pur-pir-yalitimli-cephe-panelleri', name: 'PUR/PIR Yalıtımlı Cephe Panelleri', description: 'Yüksek performanslı PUR/PIR cephe paneli.', image: 'https://placehold.co/400x300/6a1b9a/ffffff?text=PUR%2FPIR+Cephe', children: [] },
      { slug: 'mineral-yun-yalitimli-cephe-panelleri', name: 'Mineral Yün Yalıtımlı Cephe Panelleri', description: 'Yangına dayanıklı mineral yün cephe paneli.', image: 'https://placehold.co/400x300/7b1fa2/ffffff?text=Mineral+Cephe', children: [] },
      { slug: 'ekonomik-cephe-panel', name: 'Ekonomik Cephe Panel', description: 'Uygun fiyatlı cephe kaplama çözümü.', image: 'https://placehold.co/400x300/4a148c/ffffff?text=Ekonomik+Cephe', children: [] },
    ],
  },
  'trapez-saclar': {
    slug: 'trapez-saclar',
    name: 'Trapez Saclar',
    description: 'Her ölçüde çatı ve cephe trapez sac profilleri.',
    image: 'https://placehold.co/800x400/37474f/ffffff?text=Trapez+Saclar',
    children: [
      { slug: 'kenet-levhalar', name: 'Kenet Levhalar', description: 'Esnek kenet sistemiyle hızlı montaj.', image: 'https://placehold.co/400x300/455a64/ffffff?text=Kenet+Levha', children: [] },
      { slug: 'rulo-bobin-sac', name: 'Rulo Bobin Sac', description: 'İstenilen ölçüde kesim imkânı.', image: 'https://placehold.co/400x300/546e7a/ffffff?text=Rulo+Bobin', children: [] },
      { slug: '27-200-1000', name: '27/200 – 1000', description: 'Standart çatı trapeziği.', image: 'https://placehold.co/400x300/607d8b/ffffff?text=27%2F200', children: [] },
      { slug: '38-151-906', name: '38/151 – 906', description: 'Yüksek taşıma kapasiteli profil.', image: 'https://placehold.co/400x300/78909c/ffffff?text=38%2F151', children: [] },
      { slug: '55-300-900', name: '55/300 – 900', description: 'Ağır yük taşıyıcı trapez sac.', image: 'https://placehold.co/400x300/90a4ae/ffffff?text=55%2F300', children: [] },
    ],
  },
  'osb-ve-plywood': {
    slug: 'osb-ve-plywood',
    name: 'OSB ve Plywood',
    description: 'Yapı sektörünün vazgeçilmez ahşap levha çözümleri.',
    image: 'https://placehold.co/800x400/5d4037/ffffff?text=OSB+ve+Plywood',
    children: [
      { slug: 'osb', name: 'OSB Levha', description: 'Yapısal ve çatı uygulamaları için OSB levha.', image: 'https://placehold.co/400x300/6d4c41/ffffff?text=OSB+Levha', children: [] },
      { slug: 'plywood', name: 'Plywood / Kontrplak', description: 'Beton kalıp ve genel amaçlı kontrplak.', image: 'https://placehold.co/400x300/795548/ffffff?text=Plywood', children: [] },
    ],
  },
  'yalitim-malzemeleri': {
    slug: 'yalitim-malzemeleri',
    name: 'Yalıtım Malzemeleri',
    description: 'Isı ve su yalıtımı için kapsamlı çözümler.',
    image: 'https://placehold.co/800x400/1565c0/ffffff?text=Yal%C4%B1t%C4%B1m+Malzemeleri',
    children: [
      { slug: 'isi-yalitimi', name: 'Isı Yalıtımı', description: 'Taşyünü, XPS, Camyünü, EPS levha sistemleri.', image: 'https://placehold.co/400x300/e65100/ffffff?text=Is%C4%B1+Yal%C4%B1t%C4%B1m%C4%B1', children: [] },
      { slug: 'su-yalitimi', name: 'Su Yalıtımı', description: 'Membran, likit ve desenli su yalıtım sistemleri.', image: 'https://placehold.co/400x300/1565c0/ffffff?text=Su+Yal%C4%B1t%C4%B1m%C4%B1', children: [] },
    ],
  },
  'isi-yalitimi': {
    slug: 'isi-yalitimi',
    name: 'Isı Yalıtımı',
    description: 'Enerji tasarrufu için yüksek performanslı ısı yalıtım malzemeleri.',
    image: 'https://placehold.co/800x400/e65100/ffffff?text=Is%C4%B1+Yal%C4%B1t%C4%B1m%C4%B1',
    children: [
      { slug: 'tasyunu', name: 'Taşyünü', description: 'A1 yangın sınıfı kaya yünü levha.', image: 'https://placehold.co/400x300/bf360c/ffffff?text=Ta%C5%9By%C3%BCn%C3%BC', children: [] },
      { slug: 'xps', name: 'XPS Foamboard', description: 'Yüksek basınç dayanımlı XPS levha.', image: 'https://placehold.co/400x300/1565c0/ffffff?text=XPS', children: [] },
      { slug: 'camyunu', name: 'Camyünü', description: 'Ekonomik cam yünü rulo ve levha.', image: 'https://placehold.co/400x300/f57f17/ffffff?text=Camy%C3%BCn%C3%BC', children: [] },
      { slug: 'eps', name: 'EPS (Strafor)', description: 'Hafif ve ekonomik EPS ısı yalıtım levhası.', image: 'https://placehold.co/400x300/757575/ffffff?text=EPS', children: [] },
    ],
  },
  'su-yalitimi': {
    slug: 'su-yalitimi',
    name: 'Su Yalıtımı',
    description: 'Çatı ve temel su yalıtımı için güvenilir membran sistemleri.',
    image: 'https://placehold.co/800x400/01579b/ffffff?text=Su+Yal%C4%B1t%C4%B1m%C4%B1',
    children: [
      { slug: 'membran', name: 'Membran', description: 'APP ve SBS modifiyeli bitümlü membran.', image: 'https://placehold.co/400x300/0d47a1/ffffff?text=Membran', children: [] },
      { slug: 'likit-membran', name: 'Likit Membran', description: 'Fırçayla uygulanan sıvı su yalıtımı.', image: 'https://placehold.co/400x300/1a237e/ffffff?text=Likit+Membran', children: [] },
      { slug: 'desenli-membran', name: 'Desenli Membran', description: 'Estetik görünümlü özel yüzeyli membran.', image: 'https://placehold.co/400x300/283593/ffffff?text=Desenli+Membran', children: [] },
    ],
  },
  'boyali-profiller-galvanizli-saclar': {
    slug: 'boyali-profiller-galvanizli-saclar',
    name: 'Boyalı Profiller ve Galvanizli Saclar',
    description: 'Uzun ömürlü boyalı ve galvanizli sac profil çözümleri.',
    image: 'https://placehold.co/800x400/2e7d32/ffffff?text=Profil+%26+Sac',
    children: [
      { slug: 'boyali-profiller', name: 'Boyalı Profiller', description: 'PE ve PVDF boyalı Z, C, Sigma profiller.', image: 'https://placehold.co/400x300/1b5e20/ffffff?text=Boyali+Profil', children: [] },
      { slug: 'galvanizli-saclar', name: 'Galvanizli Saclar', description: 'DX51D sıcak daldırma galvanizli sac.', image: 'https://placehold.co/400x300/37474f/ffffff?text=Galvanizli+Sac', children: [] },
    ],
  },
  'aksesuarlar-ve-ek-urunler': {
    slug: 'aksesuarlar-ve-ek-urunler',
    name: 'Aksesuarlar ve Ek Ürünler',
    description: 'Montaj ve tamamlama için gerekli tüm aksesuarlar.',
    image: 'https://placehold.co/800x400/4e342e/ffffff?text=Aksesuarlar',
    children: [
      { slug: 'vidalar', name: 'Vidalar', description: 'Sandviç panel ve trapez sac vidaları.', image: 'https://placehold.co/400x300/3e2723/ffffff?text=Vidalar', children: [] },
      { slug: 'cati-cikis-kapaklari', name: 'Çatı Çıkış Kapakları', description: 'Güvenli çatı erişim kapak sistemleri.', image: 'https://placehold.co/400x300/4e342e/ffffff?text=%C3%87at%C4%B1+Kapa%C4%9F%C4%B1', children: [] },
    ],
  },
};

// Slug zincirinden kısa yol oluştur
export function buildHref(slugChain: string[]): string {
  return `/urunler/${slugChain.join('/')}`;
}
