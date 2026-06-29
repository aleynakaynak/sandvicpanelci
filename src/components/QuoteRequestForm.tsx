'use client';

import { Phone, MessageCircle, Info } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneClick } from '@/lib/gtag';
import type { ProductDetail, ProductVariant } from '@/lib/types/product.types';

interface Props {
  product: ProductDetail;
  /** ProductDetailPanel'den gelen senkronize varyant seçimi */
  selectedVariant?: ProductVariant | null;
}

export default function QuoteRequestForm({ product, selectedVariant }: Props) {
  const variantLabel = selectedVariant?.variant_label
    ?? product.variants[0]?.variant_label
    ?? '';

  // WhatsApp için özel mesaj oluşturma
  const whatsappNumber = '905319308500';
  const messageText = selectedVariant
    ? `Merhaba, web sitenizden "${product.name}" (${variantLabel}) ürünü için fiyat teklifi almak istiyorum.`
    : `Merhaba, web sitenizden "${product.name}" ürünü için fiyat teklifi almak istiyorum.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

  return (
    <div style={{
      background: '#fff', 
      border: '1px solid #eee',
      borderRadius: 12, 
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
    }}>

      {/* ── Başlık ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '16px 20px', background: '#1c1c1c', color: '#fff',
      }}>
        <MessageCircle size={16} color="#d32f2f" style={{ flexShrink: 0 }} />
        <span style={{ fontWeight: 800, fontSize: 14, letterSpacing: 0.5, textTransform: 'uppercase' }}>Hızlı Teklif & İletişim</span>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* ── Seçili varyant özeti ── */}
          <div style={{
            background: '#f9f9f9', 
            border: '1px solid #f0f0f0',
            borderRadius: 8, 
            padding: '12px 14px',
            fontSize: 13, 
            color: '#555', 
            fontWeight: 600,
          }}>
            <span style={{ color: '#aaa', fontSize: 11, display: 'block', textTransform: 'uppercase', marginBottom: 2, letterSpacing: 0.5 }}>Seçilen Ürün</span>
            <strong style={{ color: '#111', fontSize: 15 }}>{product.name}</strong>
            {variantLabel && (
              <span style={{ display: 'block', fontSize: 12, color: '#d32f2f', marginTop: 4, fontWeight: 700 }}>
                {variantLabel}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#666', lineHeight: 1.5 }}>
            <Info size={16} color="#d32f2f" style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Fiyatlar; metraj, kalınlık, RAL rengi ve teslimat yerine göre değişiklik göstermektedir. Hemen iletişime geçerek güncel fiyat teklifinizi alın.</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '4px 0' }} />

          {/* ── Yönlendirme Butonları ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="quote-btn whatsapp-btn"
              onClick={() => trackWhatsAppClick({ source: 'product_detail_form', product: product.name })}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                width: '100%', padding: '14px',
                background: '#25d366',
                color: '#fff', border: 'none', borderRadius: 8,
                fontSize: 15, fontWeight: 800,
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(37,211,102,0.2)',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
            >
              <MessageCircle size={18} />
              WhatsApp ile Teklif Al
            </a>

            {/* Telefon Arama */}
            <a
              href="tel:+905319308500"
              className="quote-btn phone-btn"
              onClick={() => trackPhoneClick({ source: 'product_detail_form' })}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                width: '100%', padding: '14px',
                background: '#d32f2f',
                color: '#fff', border: 'none', borderRadius: 8,
                fontSize: 15, fontWeight: 800,
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(211,47,47,0.2)',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
            >
              <Phone size={16} />
              Müşteri Temsilcisini Ara
            </a>
          </div>

          <div style={{ textAlign: 'center', marginTop: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#333', display: 'block' }}>
              İletişim Hattı: 0531 930 85 00
            </span>
            <span style={{ fontSize: 11, color: '#aaa', display: 'block', marginTop: 4 }}>
              Hafta İçi ve Cumartesi: 08:30 - 18:00
            </span>
          </div>

        </div>
      </div>

      <style>{`
        .quote-btn {
          transition: transform 0.2s, filter 0.2s;
        }
        .quote-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }
        .quote-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
