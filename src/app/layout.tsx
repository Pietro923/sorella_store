import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import ToastProvider from '@/components/ui/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mi E-commerce - Los mejores productos',
  description: 'Encuentra los mejores productos al mejor precio',
  keywords: 'ecommerce, productos, ventas, whatsapp',
  openGraph: {
    title: 'Mi E-commerce',
    description: 'Los mejores productos al mejor precio',
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
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <ToastProvider />
      </body>
    </html>
  );
}