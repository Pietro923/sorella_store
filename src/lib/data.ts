import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'SMOKY CASE GREEN',
    description: 'Funda exclusiva en verde, diseño disruptivo con bordes reforzados. Material: TPU rígido.',
    price: 8999,
    image: 'smoky-case-green', // El Public ID que asignaste en Cloudinary
    category: 'Fundas',
    stock: 12,
    model: ['iPhone 11', 'iPhone 13', 'iPhone 16']
  },
  {
    id: '2',
    name: 'SMOKY CASE GRAY',
    description: 'Funda gris minimalista con actitud. Material: TPU rígido con protección reforzada.',
    price: 8999,
    image: 'smoky-case-gray', // El Public ID que asignaste en Cloudinary
    category: 'Fundas',
    stock: 10,
    model: ['iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15', 'iPhone 16 Pro Max']
  },
  {
    id: '3',
    name: 'Funda GUM Violeta',
    description: 'Diseño vibrante y suave al tacto. Material: TPU rígido.',
    price: 8999,
    image: 'gum-violeta', // El Public ID que asignaste en Cloudinary
    category: 'Fundas',
    stock: 14,
    model: ['iPhone 13', 'iPhone 13 Pro Max', 'iPhone 15', 'iPhone 16']
  },
  
  {
    id: '4',
    name: 'Funda GUM Negro Mate',
    description: 'Diseño minimalista negro mate. Elegancia moderna y atemporal.',
    price: 8999,
    image: 'gum-negro-mate',
    category: 'Fundas',
    stock: 8,
    model: ['iPhone 13']
  },
  {
    id: '5',
    name: 'Funda GUM Negro',
    description: 'Diseño clásico y versátil. Protección y estilo.',
    price: 8999,
    image: 'gum-negro',
    category: 'Fundas',
    stock: 9,
    model: ['iPhone 14', 'iPhone 15 Pro Max']
  },
  {
    id: '6',
    name: 'Funda VIBE Cherry',
    description: 'Funda cereza intensa con personalidad.',
    price: 8999,
    image: 'vibe-cherry',
    category: 'Fundas',
    stock: 7,
    model: ['iPhone 15 Pro Max']
  },
  {
    id: '7',
    name: 'Funda VIBE Gray',
    description: 'Diseño neutro y elegante. Estilo minimalista.',
    price: 8999,
    image: 'vibe-gray',
    category: 'Fundas',
    stock: 11,
    model: ['iPhone 11']
  },
  {
    id: '8',
    name: 'Funda VIBE Pink',
    description: 'Diseño rosa pastel moderno y delicado.',
    price: 8999,
    image: 'vibe-pink',
    category: 'Fundas',
    stock: 10,
    model: ['iPhone 12 Pro']
  },
  {
    id: '9',
    name: 'Funda Cherry',
    description: 'Diseño cereza con protección y estilo.',
    price: 8999,
    image: 'cherry',
    category: 'Fundas',
    stock: 10,
    model: ['iPhone 11']
  },
  {
    id: '10',
    name: 'Funda BOARD',
    description: 'Diseño en jean auténtico con estilo y protección.',
    price: 8999,
    image: 'board',
    category: 'Fundas',
    stock: 6,
    model: ['iPhone 13', 'iPhone 15 Pro Max']
  },
  {
    id: '11',
    name: 'Funda Ripple Negro',
    description: 'Textura especial en negro, elegante y resistente.',
    price: 8999,
    image: 'ripple-negro',
    category: 'Fundas',
    stock: 8,
    model: ['iPhone 13 Pro']
  },
  {
    id: '12',
    name: 'Funda Ripple Purple',
    description: 'Diseño en púrpura con textura única.',
    price: 8999,
    image: 'ripple-purple',
    category: 'Fundas',
    stock: 7,
    model: ['iPhone 14 Pro Max']
  },
  {
    id: '13',
    name: 'Funda FIRE Blue',
    description: 'Funda azul llamativa con textura especial.',
    price: 8999,
    image: 'flame-case-blue',
    category: 'Fundas',
    stock: 6,
    model: ['iPhone 13 Pro Max']
  },
  {
    id: '14',
    name: 'Funda FIRE Gray',
    description: 'Textura única en gris para proteger con estilo.',
    price: 8999,
    image: 'flame-case-gray',
    category: 'Fundas',
    stock: 9,
    model: ['iPhone 13']
  }
];

// Extraemos todos los modelos sin repetir
export const categories = [
  'Todos',
  ...Array.from(new Set(products.flatMap((p) => p.model)))
];