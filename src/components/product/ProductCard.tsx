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

const getProductImage = (imageSource: string): string => {
 // Si ya es URL completa de Google Drive, usarla
 if (imageSource.startsWith('https://drive.google.com/uc?id=')) {
   return imageSource;
 }
 
 // Si es URL en formato /file/d/, convertirla
 if (imageSource.includes('drive.google.com/file/d/')) {
   const fileIdMatch = imageSource.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
   if (fileIdMatch) {
     const fileId = fileIdMatch[1];
     return `https://drive.google.com/uc?id=${fileId}`;
   }
 }
 
 // Fallback: placeholder local
 return '/placeholder.png';
};

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

  // Función para formatear los nombres de modelos
  const formatModelName = (model: string) => {
    return model.replace('iPhone ', '');
  };

  return (
    <Card className="overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_#282828] hover:shadow-[12px_12px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-2 hover:-translate-x-1 group p-0" style={{ backgroundColor: '#efecdd' }}>
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative overflow-hidden border-b-4 border-black">
          <Image
            src={getProductImage(product.image)}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Efecto vintage overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      
      <CardContent className="p-4" style={{ backgroundColor: '#efecdd' }}>
        <Link href={`/products/${product.id}`}>
          <h3 
            className="font-black text-lg mb-2 hover:text-red-600 transition-colors line-clamp-1 transform group-hover:-rotate-1"
            style={{ color: '#282828' }}
          >
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm mb-3 line-clamp-2 font-medium" style={{ color: '#9d1d25' }}>
          {product.description}
        </p>
        
        {/* Modelos compatibles - TODOS VISIBLES */}
        <div className="mb-3">
          <p className="text-xs font-black mb-2" style={{ color: '#282828' }}>
            DISPONIBLE EN:
          </p>
          <div className="flex flex-wrap gap-1">
            {product.model.map((model) => (
              <Badge 
                key={model} 
                className="text-xs font-bold border-2 border-black shadow-sm"
                style={{ backgroundColor: 'white', color: '#282828' }}
              >
                {formatModelName(model)}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p 
            className="text-2xl font-black transform group-hover:scale-110 transition-transform"
            style={{ color: '#9d1d25' }}
          >
            {formatPrice(product.price)}
          </p>
          <div 
            className="text-xs font-bold px-2 py-1 rounded-full border-2 border-black"
            style={{ 
              backgroundColor: product.stock > 5 ? '#efecdd' : '#be3a47', 
              color: product.stock > 5 ? '#282828' : 'white'
            }}
          >
            Stock: {product.stock}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0" style={{ backgroundColor: '#efecdd' }}>
        <Button 
          className="w-full font-black text-lg py-3 border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:transform-none disabled:hover:shadow-[4px_4px_0px_0px_#282828]"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          style={{ 
            backgroundColor: product.stock === 0 ? '#be3a47' : '#9d1d25', 
            color: 'white' 
          }}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {product.stock === 0 ? ' SIN STOCK' : ' AGREGAR AL CARRITO'}
        </Button>
      </CardFooter>
    </Card>
  );
}