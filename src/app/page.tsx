'use client';

import { useState, useMemo, useEffect } from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/product/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import ProductSkeleton, { ProductGridSkeleton } from '@/components/ProductSkeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    // Simular carga de productos destacados
    const featuredTimer = setTimeout(() => {
      setFeaturedLoading(false);
    }, 1000);

    // Simular carga de todos los productos
    const allProductsTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(featuredTimer);
      clearTimeout(allProductsTimer);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (isLoading) return [];
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, isLoading]);

  // Productos destacados (los primeros 4)
  const featuredProducts = featuredLoading ? [] : products.slice(0, 4);
  
  // Productos más vendidos (simulado - los que tienen más stock)
  const bestSellers = featuredLoading ? [] : products.sort((a, b) => b.stock - a.stock).slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Encuentra Todo lo que Necesitas
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Los mejores productos de tecnología al mejor precio. 
            Envío rápido y atención personalizada vía WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Ver Productos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contactar por WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Envío Rápido</h3>
                <p className="text-muted-foreground">
                  Entrega en 24-48hs en CABA y GBA. Coordinamos por WhatsApp.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Compra Segura</h3>
                <p className="text-muted-foreground">
                  Productos originales con garantía. Atención personalizada.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Headphones className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Soporte 24/7</h3>
                <p className="text-muted-foreground">
                  Atención inmediata por WhatsApp. Resolvemos todas tus dudas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Productos Destacados</h2>
              <p className="text-muted-foreground">Los más elegidos por nuestros clientes</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="#todos-productos">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLoading ? (
              // Mostrar 4 skeletons mientras carga
              Array.from({ length: 4 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : (
              featuredProducts.map((product) => (
                <div key={product.id} className="relative">
                  <Badge className="absolute top-4 left-4 z-10 bg-red-500">
                    Destacado
                  </Badge>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Más Vendidos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Los productos que más confían nuestros clientes. 
              Calidad garantizada y entrega inmediata.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredLoading ? (
              // Mostrar 3 skeletons mientras carga
              Array.from({ length: 3 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : (
              bestSellers.map((product, index) => (
                <div key={product.id} className="relative">
                  <Badge 
                    className={`absolute top-4 left-4 z-10 ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}
                  >
                    #{index + 1} Más Vendido
                  </Badge>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas Ayuda para Elegir?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo te asesora por WhatsApp para encontrar 
            el producto perfecto para vos.
          </p>
          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => window.open('https://wa.me/543814199442?text=¡Hola! Necesito ayuda para elegir un producto 😊', '_blank')}
          >
            Consultar por WhatsApp
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* All Products Section */}
      <section id="todos-productos" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Todos los Productos</h2>
            <p className="text-muted-foreground mb-6">
              Explorá nuestro catálogo completo y encontrá lo que buscás
            </p>
            
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 max-w-md">
                <SearchBar onSearch={setSearchQuery} />
              </div>
              <div className="flex-1">
                <CategoryFilter 
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            // Mostrar grid de skeletons mientras carga
            <ProductGridSkeleton count={8} />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
              <p className="text-muted-foreground mb-4">
                Intenta con una búsqueda diferente o cambia la categoría
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                }}
              >
                Limpiar Filtros
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'Todos' && ` en ${selectedCategory}`}
                  {searchQuery && ` para "${searchQuery}"`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}