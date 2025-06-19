// src/app/products/[id]/page.tsx
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/product/ProductDetail';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}