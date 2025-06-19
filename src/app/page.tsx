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
import { ArrowRight, Star, Truck, Shield, Headphones, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    const featuredTimer = setTimeout(() => {
      setFeaturedLoading(false);
    }, 1000);

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
      // Filtrar por modelo de iPhone
      const matchesCategory = selectedCategory === 'Todos' || 
                              product.model.includes(selectedCategory);
      
      // Filtrar por búsqueda en nombre y descripción
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, isLoading]);

  // Productos destacados (los primeros 4)
  const featuredProducts = featuredLoading ? [] : products.slice(0, 4);
  
  // Productos más vendidos (simulado - por stock)
  const bestSellers = featuredLoading ? [] : products.sort((a, b) => b.stock - a.stock).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Smartphone className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Fundas Premium para tu iPhone
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Protección y estilo únicos. Diseños exclusivos para todos los modelos de iPhone. 
            Calidad garantizada y envío inmediato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Ver Fundas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-green-400 hover:bg-white hover:text-green-600 "
              onClick={() => window.open('https://wa.me/543814199442?text=¡Hola! Quiero consultar sobre las fundas para iPhone 😊', '_blank')}
            >
              Consultar por WhatsApp
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
                  Entrega en 24-48hs en Tucumán. Coordinamos por WhatsApp.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Calidad Premium</h3>
                <p className="text-muted-foreground">
                  Materiales de primera calidad con protección garantizada.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Headphones className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Asesoramiento</h3>
                <p className="text-muted-foreground">
                  Te ayudamos a elegir la funda perfecta para tu iPhone.
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
              <h2 className="text-3xl font-bold mb-2">Fundas Destacadas</h2>
              <p className="text-muted-foreground">Las más elegidas por nuestros clientes</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="#todas-las-fundas">
                Ver Todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLoading ? (
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
            <h2 className="text-3xl font-bold mb-4">Más Vendidas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Las fundas que más confían nuestros clientes. 
              Diseños únicos y protección garantizada.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredLoading ? (
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
                    #{index + 1} Más Vendida
                  </Badge>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compatibles con todos los iPhone</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Desde iPhone 11 hasta iPhone 16 Pro Max. Encontrá la funda perfecta para tu modelo.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['iPhone 11', 'iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15', 'iPhone 16'].map((model) => (
              <Card key={model} className="text-center p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedCategory(model)}>
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Smartphone className="h-6 w-6 text-gray-600" />
                  </div>
                  <p className="text-sm font-medium">{model}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section id="todas-las-fundas" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Todas las Fundas</h2>
            <p className="text-muted-foreground mb-6">
              Explorá nuestro catálogo completo y encontrá la funda perfecta para tu iPhone
            </p>
            
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
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
            <ProductGridSkeleton count={8} />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No encontramos fundas</h3>
              <p className="text-muted-foreground mb-4">
                {selectedCategory !== 'Todos' 
                  ? `No tenemos fundas disponibles para ${selectedCategory}` 
                  : 'Intenta con una búsqueda diferente'
                }
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                }}
              >
                Ver Todas las Fundas
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Mostrando {filteredProducts.length} funda{filteredProducts.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'Todos' && ` para ${selectedCategory}`}
                  {searchQuery && ` con "${searchQuery}"`}
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