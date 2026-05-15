'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MapPin, ChevronDown } from 'lucide-react';
import { Category } from '@/lib/types';

interface HeaderProps {
  categories?: Category[];
}

// ─── NAV STRUCTURE ───────────────────────────────────────────────────────────
// Bu yapı kesindir. Değiştirilmez.
const NAV = [
  {
    id: 'sandvic-panel',
    label: 'Sandviç Panel Kaplama Malzemeleri',
    href: '/cati-panelleri',
    cols: [
      {
        heading: 'Çatı Panelleri',
        href: '/cati-panelleri',
        links: [
          { label: 'PUR/PIR Yalıtımlı', href: '/cati-panelleri/pur-yalitimli' },
          { label: 'Mineral Yün Yalıtımlı', href: '/cati-panelleri/mineral-yun-yalitimli' },
          { label: 'Ekonomik Çatı Panel', href: '/cati-panelleri/ekonomik' },
        ],
      },
      {
        heading: 'Cephe Panelleri',
        href: '/cephe-panelleri',
        links: [
          { label: 'PUR/PIR Yalıtımlı', href: '/cephe-panelleri/pur-yalitimli' },
          { label: 'Mineral Yün Yalıtımlı', href: '/cephe-panelleri/mineral-yun-yalitimli' },
          { label: 'Ekonomik Cephe Panel', href: '/cephe-panelleri/ekonomik' },
        ],
      },
    ],
  },
  {
    id: 'trapez-saclar',
    label: 'Trapez Saclar',
    href: '/trapez-saclar',
    cols: [
      {
        heading: 'Trapez Saclar',
        href: '/trapez-saclar',
        links: [
          { label: 'Kenet Levhalar', href: '/trapez-saclar/kenet-levhalar' },
          { label: 'Rulo Bobin Sac', href: '/trapez-saclar/rulo-bobin-sac' },
          { label: '27/200 – 1000', href: '/trapez-saclar/27-200' },
          { label: '38/151 – 906', href: '/trapez-saclar/38-151' },
          { label: '55/300 – 900', href: '/trapez-saclar/55-300' },
        ],
      },
    ],
  },
  {
    id: 'osb-plywood',
    label: 'OSB ve Plywood',
    href: '/osb-plywood',
    cols: [
      {
        heading: 'OSB ve Plywood',
        href: '/osb-plywood',
        links: [
          { label: 'OSB', href: '/osb-plywood/osb' },
          { label: 'Plywood', href: '/osb-plywood/plywood' },
        ],
      },
    ],
  },
  {
    id: 'yalitim',
    label: 'Yalıtım Malzemeleri',
    href: '/yalitim-malzemeleri',
    cols: [
      {
        heading: 'Isı Yalıtımı',
        href: '/isi-yalitimi',
        links: [
          { label: 'Taşyünü', href: '/isi-yalitimi/tasyunu' },
          { label: 'XPS', href: '/isi-yalitimi/xps' },
          { label: 'Camyünü', href: '/isi-yalitimi/camyunu' },
          { label: 'EPS', href: '/isi-yalitimi/eps' },
        ],
      },
      {
        heading: 'Su Yalıtımı',
        href: '/su-yalitimi',
        links: [
          { label: 'Mebran', href: '/su-yalitimi/mebran' },
          { label: 'Likit Mebran', href: '/su-yalitimi/likit-mebran' },
          { label: 'Desenli Mebran', href: '/su-yalitimi/desenli-mebran' },
        ],
      },
    ],
  },
  {
    id: 'profil-sac',
    label: 'Boyalı Profiller ve Galvanizli Saclar',
    href: '/profil-sac',
    cols: [
      {
        heading: 'Profiller ve Saclar',
        href: '/profil-sac',
        links: [
          { label: 'Boyalı Profiller', href: '/profil-sac/boyali-profil' },
          { label: 'Galvanizli Saclar', href: '/profil-sac/galvaniz-sac' },
        ],
      },
    ],
  },
  {
    id: 'aksesuar',
    label: 'Aksesuarlar ve Ek Ürünler',
    href: '/aksesuar',
    cols: [
      {
        heading: 'Aksesuarlar',
        href: '/aksesuar',
        links: [
          { label: 'Vidalar', href: '/aksesuar/vidalar' },
          { label: 'Çatı Çıkış Kapakları', href: '/aksesuar/cati-cikis-kapaklari' },
        ],
      },
    ],
  },
];

export default function Header({ categories }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <header style={{ position: 'relative', zIndex: 1000 }}>

      {/* ── TOP BAR ── */}
      <div style={{ background: '#111', padding: '6px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'flex-end', gap: 24 }}>
          <Link href="/blog" style={{ color: '#aaa', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>Blog</Link>
          <Link href="/about" style={{ color: '#aaa', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>Hakkımızda</Link>
          <Link href="/contact" style={{ color: '#aaa', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>İletişim</Link>
        </div>
      </div>

      {/* ── MAIN HEADER (Logo + Contact) ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '16px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#d32f2f', letterSpacing: -1 }}>SANDVİÇ</span>
            <span style={{ fontSize: 13, fontWeight: 400, color: '#555', letterSpacing: 4 }}>PANELCİ</span>
          </Link>

          {/* Contact blocks */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff3f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={18} color="#d32f2f" />
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#999', fontWeight: 600 }}>Uzman Desteği</div>
                <a href="tel:+905319308500" style={{ fontSize: 16, fontWeight: 800, color: '#222', textDecoration: 'none' }}>0531 930 85 00</a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff3f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={18} color="#d32f2f" />
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#999', fontWeight: 600 }}>Merkez Ofis & Depo</div>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#222' }}>Hadımköy / İstanbul</span>
              </div>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
            className="nav-mobile-toggle"
            aria-label="Menü"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ── NAV BAR ── */}
      <nav
        style={{
          background: '#1c1c1c',
          position: 'relative',
          zIndex: 50,
        }}
        className={`nav-wrapper${mobileOpen ? ' nav-open' : ''}`}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', margin: 0, padding: 0 }} className="nav-list">

            {NAV.map(item => (
              <li key={item.id} style={{ position: 'static' }} className="nav-item">

                {/* Top-level label */}
                <Link
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '18px 14px',
                    color: '#eee',
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    letterSpacing: 0.3,
                    transition: 'color 0.2s, background 0.2s',
                  }}
                  className={`nav-link${pathname === item.href ? ' nav-active' : ''}`}
                >
                  {item.label}
                  <ChevronDown size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
                </Link>

                {/* ── MEGA PANEL ── */}
                {mounted && (
                  <div className="mega-panel" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    width: '100%',
                    background: '#fff',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
                    borderTop: '3px solid #d32f2f',
                    zIndex: 50,
                    opacity: 0,
                    visibility: 'hidden',
                    pointerEvents: 'none',
                    transform: 'translateY(8px)',
                    transition: 'opacity 0.22s ease, transform 0.22s ease, visibility 0.22s',
                  }}>
                    <div style={{
                      maxWidth: 1200,
                      margin: '0 auto',
                      padding: '36px 20px',
                      display: 'grid',
                      gridTemplateColumns: `repeat(${item.cols.length}, 1fr)`,
                      gap: 48,
                    }}>
                      {item.cols.map(col => (
                        <div key={col.heading}>
                          <Link
                            href={col.href}
                            style={{
                              display: 'block',
                              fontSize: 14,
                              fontWeight: 800,
                              color: '#111',
                              textDecoration: 'none',
                              textTransform: 'uppercase',
                              letterSpacing: 0.5,
                              paddingBottom: 12,
                              marginBottom: 16,
                              borderBottom: '2px solid #d32f2f',
                            }}
                          >
                            {col.heading}
                          </Link>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {col.links.map(link => (
                              <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                  fontSize: 14,
                                  color: '#555',
                                  textDecoration: 'none',
                                  fontWeight: 500,
                                  transition: 'color 0.15s, padding-left 0.15s',
                                  display: 'block',
                                }}
                                className="mega-link"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}

            {/* Kurumsal */}
            <li style={{ position: 'static', marginLeft: 'auto' }} className="nav-item">
              <Link
                href="/about"
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '18px 14px', color: '#eee', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s, background 0.2s' }}
                className="nav-link"
              >
                Kurumsal
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── INLINE CSS (CSS-only hover, mobile) ── */}
      <style>{`
        .nav-item:hover .mega-panel {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: translateY(0) !important;
        }
        .nav-link:hover {
          background: #2a2a2a !important;
          color: #fdd835 !important;
        }
        .nav-active {
          color: #fdd835 !important;
        }
        .mega-link:hover {
          color: #d32f2f !important;
          padding-left: 6px !important;
        }
        @media (max-width: 1024px) {
          .nav-mobile-toggle { display: block !important; }
          .nav-wrapper { display: none; }
          .nav-wrapper.nav-open { display: block !important; }
          .nav-list { flex-direction: column !important; }
          .mega-panel {
            position: static !important;
            display: none !important;
            background: #151515 !important;
            box-shadow: none !important;
            border-top: none !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
            padding: 10px 20px !important;
          }
          .nav-item:hover .mega-panel { display: block !important; }
        }
        @media (max-width: 1024px) {
          header > div:nth-child(2) > div > div:nth-child(2) { display: none; }
        }
      `}</style>

    </header>
  );
}
