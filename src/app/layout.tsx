import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsapp from '@/components/FloatingWhatsapp';
import { getCategories, getSettings } from '@/lib/store';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sandviç Panel Satışı ve Montajı | Sandviç Panelci",
  description: "Türkiye genelinde sandviç panel satışı ve montajı. Çatı ve cephe kaplama, ısı yaltımı, su yaltımı. Hemen teklif alın!",
  keywords: "sandviç panel satışı, sandviç panel montajı, sandviç panel fiyatları, çatı paneli, cephe paneli, sandviç panelci, izmir sandviç panel",
  openGraph: {
    title: "Sandviç Panel Satışı ve Montajı | Sandviç Panelci",
    description: "Türkiye genelinde sandviç panel satışı ve montajı. Hemen teklif al!",
    type: 'website',
    locale: 'tr_TR',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// ─── Tracking ID'leri ───────────────────────────────────────────────────────
const GADS_ID = 'AW-18092736793';

// Microsoft Clarity — clarity.microsoft.com üzerinden proje oluşturup ID'yi buraya ekleyin
// Örnek: const CLARITY_ID = 'abc123def4';
const CLARITY_ID = 'xenna7awq5';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const settings = await getSettings();

  return (
    <html lang="tr">
      <head>
        <link rel="canonical" href="https://www.sandvicpanelyapi.com.tr" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Hero görselini önceden yükle – LCP iyileştirmesi */}
        <link
          rel="preload"
          as="image"
          href="/images/sandvic-panel-hero.png"
          fetchPriority="high"
        />

        {/* ──────────────────────────────────────────────────────────────────
            CONSENT MODE v2 — GDPR / KVKK uyumu
            Türkiye merkezli site olduğundan varsayılan olarak granted.
            AB ülkelerinden kullanıcı gelirse deny yapılabilir.
        ─────────────────────────────────────────────────────────────────── */}
        <Script
          id="consent-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Consent Mode v2 — varsayılan izinler (Türkiye kullanıcıları)
              gtag('consent', 'default', {
                'ad_storage':              'granted',
                'ad_user_data':            'granted',
                'ad_personalization':      'granted',
                'analytics_storage':       'granted',
                'functionality_storage':   'granted',
                'personalization_storage': 'granted',
                'security_storage':        'granted',
                'wait_for_update':         500
              });

              // Enhanced Conversions etkinleştirme
              gtag('set', 'ads_data_redaction', false);
              gtag('set', 'allow_enhanced_conversions', true);
            `,
          }}
        />

        {/* ── Google Ads gtag.js yükleyici ── */}
        <Script
          id="gads-gtag-js"
          src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
          strategy="afterInteractive"
        />

        {/* ── Google Ads başlatıcı ── */}
        <Script
          id="gads-gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Google Ads hesabı
              gtag('config', '${GADS_ID}', {
                send_page_view: true,
                allow_enhanced_conversions: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `,
          }}
        />

        {/* ── Microsoft Clarity (ID girildiğinde otomatik aktif) ── */}
        {CLARITY_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window,document,"clarity","script","${CLARITY_ID}");
              `,
            }}
          />
        )}
      </head>
      <body className={roboto.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer categories={categories} settings={settings} />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
