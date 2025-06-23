'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCartStore } from '@/lib/store';
import { getProductImage } from '@/lib/cloudinary';
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
      <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#efecdd' }}>
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full rounded-lg border-4 border-black" />
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
    <div className="min-h-screen py-16" style={{ backgroundColor: '#efecdd' }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen */}
          <div className="aspect-square relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_#282828]">
            <Image
              src={getProductImage(product.image, 'detail')}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <Badge 
                className="mb-4 font-bold border-2 border-black shadow-sm"
                style={{ backgroundColor: '#9d1d25', color: 'white' }}
              >
                {product.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#282828' }}>
                {product.name}
              </h1>
              <p className="text-lg mb-6 font-medium leading-relaxed" style={{ color: '#9d1d25' }}>
                {product.description}
              </p>
              <p className="text-5xl font-black mb-6" style={{ color: '#9d1d25' }}>
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Modelos compatibles */}
            <Card className="border-4 border-black shadow-[6px_6px_0px_0px_#282828] bg-white">
              <CardHeader style={{ backgroundColor: '#efecdd' }}>
                <CardTitle className="text-xl font-black flex items-center gap-3" style={{ color: '#282828' }}>
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center border-2 border-black"
                    style={{ backgroundColor: '#9d1d25' }}
                  >
                    <Smartphone className="h-5 w-5 text-white" />
                  </div>
                  MODELOS COMPATIBLES
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="flex flex-wrap gap-2">
                  {product.model.map((model) => (
                    <Badge 
                      key={model} 
                      className="text-sm font-bold border-2 border-black shadow-sm bg-gray-100"
                      style={{ color: '#282828' }}
                    >
                      {model}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Características */}
            <Card className="border-4 border-black shadow-[6px_6px_0px_0px_#282828] bg-white">
              <CardHeader style={{ backgroundColor: '#efecdd' }}>
                <CardTitle className="text-xl font-black" style={{ color: '#282828' }}>
                  CARACTERÍSTICAS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 bg-white">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium" style={{ color: '#9d1d25' }}>Material:</span>
                  <span className="font-black" style={{ color: '#282828' }}>TPU rígido</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium" style={{ color: '#9d1d25' }}>Protección:</span>
                  <span className="font-black" style={{ color: '#282828' }}>Bordes reforzados</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium" style={{ color: '#9d1d25' }}>Compatibilidad:</span>
                  <span className="font-black" style={{ color: '#282828' }}>{product.model.length} modelos</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium" style={{ color: '#9d1d25' }}>Stock:</span>
                  <span 
                    className="font-black"
                    style={{ color: product.stock < 5 ? '#be3a47' : '#282828' }}
                  >
                    {product.stock} unidades
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Agregar al carrito */}
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <span className="font-black text-lg" style={{ color: '#282828' }}>CANTIDAD:</span>
                <div className="flex items-center border-4 border-black shadow-[4px_4px_0px_0px_#282828] bg-white">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-none border-r-2 border-black hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-5 w-5" style={{ color: '#282828' }} />
                  </Button>
                  <div className="w-16 h-12 flex items-center justify-center text-xl font-black bg-white" style={{ color: '#282828' }}>
                    {quantity}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-none border-l-2 border-black hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-5 w-5" style={{ color: '#282828' }} />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full h-16 text-xl font-black border-4 border-black shadow-[6px_6px_0px_0px_#282828] hover:shadow-[8px_8px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1"
                style={{ 
                  backgroundColor: product.stock === 0 ? '#be3a47' : '#9d1d25', 
                  color: 'white' 
                }}
              >
                <ShoppingCart className="mr-3 h-6 w-6" />
                {product.stock === 0 ? 'SIN STOCK' : 'AGREGAR AL CARRITO'}
              </Button>

              {product.stock < 5 && product.stock > 0 && (
                <div 
                  className="text-center p-4 border-3 border-black shadow-[4px_4px_0px_0px_#282828] font-bold"
                  style={{ backgroundColor: '#be3a47', color: 'white' }}
                >
                  ¡QUEDAN POCAS UNIDADES! SOLO {product.stock} EN STOCK
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}