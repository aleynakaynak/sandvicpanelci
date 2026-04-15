import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsapp from '@/components/FloatingWhatsapp';
import * as store from '@/lib/store';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sandviç Panelci - İnşaat ve Yalıtım Malzemeleri",
  description: "En uygun çatı ve cephe kaplama ürünleri, ısı yalıtımı, su yalıtımı ve yapı malzemeleri.",
};

const AW_ID = 'AW-18092736793';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await store.getSettings();
  const menuData = settings.headerMenu || [];

  return (
    <html lang="tr">
      <head>
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
              gtag('config', '${AW_ID}');
            `,
          }}
        />
      </head>
      <body className={roboto.className}>
        <Header menuData={menuData} />
        <main>
          {children}
        </main>
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
