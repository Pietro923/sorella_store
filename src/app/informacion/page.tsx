'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShoppingCart, MessageCircle, CreditCard, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ComoComprarPage() {
  const steps = [
    {
      number: 1,
      title: 'Explorá Nuestras Fundas',
      description: 'Navegá por nuestro catálogo y encontrá la funda perfecta para tu iPhone',
      icon: ShoppingCart,
      details: [
        'Usá los filtros por modelo de iPhone',
        'Revisá las imágenes y descripciones',
        'Verificá la compatibilidad',
        'Chequeá el stock disponible'
      ]
    },
    {
      number: 2,
      title: 'Agregá al Carrito',
      description: 'Seleccioná la cantidad y agregá los productos que te gusten',
      icon: CheckCircle,
      details: [
        'Hacé clic en "Agregar al Carrito"',
        'Podés seguir comprando',
        'Revisá tu carrito cuando quieras',
        'Modificá cantidades si es necesario'
      ]
    },
    {
      number: 3,
      title: 'Completá tus Datos',
      description: 'Llenás el formulario con tu información de contacto y entrega',
      icon: CreditCard,
      details: [
        'Nombre y apellido completo',
        'Número de teléfono',
        'Email de contacto',
        'Dirección o punto de encuentro'
      ]
    },
    {
      number: 4,
      title: 'Enviá por WhatsApp',
      description: 'Tu pedido se envía automáticamente a nuestro WhatsApp',
      icon: MessageCircle,
      details: [
        'Mensaje automático con tu pedido',
        'Incluye todos tus datos',
        'Resumen de productos y total',
        'Te respondemos al instante'
      ]
    }
  ];

  const paymentMethods = [
    { name: 'Efectivo', description: 'Al momento de la entrega' },
    { name: 'Transferencia', description: 'Bancaria o Mercado Pago' },
  ];

  const deliveryOptions = [
    {
      title: 'Envío a Domicilio',
      icon: MapPin,
      price: 'El costo depende de Uber',
      time: '24-48hs',
      description: 'Realizamos envios a traves de Uber Paquetes directo a tu casa en Tucumán'
    },
    {
      title: 'Punto de Encuentro',
      icon: Clock,
      price: 'Gratis',
      time: 'Mismo día',
      description: 'Nos encontramos en un lugar conveniente para ambos'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#efecdd' }}>
      {/* Breadcrumbs Retro */}
      <div className="bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm font-bold">
            <Link 
              href="/" 
              className="hover:underline transition-colors"
              style={{ color: '#9d1d25' }}
            >
              INICIO
            </Link>
            <span className="mx-2" style={{ color: '#282828' }}>/</span>
            <span className="font-black" style={{ color: '#282828' }}>CÓMO COMPRAR</span>
          </nav>
        </div>
      </div>

      {/* Hero Section Retro */}
      <section id="como-comprar" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6" style={{ color: '#282828' }}>
              ¿CÓMO COMPRAR EN SORELLA STORE?
            </h1>
            <p className="text-xl font-medium mb-8 leading-relaxed max-w-3xl mx-auto" style={{ color: '#9d1d25' }}>
              Es súper fácil! Solo seguí estos simples pasos y en minutos tendrás tu funda favorita en camino.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 border-3 border-black shadow-[4px_4px_0px_0px_#282828] bg-white">
                <Clock className="h-5 w-5" style={{ color: '#9d1d25' }} />
                <span className="font-bold" style={{ color: '#282828' }}>Proceso de 5 minutos</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border-3 border-black shadow-[4px_4px_0px_0px_#282828] bg-white">
                <MessageCircle className="h-5 w-5" style={{ color: '#9d1d25' }} />
                <span className="font-bold" style={{ color: '#282828' }}>Vía WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border-3 border-black shadow-[4px_4px_0px_0px_#282828] bg-white">
                <CheckCircle className="h-5 w-5" style={{ color: '#9d1d25' }} />
                <span className="font-bold" style={{ color: '#282828' }}>100% Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section Retro */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16" style={{ color: '#282828' }}>
              PROCESO PASO A PASO
            </h2>

            <div className="space-y-8">
              {steps.map((step) => (
                <Card 
                  key={step.number} 
                  className="overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_#282828] hover:shadow-[12px_12px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1 bg-white"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      {/* Step Number & Icon */}
                      <div className="flex items-center gap-6">
                        <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-2xl border-4 border-black shadow-lg"
                          style={{ backgroundColor: '#9d1d25' }}
                        >
                          {step.number}
                        </div>
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center border-3 border-black shadow-lg"
                          style={{ backgroundColor: '#efecdd' }}
                        >
                          <step.icon className="h-8 w-8" style={{ color: '#9d1d25' }} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-3xl font-black mb-3" style={{ color: '#282828' }}>
                          {step.title}
                        </h3>
                        <p className="text-lg font-medium mb-6" style={{ color: '#9d1d25' }}>
                          {step.description}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-3">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#9d1d25' }} />
                              <span className="font-medium" style={{ color: '#282828' }}>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Retro */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16" style={{ color: '#282828' }}>
              MÉTODOS DE PAGO
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {paymentMethods.map((method) => (
                <Card 
                  key={method.name} 
                  className="text-center p-6 border-4 border-black shadow-[6px_6px_0px_0px_#282828] hover:shadow-[8px_8px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1 bg-white"
                >
                  <CardContent className="space-y-4 p-0">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto border-3 border-black shadow-lg"
                      style={{ backgroundColor: '#9d1d25' }}
                    >
                      <CreditCard className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg" style={{ color: '#282828' }}>{method.name}</h3>
                    <p className="text-sm font-medium" style={{ color: '#9d1d25' }}>{method.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Badge 
                className="text-base px-6 py-3 font-bold border-3 border-black shadow-[4px_4px_0px_0px_#282828]"
                style={{ backgroundColor: '#be3a47', color: 'white' }}
              >
                Coordinamos el método de pago vía WhatsApp
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Options Retro */}
      <section id="envios" className="py-16" style={{ backgroundColor: '#efecdd' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16" style={{ color: '#282828' }}>
              OPCIONES DE ENTREGA
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {deliveryOptions.map((option) => (
                <Card 
                  key={option.title} 
                  className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_#282828] hover:shadow-[12px_12px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1 bg-white"
                >
                  <CardContent className="space-y-6 p-0">
                    <div className="flex items-center gap-6">
                      <div 
                        className="w-20 h-20 rounded-2xl flex items-center justify-center border-3 border-black shadow-lg"
                        style={{ backgroundColor: '#efecdd' }}
                      >
                        <option.icon className="h-10 w-10" style={{ color: '#9d1d25' }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black" style={{ color: '#282828' }}>{option.title}</h3>
                        <div className="flex items-center gap-4 mt-3">
                          <Badge 
                            className="font-bold border-2 border-black shadow-sm"
                            style={{ backgroundColor: '#9d1d25', color: 'white' }}
                          >
                            {option.price}
                          </Badge>
                          <Badge 
                            className="font-bold border-2 border-black shadow-sm bg-white"
                            style={{ color: '#282828' }}
                          >
                            {option.time}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="leading-relaxed font-medium text-lg" style={{ color: '#9d1d25' }}>
                      {option.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Retro */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #9d1d25 0%, #be3a47 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              ¿LISTO PARA COMPRAR TU FUNDA IDEAL?
            </h2>
            <p className="text-xl mb-10 leading-relaxed font-medium" style={{ color: '#efecdd' }}>
              Todo el proceso toma menos de 5 minutos. Empezá ahora y protegé tu iPhone con estilo!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="font-black border-4 border-white shadow-[6px_6px_0px_0px_white] hover:shadow-[8px_8px_0px_0px_white] transition-all"
                style={{ backgroundColor: 'white', color: '#9d1d25' }}
              >
                <Link href="/" className="flex items-center gap-3">
                  <ShoppingCart className="h-6 w-6" />
                  VER FUNDAS
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="font-black border-4 border-white bg-transparent text-white hover:bg-white/10 shadow-[6px_6px_0px_0px_white] hover:shadow-[8px_8px_0px_0px_white] transition-all"
                onClick={() => window.open('https://wa.me/543814199442?text=¡Hola! Tengo dudas sobre cómo comprar', '_blank')}
              >
                <Phone className="mr-3 h-6 w-6" />
                CONSULTAR POR WHATSAPP
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section Retro */}
      <section id="preguntas" className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16" style={{ color: '#282828' }}>
              PREGUNTAS FRECUENTES
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: '¿Es seguro comprar por WhatsApp?',
                  answer: 'Absolutamente! WhatsApp nos permite tener comunicación directa y personalizada. Podés ver nuestro perfil, verificar que somos un negocio real y hacer todas las preguntas que necesites.'
                },
                {
                  question: '¿Cuánto tiempo tarda en llegar mi pedido?',
                  answer: 'En Tucumán capital y alrededores: 24-48 horas. Para puntos de encuentro podemos coordinar el mismo día. Te confirmamos el tiempo exacto cuando hagas tu pedido.'
                },
                {
                  question: '¿Puedo cambiar mi pedido después de enviarlo?',
                  answer: 'Sí, mientras no hayamos preparado tu pedido para envío. Contactanos inmediatamente por WhatsApp y coordinamos cualquier cambio que necesites.'
                },
              ].map((faq, index) => (
                <Card 
                  key={index}
                  className="p-6 border-4 border-black shadow-[6px_6px_0px_0px_#282828] hover:shadow-[8px_8px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1 bg-white"
                  
                >
                  <h3 className="font-black text-xl mb-3 text-center" style={{ color: '#282828' }}>{faq.question}</h3>
                  <p className=" leading-relaxed font-bold text-center" style={{ color: '#9d1d25' }}>
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Retro */}
      <section className="py-16" style={{ backgroundColor: '#efecdd' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6" style={{ color: '#282828' }}>
              ¿TENÉS MÁS DUDAS?
            </h2>
            <p className="text-lg font-medium mb-12" style={{ color: '#9d1d25' }}>
              Estamos para ayudarte. Contactanos por cualquiera de estos medios:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Phone, title: 'WhatsApp', info: '+54 381 661-8632', color: '#9d1d25' },
                { icon: Phone, title: 'Teléfono', info: '+54 381 661-8632', color: '#be3a47' },
                { icon: MessageCircle, title: 'Email', info: 'jpbonacossa@gmail.com', color: '#282828' }
              ].map((contact, index) => (
                <Card 
                  key={index}
                  className="p-6 border-4 border-black shadow-[6px_6px_0px_0px_#282828] hover:shadow-[8px_8px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1 bg-white"
                >
                  <CardContent className="text-center space-y-4 p-0">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto border-3 border-black shadow-lg"
                      style={{ backgroundColor: contact.color }}
                    >
                      <contact.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg" style={{ color: '#282828' }}>{contact.title}</h3>
                      <p className="text-sm font-medium" style={{ color: '#9d1d25' }}>{contact.info}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              size="lg" 
              className="font-black border-4 border-black shadow-[6px_6px_0px_0px_#282828] hover:shadow-[8px_8px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1"
              style={{ backgroundColor: '#9d1d25', color: 'white' }}
              onClick={() => window.open('https://wa.me/543814199442?text=¡Hola! Tengo una consulta sobre el proceso de compra', '_blank')}
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              CHATEAR AHORA
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}