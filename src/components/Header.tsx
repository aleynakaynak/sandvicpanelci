'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MapPin, ChevronDown, ChevronRight, ArrowRight, Layers, Building2, Trees, Droplets, Wrench, Package, Briefcase } from 'lucide-react';

// ─── STATİK MENÜ VERİSİ ──────────────────────────────────────
const NAV = [
  {
    id: 1, label: 'Sandviç Panel Kaplama Malzemeleri', href: '/urunler/sandvic-panel-kaplama-malzemeleri', type: 'sandvic',
    icon: <Layers size={14} />,
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
    id: 2, label: 'Trapez Saclar', href: '/urunler/trapez-saclar', type: 'list',
    icon: <Building2 size={14} />,
    links: [
      { label: 'Kenet Levhalar',  href: '/urunler/trapez-saclar/kenet-levhalar' },
      { label: 'Rulo Bobin Sac',  href: '/urunler/trapez-saclar/rulo-bobin-sac' },
      { label: '27/200 – 1000',   href: '/urunler/trapez-saclar/27-200-1000' },
      { label: '38/151 – 906',    href: '/urunler/trapez-saclar/38-151-906' },
      { label: '55/300 – 900',    href: '/urunler/trapez-saclar/55-300-900' },
    ],
  },
  {
    id: 3, label: 'OSB ve Plywood', href: '/urunler/osb-ve-plywood', type: 'list',
    icon: <Trees size={14} />,
    links: [
      { label: 'OSB',     href: '/urunler/osb-ve-plywood/osb' },
      { label: 'Plywood', href: '/urunler/osb-ve-plywood/plywood' },
    ],
  },
  {
    id: 4, label: 'Yalıtım Malzemeleri', href: '/urunler/yalitim-malzemeleri', type: 'yalitim',
    icon: <Droplets size={14} />,
    columns: [
      {
        id: 16, label: 'Isı Yalıtımı', href: '/urunler/yalitim-malzemeleri/isi-yalitimi',
        accent: '#e65100',
        links: [
          { label: 'Taşyünü', href: '/urunler/yalitim-malzemeleri/isi-yalitimi/tasyunu' },
          { label: 'XPS',     href: '/urunler/yalitim-malzemeleri/isi-yalitimi/xps' },
          { label: 'Camyünü', href: '/urunler/yalitim-malzemeleri/isi-yalitimi/camyunu' },
          { label: 'EPS',     href: '/urunler/yalitim-malzemeleri/isi-yalitimi/eps' },
        ],
      },
      {
        id: 17, label: 'Su Yalıtımı', href: '/urunler/yalitim-malzemeleri/su-yalitimi',
        accent: '#1565c0',
        links: [
          { label: 'Membran',         href: '/urunler/yalitim-malzemeleri/su-yalitimi/membran' },
          { label: 'Likit Membran',   href: '/urunler/yalitim-malzemeleri/su-yalitimi/likit-membran' },
          { label: 'Desenli Membran', href: '/urunler/yalitim-malzemeleri/su-yalitimi/desenli-membran' },
        ],
      },
    ],
  },
  {
    id: 5, label: 'Boyalı Profiller ve Galvanizli Saclar', href: '/urunler/boyali-profiller-galvanizli-saclar', type: 'list',
    icon: <Wrench size={14} />,
    links: [
      { label: 'Boyalı Profiller',  href: '/urunler/boyali-profiller-galvanizli-saclar/boyali-profiller' },
      { label: 'Galvanizli Saclar', href: '/urunler/boyali-profiller-galvanizli-saclar/galvanizli-saclar' },
    ],
  },
  {
    id: 6, label: 'Aksesuarlar ve Ek Ürünler', href: '/urunler/aksesuarlar-ve-ek-urunler', type: 'list',
    icon: <Package size={14} />,
    links: [
      { label: 'Vidalar',              href: '/urunler/aksesuarlar-ve-ek-urunler/vidalar' },
      { label: 'Çatı Çıkış Kapakları', href: '/urunler/aksesuarlar-ve-ek-urunler/cati-cikis-kapaklari' },
    ],
  },
] as const;

const KURUMSAL = {
  id: 7, label: 'Kurumsal & Araçlar', href: '/about', type: 'list',
  icon: <Briefcase size={14} />,
  links: [
    { label: 'Maliyet Hesaplama', href: '/hesaplama' },
    { label: 'Hakkımızda',        href: '/about' },
    { label: 'İletişim',          href: '/contact' },
    { label: 'Blog',              href: '/blog' },
  ],
} as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [activeSub, setActiveSub]   = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    setMobileOpen(false);
    setActiveSub(null);
  }, [pathname]);

  if (pathname?.startsWith('/admin')) return null;

  // ── Mega panel içeriği ─────────────────────────────────────
  function MegaContent({ item }: { item: typeof NAV[number] | typeof KURUMSAL }) {
    if (item.type === 'sandvic') {
      const it = item as typeof NAV[0];
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {it.columns.map(col => (
            <div key={col.id}>
              <Link href={col.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, fontWeight: 900, color: '#111', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, paddingBottom: 12, marginBottom: 14, borderBottom: '2px solid #d32f2f' }}>
                {col.label} <ArrowRight size={12} color="#d32f2f" />
              </Link>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                {col.links.map(lk => (
                  <Link key={lk.href} href={lk.href} className="hdr-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '14px 8px', gap: 8, borderRadius: 10, border: '1.5px solid #eee', background: '#fafafa', textDecoration: 'none', transition: 'all 0.18s' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 8, background: '#fff3f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Layers size={17} color="#d32f2f" />
                    </div>
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: '#333', lineHeight: 1.4 }}>{lk.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (item.type === 'yalitim') {
      const it = item as typeof NAV[3];
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {it.columns.map(col => (
            <div key={col.id}>
              <Link href={col.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, fontWeight: 900, color: '#111', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, paddingBottom: 12, marginBottom: 12, borderBottom: `2px solid ${col.accent}` }}>
                {col.label} <ArrowRight size={12} color={col.accent} />
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {col.links.map(lk => (
                  <Link key={lk.href} href={lk.href} className="hdr-link" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 7, fontSize: 13, fontWeight: 600, color: '#444', textDecoration: 'none', transition: 'all 0.14s' }}>
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

    // list type
    const it = item as typeof NAV[1];
    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {it.links.map(lk => (
          <Link key={lk.href} href={lk.href} className="hdr-link" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 7, fontSize: 13, fontWeight: 600, color: '#444', textDecoration: 'none', transition: 'all 0.14s', minWidth: 160 }}>
            <ChevronRight size={12} color="#d32f2f" style={{ flexShrink: 0 }} />
            {lk.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <header style={{ position: 'relative', zIndex: 1000 }}>

      {/* TOP BAR */}
      <div className="hdr-topbar" style={{ background: '#111', padding: '6px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'flex-end', gap: 24 }}>
          <Link href="/blog"    style={{ color: '#aaa', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>Blog</Link>
          <Link href="/about"   style={{ color: '#aaa', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>Hakkımızda</Link>
          <Link href="/contact" style={{ color: '#aaa', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>İletişim</Link>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '16px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#d32f2f', letterSpacing: -1 }}>SANDVİÇ</span>
            <span style={{ fontSize: 13, fontWeight: 400, color: '#555', letterSpacing: 4 }}>PANELCİ</span>
          </Link>

          {/* Desktop Contacts */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hdr-desktop-contacts">
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

          {/* Mobile Contacts & Toggle Controls */}
          <div className="hdr-mobile-controls" style={{ display: 'none', alignItems: 'center', gap: 12 }}>
            <a 
              href="tel:+905319308500" 
              style={{ width: 40, height: 40, borderRadius: '50%', background: '#d32f2f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
              aria-label="Uzman Desteği Ara"
            >
              <Phone size={18} />
            </a>
            <button onClick={() => setMobileOpen(o => !o)} className="hdr-toggle" style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} aria-label="Menü">
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV BAR */}
      <nav style={{ background: '#1c1c1c', position: 'relative', zIndex: 50 }} className="hdr-nav-desktop">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }} className="hdr-list">

            {NAV.map(item => (
              <li key={item.id} style={{ position: 'static' }} className="hdr-item">
                <Link
                  href={item.href}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '17px 12px', color: '#eee', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: 0.3, transition: 'color 0.18s, background 0.18s' }}
                  className={`hdr-link${pathname === item.href ? ' hdr-active' : ''}`}
                >
                  {item.label}
                  <ChevronDown size={11} style={{ opacity: 0.5 }} />
                </Link>

                {/* Mega Panel */}
                {mounted && (
                  <div className="hdr-mega" style={{ position: 'absolute', top: '100%', left: 0, right: 0, width: '100%', background: '#fff', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', borderTop: '3px solid #d32f2f', zIndex: 9999, opacity: 0, visibility: 'hidden', pointerEvents: 'none', transform: 'translateY(8px)', transition: 'opacity 0.2s, transform 0.2s, visibility 0.2s' }}>
                    <MegaContent item={item} />
                  </div>
                )}
              </li>
            ))}

            {/* Kurumsal (sağ) */}
            <li style={{ position: 'static', marginLeft: 'auto' }} className="hdr-item">
              <Link
                href={KURUMSAL.href}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '17px 12px', color: '#fdd835', fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.18s' }}
                className="hdr-link"
              >
                {KURUMSAL.label}
                <ChevronDown size={11} style={{ opacity: 0.5 }} />
              </Link>
              {mounted && (
                <div className="hdr-mega" style={{ position: 'absolute', top: '100%', left: 0, right: 0, width: '100%', background: '#fff', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', borderTop: '3px solid #d32f2f', zIndex: 9999, opacity: 0, visibility: 'hidden', pointerEvents: 'none', transform: 'translateY(8px)', transition: 'opacity 0.2s, transform 0.2s, visibility 0.2s' }}>
                  <MegaContent item={KURUMSAL} />
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* MOBILE NAV DRAWER */}
      {mobileOpen && (
        <div className="hdr-mobile-drawer" style={{ display: 'none', background: '#1c1c1c', borderTop: '1px solid #333', padding: '16px 20px 32px', position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 9999, flexDirection: 'column', gap: 16, maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {NAV.map(item => {
              const isSubOpen = activeSub === item.id;
              return (
                <li key={item.id} style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0', color: '#eee', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none' }}
                    >
                      {item.icon} {item.label}
                    </Link>
                    <button 
                      onClick={() => setActiveSub(isSubOpen ? null : item.id)} 
                      style={{ padding: 12, color: '#aaa', cursor: 'pointer' }}
                      aria-label="Alt Menüyü Aç"
                    >
                      <ChevronDown size={18} style={{ transform: isSubOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                  </div>
                  
                  {/* Accordion content */}
                  {isSubOpen && (
                    <div style={{ background: '#252525', borderRadius: 8, padding: '12px 16px', marginTop: 4, display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {item.type === 'sandvic' && (item as typeof NAV[0]).columns.map(col => (
                        <div key={col.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <Link href={col.href} onClick={() => setMobileOpen(false)} style={{ fontSize: 12, fontWeight: 900, color: '#fdd835', textTransform: 'uppercase', letterSpacing: 0.5, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                            {col.label} <ArrowRight size={10} />
                          </Link>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 8 }}>
                            {col.links.map(lk => (
                              <Link key={lk.href} href={lk.href} onClick={() => setMobileOpen(false)} style={{ fontSize: 13, color: '#ccc', textDecoration: 'none', padding: '6px 0' }}>
                                • {lk.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}

                      {item.type === 'yalitim' && (item as typeof NAV[3]).columns.map(col => (
                        <div key={col.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <Link href={col.href} onClick={() => setMobileOpen(false)} style={{ fontSize: 12, fontWeight: 900, color: col.accent, textTransform: 'uppercase', letterSpacing: 0.5, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                            {col.label} <ArrowRight size={10} />
                          </Link>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 8 }}>
                            {col.links.map(lk => (
                              <Link key={lk.href} href={lk.href} onClick={() => setMobileOpen(false)} style={{ fontSize: 13, color: '#ccc', textDecoration: 'none', padding: '6px 0' }}>
                                • {lk.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}

                      {item.type === 'list' && (item as typeof NAV[1]).links.map(lk => (
                        <Link key={lk.href} href={lk.href} onClick={() => setMobileOpen(false)} style={{ fontSize: 13, color: '#ccc', textDecoration: 'none', padding: '6px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <ChevronRight size={12} color="#d32f2f" /> {lk.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}

            {/* Kurumsal */}
            <li style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link
                  href={KURUMSAL.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0', color: '#fdd835', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none' }}
                >
                  {KURUMSAL.icon} {KURUMSAL.label}
                </Link>
                <button 
                  onClick={() => setActiveSub(activeSub === KURUMSAL.id ? null : KURUMSAL.id)} 
                  style={{ padding: 12, color: '#fdd835', cursor: 'pointer' }}
                  aria-label="Kurumsal Menüyü Aç"
                >
                  <ChevronDown size={18} style={{ transform: activeSub === KURUMSAL.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
              </div>
              
              {activeSub === KURUMSAL.id && (
                <div style={{ background: '#252525', borderRadius: 8, padding: '12px 16px', marginTop: 4, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {KURUMSAL.links.map(lk => (
                    <Link key={lk.href} href={lk.href} onClick={() => setMobileOpen(false)} style={{ fontSize: 13, color: '#ccc', textDecoration: 'none', padding: '6px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ChevronRight size={12} color="#fdd835" /> {lk.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>

          {/* Quick Contact & Map info at the bottom of mobile drawer */}
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid #2a2a2a', paddingTop: 20 }}>
            <a href="tel:+905319308500" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#d32f2f', color: '#fff', padding: '12px 16px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14, justifyContent: 'center' }}>
              <Phone size={16} /> Uzman Desteği: 0531 930 85 00
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#aaa', fontSize: 13, justifyContent: 'center' }}>
              <MapPin size={16} color="#d32f2f" /> Hadımköy / İstanbul
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hdr-item:hover .hdr-mega { opacity:1!important; visibility:visible!important; pointer-events:auto!important; transform:translateY(0)!important; }
        .hdr-link:hover { background:#2a2a2a!important; color:#fdd835!important; }
        .hdr-active { color:#fdd835!important; }
        .hdr-box:hover { background:#fff3f3!important; border-color:#d32f2f!important; transform:translateY(-2px); box-shadow:0 6px 18px rgba(211,47,47,0.12)!important; }
        .hdr-box:hover span { color:#d32f2f!important; }
        .hdr-link-item:hover,.hdr-link:hover { background:#fff8f8!important; color:#d32f2f!important; }
        .hdr-link:hover { background:#fff3f3!important; color:#d32f2f!important; }
        
        @media(max-width:1024px){
          .hdr-topbar { display:none!important; }
          .hdr-desktop-contacts { display:none!important; }
          .hdr-mobile-controls { display:flex!important; }
          .hdr-nav-desktop { display:none!important; }
          .hdr-mobile-drawer { display:flex!important; }
        }
      `}</style>
    </header>
  );
}
