import { products } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Mi E-commerce</h1>
        <p className="text-xl text-muted-foreground">
          Encuentra los mejores productos al mejor precio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}