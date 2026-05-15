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

const AW_ID = 'AW-18092736793';

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
        {/* Preconnect for font performance (LCP improvement) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Hero görselini önceden yükle – LCP iyileştirmesi */}
        <link
          rel="preload"
          as="image"
          href="/images/sandvic-panel-hero.png"
          fetchPriority="high"
        />

        {/* ── Google Ads Base Tag ── */}
        <Script
          id="google-ads-gtag-js"
          src={`https://www.googletagmanager.com/gtag/js?id=${AW_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${AW_ID}', { send_page_view: true });
            `,
          }}
        />
      </head>
      <body className={roboto.className}>
        <Header categories={categories} />
        <main>
          {children}
        </main>
        <Footer categories={categories} settings={settings} />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
