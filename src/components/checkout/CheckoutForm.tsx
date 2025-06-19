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
      const phoneNumber = '543814199442'; // Reemplaza con tu número de WhatsApp
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
      
      // Abrir WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Limpiar carrito después de enviar
      setTimeout(() => {
        clearCart();
        alert('¡Pedido enviado! Te redirigimos a WhatsApp para completar la compra.');
      }, 1000);
      
    } catch (error) {
      alert('Error al procesar el pedido. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <p className="text-muted-foreground mb-4">
          Agrega algunos productos antes de proceder al checkout
        </p>
        <Button asChild>
          <a href="/">Volver a la tienda</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Resumen del pedido */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <span className="font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
          
          <div className="flex justify-between items-center pt-4 text-lg font-bold">
            <span>Total:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Formulario */}
      <Card>
        <CardHeader>
          <CardTitle>Información de Entrega</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  placeholder="Tu apellido"
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="Tu número de teléfono"
                type="tel"
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register('email')}
                placeholder="tu@email.com"
                type="email"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label>Tipo de Entrega</Label>
              <RadioGroup
                value={deliveryType}
                onValueChange={(value) => register('deliveryType').onChange({ target: { value } })}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">Envío a domicilio</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">Retiro en punto de encuentro</Label>
                </div>
              </RadioGroup>
            </div>

            {deliveryType === 'delivery' && (
              <div>
                <Label htmlFor="address">Dirección de Entrega</Label>
                <Textarea
                  id="address"
                  {...register('address')}
                  placeholder="Dirección completa donde quieres recibir tu pedido"
                />
                {errors.address && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            )}

            {deliveryType === 'pickup' && (
              <div>
                <Label htmlFor="pickupPoint">Punto de Encuentro</Label>
                <Input
                  id="pickupPoint"
                  {...register('pickupPoint')}
                  placeholder="Donde te gustaría encontrarnos"
                />
                {errors.pickupPoint && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.pickupPoint.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="notes">Notas Adicionales (Opcional)</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Cualquier información adicional sobre tu pedido"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'Enviar Pedido por WhatsApp'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}