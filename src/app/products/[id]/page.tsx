import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/product/ProductDetail';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await params en Next.js 15
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}