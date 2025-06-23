import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ToastProvider from '@/components/ui/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://sorella-store.vercel.app/'), // Cambia por tu dominio real
  title: 'Sorella Store - Fundas Premium para iPhone',
  description: 'Fundas exclusivas para iPhone. Protección y estilo únicos. Envío rápido en Tucumán.',
  keywords: 'fundas iphone, protección iphone, accesorios iphone, tucuman',
  openGraph: {
    title: 'Sorella Store - Fundas Premium para iPhone',
    description: 'Fundas exclusivas para iPhone. Protección y estilo únicos.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sorella Store - Fundas Premium para iPhone',
    description: 'Fundas exclusivas para iPhone. Protección y estilo únicos.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen" style={{ backgroundColor: '#efecdd' }}>
          {children}
        </main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}