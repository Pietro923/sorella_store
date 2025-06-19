import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy S24',
    description: 'Smartphone de última generación con cámara de 108MP, 8GB RAM y 256GB storage',
    price: 899999,
    image: 'https://picsum.photos/300/300?random=1',
    category: 'Electrónicos',
    stock: 10
  },
  {
    id: '2',
    name: 'Auriculares Bluetooth Sony WH-1000XM5',
    description: 'Auriculares inalámbricos con cancelación de ruido activa y 30 horas de batería',
    price: 189999,
    image: 'https://picsum.photos/300/300?random=2',
    category: 'Accesorios',
    stock: 25
  },
  {
    id: '3',
    name: 'Notebook Gaming ASUS ROG',
    description: 'Laptop para gaming con RTX 4060, Intel i7 y 16GB RAM DDR5',
    price: 1299999,
    image: 'https://picsum.photos/300/300?random=3',
    category: 'Computadoras',
    stock: 5
  },
  {
    id: '4',
    name: 'iPad Air 11" M2',
    description: 'Tablet con chip M2, pantalla Liquid Retina de 11 pulgadas y Apple Pencil compatible',
    price: 699999,
    image: 'https://picsum.photos/300/300?random=4',
    category: 'Electrónicos',
    stock: 8
  },
  {
    id: '5',
    name: 'Smartwatch Apple Watch Series 9',
    description: 'Reloj inteligente con GPS, monitor de salud y pantalla Always-On',
    price: 449999,
    image: 'https://picsum.photos/300/300?random=5',
    category: 'Accesorios',
    stock: 15
  },
  {
    id: '6',
    name: 'MacBook Pro 14" M3',
    description: 'Laptop profesional con chip M3, 16GB RAM y pantalla Liquid Retina XDR',
    price: 1999999,
    image: 'https://picsum.photos/300/300?random=6',
    category: 'Computadoras',
    stock: 3
  },
  {
    id: '7',
    name: 'Cámara Canon EOS R6 Mark II',
    description: 'Cámara mirrorless full-frame con 24.2MP y grabación 4K',
    price: 2499999,
    image: 'https://picsum.photos/300/300?random=7',
    category: 'Electrónicos',
    stock: 4
  },
  {
    id: '8',
    name: 'Teclado Mecánico Logitech G915',
    description: 'Teclado gaming inalámbrico con switches mecánicos y RGB',
    price: 159999,
    image: 'https://picsum.photos/300/300?random=8',
    category: 'Accesorios',
    stock: 20
  },
  {
    id: '9',
    name: 'Monitor Samsung 32" 4K',
    description: 'Monitor curvo 4K UHD de 32 pulgadas con HDR10 y 144Hz',
    price: 449999,
    image: 'https://picsum.photos/300/300?random=9',
    category: 'Computadoras',
    stock: 7
  },
  {
    id: '10',
    name: 'Drone DJI Mini 3',
    description: 'Drone compacto con cámara 4K, estabilización gimbal y 38 min de vuelo',
    price: 599999,
    image: 'https://picsum.photos/300/300?random=10',
    category: 'Electrónicos',
    stock: 6
  },
];

export const categories = [
  'Todos',
  'Electrónicos',
  'Accesorios',
  'Computadoras'
];