'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShoppingCart, MessageCircle, CreditCard, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

// Metadata se mueve a un archivo separado o se maneja diferente
// export const metadata = {
//   title: 'Cómo Comprar - Sorella Store | Proceso de Compra Fácil',
//   description: 'Aprende cómo comprar fundas para iPhone en Sorella Store. Proceso simple vía WhatsApp con envío rápido a Tucumán.',
//   keywords: 'como comprar, proceso de compra, whatsapp, fundas iphone, sorella store, tucuman',
// };

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
    { name: 'Tarjeta de Débito', description: 'En punto de encuentro' },
    { name: 'Tarjeta de Crédito', description: 'En punto de encuentro' },
  ];

  const deliveryOptions = [
    {
      title: 'Envío a Domicilio',
      icon: MapPin,
      price: 'Gratis',
      time: '24-48hs',
      description: 'Llevamos tu pedido directo a tu casa en Tucumán capital y alrededores'
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Inicio
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-900 font-medium">Cómo Comprar</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section id="como-comprar" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ¿Cómo Comprar en Sorella Store?
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Es súper fácil! Solo seguí estos simples pasos y en minutos tendrás tu funda favorita en camino.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span>Proceso de 5 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-600" />
                <span>Vía WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span>100% Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Proceso Paso a Paso
            </h2>

            <div className="space-y-8">
              {steps.map((step) => (
                <Card key={step.number} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      {/* Step Number & Icon */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {step.number}
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <step.icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-lg mb-4">
                          {step.description}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-2">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span>{detail}</span>
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

      {/* Payment Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Métodos de Pago
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paymentMethods.map((method) => (
                <Card key={method.name} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <CreditCard className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                💡 Coordinamos el método de pago vía WhatsApp
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section id="envios" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Opciones de Entrega
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {deliveryOptions.map((option) => (
                <Card key={option.title} className="p-8 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <option.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{option.title}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {option.price}
                          </Badge>
                          <Badge variant="outline">
                            {option.time}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para comprar tu funda ideal?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Todo el proceso toma menos de 5 minutos. ¡Empezá ahora y protegé tu iPhone con estilo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ver Fundas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => window.open('https://wa.me/543814199442?text=¡Hola! Tengo dudas sobre cómo comprar 😊', '_blank')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Consultar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="preguntas" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Preguntas Frecuentes
            </h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">¿Es seguro comprar por WhatsApp?</h3>
                <p className="text-gray-600">
                  ¡Absolutamente! WhatsApp nos permite tener comunicación directa y personalizada. 
                  Podés ver nuestro perfil, verificar que somos un negocio real y hacer todas las preguntas que necesites.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">¿Cuánto tiempo tarda en llegar mi pedido?</h3>
                <p className="text-gray-600">
                  En Tucumán capital y alrededores: 24-48 horas. Para puntos de encuentro podemos coordinar el mismo día. 
                  Te confirmamos el tiempo exacto cuando hagas tu pedido.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">¿Puedo cambiar mi pedido después de enviarlo?</h3>
                <p className="text-gray-600">
                  Sí, mientras no hayamos preparado tu pedido para envío. Contactanos inmediatamente por WhatsApp y 
                  coordinamos cualquier cambio que necesites.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">¿Qué pasa si la funda no me gusta?</h3>
                <p className="text-gray-600">
                  Tenés 7 días para devolverla en perfecto estado. Te devolvemos el 100% de tu dinero. 
                  Consultá nuestra <Link href="/garantias" className="text-blue-600 hover:underline">política de garantías</Link> para más detalles.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              ¿Tenés más dudas?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Estamos para ayudarte. Contactanos por cualquiera de estos medios:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="text-center space-y-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">WhatsApp</h3>
                    <p className="text-sm text-gray-600">+54 381 661-8632</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Teléfono</h3>
                    <p className="text-sm text-gray-600">+54 381 661-8632</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="text-center space-y-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <p className="text-sm text-gray-600">jpbonacossa@gmail.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                onClick={() => window.open('https://wa.me/543814199442?text=¡Hola! Tengo una consulta sobre el proceso de compra 😊', '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chatear Ahora
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}