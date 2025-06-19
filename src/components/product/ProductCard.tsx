'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  // En ProductCard.tsx
const handleAddToCart = () => {
  addItem(product);
  toast.success(`${product.name} agregado al carrito`);
};

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-2xl font-bold text-primary">
          {formatPrice(product.price)}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
        </Button>
      </CardFooter>
    </Card>
  );
}