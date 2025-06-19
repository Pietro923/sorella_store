export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  model: string[]; 
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutForm {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryType: 'delivery' | 'pickup';
  address?: string;
  pickupPoint?: string;
  notes?: string;
}