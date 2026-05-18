import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { CATEGORY_MAP, buildHref } from '@/lib/categoryMap';
import CategoryShowcaseCard from './CategoryShowcaseCard';

// ─── Types ───────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string[] }>;
}

// ─── SEO ─────────────────────────────────────────────────────
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const lastSlug = slug[slug.length - 1];
  const cat = CATEGORY_MAP[lastSlug];
  if (!cat) return { title: 'Ürünler | Sandviç Panelci Yapı Market' };
  return {
    title: `${cat.name} | Sandviç Panelci Yapı Market`,
    description: cat.description,
  };
}

// ─── PAGE ────────────────────────────────────────────────────
export default async function UrunlerPage(props: PageProps) {
  const { slug } = await props.params;
  const lastSlug = slug[slug.length - 1];
  const cat = CATEGORY_MAP[lastSlug];

  if (!cat) notFound();

  // Breadcrumb oluştur
  const breadcrumbs = slug.map((s, i) => ({
    name: CATEGORY_MAP[s]?.name ?? s,
    href: buildHref(slug.slice(0, i + 1)),
  }));

  const hasChildren = cat.children.length > 0;

  // Grid sütun sayısı
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

        {/* ── Yaprak düğüm: alt kategori yok ── */}
        {!hasChildren && (
          <div style={{
            background: '#fff', borderRadius: 12, padding: '40px',
            textAlign: 'center', border: '1px solid #eee',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
            <h2 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 900, color: '#111' }}>
              {cat.name}
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 15, color: '#777', lineHeight: 1.7, maxWidth: 500, marginInline: 'auto' }}>
              {cat.description} Bu ürün grubu için fiyat teklifi ve detaylı bilgi almak için bizimle iletişime geçin.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+905319308500" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#d32f2f', color: '#fff', textDecoration: 'none', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                <Phone size={15} /> 0531 930 85 00
              </a>
              <a href="https://wa.me/905319308500" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', textDecoration: 'none', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* ── İletişim Şeridi ── */}
        <div style={{
          marginTop: 48, padding: '22px 30px', background: '#1c1c1c',
          borderRadius: 12, display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#fff' }}>Sorunuz mu var?</p>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#aaa' }}>Uzman ekibimiz size yardımcı olmaktan memnuniyet duyar.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="tel:+905319308500" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#d32f2f', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 800 }}>
              <Phone size={14} /> 0531 930 85 00
            </a>
            <a href="https://wa.me/905319308500" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25d366', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 800 }}>
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 540px) { .cat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
