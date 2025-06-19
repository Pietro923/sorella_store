import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy',
    description: 'Smartphone de última generación con cámara de 108MP',
    price: 299999,
    image: '/api/placeholder/300/300',
    category: 'Electrónicos',
    stock: 10
  },
  {
    id: '2',
    name: 'Auriculares Bluetooth',
    description: 'Auriculares inalámbricos con cancelación de ruido',
    price: 89999,
    image: '/api/placeholder/300/300',
    category: 'Accesorios',
    stock: 25
  },
  {
    id: '3',
    name: 'Notebook Gaming',
    description: 'Laptop para gaming con RTX 4060 y 16GB RAM',
    price: 899999,
    image: '/api/placeholder/300/300',
    category: 'Computadoras',
    stock: 5
  },
  // Agrega más productos según necesites
];

export const categories = [
  'Todos',
  'Electrónicos',
  'Accesorios',
  'Computadoras'
];