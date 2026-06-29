/**
 * Google Ads + GA4 Unified Tracking Library
 *
 * Google Ads ID : AW-18092736793
 * Conversion Labels:
 *   - Form Gönderimi   : ulmICNSo-KEcEJmCpbND
 *   - WhatsApp Tıklama : (Google Ads'den edinilecek label eklenecek)
 *   - Telefon Tıklama  : (Google Ads'den edinilecek label eklenecek)
 *
 * Bu dosyayı değiştirme — tüm event'ler buradan merkezi yönetilir.
 */

// ─── Sabitler ────────────────────────────────────────────────────────────────
export const GADS_ID = 'AW-18092736793';

// Google Ads Conversion Labels — Google Ads panelinden edinilir
export const CONV = {
  FORM_SUBMIT:     `${GADS_ID}/ulmICNSo-KEcEJmCpbND`,  // Form gönderimi
  WHATSAPP_CLICK:  `${GADS_ID}/whatsapp_label`,           // Ayarla: kendi label'ını yaz
  PHONE_CLICK:     `${GADS_ID}/phone_label`,              // Ayarla: kendi label'ını yaz
} as const;

// ─── TypeScript tip tanımları ─────────────────────────────────────────────────
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    clarity?: (method: string, ...args: unknown[]) => void;
  }
}

// ─── Yardımcı: gtag hazır mı? ─────────────────────────────────────────────────
const isGtagReady = () =>
  typeof window !== 'undefined' && typeof window.gtag === 'function';

// ─── Düşük seviye event gönderici ─────────────────────────────────────────────
export const gtagEvent = (
  action: string,
  params: Record<string, unknown> = {}
) => {
  if (!isGtagReady()) return;
  window.gtag('event', action, params);
};

// ─── FORM GÖNDERİMİ ───────────────────────────────────────────────────────────
/**
 * Hero formu, iletişim formu veya herhangi bir teklif formu gönderildiğinde çağrılır.
 *
 * GA4 event adı  : generate_lead
 * Google Ads conv: ulmICNSo-KEcEJmCpbND
 */
export const trackFormSubmit = (params?: { form_type?: string; product?: string }) => {
  if (!isGtagReady()) return;

  // GA4 + Google Ads standart "generate_lead" eventi
  window.gtag('event', 'generate_lead', {
    send_to: CONV.FORM_SUBMIT,
    form_type: params?.form_type ?? 'quote_form',
    product_name: params?.product ?? '',
    currency: 'TRY',
  });

  // Ayrıca GA4'e saf event (eğer ileride GA4 eklenirse)
  window.gtag('event', 'form_submit', {
    event_category: 'conversion',
    form_type: params?.form_type ?? 'quote_form',
  });
};

// ─── WHATSAPP TIKLAMA ─────────────────────────────────────────────────────────
/**
 * Herhangi bir WhatsApp butonuna tıklandığında çağrılır.
 *
 * GA4 event adı  : whatsapp_click
 * Google Ads conv: whatsapp_label (güncelle)
 */
export const trackWhatsAppClick = (params?: { source?: string; product?: string }) => {
  if (!isGtagReady()) return;

  // GA4 standart "contact" eventi
  window.gtag('event', 'contact', {
    method: 'whatsapp',
    source: params?.source ?? 'floating_button',
    product_name: params?.product ?? '',
  });

  // Özel event (Tag Assistant'ta görünür)
  window.gtag('event', 'whatsapp_click', {
    event_category: 'engagement',
    event_label: params?.source ?? 'WhatsApp Button',
    source: params?.source ?? 'floating_button',
  });

  // Google Ads dönüşümü (label'ı güncelleyin)
  // window.gtag('event', 'conversion', { send_to: CONV.WHATSAPP_CLICK });
};

// ─── TELEFON TIKLAMA ──────────────────────────────────────────────────────────
/**
 * Herhangi bir telefon linkine tıklandığında çağrılır.
 *
 * GA4 event adı  : phone_click
 * Google Ads conv: phone_label (güncelle)
 */
export const trackPhoneClick = (params?: { source?: string }) => {
  if (!isGtagReady()) return;

  // GA4 standart "contact" eventi
  window.gtag('event', 'contact', {
    method: 'phone',
    source: params?.source ?? 'header',
  });

  // Özel event (Tag Assistant'ta görünür)
  window.gtag('event', 'phone_click', {
    event_category: 'engagement',
    event_label: params?.source ?? 'Phone Link',
    source: params?.source ?? 'header',
    phone_number: '+905319308500',
  });

  // Google Ads dönüşümü (label'ı güncelleyin)
  // window.gtag('event', 'conversion', { send_to: CONV.PHONE_CLICK });
};

// ─── TEKLİF TALEBİ (eski adıyla quote_request) ────────────────────────────────
/** Ürün detay sayfasındaki "Teklif Al" butonu */
export const trackQuoteRequest = (params?: { product?: string }) => {
  if (!isGtagReady()) return;

  window.gtag('event', 'begin_checkout', {
    event_category: 'engagement',
    product_name: params?.product ?? '',
  });

  window.gtag('event', 'quote_request', {
    event_category: 'engagement',
    event_label: params?.product ?? 'Quote Button',
  });
};

// ─── SAYFA GÖRÜNTÜLENMESİ (SPA geçişleri için) ───────────────────────────────
export const pageview = (url: string) => {
  if (!isGtagReady()) return;
  window.gtag('config', GADS_ID, { page_path: url });
};

// ─── Microsoft Clarity: özel etiket ───────────────────────────────────────────
export const clarityTag = (key: string, value: string) => {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('set', key, value);
  }
};
