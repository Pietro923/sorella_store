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
import { ShoppingBag, Truck, MapPin, Phone } from 'lucide-react';
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
      <div className="min-h-screen py-16" style={{ backgroundColor: '#efecdd' }}>
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-black shadow-[8px_8px_0px_0px_#282828]"
              style={{ backgroundColor: '#9d1d25' }}
            >
              <ShoppingBag className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-4xl font-black mb-6" style={{ color: '#282828' }}>
              TU CARRITO ESTÁ VACÍO
            </h2>
            <p className="text-lg font-medium mb-8 max-w-md mx-auto" style={{ color: '#9d1d25' }}>
              Agrega algunos productos antes de proceder al checkout
            </p>
            <Button 
              asChild
              className="font-black border-3 border-black shadow-[6px_6px_0px_0px_#282828] hover:shadow-[8px_8px_0px_0px_#282828] transition-all"
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
    <div className="min-h-screen py-16" style={{ backgroundColor: '#efecdd' }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Resumen del pedido */}
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#282828] bg-white">
            <CardHeader style={{ backgroundColor: '#efecdd' }}>
              <CardTitle className="text-2xl font-black flex items-center gap-3" style={{ color: '#282828' }}>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center border-2 border-black"
                  style={{ backgroundColor: '#9d1d25' }}
                >
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                RESUMEN DEL PEDIDO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b-2 border-gray-200">
                  <div>
                    <h4 className="font-black" style={{ color: '#282828' }}>{item.name}</h4>
                    <p className="text-sm font-medium" style={{ color: '#9d1d25' }}>
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <span className="font-black text-lg" style={{ color: '#9d1d25' }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              
              <div 
                className="flex justify-between items-center pt-6 text-2xl font-black border-t-4 border-black"
                style={{ color: '#9d1d25' }}
              >
                <span>TOTAL:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Formulario */}
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#282828] bg-white">
            <CardHeader style={{ backgroundColor: '#efecdd' }}>
              <CardTitle className="text-2xl font-black flex items-center gap-3" style={{ color: '#282828' }}>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center border-2 border-black"
                  style={{ backgroundColor: '#be3a47' }}
                >
                  <Truck className="h-6 w-6 text-white" />
                </div>
                INFORMACIÓN DE ENTREGA
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-black text-base" style={{ color: '#282828' }}>
                      NOMBRE
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Tu nombre"
                      className="border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2"
                    />
                    {errors.name && (
                      <p className="text-sm font-bold mt-1" style={{ color: '#be3a47' }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="font-black text-base" style={{ color: '#282828' }}>
                      APELLIDO
                    </Label>
                    <Input
                      id="lastName"
                      {...register('lastName')}
                      placeholder="Tu apellido"
                      className="border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2"
                    />
                    {errors.lastName && (
                      <p className="text-sm font-bold mt-1" style={{ color: '#be3a47' }}>
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="font-black text-base" style={{ color: '#282828' }}>
                    TELÉFONO
                  </Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="Tu número de teléfono"
                    type="tel"
                    className="border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2"
                  />
                  {errors.phone && (
                    <p className="text-sm font-bold mt-1" style={{ color: '#be3a47' }}>
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="font-black text-base" style={{ color: '#282828' }}>
                    EMAIL
                  </Label>
                  <Input
                    id="email"
                    {...register('email')}
                    placeholder="tu@email.com"
                    type="email"
                    className="border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2"
                  />
                  {errors.email && (
                    <p className="text-sm font-bold mt-1" style={{ color: '#be3a47' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="font-black text-base mb-4 block" style={{ color: '#282828' }}>
                    TIPO DE ENTREGA
                  </Label>
                  <RadioGroup
                    value={deliveryType}
                    onValueChange={(value) => register('deliveryType').onChange({ target: { value } })}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-4 border-3 border-black shadow-[2px_2px_0px_0px_#282828] bg-white">
                      <RadioGroupItem value="delivery" id="delivery" className="border-2 border-black" />
                      <Label htmlFor="delivery" className="font-bold flex items-center gap-2" style={{ color: '#282828' }}>
                        <Truck className="h-4 w-4" style={{ color: '#9d1d25' }} />
                        ENVÍO A DOMICILIO
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border-3 border-black shadow-[2px_2px_0px_0px_#282828] bg-white">
                      <RadioGroupItem value="pickup" id="pickup" className="border-2 border-black" />
                      <Label htmlFor="pickup" className="font-bold flex items-center gap-2" style={{ color: '#282828' }}>
                        <MapPin className="h-4 w-4" style={{ color: '#9d1d25' }} />
                        RETIRO EN PUNTO DE ENCUENTRO
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {deliveryType === 'delivery' && (
                  <div>
                    <Label htmlFor="address" className="font-black text-base" style={{ color: '#282828' }}>
                      DIRECCIÓN DE ENTREGA
                    </Label>
                    <Textarea
                      id="address"
                      {...register('address')}
                      placeholder="Dirección completa donde quieres recibir tu pedido"
                      className="border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2"
                    />
                    {errors.address && (
                      <p className="text-sm font-bold mt-1" style={{ color: '#be3a47' }}>
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                )}

                {deliveryType === 'pickup' && (
                  <div>
                    <Label htmlFor="pickupPoint" className="font-black text-base" style={{ color: '#282828' }}>
                      PUNTO DE ENCUENTRO
                    </Label>
                    <Input
                      id="pickupPoint"
                      {...register('pickupPoint')}
                      placeholder="Donde te gustaría encontrarnos"
                      className="border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2"
                    />
                    {errors.pickupPoint && (
                      <p className="text-sm font-bold mt-1" style={{ color: '#be3a47' }}>
                        {errors.pickupPoint.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <Label htmlFor="notes" className="font-black text-base" style={{ color: '#282828' }}>
                    NOTAS ADICIONALES (OPCIONAL)
                  </Label>
                  <Textarea
                    id="notes"
                    {...register('notes')}
                    placeholder="Cualquier información adicional sobre tu pedido"
                    className="border-3 border-black shadow-[2px_2px_0px_0px_#282828] font-medium mt-2"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-16 text-xl font-black border-4 border-black shadow-[6px_6px_0px_0px_#282828] hover:shadow-[8px_8px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 hover:-translate-x-1"
                  disabled={isSubmitting}
                  style={{ backgroundColor: '#9d1d25', color: 'white' }}
                >
                  <Phone className="mr-3 h-6 w-6" />
                  {isSubmitting ? 'PROCESANDO...' : 'ENVIAR PEDIDO POR WHATSAPP'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}