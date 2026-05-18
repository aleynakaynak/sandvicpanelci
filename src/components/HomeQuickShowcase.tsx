'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, ChevronRight, ArrowRight } from 'lucide-react';

// ─── Tipler ──────────────────────────────────────────────────
interface ProductItem {
  name:  string;
  href:  string;
  image: string;    // Renk kodlu placeholder
  bg:    string;
}

interface LeftGroup {
  id:    string;
  label: string;
  href:  string;
  color: string;   // aktif renk
}

// ─── Veriler ─────────────────────────────────────────────────
const LEFT_GROUPS: LeftGroup[] = [
  { id: 'cati',       label: 'Çatı Kaplama Malzemeleri',    href: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri',  color: '#d32f2f' },
  { id: 'aksesuar',   label: 'Aksesuarlar & Ek Ürünler',   href: '/urunler/aksesuarlar-ve-ek-urunler',                         color: '#37474f' },
  { id: 'isi',        label: 'Isı Yalıtımı',                href: '/urunler/yalitim-malzemeleri/isi-yalitimi',                  color: '#e65100' },
  { id: 'su',         label: 'Su Yalıtımı',                 href: '/urunler/yalitim-malzemeleri/su-yalitimi',                   color: '#1565c0' },
  { id: 'cephe',      label: 'Duvar & Cephe Kaplama',       href: '/urunler/sandvic-panel-kaplama-malzemeleri/cephe-panelleri', color: '#6a1b9a' },
  { id: 'ahsap',      label: 'Ahşap Ürünler',               href: '/urunler/osb-ve-plywood',                                    color: '#5d4037' },
  { id: 'profil',     label: 'Profil & Galvaniz Sac',       href: '/urunler/boyali-profiller-galvanizli-saclar',                color: '#2e7d32' },
  { id: 'polikarbon', label: 'Polikarbon Levha Fiyatları',  href: '/urunler/trapez-saclar',                                     color: '#00838f' },
];

// Sağ vitrin kartları — 12 ürün (3×4 grid)
const PRODUCTS: Record<string, ProductItem[]> = {
  cati: [
    { name: 'Sandviç Panel',        href: '/urunler/sandvic-panel-kaplama-malzemeleri',                       image: 'https://placehold.co/280x200/d32f2f/ffffff?text=Sandvi%C3%A7+Panel',  bg: '#fff3f3' },
    { name: 'PUR/PIR Çatı Paneli',  href: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri/pur-pir-yalitimli-cati-panelleri', image: 'https://placehold.co/280x200/c62828/ffffff?text=PUR%2FPIR',           bg: '#fce4ec' },
    { name: 'Mineral Yün Çatı',     href: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri/mineral-yun-yalitimli-cati-panelleri', image: 'https://placehold.co/280x200/b71c1c/ffffff?text=Mineral+Y%C3%BCn',    bg: '#fff3f3' },
    { name: 'Ekonomik Çatı Panel',  href: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri/ekonomik-cati-panel', image: 'https://placehold.co/280x200/e53935/ffffff?text=Ekonomik+%C3%87at%C4%B1',      bg: '#fce4ec' },
  ],
  aksesuar: [
    { name: 'Vidalar',              href: '/urunler/aksesuarlar-ve-ek-urunler/vidalar',              image: 'https://placehold.co/280x200/37474f/ffffff?text=Vidalar',        bg: '#eceff1' },
    { name: 'Çatı Çıkış Kapağı',   href: '/urunler/aksesuarlar-ve-ek-urunler/cati-cikis-kapaklari', image: 'https://placehold.co/280x200/455a64/ffffff?text=%C3%87at%C4%B1+Kapa%C4%9F%C4%B1', bg: '#eceff1' },
    { name: 'Kenet Levha',          href: '/urunler/trapez-saclar/kenet-levhalar',                   image: 'https://placehold.co/280x200/546e7a/ffffff?text=Kenet+Levha',    bg: '#eceff1' },
    { name: 'Rulo Bobin Sac',       href: '/urunler/trapez-saclar/rulo-bobin-sac',                   image: 'https://placehold.co/280x200/607d8b/ffffff?text=Rulo+Bobin',     bg: '#eceff1' },
  ],
  isi: [
    { name: 'Taşyünü',              href: '/urunler/yalitim-malzemeleri/isi-yalitimi/tasyunu',       image: 'https://placehold.co/280x200/e65100/ffffff?text=Ta%C5%9By%C3%BCn%C3%BC', bg: '#fff3e0' },
    { name: 'XPS Foamboard',        href: '/urunler/yalitim-malzemeleri/isi-yalitimi/xps',           image: 'https://placehold.co/280x200/1565c0/ffffff?text=XPS',            bg: '#e3f2fd' },
    { name: 'Camyünü',              href: '/urunler/yalitim-malzemeleri/isi-yalitimi/camyunu',       image: 'https://placehold.co/280x200/f57f17/ffffff?text=Camy%C3%BCn%C3%BC', bg: '#fffde7' },
    { name: 'EPS Strafor',          href: '/urunler/yalitim-malzemeleri/isi-yalitimi/eps',           image: 'https://placehold.co/280x200/757575/ffffff?text=EPS+Strafor',   bg: '#fafafa' },
  ],
  su: [
    { name: 'Membran',              href: '/urunler/yalitim-malzemeleri/su-yalitimi/membran',        image: 'https://placehold.co/280x200/1565c0/ffffff?text=Membran',        bg: '#e3f2fd' },
    { name: 'Likit Membran',        href: '/urunler/yalitim-malzemeleri/su-yalitimi/likit-membran',  image: 'https://placehold.co/280x200/0277bd/ffffff?text=Likit+Membran', bg: '#e1f5fe' },
    { name: 'Desenli Membran',      href: '/urunler/yalitim-malzemeleri/su-yalitimi/desenli-membran',image: 'https://placehold.co/280x200/01579b/ffffff?text=Desenli+Membran',bg: '#e1f5fe' },
    { name: 'Bitümlü Membran',      href: '/urunler/yalitim-malzemeleri/su-yalitimi',                image: 'https://placehold.co/280x200/212121/ffffff?text=Bit%C3%BCml%C3%BC',    bg: '#f5f5f5' },
  ],
  cephe: [
    { name: 'PUR/PIR Cephe Paneli', href: '/urunler/sandvic-panel-kaplama-malzemeleri/cephe-panelleri/pur-pir-yalitimli-cephe-panelleri', image: 'https://placehold.co/280x200/6a1b9a/ffffff?text=Cephe+Panel',   bg: '#f3e5f5' },
    { name: 'Mineral Yün Cephe',    href: '/urunler/sandvic-panel-kaplama-malzemeleri/cephe-panelleri/mineral-yun-yalitimli-cephe-panelleri', image: 'https://placehold.co/280x200/7b1fa2/ffffff?text=Mineral+Cephe', bg: '#f3e5f5' },
    { name: 'Boyalı Profil',        href: '/urunler/boyali-profiller-galvanizli-saclar/boyali-profiller', image: 'https://placehold.co/280x200/2e7d32/ffffff?text=Boyali+Profil', bg: '#e8f5e9' },
    { name: 'Galvanizli Sac',       href: '/urunler/boyali-profiller-galvanizli-saclar/galvanizli-saclar', image: 'https://placehold.co/280x200/37474f/ffffff?text=Galvanizli+Sac',bg: '#eceff1' },
  ],
  ahsap: [
    { name: 'OSB Levha',            href: '/urunler/osb-ve-plywood/osb',     image: 'https://placehold.co/280x200/5d4037/ffffff?text=OSB+Levha',   bg: '#efebe9' },
    { name: 'Plywood',              href: '/urunler/osb-ve-plywood/plywood', image: 'https://placehold.co/280x200/6d4c41/ffffff?text=Plywood',     bg: '#efebe9' },
    { name: 'Shingle',              href: '/urunler/osb-ve-plywood',         image: 'https://placehold.co/280x200/4e342e/ffffff?text=Shingle',     bg: '#efebe9' },
    { name: 'Boardex',              href: '/urunler/osb-ve-plywood',         image: 'https://placehold.co/280x200/795548/ffffff?text=Boardex',     bg: '#efebe9' },
  ],
  profil: [
    { name: 'Boyalı Profiller',     href: '/urunler/boyali-profiller-galvanizli-saclar/boyali-profiller',    image: 'https://placehold.co/280x200/2e7d32/ffffff?text=Boyali+Profil', bg: '#e8f5e9' },
    { name: 'Galvanizli Saclar',    href: '/urunler/boyali-profiller-galvanizli-saclar/galvanizli-saclar',   image: 'https://placehold.co/280x200/1b5e20/ffffff?text=Galvanizli',   bg: '#e8f5e9' },
    { name: 'Betopan',              href: '/urunler/osb-ve-plywood',         image: 'https://placehold.co/280x200/546e7a/ffffff?text=Betopan',     bg: '#eceff1' },
    { name: 'Trapez Sac',           href: '/urunler/trapez-saclar',          image: 'https://placehold.co/280x200/37474f/ffffff?text=Trapez+Sac',  bg: '#eceff1' },
  ],
  polikarbon: [
    { name: '27/200 – 1000',        href: '/urunler/trapez-saclar/27-200-1000',   image: 'https://placehold.co/280x200/00838f/ffffff?text=27%2F200',     bg: '#e0f7fa' },
    { name: '38/151 – 906',         href: '/urunler/trapez-saclar/38-151-906',    image: 'https://placehold.co/280x200/00695c/ffffff?text=38%2F151',     bg: '#e0f2f1' },
    { name: '55/300 – 900',         href: '/urunler/trapez-saclar/55-300-900',    image: 'https://placehold.co/280x200/006064/ffffff?text=55%2F300',     bg: '#e0f7fa' },
    { name: 'Kenet Levha',          href: '/urunler/trapez-saclar/kenet-levhalar',image: 'https://placehold.co/280x200/004d40/ffffff?text=Kenet',        bg: '#e0f2f1' },
  ],
};

// ─── ANA BİLEŞEN ─────────────────────────────────────────────
export default function HomeQuickShowcase() {
  const [active, setActive] = useState<string>(LEFT_GROUPS[0].id);
  const current  = LEFT_GROUPS.find(g => g.id === active)!;
  const products = PRODUCTS[active] ?? [];

  return (
    <section style={{ background: '#f8f9fa', padding: '52px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

        {/* Başlık */}
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', marginBottom: 32,
        }}>
          <div>
            <p style={{
              fontSize: 11, fontWeight: 800, color: '#d32f2f',
              letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 6px',
            }}>
              YAPIM MARKET VİTRİNİ
            </p>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#111', margin: 0, lineHeight: 1.2 }}>
              Popüler Ürün Grupları
            </h2>
          </div>
          <Link
            href="/urunler"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 13, fontWeight: 700, color: '#d32f2f', textDecoration: 'none',
            }}
          >
            Tüm Ürünleri Gör <ArrowRight size={14} />
          </Link>
        </div>

        {/* İkili Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '230px 1fr',
          border: '1px solid #e0e0e0',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 6px 32px rgba(0,0,0,0.07)',
          background: '#fff',
        }}
          className="hqs-panel"
        >
          {/* ── Sol: Dikey Menü ─────────────────────────── */}
          <nav style={{ background: '#1e1e1e', borderRight: '1px solid #2a2a2a' }}>
            {LEFT_GROUPS.map(group => {
              const isActive = group.id === active;
              return (
                <button
                  key={group.id}
                  onMouseEnter={() => setActive(group.id)}
                  onClick={() => setActive(group.id)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    width: '100%', padding: '14px 18px',
                    background: isActive ? '#2a2a2a' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? `3px solid ${group.color}` : '3px solid transparent',
                    cursor: 'pointer',
                    gap: 10, textAlign: 'left',
                    transition: 'all 0.14s',
                    borderBottom: '1px solid #262626',
                  }}
                >
                  <span style={{
                    fontSize: 12.5, fontWeight: 700, lineHeight: 1.35,
                    color: isActive ? '#fff' : '#999',
                    flex: 1,
                  }}>
                    {group.label}
                  </span>
                  {isActive
                    ? <ChevronRight size={14} color={group.color} style={{ flexShrink: 0 }} />
                    : <Plus size={14} color="#555" style={{ flexShrink: 0 }} />
                  }
                </button>
              );
            })}
          </nav>

          {/* ── Sağ: Ürün Kartları ──────────────────────── */}
          <div style={{ padding: '24px', background: '#fff' }}>

            {/* Mini başlık */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: 20,
            }}>
              <h3 style={{
                margin: 0, fontSize: 14, fontWeight: 900, color: '#111',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: current.color, display: 'inline-block',
                }} />
                {current.label}
              </h3>
              <Link
                href={current.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 12, fontWeight: 700, color: current.color,
                  textDecoration: 'none',
                }}
              >
                Tümünü Gör <ArrowRight size={12} />
              </Link>
            </div>

            {/* Kart Grid: 4 kolon */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 14,
              }}
              className="hqs-grid"
            >
              {products.map((p, i) => (
                <Link
                  key={i}
                  href={p.href}
                  className="hqs-card"
                  style={{
                    display: 'flex', flexDirection: 'column',
                    borderRadius: 10, overflow: 'hidden',
                    border: '1.5px solid #eee',
                    textDecoration: 'none',
                    background: '#fff',
                    transition: 'all 0.22s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Görsel */}
                  <div style={{
                    height: 130, overflow: 'hidden',
                    background: p.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* İsim */}
                  <div style={{
                    padding: '10px 10px 12px',
                    textAlign: 'center',
                    borderTop: '1px solid #f0f0f0',
                  }}>
                    <span style={{
                      fontSize: 12, fontWeight: 800, color: '#222',
                      lineHeight: 1.35, display: 'block',
                    }}>
                      {p.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hqs-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 12px 36px rgba(0,0,0,0.13) !important;
          border-color: #d32f2f !important;
        }
        @media (max-width: 900px) {
          .hqs-panel { grid-template-columns: 1fr !important; }
          .hqs-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .hqs-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
