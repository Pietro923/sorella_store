// src/components/product/ProductDetail.tsx
'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store';
import { Product } from '@/types';
import Image from 'next/image';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {product.description}
            </p>
            <p className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Cantidad:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Stock disponible: {product.stock} unidades
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}