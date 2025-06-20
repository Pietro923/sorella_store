'use client';

import { Button } from '@/components/ui/button';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Instagram,
  Clock,
  Shield,
  Truck,
  CreditCard,
  Heart
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/543816618632?text=¡Hola! Tengo una consulta 😊', '_blank');
  };

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '#todas-las-fundas' },
    { name: 'Destacados', href: '#destacados' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
  <img 
    src="/sorella_logo_principal_c-fondo.png" 
    alt="Sorella Store" 
    className="w-full h-full object-contain"
  />
</div>
              <span className="font-bold text-xl">Sorella Store</span>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Tu tienda de tecnología de confianza en Tucumán. 
              Productos originales, precios justos y atención personalizada.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-[#bf3a46]" />
                <span>+54 381 419-9442</span>
              </div>
              {/* 
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-[#bf3a46]" />
                <span>info@miecommerce.com</span>
              </div>
              */}
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-[#bf3a46]" />
                <span>San Miguel de Tucumán, Argentina</span>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <Clock className="h-4 w-4 text-[#bf3a46]" />
                <span>Lun - Sáb: 9:00 - 20:00hs</span>
              </div>
            </div>

            {/* Social Media */}
            
            <div className="flex space-x-3 pt-4">
              {/* 
              <Button size="icon" variant="ghost" className="border-gray-600 hover:bg-blue-600">
                <Facebook className="h-4 w-4" />
              </Button>
              */}
              <a
  href="https://www.instagram.com/sorella_sstore/"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button size="icon" variant="ghost" className="border-gray-600 hover:bg-pink-600">
    <Instagram className="h-4 w-4" />
  </Button>
</a>
              {/* 
              <Button size="icon" variant="ghost" className="border-gray-600 hover:bg-blue-400">
                <Twitter className="h-4 w-4" />
              </Button>
              */}
              <Button 
                size="icon" 
                variant="ghost" 
                className="border-gray-600 hover:bg-green-600"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="font-semibold text-lg mb-4 mt-6">Información</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/informacion#como-comprar" className="text-gray-300 hover:text-white transition-colors text-sm">
  Cómo Comprar
</Link>
              </li>
              <li>
                <Link href="/informacion#envios" className="text-gray-300 hover:text-white transition-colors text-sm">
  Envíos y Entregas
</Link>
              </li>
              <li>
                <Link href="/informacion#preguntas" className="text-gray-300 hover:text-white transition-colors text-sm">
  Preguntas Frecuentes
</Link>
              </li>
            </ul>
          </div>

          {/* Trust Badges & Payment */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Confianza y Seguridad</h4>
            
            <div className="space-y-4">
              {/* Trust Features */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">Compra 100% Segura</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <Truck className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">Envío Rápido y Seguro</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <CreditCard className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">Múltiples Formas de Pago</span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-green-600 p-4 rounded-lg">
                <h5 className="font-semibold mb-2">¿Dudas? ¡Preguntanos!</h5>
                <p className="text-sm text-green-100 mb-3">
                  Atención personalizada por WhatsApp
                </p>
                <Button 
                  onClick={handleWhatsApp}
                  className="w-full bg-white text-green-600 hover:bg-gray-100"
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chatear Ahora
                </Button>
              </div>

              {/* Payment Methods */}
              <div>
                <h5 className="font-semibold mb-2 text-sm">Medios de Pago</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-800 p-2 rounded text-center text-xs">
                    Efectivo
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-center text-xs">
                    Débito
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-center text-xs">
                    Crédito
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-center text-xs">
                    MercadoPago
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-center text-xs">
                    Transferencia
                  </div>
                  <div className="bg-gray-800 p-2 rounded text-center text-xs">
                    Cripto
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <span>&copy; {currentYear} Sorella Store.</span>
              <span>Todos los derechos reservados.</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>en Tucumán, Argentina</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}