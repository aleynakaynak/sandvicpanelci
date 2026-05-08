export const GA_TRACKING_ID = 'AW-18092736793';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value, send_to }: { action: string, category?: string, label?: string, value?: number, send_to?: string }) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      send_to: send_to
    });
  }
};

export const trackWhatsAppClick = () => {
  event({
    action: 'whatsapp_click',
    category: 'engagement',
    label: 'WhatsApp Button'
  });
};

export const trackFormSubmit = () => {
  // Specific Google Ads Conversion Event
  event({
    action: 'conversion',
    send_to: 'AW-18092736793/ulmICNSo-KEcEJmCpbND',
  });
};

export const trackQuoteRequest = () => {
  event({
    action: 'quote_request',
    category: 'engagement',
    label: 'Quote Button'
  });
};
