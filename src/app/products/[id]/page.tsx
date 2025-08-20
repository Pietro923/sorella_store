// src/app/products/[id]/page.tsx - REEMPLAZAR COMPLETO:

import { notFound } from 'next/navigation';
import ProductDetail from '@/components/product/ProductDetail';
import { getProductsFromSheets } from '@/lib/sheets';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await params en Next.js 15
  const { id } = await params;
  
  try {
    // ✅ USAR GOOGLE SHEETS API EN VEZ DE DATA HARDCODEADO
    const products = await getProductsFromSheets();
    const product = products.find(p => p.id === id);

    if (!product) {
      notFound();
    }

    return <ProductDetail product={product} />;
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}