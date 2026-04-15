'use client';

// Google Ads Conversion ID
export const AW_ID = 'AW-18092736793';

// WhatsApp Click Conversion
export function trackWhatsAppClick() {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
            send_to: `${AW_ID}/whatsapp_click`,
        });
    }
}

// Form Submission Conversion
export function trackFormSubmit() {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
            send_to: `${AW_ID}/form_submit`,
        });
    }
}
