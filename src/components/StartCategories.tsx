'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { LayoutGrid, ChevronDown, ChevronRight, ArrowRight, X, Layers, Building2, Trees, Droplets, Wrench, Package, Briefcase } from 'lucide-react';

// ─── STATİK MENÜ YAPISI (DB'den bağımsız, garantili) ─────────
const MENU = [
  {
    id: 1, slug: 'sandvic', label: 'Sandviç Panel Kaplama Malzemeleri',
    href: '/urunler/sandvic-panel-kaplama-malzemeleri', type: 'sandvic',
    icon: <Layers size={15} />,
    columns: [
      {
        id: 7, label: 'Çatı Panelleri', href: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri',
        links: [
          { label: 'PUR/PIR Yalıtımlı Çatı Panelleri',     href: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri/pur-pir-yalitimli-cati-panelleri' },
          { label: 'Mineral Yün Yalıtımlı Çatı Panelleri', href: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri/mineral-yun-yalitimli-cati-panelleri' },
          { label: 'Ekonomik Çatı Panel',                   href: '/urunler/sandvic-panel-kaplama-malzemeleri/cati-panelleri/ekonomik-cati-panel' },
        ],
      },
      {
        id: 8, label: 'Cephe Panelleri', href: '/urunler/sandvic-panel-kaplama-malzemeleri/cephe-panelleri',
        links: [
          { label: 'PUR/PIR Yalıtımlı Cephe Panelleri',     href: '/urunler/sandvic-panel-kaplama-malzemeleri/cephe-panelleri/pur-pir-yalitimli-cephe-panelleri' },
          { label: 'Mineral Yün Yalıtımlı Cephe Panelleri', href: '/urunler/sandvic-panel-kaplama-malzemeleri/cephe-panelleri/mineral-yun-yalitimli-cephe-panelleri' },
          { label: 'Ekonomik Cephe Panel',                   href: '/urunler/sandvic-panel-kaplama-malzemeleri/cephe-panelleri/ekonomik-cephe-panel' },
        ],
      },
    ],
  },
  {
    id: 2, slug: 'trapez', label: 'Trapez Saclar',
    href: '/urunler/trapez-saclar', type: 'list',
    icon: <Building2 size={15} />,
    links: [
      { label: '27/200 Trapez Sac',  href: '/urunler/trapez-saclar/27-200-1000' },
      { label: '38/151 Trapez Sac',  href: '/urunler/trapez-saclar/38-151-906' },
      { label: '55/300 Trapez Sac',  href: '/urunler/trapez-saclar/55-300-900' },
      { label: 'Rulo Bobin Sac',     href: '/urunler/trapez-saclar/rulo-bobin-sac' },
    ],
  },
  {
    id: 8, slug: 'kenet', label: 'Kenet Sistemleri',
    href: '/urunler/kenet-sistemleri', type: 'list',
    icon: <Building2 size={15} />,
    links: [
      { label: 'Düz Kenet Levha',  href: '/urunler/kenet-sistemleri/duz-kenet-levha' },
      { label: 'Kilit Geçme Sistem Panel',  href: '/urunler/kenet-sistemleri/kilit-gecme-sistem-panel' },
      { label: 'Yüksek Kulak Kenet Levha',  href: '/urunler/kenet-sistemleri/yuksek-kulak-kenet-levha' },
    ],
  },
  {
    id: 3, slug: 'osb', label: 'OSB ve Plywood',
    href: '/urunler/osb-ve-plywood', type: 'list',
    icon: <Trees size={15} />,
    links: [
      { label: 'OSB',     href: '/urunler/osb-ve-plywood/osb' },
      { label: 'Plywood', href: '/urunler/osb-ve-plywood/plywood' },
    ],
  },
  {
    id: 4, slug: 'yalitim', label: 'Yalıtım Malzemeleri',
    href: '/urunler/yalitim-malzemeleri', type: 'yalitim',
    icon: <Droplets size={15} />,
    columns: [
      {
        id: 16, label: 'Isı Yalıtımı', href: '/urunler/yalitim-malzemeleri/isi-yalitimi',
        accent: '#e65100', accentBg: '#fff3e0',
        links: [
          { label: 'Taşyünü', href: '/urunler/yalitim-malzemeleri/isi-yalitimi/tasyunu' },
          { label: 'XPS',     href: '/urunler/yalitim-malzemeleri/isi-yalitimi/xps' },
          { label: 'Camyünü', href: '/urunler/yalitim-malzemeleri/isi-yalitimi/camyunu' },
          { label: 'EPS',     href: '/urunler/yalitim-malzemeleri/isi-yalitimi/eps' },
        ],
      },
      {
        id: 17, label: 'Su Yalıtımı', href: '/urunler/yalitim-malzemeleri/su-yalitimi',
        accent: '#1565c0', accentBg: '#e3f2fd',
        links: [
          { label: 'Membran',         href: '/urunler/yalitim-malzemeleri/su-yalitimi/membran' },
          { label: 'Likit Membran',   href: '/urunler/yalitim-malzemeleri/su-yalitimi/likit-membran' },
          { label: 'Desenli Membran', href: '/urunler/yalitim-malzemeleri/su-yalitimi/desenli-membran' },
        ],
      },
    ],
  },
  {
    id: 5, slug: 'boyali', label: 'Boyalı Profiller ve Galvanizli Saclar',
    href: '/urunler/boyali-profiller-galvanizli-saclar', type: 'list',
    icon: <Wrench size={15} />,
    links: [
      { label: 'Boyalı Profiller',  href: '/urunler/boyali-profiller-galvanizli-saclar/boyali-profiller' },
      { label: 'Galvanizli Saclar', href: '/urunler/boyali-profiller-galvanizli-saclar/galvanizli-saclar' },
    ],
  },
  {
    id: 6, slug: 'aksesuar', label: 'Aksesuarlar ve Ek Ürünler',
    href: '/urunler/aksesuarlar-ve-ek-urunler', type: 'list',
    icon: <Package size={15} />,
    links: [
      { label: 'Vidalar',              href: '/urunler/aksesuarlar-ve-ek-urunler/vidalar' },
      { label: 'Çatı Çıkış Kapakları', href: '/urunler/aksesuarlar-ve-ek-urunler/cati-cikis-kapaklari' },
    ],
  },
  {
    id: 7, slug: 'kurumsal', label: 'Kurumsal & Araçlar',
    href: '/about', type: 'list',
    icon: <Briefcase size={15} />,
    links: [
      { label: 'Maliyet Hesaplama', href: '/hesaplama' },
      { label: 'Hakkımızda',        href: '/about' },
      { label: 'İletişim',          href: '/contact' },
      { label: 'Blog',              href: '/blog' },
    ],
  },
] as const;

// ─── Tip ─────────────────────────────────────────────────────
type MenuItem = typeof MENU[number];

// ─── Sandviç Panel Mega İçerik ───────────────────────────────
function SandvicContent({ item, close }: { item: MenuItem & { type: 'sandvic' }; close: () => void }) {
  return (
    <div className="sc-grid-2col">
      {item.columns.map(col => (
        <div key={col.id}>
          <Link
            href={col.href} onClick={close}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontSize: 12, fontWeight: 900, color: '#111', textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: 0.6,
              paddingBottom: 12, marginBottom: 14, borderBottom: '2px solid #d32f2f',
            }}
          >
            {col.label}
            <ArrowRight size={12} color="#d32f2f" />
          </Link>
          <div className="sc-grid-3col">
            {col.links.map(lk => (
              <Link
                key={lk.href} href={lk.href} onClick={close}
                className="sc-box"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', padding: '14px 8px', gap: 10,
                  borderRadius: 10, border: '1.5px solid #eee', background: '#fafafa',
                  textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 8, background: '#fff3f3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(211,47,47,0.1)',
                }}>
                  <Layers size={18} color="#d32f2f" />
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: '#333', lineHeight: 1.4 }}>
                  {lk.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Yalıtım Mega İçerik ─────────────────────────────────────
function YalitimContent({ item, close }: { item: MenuItem & { type: 'yalitim' }; close: () => void }) {
  return (
    <div className="sc-grid-2col">
      {item.columns.map(col => (
        <div key={col.id}>
          <Link
            href={col.href} onClick={close}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontSize: 12, fontWeight: 900, color: '#111', textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: 0.6,
              paddingBottom: 12, marginBottom: 12, borderBottom: `2px solid ${col.accent}`,
            }}
          >
            {col.label}
            <ArrowRight size={12} color={col.accent} />
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {col.links.map(lk => (
              <Link
                key={lk.href} href={lk.href} onClick={close}
                className="sc-list"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 12px', borderRadius: 7,
                  fontSize: 13, fontWeight: 600, color: '#444',
                  textDecoration: 'none', transition: 'all 0.14s',
                }}
              >
                <ChevronRight size={12} color={col.accent} style={{ flexShrink: 0 }} />
                {lk.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Liste Mega İçerik ───────────────────────────────────────
function ListContent({ item, close }: { item: MenuItem & { type: 'list' }; close: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {item.links.map(lk => (
        <Link
          key={lk.href} href={lk.href} onClick={close}
          className="sc-list"
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 7,
            fontSize: 13, fontWeight: 600, color: '#444',
            textDecoration: 'none', transition: 'all 0.14s',
          }}
        >
          <ChevronRight size={12} color="#d32f2f" style={{ flexShrink: 0 }} />
          {lk.label}
        </Link>
      ))}
    </div>
  );
}

// ─── İçerik Router ───────────────────────────────────────────
function PanelContent({ item, close }: { item: MenuItem; close: () => void }) {
  if (item.type === 'sandvic') return <SandvicContent item={item as any} close={close} />;
  if (item.type === 'yalitim') return <YalitimContent item={item as any} close={close} />;
  return <ListContent item={item as any} close={close} />;
}

// ─── ANA BİLEŞEN ─────────────────────────────────────────────
export default function StartCategories() {
  const [open, setOpen]         = useState(false);
  const [activeId, setActiveId] = useState<number>(MENU[0].id);
  const wrapRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOut(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onOut);
    return () => document.removeEventListener('mousedown', onOut);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const activeCat = MENU.find(m => m.id === activeId)!;

  return (
    <section style={{ background: '#fff', padding: '40px 0 0', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

        {/* Başlık */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: '#d32f2f', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 8px' }}>
            SANDVİÇ PANELCİ YAPI MARKET
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#111', margin: 0 }}>Ürün Kategorileri</h2>
        </div>

        {/* Buton + Mega Panel */}
        <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block' }}>

          {/* Tetikleyici */}
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: open ? '#b71c1c' : '#d32f2f', color: '#fff',
              border: 'none', borderRadius: 8, padding: '13px 22px',
              fontSize: 14, fontWeight: 800, cursor: 'pointer',
              boxShadow: open ? 'none' : '0 4px 16px rgba(211,47,47,0.3)',
              transition: 'all 0.18s',
            }}
          >
            <LayoutGrid size={17} />
            Tüm Ürün Kategorileri
            <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
          </button>

          {/* Mega Panel */}
          {open && (
            <>
              {/* Backdrop overlay */}
              <div
                className="sc-backdrop"
                onClick={() => setOpen(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.5)',
                  zIndex: 9998,
                  display: 'none',
                }}
              />
              <div className="sc-mega-panel">

                {/* Sol Sidebar */}
                <nav className="sc-sidebar">
                  {MENU.map(cat => {
                    const isA = cat.id === activeId;
                    return (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveId(cat.id)}
                        onClick={() => setActiveId(cat.id)}
                        style={{
                          display: 'flex', alignItems: 'center',
                          width: '100%', padding: '13px 18px',
                          background: isA ? '#242424' : 'transparent',
                          border: 'none', cursor: 'pointer', gap: 10,
                          borderLeft: isA ? '3px solid #d32f2f' : '3px solid transparent',
                          borderBottom: '1px solid #222', textAlign: 'left',
                          transition: 'all 0.14s',
                        }}
                      >
                        <span style={{ color: isA ? '#d32f2f' : '#666', flexShrink: 0 }}>{cat.icon}</span>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: isA ? '#fff' : '#aaa', lineHeight: 1.3, flex: 1 }}>
                          {cat.label}
                        </span>
                        <ChevronRight size={11} color={isA ? '#d32f2f' : '#444'} style={{ flexShrink: 0 }} />
                      </button>
                    );
                  })}
                </nav>

                {/* Sağ İçerik */}
                <div className="sc-content">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 900, color: '#111' }}>{activeCat.label}</h3>
                    <Link
                      href={activeCat.href}
                      onClick={() => setOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#d32f2f', textDecoration: 'none' }}
                    >
                      Tümünü Gör <ArrowRight size={12} />
                    </Link>
                  </div>
                  <PanelContent item={activeCat} close={() => setOpen(false)} />
                </div>

                {/* Kapatma */}
                <button
                  onClick={() => setOpen(false)}
                  className="sc-close-btn"
                  style={{
                    position: 'absolute', top: 10, right: 10,
                    background: '#f5f5f5', border: 'none', borderRadius: '50%',
                    width: 26, height: 26, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer',
                    zIndex: 10,
                  }}
                >
                  <X size={13} color="#555" className="sc-close-icon" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Alt Hızlı Linkler */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18, paddingBottom: 22 }}>
          {MENU.slice(0, 6).map(cat => (
            <Link
              key={cat.id} href={cat.href}
              className="sc-pill"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 20,
                background: '#f5f5f5', border: '1px solid #eee',
                fontSize: 12, fontWeight: 700, color: '#444',
                textDecoration: 'none', transition: 'all 0.14s',
              }}
            >
              {cat.icon}
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .sc-box:hover { background:#fff3f3!important; border-color:#d32f2f!important; transform:translateY(-2px); box-shadow:0 6px 20px rgba(211,47,47,0.13)!important; }
        .sc-box:hover span { color:#d32f2f!important; }
        .sc-list:hover { background:#fff3f3!important; color:#d32f2f!important; padding-left:18px!important; }
        .sc-pill:hover { background:#fff3f3!important; border-color:#d32f2f!important; color:#d32f2f!important; }
        
        .sc-mega-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          z-index: 9999;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18);
          border: 1px solid #e8e8e8;
          display: flex;
          width: 880px;
          max-width: 90vw;
          overflow: hidden;
        }
        .sc-sidebar {
          width: 240px;
          flex-shrink: 0;
          background: #1a1a1a;
          padding: 8px 0;
        }
        .sc-content {
          flex: 1;
          padding: 26px 28px;
          overflow-y: auto;
          max-height: 430px;
        }
        .sc-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
        }
        .sc-grid-3col {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        @media (max-width: 768px) {
          .sc-backdrop {
            display: block !important;
          }
          .sc-mega-panel {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: calc(100% - 24px) !important;
            max-width: 420px !important;
            max-height: 80vh !important;
            flex-direction: column !important;
            border-radius: 12px !important;
            z-index: 9999 !important;
            box-shadow: 0 24px 64px rgba(0,0,0,0.4) !important;
          }
          .sc-sidebar {
            width: 100% !important;
            max-height: 160px !important;
            overflow-y: auto !important;
            border-bottom: 2px solid #222;
          }
          .sc-content {
            padding: 20px 18px !important;
            max-height: calc(80vh - 160px - 20px) !important;
            overflow-y: auto !important;
            background: #fff !important;
          }
          .sc-grid-2col {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .sc-close-btn {
            background: rgba(255, 255, 255, 0.2) !important;
            top: 10px !important;
            right: 10px !important;
          }
          .sc-close-btn:hover {
            background: rgba(255, 255, 255, 0.35) !important;
          }
          .sc-close-icon {
            color: #fff !important;
          }
        }
        @media (max-width: 480px) {
          .sc-grid-3col {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
