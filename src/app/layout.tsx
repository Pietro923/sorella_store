import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ToastProvider from '@/components/ui/toast-provider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Mejora la carga de fuentes
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sorella-store.vercel.app/'),
  title: {
    default: 'Sorella Store - Fundas con Estilo',
    template: '%s | Sorella Store'
  },
  description: 'Fundas con la mejor onda. Con Protección y estilo únicos. Envío rápido en Tucumán.',
  keywords: [
    'fundas iphone',
    'protección iphone',
    'accesorios iphone',
    'tucuman',
    'fundas con estilo',
    'sorella store',
    'fundas iphone tucuman',
    'accesorios celular'
  ],
  authors: [{ name: 'Sorella Store' }],
  creator: 'Sorella Store',
  publisher: 'Sorella Store',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://sorella-store.vercel.app/',
    siteName: 'Sorella Store',
    title: 'Sorella Store - Fundas con Estilo',
    description: 'Fundas con la mejor onda. Con Protección y estilo únicos.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sorella Store - Fundas con Estilo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sorella Store - Fundas con Estilo',
    description: 'Fundas con la mejor onda. Con Protección y estilo únicos.',
    images: ['/og-image.jpg'],
    creator: '@sorella_sstore',
  },
  verification: {
    google: 'u39oi5ysVhgWcHjKNj87i9TK5Ko34808YGTQ0er3vSw', // ✅ TU CÓDIGO REAL
  },
  alternates: {
    canonical: 'https://sorella-store.vercel.app/',
  },
  category: 'Accesorios para smartphones',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <head>
        {/* Favicons mejorados */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Meta tags adicionales */}
        <meta name="theme-color" content="#9d1d25" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Preconexiones para mejor performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        
        {/* Schema.org JSON-LD para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "Sorella Store",
              "description": "Fundas con la mejor onda. Con Protección y estilo únicos",
              "url": "https://sorella-store.vercel.app/",
              "logo": "https://sorella-store.vercel.app/sorella_logo_principal_c-fondo.png",
              "image": "https://sorella-store.vercel.app/og-image.jpg",
              "telephone": "+543814199442",
              "email": "jpbonacossa@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Miguel de Tucumán",
                "addressRegion": "Tucumán",
                "addressCountry": "AR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-26.8241",
                "longitude": "-65.2226"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday", 
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "20:00"
              },
              "sameAs": [
                "https://www.instagram.com/sorella_sstore/",
                "https://wa.me/543814199442"
              ],
              "priceRange": "$$$",
              "paymentAccepted": ["Efectivo", "Transferencia", "Mercado Pago"],
              "currenciesAccepted": "ARS"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Skip to content para accesibilidad */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        >
          Ir al contenido principal
        </a>
        
        <Header />
        
        <main 
          id="main-content"
          className="min-h-screen" 
          style={{ backgroundColor: '#efecdd' }}
        >
          {children}
        </main>
        
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}