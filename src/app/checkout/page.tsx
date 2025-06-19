import CheckoutForm from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>
        <p className="text-muted-foreground">
          Completa tus datos para proceder con el pedido
        </p>
      </div>

      <CheckoutForm />
    </div>
  );
}