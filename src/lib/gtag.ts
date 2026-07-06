/**
 * Google Tag Manager (GTM) Unified Tracking Library
 * 
 * Bu dosyayı değiştirme — tüm event'ler buradan merkezi yönetilir.
 */

// ─── TypeScript tip tanımları ─────────────────────────────────────────────────
declare global {
  interface Window {
    clarity?: (method: string, ...args: unknown[]) => void;
  }
}

// ─── Düşük seviye event gönderici ─────────────────────────────────────────────
export const dataLayerPush = (eventData: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(eventData);
  }
};

// ─── FORM GÖNDERİMİ ───────────────────────────────────────────────────────────
export const trackFormSubmit = (params?: { form_type?: string; product?: string }) => {
  dataLayerPush({
    event: 'lead_form_submit',
    form_type: params?.form_type ?? 'quote_form',
    product_name: params?.product ?? '',
  });
};

// ─── WHATSAPP TIKLAMA ─────────────────────────────────────────────────────────
export const trackWhatsAppClick = (params?: { source?: string; product?: string }) => {
  dataLayerPush({
    event: 'whatsapp_click',
    source: params?.source ?? 'floating_button',
    product_name: params?.product ?? '',
  });
};

// ─── TELEFON TIKLAMA ──────────────────────────────────────────────────────────
export const trackPhoneClick = (params?: { source?: string }) => {
  dataLayerPush({
    event: 'phone_click',
    source: params?.source ?? 'header',
  });
};

// ─── TEKLİF TALEBİ ────────────────────────────────────────────────────────────
export const trackQuoteRequest = (params?: { product?: string }) => {
  dataLayerPush({
    event: 'quote_button_click',
    product_name: params?.product ?? '',
  });
};

// ─── ÜRÜN GÖRÜNTÜLEME (product_detail_view) ──────────────────────────────────
export const trackProductDetailView = (params?: { product_name: string; category?: string }) => {
  dataLayerPush({
    event: 'product_detail_view',
    product_name: params?.product_name ?? '',
    category: params?.category ?? '',
  });
};

// ─── Microsoft Clarity: özel etiket ───────────────────────────────────────────
export const clarityTag = (key: string, value: string) => {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('set', key, value);
  }
};

