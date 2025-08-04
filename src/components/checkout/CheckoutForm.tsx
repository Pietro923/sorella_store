'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import { CheckoutForm as CheckoutFormType } from '@/types';
import { ShoppingBag, Truck, MapPin, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const checkoutSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  email: z.string().email('Email inválido'),
  deliveryType: z.enum(['delivery', 'pickup']),
  address: z.string().optional(),
  pickupPoint: z.string().optional(),
  notes: z.string().optional(),
}).refine((data) => {
  if (data.deliveryType === 'delivery' && !data.address) {
    return false;
  }
  if (data.deliveryType === 'pickup' && !data.pickupPoint) {
    return false;
  }
  return true;
}, {
  message: "Completa los campos requeridos según el tipo de entrega",
  path: ["deliveryType"],
});

export default function CheckoutForm() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryType: 'delivery'
    }
  });

  const deliveryType = watch('deliveryType');
  const total = getTotalPrice();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const generateWhatsAppMessage = (data: CheckoutFormType) => {
    let message = `¡Hola! Quiero comprar estos productos:\n\n`;
    
    items.forEach((item) => {
      message += `• ${item.name} - Cantidad: ${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    message += `\n*Total: ${formatPrice(total)}*\n\n`;
    message += `*Mis Datos son:*\n`;
    message += `Nombre: ${data.name} ${data.lastName}\n`;
    message += `Teléfono: ${data.phone}\n`;
    message += `Email: ${data.email}\n`;
    
    if (data.deliveryType === 'delivery') {
      message += `Tipo de entrega: Envío a domicilio\n`;
      message += `Dirección: ${data.address}\n`;
    } else {
      message += `Tipo de entrega: Retiro en punto de encuentro\n`;
      message += `Punto de encuentro: ${data.pickupPoint}\n`;
    }
    
    if (data.notes) {
      message += `Notas adicionales: ${data.notes}\n`;
    }

    return encodeURIComponent(message);
  };

  const onSubmit = async (data: CheckoutFormType) => {
    setIsSubmitting(true);
    
    try {
      const whatsappMessage = generateWhatsAppMessage(data);
      const phoneNumber = '543814199442';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      setTimeout(() => {
        clearCart();
        alert('¡Pedido enviado! Te redirigimos a WhatsApp para completar la compra.');
      }, 1000);
      
    } catch {
      alert('Error al procesar el pedido. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8 sm:py-16" style={{ backgroundColor: '#efecdd' }}>
        <div className="container mx-auto px-4">
          <div className="text-center py-8 sm:py-16">
            <div 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 border-4 border-black shadow-[6px_6px_0px_0px_#282828] sm:shadow-[8px_8px_0px_0px_#282828]"
              style={{ backgroundColor: '#9d1d25' }}
            >
              <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black mb-4 sm:mb-6 px-4" style={{ color: '#282828' }}>
              TU CARRITO ESTÁ VACÍO
            </h2>
            <p className="text-base sm:text-lg font-medium mb-6 sm:mb-8 max-w-md mx-auto px-4" style={{ color: '#9d1d25' }}>
              Agrega algunos productos antes de proceder al checkout
            </p>
            <Button 
              asChild
              className="font-black border-3 border-black shadow-[4px_4px_0px_0px_#282828] sm:shadow-[6px_6px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] sm:hover:shadow-[8px_8px_0px_0px_#282828] transition-all px-6 py-3 text-base"
              style={{ backgroundColor: '#9d1d25', color: 'white' }}
            >
              <Link href="/">VOLVER A LA TIENDA</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-16" style={{ backgroundColor: '#efecdd' }}>
      <div className="container mx-auto px-4">
        {/* Layout responsive: columna única en móvil, dos columnas en desktop */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          
          {/* Resumen del pedido - Primero en móvil, segundo en desktop */}
          <div className="w-full lg:w-2/5 order-1 lg:order-2">
            <Card className="border-3 sm:border-4 border-black shadow-[6px_6px_0px_0px_#282828] sm:shadow-[8px_8px_0px_0px_#282828] sticky top-4" style={{ backgroundColor: '#efecdd' }}>
              <CardHeader className="p-4 sm:p-6" style={{ backgroundColor: '#efecdd' }}>
                <CardTitle className="text-lg sm:text-2xl font-black flex items-center gap-2 sm:gap-3" style={{ color: '#282828' }}>
                  <div 
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border-2 border-black"
                    style={{ backgroundColor: '#9d1d25' }}
                  >
                    <ShoppingBag className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <span className="text-base sm:text-xl">RESUMEN DEL PEDIDO</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 overflow-y-auto" style={{ backgroundColor: '#efecdd' }}>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start py-2 sm:py-3 border-b-2 gap-3" style={{ borderColor: '#9d1d25' }}>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-sm sm:text-base leading-tight truncate" style={{ color: '#282828' }}>
                        {item.name}
                      </h4>
                      <p className="text-xs sm:text-sm font-bold" style={{ color: '#9d1d25' }}>
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-black text-sm sm:text-lg" style={{ color: '#9d1d25' }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <p className="text-xs font-bold" style={{ color: '#282828' }}>
                        c/u {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div 
                  className="flex justify-between items-center pt-4 sm:pt-6 text-xl sm:text-2xl font-black border-t-4 border-black"
                  style={{ color: '#9d1d25' }}
                >
                  <span>TOTAL:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulario - Segundo en móvil, primero en desktop */}
          <div className="w-full lg:w-3/5 order-2 lg:order-1">
            <Card className="border-3 sm:border-4 border-black shadow-[6px_6px_0px_0px_#282828] sm:shadow-[8px_8px_0px_0px_#282828]" style={{ backgroundColor: '#efecdd' }}>
              <CardHeader className="p-4 sm:p-6" style={{ backgroundColor: '#efecdd' }}>
                <CardTitle className="text-lg sm:text-2xl font-black flex items-center gap-2 sm:gap-3" style={{ color: '#282828' }}>
                  <div 
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center border-2 border-black"
                    style={{ backgroundColor: '#be3a47' }}
                  >
                    <Truck className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <span className="text-base sm:text-xl">INFORMACIÓN DE ENTREGA</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6" style={{ backgroundColor: '#efecdd' }}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  
                  {/* Datos personales - Grid responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-black text-sm sm:text-base" style={{ color: '#282828' }}>
                        NOMBRE *
                      </Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Tu nombre"
                        className="border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2 h-10 sm:h-12 text-sm sm:text-base bg-white placeholder:text-gray-500"
                      />
                      {errors.name && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 text-red-600 flex-shrink-0" />
                          <p className="text-xs font-black" style={{ color: '#be3a47' }}>
                            {errors.name.message}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName" className="font-black text-sm sm:text-base" style={{ color: '#282828' }}>
                        APELLIDO *
                      </Label>
                      <Input
                        id="lastName"
                        {...register('lastName')}
                        placeholder="Tu apellido"
                        className="border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2 h-10 sm:h-12 text-sm sm:text-base bg-white placeholder:text-gray-500"
                      />
                      {errors.lastName && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 text-red-600 flex-shrink-0" />
                          <p className="text-xs font-black" style={{ color: '#be3a47' }}>
                            {errors.lastName.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contacto - Grid responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="font-black text-sm sm:text-base" style={{ color: '#282828' }}>
                        TELÉFONO *
                      </Label>
                      <Input
                        id="phone"
                        {...register('phone')}
                        placeholder="Ej: 381 123 4567"
                        type="tel"
                        className="border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2 h-10 sm:h-12 text-sm sm:text-base bg-white placeholder:text-gray-500"
                      />
                      {errors.phone && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 text-red-600 flex-shrink-0" />
                          <p className="text-xs font-black" style={{ color: '#be3a47' }}>
                            {errors.phone.message}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="font-black text-sm sm:text-base" style={{ color: '#282828' }}>
                        EMAIL *
                      </Label>
                      <Input
                        id="email"
                        {...register('email')}
                        placeholder="tu@email.com"
                        type="email"
                        className="border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2 h-10 sm:h-12 text-sm sm:text-base bg-white placeholder:text-gray-500"
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 text-red-600 flex-shrink-0" />
                          <p className="text-xs font-black" style={{ color: '#be3a47' }}>
                            {errors.email.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tipo de entrega - Diseño mejorado para móvil */}
                  <div>
                    <Label className="font-black text-sm sm:text-base mb-3 sm:mb-4 block" style={{ color: '#282828' }}>
                      TIPO DE ENTREGA *
                    </Label>
                    <RadioGroup
                      value={deliveryType}
                      onValueChange={(value) => register('deliveryType').onChange({ target: { value } })}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-3 p-3 sm:p-4 border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_#282828]" style={{ backgroundColor: '#efecdd' }}>
                        <RadioGroupItem value="delivery" id="delivery" className="border-2 border-black mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <Label htmlFor="delivery" className="font-bold flex items-start gap-2 cursor-pointer" style={{ color: '#282828' }}>
                            <Truck className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#9d1d25' }} />
                            <div>
                              <div className="text-sm sm:text-base">ENVÍO A DOMICILIO</div>
                              <div className="text-xs font-bold mt-1 leading-relaxed" style={{ color: '#9d1d25' }}>
                                Enviamos por Uber. Costo según distancia.
                              </div>
                            </div>
                          </Label>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 sm:p-4 border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_#282828]" style={{ backgroundColor: '#efecdd' }}>
                        <RadioGroupItem value="pickup" id="pickup" className="border-2 border-black mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <Label htmlFor="pickup" className="font-bold flex items-start gap-2 cursor-pointer" style={{ color: '#282828' }}>
                            <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#9d1d25' }} />
                            <div>
                              <div className="text-sm sm:text-base">RETIRO EN PUNTO DE ENCUENTRO</div>
                              <div className="text-xs font-bold mt-1 leading-relaxed" style={{ color: '#9d1d25' }}>
                                Gratis. Coordinamos lugar por WhatsApp.
                              </div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Campos condicionales */}
                  {deliveryType === 'delivery' && (
                    <div>
                      <Label htmlFor="address" className="font-black text-sm sm:text-base" style={{ color: '#282828' }}>
                        DIRECCIÓN DE ENTREGA *
                      </Label>
                      <Textarea
                        id="address"
                        {...register('address')}
                        placeholder="Dirección completa donde queres recibir tu pedido (calle, número, barrio, referencias)"
                        className="border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2 min-h-[80px] text-sm sm:text-base resize-none bg-white placeholder:text-gray-500"
                      />
                      {errors.address && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 text-red-600 flex-shrink-0" />
                          <p className="text-xs font-black" style={{ color: '#be3a47' }}>
                            Ingresa tu dirección completa
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {deliveryType === 'pickup' && (
                    <div>
                      <Label htmlFor="pickupPoint" className="font-black text-sm sm:text-base" style={{ color: '#282828' }}>
                        PUNTO DE ENCUENTRO PREFERIDO *
                      </Label>
                      <Input
                        id="pickupPoint"
                        {...register('pickupPoint')}
                        placeholder="Ej: Shopping del Jardín, UNT, Plaza Independencia"
                        className="border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2 h-10 sm:h-12 text-sm sm:text-base bg-white placeholder:text-gray-500"
                      />
                      {errors.pickupPoint && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3 text-red-600 flex-shrink-0" />
                          <p className="text-xs font-black" style={{ color: '#be3a47' }}>
                            Indica dónde te gustaría encontrarnos
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Notas opcionales */}
                  <div>
                    <Label htmlFor="notes" className="font-black text-sm sm:text-base" style={{ color: '#282828' }}>
                      NOTAS ADICIONALES (OPCIONAL)
                    </Label>
                    <Textarea
                      id="notes"
                      {...register('notes')}
                      placeholder="Cualquier información adicional sobre tu pedido, horarios preferidos, etc."
                      className="border-2 sm:border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2 min-h-[60px] text-sm sm:text-base resize-none bg-white placeholder:text-gray-500"
                    />
                  </div>

                  {/* Botón de envío - Mejorado para móvil */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full h-12 sm:h-16 text-base sm:text-xl font-black border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_#282828] sm:shadow-[6px_6px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] sm:hover:shadow-[8px_8px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1 disabled:opacity-70 disabled:hover:transform-none"
                      disabled={isSubmitting}
                      style={{ backgroundColor: '#9d1d25', color: 'white' }}
                    >
                      <Phone className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="hidden sm:inline">PROCESANDO...</span>
                          <span className="sm:hidden">ENVIANDO...</span>
                        </span>
                      ) : (
                        <span>
                          <span className="hidden sm:inline">ENVIAR PEDIDO POR WHATSAPP</span>
                          <span className="sm:hidden">ENVIAR PEDIDO</span>
                        </span>
                      )}
                    </Button>
                    
                    {/* Mensaje informativo con mejor contraste sobre #efecdd */}
                    <div className="flex items-start gap-2 mt-4 p-3 border-3 border-black shadow-[2px_2px_0px_0px_#282828] rounded-lg" style={{ backgroundColor: '#f8fdf8' }}>
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#166534' }} />
                      <p className="text-xs sm:text-sm font-black leading-relaxed" style={{ color: '#1f2937' }}>
                        Al hacer clic se abrirá WhatsApp con tu pedido. 
                        <span className="font-black" style={{ color: '#166534' }}> ¡No se realizará ningún cobro automático!</span>
                      </p>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}