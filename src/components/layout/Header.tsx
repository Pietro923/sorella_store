'use client';

import { ShoppingCart, Menu, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/lib/store';
import Cart from './Cart';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Arreglo para hidratación
  const totalItems = useCartStore(state => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '#todos-productos' },
    { name: 'Destacados', href: '#destacados' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/543814199442?text=¡Hola! Tengo una consulta 😊', '_blank');
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>+54 381 661-8632</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>jpbonacossa@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>San Miguel de Tucumán, Argentina</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">
                Sorella Store
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-2">
              {/* WhatsApp Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleWhatsAppContact}
                className="hidden sm:flex text-green-600 border-green-600 hover:bg-green-50"
              >
                <Phone className="h-4 w-4 mr-1" />
                WhatsApp
              </Button>

              {/* Cart */}
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    {mounted && totalItems > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <Cart onClose={handleCartClose} />
                </SheetContent>
              </Sheet>

              {/* Mobile Menu */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <div className="flex flex-col space-y-4 mt-6">
                    <Link href="/" className="flex items-center space-x-2 pb-4 border-b">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">SS</span>
                      </div>
                      <span className="font-bold text-xl">Sorella Store</span>
                    </Link>
                    
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium py-2 hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    
                    <div className="pt-4 border-t">
                      <Button
                        onClick={handleWhatsAppContact}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contactar por WhatsApp
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}