'use client';

import { ShoppingCart, Menu, Phone, Mail, MapPin, Home, Package, Star, ChevronDown, Info, CreditCard, Truck, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
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
    { name: 'Inicio', href: '/', icon: Home, description: 'Página principal' },
    { name: 'Productos', href: '#todas-las-fundas', icon: Package, description: 'Ver todas las fundas' },
    { name: 'Destacados', href: '#destacados', icon: Star, description: 'Fundas más populares' },
  ];

  // ✅ Actualizado para ir a secciones específicas en /informacion
  const infoItems = [
    { 
      name: 'Cómo Comprar', 
      href: '/informacion#como-comprar', // ✅ Cambiado
      icon: CreditCard, 
      description: 'Proceso de compra paso a paso'
    },
    { 
      name: 'Envíos y Entregas', 
      href: '/informacion#envios', // ✅ Cambiado
      icon: Truck, 
      description: 'Información sobre entregas'
    },
    { 
      name: 'Preguntas Frecuentes', 
      href: '/informacion#preguntas', // ✅ Cambiado
      icon: HelpCircle, 
      description: 'Dudas más comunes'
    },
  ];

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/543814199442?text=¡Hola! Tengo una consulta 😊', '_blank');
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    // Si es un anchor link, hacer scroll suave
    if (href.startsWith('#')) {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    // Para rutas normales, Next.js se encarga automáticamente
  };

  return (
    <>
      {/* Top Bar - Oculto en móviles */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 text-sm hidden sm:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>+54 381 661-8632</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>jpbonacossa@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span>San Miguel de Tucumán, Argentina</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo mejorado */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
  <img 
    src="/sorella_logo_principal_Mesa_de_trabajo_1.png" 
    alt="Sorella Store" 
    className="w-full h-full object-contain"
  />
</div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl" style={{ color: '#9d1d25' }}>
  Sorella Store
</span>
                <div className="text-xs text-gray-500 -mt-1">Fundas Premium</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 group"
                >
                  <item.icon className="h-4 w-4 group-hover:text-blue-600 transition-colors" />
                  {item.name}
                </Link>
              ))}

              {/* Información - Link directo y Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link
                    href="/informacion" // ✅ Click directo va a /informacion
                    className="flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 group"
                  >
                    <Info className="h-4 w-4 group-hover:text-blue-600 transition-colors" />
                    Información
                    <ChevronDown className="h-3 w-3 group-hover:text-blue-600 transition-colors" />
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2">
                  <div className="px-2 py-1 text-sm font-semibold text-gray-900 mb-2">
                    Información útil
                  </div>
                  <DropdownMenuSeparator />
                  {infoItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href} // ✅ Cada item va a su sección específica
                        className="flex items-start gap-3 p-3 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors w-full"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              {/* WhatsApp Button - Mejorado para móviles */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleWhatsAppContact}
                className="hidden sm:flex text-green-600 border-green-600 hover:bg-green-50 hover:border-green-700 transition-all duration-300"
              >
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>

              {/* WhatsApp Button solo para móviles */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWhatsAppContact}
                className="sm:hidden text-green-600 hover:bg-green-50 relative"
              >
                <Phone className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </Button>

              {/* Cart mejorado */}
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative hover:bg-blue-50 hover:border-blue-200 transition-all duration-300">
                    <ShoppingCart className="h-5 w-5" />
                    {mounted && totalItems > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
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

              {/* Mobile Menu mejorado */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="md:hidden hover:bg-gray-50 transition-all duration-300"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] p-0">
                  {/* Header del menú */}
                  <div className="bg-gradient-to-br from-[#9d1d25] to-[#bf3a46] p-6 text-white">
                    <SheetHeader>
                      <SheetTitle className="text-left text-white">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm bg-white/20">
  <img 
    src="/sorella_logo_principal_c-fondo.png" 
    alt="Sorella Store" 
    className="w-10 h-10 object-contain"
  />
</div>
                          <div>
                            <div className="font-bold text-xl">Sorella Store</div>
                            <div className="text-blue-100 text-sm font-normal">Fundas Premium para iPhone</div>
                          </div>
                        </div>
                      </SheetTitle>
                    </SheetHeader>
                  </div>

                  {/* Navegación principal */}
                  <div className="flex flex-col p-6 space-y-2">
                    <div className="text-sm font-semibold text-gray-900 mb-3">Navegación</div>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                        onClick={() => handleNavClick(item.href)}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                          <item.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </Link>
                    ))}

                    {/* Información en móvil - Link directo */}
                    <Link
                      href="/informacion"
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <Info className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Información</div>
                        <div className="text-sm text-gray-500">Cómo comprar, envíos, garantías</div>
                      </div>
                    </Link>
                  </div>

                  <Separator className="mx-6" />

                  {/* Información de contacto para móviles */}
                  <div className="p-6 space-y-4">
                    <div className="text-sm font-semibold text-gray-900 mb-3">Contacto</div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span>+54 381 661-8632</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>jpbonacossa@gmail.com</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span>San Miguel de Tucumán, Argentina</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="mx-6" />

                  {/* Botón de WhatsApp destacado */}
                  <div className="p-6">
                    <Button
                      onClick={() => {
                        handleWhatsAppContact();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      Contactar por WhatsApp
                    </Button>
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