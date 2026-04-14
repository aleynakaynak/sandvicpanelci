import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch settings for dynamic menu
  const settings = await store.getSettings();
  const menuData = settings.headerMenu || [];

  return (
    <html lang="tr">
      <body className={roboto.className}>
        {/* Pass menuData to Header */}
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
