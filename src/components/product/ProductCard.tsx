'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Modelos compatibles */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {product.model.slice(0, 2).map((model) => (
              <Badge key={model} variant="secondary" className="text-xs">
                {model}
              </Badge>
            ))}
            {product.model.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{product.model.length - 2} más
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <div className="text-xs text-muted-foreground">
            Stock: {product.stock}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
        </Button>
      </CardFooter>
    </Card>
  );
}