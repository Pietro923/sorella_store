'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCartStore } from '@/lib/store';
import { Product } from '@/types';
import Image from 'next/image';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
    toast.success(`${quantity} ${product.name} agregado${quantity > 1 ? 's' : ''} al carrito`);
    setQuantity(1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>
              <Skeleton className="h-12 w-1/2" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-20" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-6 w-8" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="aspect-square relative overflow-hidden rounded-lg border">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {product.description}
            </p>
            <p className="text-4xl font-bold text-primary mb-4">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Modelos compatibles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Modelos Compatibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {product.model.map((model) => (
                  <Badge key={model} variant="outline" className="text-sm">
                    {model}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Características */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Características</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Material:</span>
                <span className="font-medium">TPU rígido</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Protección:</span>
                <span className="font-medium">Bordes reforzados</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Compatibilidad:</span>
                <span className="font-medium">{product.model.length} modelos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stock:</span>
                <span className={`font-medium ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                  {product.stock} unidades
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Agregar al carrito */}
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
                <span className="text-lg font-medium w-12 text-center">
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

            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </Button>

            {product.stock < 5 && product.stock > 0 && (
              <p className="text-sm text-orange-600 text-center">
                ¡Quedan pocas unidades! Solo {product.stock} en stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}