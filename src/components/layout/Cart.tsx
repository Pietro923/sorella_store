'use client';

import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/store';
import { getProductImage } from '@/lib/cloudinary';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';

interface CartProps {
  onClose?: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleCheckout = () => {
    if (onClose) {
      onClose();
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <SheetHeader className="text-center">
          <SheetTitle className="text-xl">Tu carrito está vacío</SheetTitle>
        </SheetHeader>
        <p className="text-muted-foreground mt-2 text-center max-w-sm">
          Descubrí nuestras fundas exclusivas y encontrá la perfecta para tu iPhone
        </p>
        <Button className="mt-6" onClick={onClose}>
          Explorar Fundas
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header mejorado */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold">Mi Carrito</span>
              <p className="text-sm text-muted-foreground font-normal">
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>
      </div>

      {/* Lista de productos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                {/* Imagen del producto */}
                <div className="relative">
                  <Image
                    src={getProductImage(item.image, 'thumb')}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover border"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {item.quantity}
                  </Badge>
                </div>
                
                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm leading-tight mb-1">
                    {item.name}
                  </h4>
                  
                  {/* Modelos compatibles (muestra hasta 2) */}
                  <div className="flex items-center gap-1 mb-2">
                    <Smartphone className="h-3 w-3 text-muted-foreground" />
                    <div className="flex gap-1">
                      {item.model.slice(0, 2).map((model) => (
                        <Badge key={model} variant="outline" className="text-xs px-1 py-0">
                          {model.replace('iPhone ', '')}
                        </Badge>
                      ))}
                      {item.model.length > 2 && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          +{item.model.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Precio y controles */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <div className="w-10 h-8 flex items-center justify-center text-sm font-medium border-x">
                          {item.quantity}
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer del carrito */}
      <div className="p-4 border-t bg-gray-50/50 space-y-4">
        {/* Resumen de costos */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal ({totalItems} productos)</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Envío</span>
            <span className="text-green-600 font-medium">Gratis</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-2">
          <Button asChild className="w-full h-12 text-base" onClick={handleCheckout}>
            <Link href="/checkout" className="flex items-center justify-center gap-2">
              Finalizar Compra
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Seguir Comprando
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={clearCart}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mensaje de confianza */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            🔒 Compra segura • 📱 Atención por WhatsApp • 🚚 Envío gratis
          </p>
        </div>
      </div>
    </div>
  );
}