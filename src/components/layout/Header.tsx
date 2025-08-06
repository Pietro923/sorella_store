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
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const totalItems = useCartStore(state => state.getTotalItems());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: 'Inicio', href: '/', icon: Home, description: 'Página principal' },
    { name: 'Destacados', href: '#destacados', icon: Star, description: 'Fundas más populares' },
    { name: 'Productos', href: '#todas-las-fundas', icon: Package, description: 'Ver todas las fundas' },
  ];

  const infoItems = [
    { 
      name: 'Cómo Comprar', 
      href: '/informacion#como-comprar',
      icon: CreditCard, 
      description: 'Proceso de compra paso a paso'
    },
    { 
      name: 'Envíos y Entregas', 
      href: '/informacion#envios',
      icon: Truck, 
      description: 'Información sobre entregas'
    },
    { 
      name: 'Preguntas Frecuentes', 
      href: '/informacion#preguntas',
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

  // Función mejorada para manejar la navegación
  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    if (href.startsWith('#')) {
      // Si es un hash y estamos en la página principal
      if (pathname === '/') {
        // Hacer scroll directo
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Si estamos en otra página, navegar a la principal con el hash
        router.push(`/${href}`);
      }
    } else {
      // Para rutas normales, navegar directamente
      router.push(href);
    }
  };

  // Función para renderizar enlaces con lógica condicional
  const renderNavLink = (item: typeof navigation[0], isMobile = false) => {
    const isHashLink = item.href.startsWith('#');
    const isOnHomePage = pathname === '/';
    
    if (isHashLink && isOnHomePage) {
      // Si es un hash link y estamos en home, usar comportamiento de scroll
      return (
        <button
          key={item.name}
          onClick={() => handleNavClick(item.href)}
          className={`flex items-center gap-2 text-sm font-black transition-all cursor-pointer duration-300 hover:scale-110 group px-3 py-2 rounded-xl border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_#282828] ${
            isMobile 
              ? 'w-full justify-start space-x-4 p-4 hover:bg-white' 
              : ''
          }`}
          style={{ color: '#282828' }}
        >
          {isMobile && (
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center border-2 border-black"
              style={{ backgroundColor: '#9d1d25' }}
            >
              <item.icon className="h-6 w-6 text-white" />
            </div>
          )}
          {!isMobile && <item.icon className="h-6 w-6 text-red-800" />}
          <div className="flex-1">
            <div className={isMobile ? "font-black" : ""}>{item.name}</div>
            {isMobile && (
              <div className="text-sm font-medium" style={{ color: '#9d1d25' }}>
                {item.description}
              </div>
            )}
          </div>
        </button>
      );
    } else {
      // Para otros casos, usar Link normal
      const finalHref = isHashLink ? `/${item.href}` : item.href;
      
      return (
        <Link
          key={item.name}
          href={finalHref}
          className={`flex items-center gap-2 text-sm font-black transition-all duration-300 hover:scale-110 group px-3 py-2 rounded-xl border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_#282828] ${
            isMobile 
              ? 'w-full justify-start space-x-4 p-4 hover:bg-white' 
              : ''
          }`}
          style={{ color: '#282828' }}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          {isMobile && (
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center border-2 border-black"
              style={{ backgroundColor: '#9d1d25' }}
            >
              <item.icon className="h-6 w-6 text-white" />
            </div>
          )}
          {!isMobile && <item.icon className="h-6 w-6 text-red-800" />}
          <div className="flex-1">
            <div className={isMobile ? "font-black" : ""}>{item.name}</div>
            {isMobile && (
              <div className="text-sm font-medium" style={{ color: '#9d1d25' }}>
                {item.description}
              </div>
            )}
          </div>
        </Link>
      );
    }
  };

  return (
    <>
      {/* Top Bar Retro */}
      <div 
        className="text-white py-3 text-sm hidden sm:block border-b-4 border-black"
        style={{ background: 'linear-gradient(135deg, #282828 0%, #9d1d25 100%)' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 font-bold">
                <Phone className="h-4 w-4" />
                <span>+54 381 661-8632</span>
              </div>
              <div className="flex items-center gap-2 font-bold">
                <Mail className="h-4 w-4" />
                <span> jpbonacossa@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <MapPin className="h-4 w-4" />
              <span> San Miguel de Tucumán, Argentina</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Retro */}
      <header 
        className="sticky top-0 z-50 w-full border-b-4 border-black shadow-[0_8px_0px_0px_#282828]"
        style={{ backgroundColor: '#efecdd' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Retro */}
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border-3 border-black shadow-[4px_4px_0px_0px_#282828] group-hover:shadow-[6px_6px_0px_0px_#282828] transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1"
                  style={{ backgroundColor: '#9d1d25' }}
                >
                  <img 
                    src="/sorella_logo_principal_c-fondo.png" 
                    alt="Sorella Store" 
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <span 
                  className="font-black text-2xl transform group-hover:-rotate-1 transition-transform italic"
                  style={{ color: '#9d1d25' }}
                >
                  SORELLA SSTORE
                </span>
                <div 
                  className="text-sm font-bold -mt-1 italic"
                  style={{ color: '#282828' }}
                >
                  Lookeá tu celu con nosotros.
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Retro */}
            <nav className="hidden md:flex items-center space-x-6 ">
              {navigation.map((item) => renderNavLink(item, false))}

              {/* Información Dropdown Retro */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link
                    href="/informacion"
                    className="flex items-center gap-2 text-sm font-black transition-all duration-300 hover:scale-110 group px-3 py-2 rounded-xl border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_#282828]"
                    style={{ color: '#282828' }}
                  >
                    <Info className="h-4 w-4  text-red-800"  />
                    Información
                    <ChevronDown className="h-3 w-3 text-red-800" />
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-72 p-4 border-4 border-black shadow-[8px_8px_0px_0px_#282828] bg-white"
                >
                  <div className="px-2 py-1 text-sm font-black mb-3" style={{ color: '#282828' }}>
                    📋 INFORMACIÓN ÚTIL
                  </div>
                  <DropdownMenuSeparator className="bg-black h-0.5" />
                  {infoItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className="flex items-start gap-3 p-3 cursor-pointer hover:bg-red-50 rounded-lg transition-colors w-full"
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-black"
                          style={{ backgroundColor: '#efecdd' }}
                        >
                          <item.icon className="h-5 w-5" style={{ color: '#9d1d25' }} />
                        </div>
                        <div className="flex-1">
                          <div className="font-black" style={{ color: '#282828' }}>{item.name}</div>
                          <div className="text-xs font-medium" style={{ color: '#9d1d25' }}>{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right Side Retro */}
            <div className="flex items-center space-x-3">
              {/* WhatsApp Button Desktop */}
              <Button
                size="sm"
                onClick={handleWhatsAppContact}
                className="hidden sm:flex cursor-pointer font-black border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1"
                style={{ backgroundColor: '#9d1d25', color: 'white' }}
              >
                <Phone className="h-4 w-4 mr-2" />
                WHATSAPP
              </Button>

              {/* WhatsApp Button Mobile */}
              <Button
                size="icon"
                onClick={handleWhatsAppContact}
                className="sm:hidden relative border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all"
                style={{ backgroundColor: '#9d1d25', color: 'white' }}
              >
                <Phone className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse border-2 border-black">
                  <span className="text-xs">!</span>
                </div>
              </Button>

              {/* Cart Retro */}
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button 
                    size="icon" 
                    className="relative border-3 cursor-pointer border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1"
                    style={{ backgroundColor: '#be3a47', color: 'white' }}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {mounted && totalItems > 0 && (
                      <Badge 
                        className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs font-black animate-bounce border-2 border-black"
                        style={{ backgroundColor: '#efecdd', color: '#282828' }}
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

              {/* Mobile Menu Retro */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    size="icon" 
                    className="md:hidden border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all"
                    style={{ backgroundColor: '#282828', color: 'white' }}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] p-0 border-4 border-black">
                  {/* Header del menú retro */}
                  <div 
                    className="p-6 text-white border-b-4 border-black"
                    style={{ background: 'linear-gradient(135deg, #9d1d25 0%, #be3a47 100%)' }}
                  >
                    <SheetHeader>
                      <SheetTitle className="text-left text-white">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-white"
                            style={{ backgroundColor: '#efecdd' }}
                          >
                            <img 
                              src="/sorella_logo_principal_c-fondo.png" 
                              alt="Sorella Store" 
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                          <div>
                            <div className="font-black text-xl">SORELLA STORE</div>
                            <div className="text-sm font-bold text-yellow-300">🔥 Fundas Premium para iPhone</div>
                          </div>
                        </div>
                      </SheetTitle>
                    </SheetHeader>
                  </div>

                  {/* Navegación principal retro */}
                  <div className="flex flex-col p-6 space-y-3" style={{ backgroundColor: '#efecdd' }}>
                    <div className="text-sm font-black mb-3" style={{ color: '#282828' }}>📱 NAVEGACIÓN</div>
                    {navigation.map((item) => renderNavLink(item, true))}

                    {/* Información en móvil */}
                    <Link
                      href="/informacion"
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white transition-all duration-300 group border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_#282828]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center border-2 border-black"
                        style={{ backgroundColor: '#be3a47' }}
                      >
                        <Info className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-black" style={{ color: '#282828' }}>Información</div>
                        <div className="text-sm font-medium" style={{ color: '#9d1d25' }}>Cómo comprar, envíos, garantías</div>
                      </div>
                    </Link>
                  </div>

                  <Separator className="mx-6 bg-black h-1" />

                  {/* Información de contacto retro */}
                  <div className="p-6 space-y-4" style={{ backgroundColor: '#efecdd' }}>
                    <div className="text-sm font-black mb-3" style={{ color: '#282828' }}>📞 CONTACTO</div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm font-bold" style={{ color: '#282828' }}>
                        <Phone className="h-4 w-4" style={{ color: '#9d1d25' }} />
                        <span>📞 +54 381 661-8632</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm font-bold" style={{ color: '#282828' }}>
                        <Mail className="h-4 w-4" style={{ color: '#9d1d25' }} />
                        <span>✉️ jpbonacossa@gmail.com</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm font-bold" style={{ color: '#282828' }}>
                        <MapPin className="h-4 w-4" style={{ color: '#9d1d25' }} />
                        <span>📍 San Miguel de Tucumán</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="mx-6 bg-black h-1" />

                  {/* Botón de WhatsApp destacado retro */}
                  <div className="p-6" style={{ backgroundColor: '#efecdd' }}>
                    <Button
                      onClick={() => {
                        handleWhatsAppContact();
                        setIsMenuOpen(false);
                      }}
                      className="w-full font-black text-lg py-4 border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all duration-300 hover:-translate-y-1"
                      style={{ backgroundColor: '#9d1d25', color: 'white' }}
                      size="lg"
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      🚀 CONTACTAR POR WHATSAPP
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