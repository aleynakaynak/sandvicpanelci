'use client';

/**
 * ProductDetailPanel — Client Component
 *
 * Varyant seçimini (kalınlık, renk) merkezi olarak yönetir.
 * QuoteRequestForm ve UValueCalculator bu seçimle senkron çalışır.
 */

import { useState } from 'react';
import Image from 'next/image';
import {
  ChevronLeft, ChevronRight, Package2,
  ZoomIn, CheckCircle, Layers, Palette,
} from 'lucide-react';
import QuoteRequestForm from '@/components/QuoteRequestForm';
import UValueCalculator from '@/components/UValueCalculator';
import type { ProductDetail, ProductVariant, ProductTechnicalSpec } from '@/lib/types/product.types';
import { formatProductPrice } from '@/lib/utils/price';

interface Props {
  product: ProductDetail;
}

// ── Galeri alt bileşeni ────────────────────────────────────────
function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const all = images.length > 0 ? images : [];
  const current = all[activeIdx];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Ana görsel */}
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '4/3',
        background: '#f5f5f5', borderRadius: 12,
        border: '1px solid #eee', overflow: 'hidden',
      }}>
        {current ? (
          <Image src={current} alt={alt} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px)100vw,50vw" />
        ) : (
          <div style={{ width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center' }}>
            <Package2 size={64} color="#ddd" />
          </div>
        )}

        {/* Galeri okları */}
        {all.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx(i => (i - 1 + all.length) % all.length)}
              style={arrowStyle('left')}
              aria-label="Önceki görsel"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setActiveIdx(i => (i + 1) % all.length)}
              style={arrowStyle('right')}
              aria-label="Sonraki görsel"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Zoom icon */}
        <div style={{
          position:'absolute',top:10,right:10,
          background:'rgba(0,0,0,0.4)',borderRadius:6,
          padding:'4px 6px',display:'flex',
        }}>
          <ZoomIn size={14} color="#fff" />
        </div>

        {/* Sayaç */}
        {all.length > 1 && (
          <div style={{
            position:'absolute',bottom:10,right:10,
            background:'rgba(0,0,0,0.5)',color:'#fff',
            fontSize:11,fontWeight:700,borderRadius:99,
            padding:'2px 10px',
          }}>
            {activeIdx+1} / {all.length}
          </div>
        )}
      </div>

      {/* Küçük resimler */}
      {all.length > 1 && (
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {all.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                width:64, height:64, borderRadius:8, overflow:'hidden',
                border: `2px solid ${i===activeIdx?'#d32f2f':'#eee'}`,
                background:'#f5f5f5', padding:0, cursor:'pointer',
                flexShrink:0, transition:'border-color 0.15s',
              }}
            >
              <Image src={img} alt={`${alt} ${i+1}`} width={64} height={64} style={{ objectFit:'cover', display:'block' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Teknik özellikler tablosu ──────────────────────────────────
function AttributeTable({ attributes }: { attributes: Record<string, string> }) {
  const entries = Object.entries(attributes);
  if (entries.length === 0) return null;

  const ATTR_LABELS: Record<string, string> = {
    insulation_type: 'Yalıtım Tipi',
    thickness_mm:    'Kalınlık',
    wave_form:       'Hadve Yapısı',
    fire_class:      'Yangın Sınıfı',
    metal_thickness: 'Metal Kalınlığı',
    ral_color:       'Renk',
    surface_type:    'Yüzey Tipi',
    profile_form:    'Profil Formu',
    surface_coat:    'Yüzey Kaplama',
    width_mm:        'Faydalı En',
    osb_class:       'OSB Sınıfı',
    sheet_size:      'Levha Ölçüsü',
    material_type:   'Malzeme Türü',
    density:         'Yoğunluk',
    lambda_class:    'Lambda Değeri',
    membrane_type:   'Membran Tipi',
    surface_finish:  'Yüzey Kaplaması',
    app_method:      'Uygulama Yöntemi',
  };

  return (
    <div style={{ border:'1px solid #f0f0f0', borderRadius:10, overflow:'hidden' }}>
      <div style={{
        padding:'10px 16px', background:'#fafafa',
        borderBottom:'1px solid #f0f0f0', display:'flex', alignItems:'center', gap:8,
      }}>
        <Layers size={13} color="#d32f2f" />
        <span style={{ fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:0.8, color:'#555' }}>
          Teknik Özellikler
        </span>
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <tbody>
          {entries.map(([key, val], i) => (
            <tr key={key} style={{ background: i%2===0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding:'9px 16px', fontSize:12, fontWeight:700, color:'#888', width:'45%', borderBottom:'1px solid #f5f5f5' }}>
                {ATTR_LABELS[key] ?? key}
              </td>
              <td style={{ padding:'9px 16px', fontSize:13, fontWeight:700, color:'#222', borderBottom:'1px solid #f5f5f5' }}>
                {val}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Varyant seçici ─────────────────────────────────────────────
function VariantSelector({
  label, icon, variants, activeId, onSelect, getLabel,
}: {
  label: string;
  icon: React.ReactNode;
  variants: ProductVariant[];
  activeId: number | null;
  onSelect: (v: ProductVariant) => void;
  getLabel: (v: ProductVariant) => string;
}) {
  if (variants.length === 0) return null;

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:10 }}>
        {icon}
        <span style={{ fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:0.5, color:'#555' }}>
          {label}
        </span>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {variants.map(v => {
          const active = v.id === activeId;
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v)}
              style={{
                padding:'8px 16px',
                border:`2px solid ${active?'#d32f2f':'#e0e0e0'}`,
                borderRadius:8,
                background: active?'#fff3f3':'#fff',
                color: active?'#d32f2f':'#444',
                fontSize:13, fontWeight:700,
                cursor:'pointer',
                transition:'all 0.15s',
                display:'flex', alignItems:'center', gap:5,
              }}
            >
              {active && <CheckCircle size={12} />}
              {getLabel(v)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Ana bileşen ────────────────────────────────────────────────
export default function ProductDetailPanel({ product }: Props) {
  const isPanel = product.name.toLowerCase().includes('panel');

  // Başlangıçta ilk varyantı seç
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(() => {
    if (isPanel) {
      return { 
        id: 40, 
        thickness_mm: 40, 
        ral_color: 'Farklı renk seçeneklerinde üretim', 
        variant_label: '40mm - Farklı renk seçenekleri', 
        stock_status: 'available',
        product_id: product.id 
      } as ProductVariant;
    }
    return product.variants[0] ?? null;
  });


  // Kalınlığa göre unique varyantlar (kalınlık butonu)
  const thicknessVariants = isPanel
    ? [40, 50, 60, 80, 100, 120].map(t => ({ 
        id: t, 
        thickness_mm: t, 
        ral_color: 'Farklı renk seçeneklerinde üretim',
        variant_label: `${t}mm - Farklı renk seçenekleri`,
        stock_status: 'available',
      } as ProductVariant))
    : product.variants.filter(
        (v, i, arr) => arr.findIndex(x => x.thickness_mm === v.thickness_mm) === i && v.thickness_mm !== 0
      );

  // Renge göre unique varyantlar
  const colorVariants = isPanel
    ? [{ 
        id: 9999, 
        ral_color: 'Farklı renk seçeneklerinde üretim', 
        variant_label: 'Farklı renk seçeneklerinde üretim',
        stock_status: 'available'
      } as ProductVariant]
    : product.variants.filter(
        (v, i, arr) => arr.findIndex(x => x.ral_color === v.ral_color) === i && !!v.ral_color
      );

  // Kalınlık seçilince en yakın varyantı bul
  function selectByThickness(v: ProductVariant) {
    if (isPanel) {
      setSelectedVariant(v);
      return;
    }
    const match = product.variants.find(
      x => x.thickness_mm === v.thickness_mm &&
           (selectedVariant?.ral_color ? x.ral_color === selectedVariant.ral_color : true)
    ) ?? v;
    setSelectedVariant(match);
  }

  // U-Değeri için override specs
  const panelThicknesses = [40, 50, 60, 80, 100, 120];
  const computedSpecs = isPanel
    ? panelThicknesses.map((t, idx) => {
        const existing = product.technical_specs.find(s => s.thickness_mm === t) ?? product.technical_specs[0];
        return {
          ...existing,
          id: existing?.id ? parseInt(`${existing.id}${t}`) : idx + 1000,
          thickness_mm: t,
        } as ProductTechnicalSpec;
      })
    : product.technical_specs;

  // Seçili varyanta karşılık gelen teknik spec
  const selectedSpec: ProductTechnicalSpec | undefined = computedSpecs.find(
    s => s.thickness_mm === selectedVariant?.thickness_mm
  ) ?? computedSpecs[0];

  // Renk seçilince en yakın varyantı bul
  function selectByColor(v: ProductVariant) {
    if (isPanel) {
      setSelectedVariant(v);
      return;
    }
    const match = product.variants.find(
      x => x.ral_color === v.ral_color &&
           (selectedVariant?.thickness_mm ? x.thickness_mm === selectedVariant.thickness_mm : true)
    ) ?? v;
    setSelectedVariant(match);
  }

  // Stok rozeti
  const stockBadge = {
    available:    { text: '✓ Stokta Mevcut',  color:'#15803d', bg:'#f0fdf4' },
    on_order:     { text: '⧖ Sipariş Üzerine', color:'#d97706', bg:'#fffbeb' },
    out_of_stock: { text: '✗ Stok Dışı',       color:'#dc2626', bg:'#fff5f5' },
  }[selectedVariant?.stock_status ?? 'available'];

  // Fiyat hesabı (base + delta)
  const displayPrice = product.base_price !== null && selectedVariant
    ? product.base_price + (selectedVariant.price_delta ?? 0)
    : product.base_price;

  return (
    <>
      {/* ── 2 Sütun Ana Layout ── */}
      <div className="pdp-grid">

        {/* ════ SOL SÜTUN ════ */}
        <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

          {/* Galeri */}
          <ProductGallery
            images={product.gallery_urls?.length ? product.gallery_urls : (product.image_url ? [product.image_url] : [])}
            alt={product.name}
          />

          {/* Uzun açıklama */}
          {product.long_desc && (
            <div style={{ background:'#fff', border:'1px solid #f0f0f0', borderRadius:10, padding:'20px 24px' }}>
              <h3 style={{ margin:'0 0 12px', fontSize:14, fontWeight:800, color:'#111', textTransform:'uppercase', letterSpacing:0.5 }}>
                Ürün Hakkında
              </h3>
              <div
                style={{ fontSize:13, color:'#555', lineHeight:1.75 }}
                dangerouslySetInnerHTML={{ __html: product.long_desc }}
              />
            </div>
          )}

          {/* Attribute tablosu */}
          <AttributeTable attributes={
            isPanel 
              ? { 
                  'thickness_mm': '40 mm, 50 mm, 60 mm, 80 mm, 100 mm, 120 mm',
                  'ral_color': 'Farklı renk seçeneklerinde üretim',
                  'metal_thickness': '0.50 + 0.40 mm'
                }
              : product.attributes
          } />

          {/* U-Değeri hesaplayıcı (sol altta — geniş ekranda) */}
          {computedSpecs.length > 0 && (
            <div className="pdp-uvalue-left">
              <UValueCalculator
                specs={computedSpecs}
                productName={product.name}
              />
            </div>
          )}
        </div>

        {/* ════ SAĞ SÜTUN ════ */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

          {/* Ürün başlığı kartı */}
          <div style={{ background:'#fff', border:'1px solid #f0f0f0', borderRadius:12, padding:'20px 24px' }}>
            <p style={{ margin:'0 0 4px', fontSize:11, color:'#d32f2f', fontWeight:800, textTransform:'uppercase', letterSpacing:1 }}>
              {product.category?.name}
            </p>
            <h1 style={{ margin:'0 0 12px', fontSize:22, fontWeight:900, color:'#111', lineHeight:1.25 }}>
              {product.name}
            </h1>

            {product.short_desc && (
              <p style={{ margin:'0 0 16px', fontSize:13, color:'#666', lineHeight:1.6 }}>
                {product.short_desc}
              </p>
            )}

            {/* Fiyat */}
            {(() => {
              const priceInfo = formatProductPrice(product, displayPrice);
              return (
                <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:8 }}>
                  {priceInfo.hasPrice ? (
                    <>
                      <span style={{ fontSize:28, fontWeight:900, color:'#d32f2f' }}>
                        {priceInfo.priceText}
                      </span>
                      <span style={{ fontSize:13, color:'#aaa' }}>{priceInfo.unitText}</span>
                    </>
                  ) : (
                    <span style={{ fontSize:16, fontWeight:700, color:'#888' }}>
                      {priceInfo.priceText} →
                    </span>
                  )}
                </div>
              );
            })()}

            {/* Stok */}
            <span style={{
              display:'inline-block', fontSize:12, fontWeight:700,
              color: stockBadge.color, background: stockBadge.bg,
              padding:'3px 12px', borderRadius:99,
            }}>
              {stockBadge.text}
            </span>
          </div>

          {/* Varyant seçiciler */}
          {(thicknessVariants.length > 0 || colorVariants.length > 0) && (
            <div style={{ background:'#fff', border:'1px solid #f0f0f0', borderRadius:12, padding:'20px 24px', display:'flex', flexDirection:'column', gap:18 }}>

              <VariantSelector
                label="Kalınlık"
                icon={<Layers size={13} color="#d32f2f" />}
                variants={thicknessVariants}
                activeId={selectedVariant?.id ?? null}
                onSelect={selectByThickness}
                getLabel={v => `${v.thickness_mm} mm`}
              />

              <VariantSelector
                label="Renk (RAL)"
                icon={<Palette size={13} color="#d32f2f" />}
                variants={colorVariants}
                activeId={selectedVariant?.id ?? null}
                onSelect={selectByColor}
                getLabel={v => v.ral_color ?? ''}
              />

              {/* Seçili varyant özeti */}
              {selectedVariant && (
                <div style={{
                  background:'#f9f9f9', borderRadius:8, padding:'10px 14px',
                  fontSize:12, color:'#666', fontWeight:600,
                }}>
                  Seçilen: <strong style={{ color:'#111' }}>{selectedVariant.variant_label}</strong>
                  {selectedVariant.sku && (
                    <span style={{ marginLeft:8, color:'#aaa' }}>SKU: {selectedVariant.sku}</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* U-Değeri (sağ sütunda — küçük ekranda görünür, büyükte gizlenir) */}
          {computedSpecs.length > 0 && (
            <div className="pdp-uvalue-right">
              <UValueCalculator
                specs={selectedSpec ? [selectedSpec, ...computedSpecs.filter(s => s.id !== selectedSpec.id)] : computedSpecs}
                productName={product.name}
              />
            </div>
          )}

          {/* Teklif formu */}
          <QuoteRequestForm
            product={product}
            selectedVariant={selectedVariant}
          />
        </div>
      </div>

      {/* ── Responsive stiller ── */}
      <style>{`
        .pdp-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 32px;
          align-items: start;
        }
        .pdp-uvalue-left  { display: block; }
        .pdp-uvalue-right { display: none; }

        @media (max-width: 1024px) {
          .pdp-grid { grid-template-columns: 1fr; }
          .pdp-uvalue-left  { display: none; }
          .pdp-uvalue-right { display: block; }
        }
      `}</style>
    </>
  );
}

// ── Yardımcı stiller ───────────────────────────────────────────
function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    [side]: 10,
    background: 'rgba(0,0,0,0.45)', color: '#fff',
    border: 'none', borderRadius: 6,
    width: 32, height: 32,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'background 0.15s', zIndex: 1,
  };
}
