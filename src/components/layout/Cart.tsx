'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';

interface CartProps {
  onClose?: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleCheckout = () => {
    // Cerrar el carrito antes de navegar
    if (onClose) {
      onClose();
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <SheetHeader>
          <SheetTitle>Tu carrito está vacío</SheetTitle>
        </SheetHeader>
        <p className="text-muted-foreground mt-2">
          Agrega algunos productos para comenzar
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle>Carrito de Compras</SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className="rounded-md object-cover"
            />
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{item.name}</h4>
              <p className="text-sm text-muted-foreground">
                {formatPrice(item.price)}
              </p>
              
              <div className="flex items-center space-x-2 mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <span className="text-sm font-medium w-8 text-center">
                  {item.quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold">{formatPrice(total)}</span>
        </div>
        
        <div className="space-y-2">
          <Button asChild className="w-full" onClick={handleCheckout}>
            <Link href="/checkout">Finalizar Compra</Link>
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={clearCart}
          >
            Vaciar Carrito
          </Button>
        </div>
      </div>
    </div>
  );
}