'use client';

import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <div className="flex flex-col items-center justify-center h-full p-6" style={{ backgroundColor: '#efecdd' }}>
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 border-4 border-black shadow-[6px_6px_0px_0px_#282828]"
          style={{ backgroundColor: '#9d1d25' }}
        >
          <ShoppingBag className="h-12 w-12 text-white" />
        </div>
        <SheetHeader className="text-center">
          <SheetTitle className="text-2xl font-black" style={{ color: '#282828' }}>
            TU CARRITO ESTÁ VACÍO
          </SheetTitle>
        </SheetHeader>
        <p className="font-medium mt-4 text-center max-w-sm leading-relaxed" style={{ color: '#9d1d25' }}>
          Descubrí nuestras fundas exclusivas y encontrá la perfecta para tu iPhone
        </p>
        <Button 
          className="mt-8 font-black border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all"
          style={{ backgroundColor: '#9d1d25', color: 'white' }}
          onClick={onClose}
        >
          EXPLORAR FUNDAS
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header retro */}
      <div 
        className="p-6 border-b-4 border-black"
        style={{ background: 'linear-gradient(135deg, #9d1d25 0%, #be3a47 100%)' }}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 text-white">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center border-3 border-white shadow-lg"
              style={{ backgroundColor: '#efecdd' }}
            >
              <ShoppingBag className="h-6 w-6" style={{ color: '#9d1d25' }} />
            </div>
            <div>
              <span className="text-2xl font-black">MI CARRITO</span>
              <p className="text-sm font-bold" style={{ color: '#efecdd' }}>
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>
      </div>

      {/* Lista de productos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: '#efecdd' }}>
        {items.map((item) => (
          <Card 
            key={item.id} 
            className="overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all bg-white"
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                {/* Imagen del producto */}
                <div className="relative">
                  <Image
                    src={getProductImage(item.image, 'thumb')}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover border-2 border-black"
                  />
                </div>
                
                {/* Información del producto */}
<div className="flex-1 min-w-0">
  <h4 className="font-black text-sm leading-tight mb-2" style={{ color: '#282828' }}>
    {item.name}
  </h4>

  {/* Precio y subtotal */}
  <div className="space-y-1 mb-4">
    <p className="text-lg font-black" style={{ color: '#9d1d25' }}>
      {formatPrice(item.price)}
    </p>
    <p className="text-xs font-medium" style={{ color: '#282828' }}>
      Subtotal: {formatPrice(item.price * item.quantity)}
    </p>
  </div>

  {/* Controles de cantidad (AHORA ABAJO) */}
  <div className="flex items-center gap-2">
    <div className="flex items-center border-3 border-black shadow-[2px_2px_0px_0px_#282828] bg-white">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none border-r-2 border-black hover:bg-gray-100"
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
      >
        <Minus className="h-3 w-3" style={{ color: '#282828' }} />
      </Button>

      <div className="w-10 h-8 flex items-center justify-center text-sm font-black bg-white" style={{ color: '#282828' }}>
        {item.quantity}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none border-l-2 border-black hover:bg-gray-100"
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
      >
        <Plus className="h-3 w-3" style={{ color: '#282828' }} />
      </Button>
    </div>

    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 border-2 border-black shadow-[2px_2px_0px_0px_#282828] hover:shadow-[3px_3px_0px_0px_#282828] transition-all"
      style={{ backgroundColor: '#be3a47', color: 'white' }}
      onClick={() => removeItem(item.id)}
    >
      <Trash2 className="h-3 w-3" />
    </Button>
  </div>
</div>
                
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer del carrito */}
      <div className="p-6 border-t-4 border-black space-y-6 bg-white">
        {/* Resumen de costos */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium" style={{ color: '#9d1d25' }}>
              Subtotal ({totalItems} productos)
            </span>
            <span className="font-black" style={{ color: '#282828' }}>
              {formatPrice(total)}
            </span>
          </div>
          <Separator className="bg-black h-0.5" />
          <div className="flex justify-between items-center">
            <span className="text-xl font-black" style={{ color: '#282828' }}>TOTAL</span>
            <span className="text-3xl font-black" style={{ color: '#9d1d25' }}>
              {formatPrice(total)}
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <Button 
            asChild 
            className="w-full h-14 text-lg font-black border-4 border-black shadow-[6px_6px_0px_0px_#282828] hover:shadow-[8px_8px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1" 
            onClick={handleCheckout}
            style={{ backgroundColor: '#9d1d25', color: 'white' }}
          >
            <Link href="/checkout" className="flex items-center justify-center gap-3">
              FINALIZAR COMPRA
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 font-black border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all bg-white"
              style={{ color: '#282828' }}
              onClick={onClose}
            >
              SEGUIR COMPRANDO
            </Button>
            
            <Button
              size="icon"
              onClick={clearCart}
              className="border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all"
              style={{ backgroundColor: '#be3a47', color: 'white' }}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mensaje de confianza */}
        <div 
          className="text-center p-4 border-3 border-black shadow-[4px_4px_0px_0px_#282828] font-bold"
          style={{ backgroundColor: '#efecdd', color: '#282828' }}
        >
          COMPRA SEGURA • ATENCIÓN POR WHATSAPP 
        </div>
      </div>
    </div>
  );
}