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
} from 'lucide-react';
import Link from 'next/link';
import { Pietrobutton } from './p-popover';

export default function Footer() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/543816618632?text=¡Hola! Tengo una consulta', '_blank');
  };

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '#todas-las-fundas' },
    { name: 'Destacados', href: '#destacados' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#282828', color: 'white' }}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center border-3 border-white shadow-lg"
                style={{ backgroundColor: '#9d1d25' }}
              >
                <img 
                  src="/sorella_logo_principal_c-fondo.png" 
                  alt="Sorella Store" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="font-black text-2xl">SORELLA STORE</span>
            </div>
            
            <p className="text-gray-300 font-medium leading-relaxed">
              Tu tienda de accesorios favorita. 
              Una buena funda habla bien del dueño.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-white"
                  style={{ backgroundColor: '#9d1d25' }}
                >
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold">+54 381 419-9442</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-white"
                  style={{ backgroundColor: '#9d1d25' }}
                >
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold">San Miguel de Tucumán, Argentina</span>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-white"
                  style={{ backgroundColor: '#9d1d25' }}
                >
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold">Lun - Sáb: 9:00 - 20:00hs</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center md:justify-start space-x-4 pt-4">
              <a
                href="https://www.instagram.com/sorella_sstore/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="icon" 
                  className="border-3 cursor-pointer border-white shadow-[4px_4px_0px_0px_white] hover:shadow-[6px_6px_0px_0px_white] transition-all"
                  style={{ backgroundColor: '#be3a47', color: 'white' }}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              
              <Button 
                size="icon" 
                className="border-3 cursor-pointer border-white shadow-[4px_4px_0px_0px_white] hover:shadow-[6px_6px_0px_0px_white] transition-all"
                style={{ backgroundColor: '#9d1d25', color: 'white' }}
                onClick={handleWhatsApp}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-black text-xl mb-6 text-white">ENLACES RÁPIDOS</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="font-bold hover:text-white transition-colors border-b-2 border-transparent hover:border-white pb-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="font-black text-xl mb-6 mt-8">INFORMACIÓN</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/informacion#como-comprar" 
                  className="font-bold hover:text-white transition-colors border-b-2 border-transparent hover:border-white pb-1"
                >
                  Cómo Comprar
                </Link>
              </li>
              <li>
                <Link 
                  href="/informacion#envios" 
                  className="font-bold hover:text-white transition-colors border-b-2 border-transparent hover:border-white pb-1"
                >
                  Envíos y Entregas
                </Link>
              </li>
              <li>
                <Link 
                  href="/informacion#preguntas" 
                  className="font-bold hover:text-white transition-colors border-b-2 border-transparent hover:border-white pb-1"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust Badges & Payment */}
          <div className="text-center md:text-left">
            <h4 className="font-black text-xl mb-6">CONFIANZA Y SEGURIDAD</h4>
            
            <div className="space-y-6">
              {/* Trust Features */}
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <Shield className="h-5 w-5" style={{ color: '#9d1d25' }} />
                  <span className="font-bold">Compra 100% Segura</span>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <Truck className="h-5 w-5" style={{ color: '#9d1d25' }} />
                  <span className="font-bold">Envío Rápido y Seguro</span>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <CreditCard className="h-5 w-5" style={{ color: '#9d1d25' }} />
                  <span className="font-bold">Múltiples Formas de Pago</span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div 
                className="p-6 border-3 border-white shadow-[4px_4px_0px_0px_white]"
                style={{ backgroundColor: '#9d1d25' }}
              >
                <h5 className="font-black mb-3 text-white">¿DUDAS? ¡PREGUNTANOS!</h5>
                <p className="text-sm font-medium mb-4">
                  Atención personalizada por WhatsApp
                </p>
                <Button 
                  onClick={handleWhatsApp}
                  className="w-full font-black border-2 cursor-pointer border-white shadow-[2px_2px_0px_0px_white] hover:shadow-[4px_4px_0px_0px_white] transition-all"
                  style={{ backgroundColor: 'white', color: '#9d1d25' }}
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  CHATEAR AHORA
                </Button>
              </div>

              {/* Payment Methods */}
              <div>
                <h5 className="font-black mb-4">MEDIOS DE PAGO</h5>
                <div className="grid grid-cols-3 gap-2">
                  {['Efectivo', 'Débito', 'Crédito', 'MercadoPago', 'Transferencia'].map((method) => (
                    <div 
                      key={method}
                      className="p-2 text-center text-xs font-bold border-2 border-white"
                      style={{ backgroundColor: '#be3a47', color: 'white' }}
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center space-x-2 font-bold">
              <span>&copy; {currentYear} Sorella Store.</span>
              <span>Todos los derechos reservados.</span>
            </div>
            
            <div className="flex items-center space-x-2 font-bold">
              <Pietrobutton/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}