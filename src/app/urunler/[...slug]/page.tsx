import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { CATEGORY_MAP, buildHref } from '@/lib/categoryMap';
import CategoryShowcaseCard from './CategoryShowcaseCard';
import { getProductDetail } from '@/lib/queries/products';
import QuoteRequestForm from '@/components/QuoteRequestForm';
import ProductDetailPanel from '@/components/ProductDetailPanel';

// ─── Types ───────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string[] }>;
}

// ─── SEO ─────────────────────────────────────────────────────
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const lastSlug = slug[slug.length - 1];
  
  // Önce Kategori mi diye kontrol et
  const cat = CATEGORY_MAP[lastSlug];
  if (cat) {
    return {
      title: `${cat.name} | Sandviç Panelci Yapı Market`,
      description: cat.description,
    };
  }

  // Kategori değilse ürün mü diye DB'den bak
  const product = await getProductDetail(lastSlug);
  if (product) {
    return {
      title: `${product.name} | Sandviç Panelci Yapı Market`,
      description: product.short_desc,
    };
  }

  return { title: 'Bulunamadı | Sandviç Panelci Yapı Market' };
}

// ─── PAGE ────────────────────────────────────────────────────
export default async function UrunlerPage(props: PageProps) {
  const { slug } = await props.params;
  const lastSlug = slug[slug.length - 1];
  
  // 1. Önce doğrudan (Top-level) kategori mi diye bak
  let cat = CATEGORY_MAP[lastSlug];
  let isLeafFallback = false;
  let product = null;

  if (!cat) {
    // 2. Kategori değilse, veritabanından ürün mü diye bak
    product = await getProductDetail(lastSlug);

    // 3. Veritabanında da yoksa (ürün henüz eklenmemişse), menüde tanımlı bir alt kırılım (yaprak) mı diye bak
    if (!product) {
      for (const key in CATEGORY_MAP) {
        const match = CATEGORY_MAP[key].children.find(c => c.slug === lastSlug);
        if (match) {
          cat = match;
          isLeafFallback = true;
          break;
        }
      }
    }
  }

  // ============================================================================
  // 1. KATEGORİ VİTRİN SAYFASI VEYA YAPRAK KATEGORİ (Ürün Eklenmemiş)
  // ============================================================================
  if (cat) {
    // Breadcrumb oluştur
    const breadcrumbs = slug.map((s, i) => ({
      name: CATEGORY_MAP[s]?.name ?? s,
      href: buildHref(slug.slice(0, i + 1)),
    }));

    const hasChildren = cat.children.length > 0;
    const cols = Math.min(cat.children.length, 3);

    return (
      <main style={{ background: '#f8f9fa', minHeight: '80vh' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 20px 72px' }}>
          
          {/* ── Breadcrumb ── */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
            <ol style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, margin: 0, padding: 0, fontSize: 12, color: '#888' }}>
              <li>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#888', textDecoration: 'none', fontWeight: 600 }}>
                  <Home size={13} /> Ana Sayfa
                </Link>
              </li>
              <li><ChevronRight size={11} color="#ccc" /></li>
              <li>
                <Link href="/urunler" style={{ color: '#888', textDecoration: 'none', fontWeight: 600 }}>Ürünler</Link>
              </li>
              {breadcrumbs.map((bc, i) => (
                <li key={bc.href} style={{ display: 'contents' }}>
                  <ChevronRight size={11} color="#ccc" />
                  {i === breadcrumbs.length - 1
                    ? <span style={{ color: '#d32f2f', fontWeight: 700 }}>{bc.name}</span>
                    : <Link href={bc.href} style={{ color: '#888', textDecoration: 'none', fontWeight: 600 }}>{bc.name}</Link>
                  }
                </li>
              ))}
            </ol>
          </nav>

          {/* ── Hero Başlık ── */}
          <div style={{
            background: 'linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 100%)',
            borderRadius: 16, padding: '40px 48px', marginBottom: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 24, flexWrap: 'wrap',
          }}>
            <div>
              <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 800, color: '#d32f2f', letterSpacing: 3, textTransform: 'uppercase' }}>
                SANDVİÇ PANELCİ YAPI MARKET
              </p>
              <h1 style={{ margin: '0 0 10px', fontSize: 32, fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
                {cat.name}
              </h1>
              <p style={{ margin: 0, fontSize: 15, color: '#aaa', lineHeight: 1.6, maxWidth: 520 }}>
                {cat.description}
              </p>
            </div>
            <a
              href="tel:+905319308500"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#d32f2f', color: '#fff', textDecoration: 'none',
                padding: '12px 22px', borderRadius: 8, fontSize: 14, fontWeight: 800,
                flexShrink: 0,
              }}
            >
              <Phone size={15} /> Fiyat Al: 0531 930 85 00
            </a>
          </div>

          {/* ── Alt Kategoriler / Ürün Kartları ── */}
          {hasChildren && (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: '#111', margin: '0 0 24px' }}>
                {cat.name} Ürün Grupları
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gap: 22,
                }}
                className="cat-grid"
              >
                {cat.children.map(child => (
                  <CategoryShowcaseCard
                    key={child.slug}
                    name={child.name}
                    description={child.description}
                    image={child.image}
                    href={`${buildHref(slug)}/${child.slug}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── Yaprak düğüm: DB'de ürün yok ama kategoride tanımlı ── */}
          {!hasChildren && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="prod-top-grid">
              {/* Görsel */}
              <div style={{
                borderRadius: 16, overflow: 'hidden', border: '1px solid #eee',
                background: '#f5f5f5', height: 420,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
                />
              </div>

              {/* Bilgiler */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
                <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: '#111', lineHeight: 1.2 }}>
                  {cat.name}
                </h1>
                <p style={{ margin: 0, fontSize: 16, color: '#555', lineHeight: 1.7 }}>
                  {cat.description} Fiyat teklifi ve detaylı bilgi almak için bizimle iletişime geçin.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a
                    href="tel:+905319308500"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#d32f2f', color: '#fff', textDecoration: 'none', padding: '13px 24px', borderRadius: 8, fontSize: 15, fontWeight: 800 }}
                  >
                    <Phone size={16} /> 0531 930 85 00
                  </a>
                  <a
                    href="https://wa.me/905319308500"
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', textDecoration: 'none', padding: '13px 24px', borderRadius: 8, fontSize: 15, fontWeight: 800 }}
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
        <style>{`
          @media (max-width: 900px) { .cat-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 540px) { .cat-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 768px) { .prod-top-grid { grid-template-columns: 1fr !important; gap: 24px !important; } }
        `}</style>
      </main>
    );
  }

  // ============================================================================
  // 2. ÜRÜN DETAY SAYFASI
  // ============================================================================
  
  if (!product) {
    notFound();
  }

  // Ürün breadcrumb'ı
  // slug dizisinin son elemanı ürün slug'ı, öncekiler kategori zinciri
  const catChain = slug.slice(0, -1);
  const breadcrumbs = catChain.map((s, i) => ({
    name: CATEGORY_MAP[s]?.name ?? s,
    href: buildHref(catChain.slice(0, i + 1)),
  }));

  return (
    <main style={{ background: '#f8f9fa', minHeight: '80vh', paddingBottom: 80 }}>

      {/* ── Breadcrumb ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, margin: 0, padding: 0, fontSize: 12, color: '#888' }}>
              <li>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#888', textDecoration: 'none', fontWeight: 600 }}>
                  <Home size={13} /> Ana Sayfa
                </Link>
              </li>
              <li><ChevronRight size={11} color="#ccc" /></li>
              <li>
                <Link href="/urunler" style={{ color: '#888', textDecoration: 'none', fontWeight: 600 }}>Ürünler</Link>
              </li>
              {breadcrumbs.map((bc) => (
                <li key={bc.href} style={{ display: 'contents' }}>
                  <ChevronRight size={11} color="#ccc" />
                  <Link href={bc.href} style={{ color: '#888', textDecoration: 'none', fontWeight: 600 }}>{bc.name}</Link>
                </li>
              ))}
              <li style={{ display: 'contents' }}>
                <ChevronRight size={11} color="#ccc" />
                <span style={{ color: '#d32f2f', fontWeight: 700 }}>{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ── İçerik: Ürün Paneli + Ürün Hakkında (sol) / Teklif Formu (sağ, tek kez) ── */}
      <div style={{ maxWidth: 1200, margin: '40px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40 }} className="prod-btm-grid">

          {/* Sol: Ürün Paneli (görsel, başlık, fiyat, varyant, teknik özellik) + Açıklama */}
          <div>
            <section style={{ marginBottom: 48 }}>
              <ProductDetailPanel product={product} />
            </section>

            {product.long_desc && (
              <section style={{ marginBottom: 48, background: '#fff', padding: 32, borderRadius: 12, border: '1px solid #eee' }}>
                <h2 style={{ margin: '0 0 20px', fontSize: 22, fontWeight: 900, color: '#111' }}>Ürün Hakkında</h2>
                <p style={{ margin: 0, fontSize: 15, color: '#444', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                  {product.long_desc}
                </p>
              </section>
            )}
          </div>

          {/* Sağ: Teklif Formu (Yapışkan, tek kez) */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: 32 }} id="teklif">
              <QuoteRequestForm product={product} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .prod-btm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
