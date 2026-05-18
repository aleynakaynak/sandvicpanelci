'use client';

import { useActionState, useState, useEffect } from 'react';
import { Calculator, Send, CheckCircle2, AlertCircle, RotateCcw, Phone } from 'lucide-react';
import { submitQuoteRequest } from '@/app/urunler/actions';
import type { QuoteFormState, ProductDetail, ProductVariant } from '@/lib/types/product.types';

interface Props {
  product: ProductDetail;
  /** ProductDetailPanel'den gelen senkronize varyant seçimi */
  selectedVariant?: ProductVariant | null;
}

const INITIAL_STATE: QuoteFormState = { status: 'idle', message: '' };

const RAL_COLORS = [
  'RAL 9002 (Gri Beyaz)', 'RAL 9006 (Beyaz Alüminyum)',
  'RAL 3009 (Oksit Kırmızı)', 'RAL 5010 (Boncuk Mavisi)',
  'RAL 6005 (Yosun Yeşili)', 'RAL 7016 (Antrasit Gri)',
  'RAL 7024 (Grafit Gri)', 'RAL 8017 (Çikolata Kahvesi)',
  'RAL 1015 (Açık Fildişi)', 'Özel RAL (Belirtin)',
];

export default function QuoteRequestForm({ product, selectedVariant }: Props) {
  const [state, formAction, isPending] = useActionState(submitQuoteRequest, INITIAL_STATE);

  // Metraj hesaplama
  const [lengthM,  setLengthM]  = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);   // adet

  // Seçili renkten RAL otomatik doldur
  const [ralColor, setRalColor] = useState<string>(selectedVariant?.ral_color ?? '');

  // selectedVariant değişince RAL'i güncelle
  useEffect(() => {
    if (selectedVariant?.ral_color) setRalColor(selectedVariant.ral_color);
  }, [selectedVariant?.ral_color]);

  // Toplam m² = Boy (m) × Panel eni (1m varsayılan) × Adet
  const panelWidthM = selectedVariant?.width_mm ? selectedVariant.width_mm / 1000 : 1;
  const quantityM2  = +(lengthM * panelWidthM * quantity).toFixed(2);

  // Başarıda formu sıfırla
  useEffect(() => {
    if (state.status === 'success') {
      setLengthM(0);
      setQuantity(1);
    }
  }, [state.status]);

  const variantLabel = selectedVariant?.variant_label
    ?? product.variants[0]?.variant_label
    ?? '';

  return (
    <div style={{
      background: '#fff', border: '1px solid #eee',
      borderRadius: 12, overflow: 'hidden',
    }}>

      {/* ── Başlık ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 20px', background: '#1c1c1c', color: '#fff',
      }}>
        <Send size={15} color="#d32f2f" />
        <span style={{ fontWeight: 800, fontSize: 14 }}>Metrajlı Teklif Al</span>
      </div>

      {/* ── Başarı mesajı ── */}
      {state.status === 'success' && (
        <div style={{
          padding: '20px 22px', background: '#f0fdf4',
          borderBottom: '1px solid #bbf7d0',
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          <CheckCircle2 size={22} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: '#15803d' }}>Talebiniz Alındı!</p>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#166534', lineHeight: 1.5 }}>
              {state.message}
            </p>
            <a href="tel:+905319308500" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10,
              fontSize: 13, fontWeight: 800, color: '#15803d', textDecoration: 'none',
            }}>
              <Phone size={13} /> 0531 930 85 00 (Acil için)
            </a>
          </div>
        </div>
      )}

      {/* ── Hata mesajı ── */}
      {state.status === 'error' && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '11px 22px', background: '#fff5f5', borderBottom: '1px solid #fecaca',
        }}>
          <AlertCircle size={15} color="#dc2626" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: 13, color: '#dc2626', fontWeight: 600 }}>{state.message}</p>
        </div>
      )}

      <form action={formAction} style={{ padding: '18px 20px' }}>
        {/* Gizli alanlar */}
        <input type="hidden" name="product_id"    value={product.id} />
        <input type="hidden" name="product_name"  value={product.name} />
        <input type="hidden" name="variant_label" value={variantLabel} />
        <input type="hidden" name="quantity_m2"   value={quantityM2} />
        <input type="hidden" name="thickness_mm"  value={selectedVariant?.thickness_mm ?? ''} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* ── Seçili varyant özeti (okunabilir) ── */}
          {variantLabel && (
            <div style={{
              background: '#f9f9f9', border: '1px solid #f0f0f0',
              borderRadius: 8, padding: '10px 14px',
              fontSize: 12, color: '#555', fontWeight: 600,
            }}>
              <span style={{ color: '#aaa' }}>Seçili Ürün:</span>{' '}
              <strong style={{ color: '#111' }}>{variantLabel}</strong>
            </div>
          )}

          {/* ── Metraj hesaplama kutusu ── */}
          <div style={{
            background: '#f9f9f9', border: '1px dashed #e0e0e0',
            borderRadius: 8, padding: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <Calculator size={13} color="#d32f2f" />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#555', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Metraj Hesapla
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={S.label}>Boy (metre)</label>
                <input
                  type="number" min={0} step={0.1} name="length_m"
                  value={lengthM || ''} placeholder="0.00"
                  onChange={e => setLengthM(+e.target.value)}
                  style={S.input}
                />
              </div>
              <div>
                <label style={S.label}>Adet</label>
                <input
                  type="number" min={1} step={1} name="quantity_pcs"
                  value={quantity || ''} placeholder="1"
                  onChange={e => setQuantity(+e.target.value)}
                  style={S.input}
                />
              </div>
            </div>

            {/* Canlı m² sonucu */}
            {quantityM2 > 0 && (
              <div style={{
                marginTop: 12, padding: '10px 14px',
                background: '#fff3f3', borderRadius: 6,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <span style={{ fontSize: 11, color: '#999', display: 'block' }}>Toplam Metraj</span>
                  <span style={{ fontSize: 22, fontWeight: 900, color: '#d32f2f' }}>
                    {quantityM2.toLocaleString('tr-TR')} m²
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 11, color: '#999', display: 'block' }}>
                    {quantity} adet × {lengthM}m × {panelWidthM}m
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ── RAL Rengi (varyant seçiminden otomatik gelir) ── */}
          <div>
            <label style={S.label}>RAL Rengi</label>
            <select
              name="ral_color"
              value={ralColor}
              onChange={e => setRalColor(e.target.value)}
              style={S.input}
            >
              <option value="">Renk seçiniz (opsiyonel)</option>
              {RAL_COLORS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '2px 0' }} />

          {/* ── Müşteri bilgileri ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={S.label}>Ad Soyad *</label>
              <input type="text" name="customer_name" required placeholder="Ad Soyad" style={S.input} />
            </div>
            <div>
              <label style={S.label}>Telefon *</label>
              <input type="tel" name="customer_phone" required placeholder="05XX XXX XX XX" style={S.input} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={S.label}>E-posta</label>
              <input type="email" name="customer_email" placeholder="ornek@firma.com" style={S.input} />
            </div>
            <div>
              <label style={S.label}>Şehir</label>
              <input type="text" name="city" placeholder="İstanbul" style={S.input} />
            </div>
          </div>

          <div>
            <label style={S.label}>Firma Adı</label>
            <input type="text" name="company_name" placeholder="Firma Adı (opsiyonel)" style={S.input} />
          </div>

          <div>
            <label style={S.label}>Notlar</label>
            <textarea
              name="notes" rows={3}
              placeholder="Özel istekler, proje detayları..."
              style={{ ...S.input, resize: 'vertical' as const }}
            />
          </div>

          {/* ── Gönder butonu ── */}
          <button
            type="submit" disabled={isPending}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '13px',
              background: isPending ? '#bbb' : '#d32f2f',
              color: '#fff', border: 'none', borderRadius: 8,
              fontSize: 14, fontWeight: 800,
              cursor: isPending ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s, transform 0.15s',
            }}
          >
            {isPending
              ? <><RotateCcw size={14} style={{ animation: 'qrf-spin 1s linear infinite' }} /> Gönderiliyor...</>
              : <><Send size={14} /> Teklif Talep Et</>
            }
          </button>

          <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', margin: 0 }}>
            Bilgileriniz gizli tutulur · En geç 24 saat içinde dönüş yapılır.
          </p>
        </div>
      </form>

      <style>{`
        @keyframes qrf-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        input:focus, select:focus, textarea:focus {
          outline: none !important;
          border-color: #d32f2f !important;
          box-shadow: 0 0 0 3px rgba(211,47,47,0.08) !important;
        }
      `}</style>
    </div>
  );
}

// ── Stil sabitleri ────────────────────────────────────────────
const S = {
  input: {
    width: '100%', padding: '9px 12px',
    border: '1px solid #e0e0e0', borderRadius: 6,
    fontSize: 13, color: '#222', background: '#fff',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.15s, box-shadow 0.15s',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  label: {
    display: 'block', fontSize: 11, fontWeight: 700,
    color: '#555', textTransform: 'uppercase' as const,
    letterSpacing: 0.5, marginBottom: 5,
  } as React.CSSProperties,
};
