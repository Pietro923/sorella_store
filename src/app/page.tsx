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
import { ArrowRight, Star, Truck, Shield, Smartphone, Sparkles, Award, Heart } from 'lucide-react';
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
      const matchesCategory = selectedCategory === 'Todos' || 
                              product.model.includes(selectedCategory);
      
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
      {/* Hero Section Mejorado */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-24 overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Smartphone className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Fundas Premium
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-blue-100">
            para tu iPhone
          </h2>
          
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-blue-50">
            Protección y estilo únicos. Diseños exclusivos para todos los modelos de iPhone. 
            <span className="font-semibold text-yellow-300"> Calidad garantizada</span> y envío inmediato.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <Sparkles className="mr-2 h-5 w-5" />
              Ver Fundas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-green-600 hover:bg-green-50 shadow-2xl hover:shadow-3xl hover:text-green-500 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://wa.me/543814199442?text=¡Hola! Quiero consultar sobre las fundas para iPhone 😊', '_blank')}
            >
              💬 Consultar por WhatsApp
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">100+</div>
              <div className="text-sm text-blue-100">Diseños únicos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">24h</div>
              <div className="text-sm text-blue-100">Envío rápido</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">5⭐</div>
              <div className="text-sm text-blue-100">Calificación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Mejorado */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">¿Por qué elegirnos?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Somos especialistas en protección premium para tu iPhone</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Truck className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Envío Express</h3>
                <p className="text-gray-600 leading-relaxed">
                  Entrega en 24-48hs en Tucumán. Coordinamos horario por WhatsApp para tu comodidad.
                </p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Gratis en Tucumán</Badge>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Calidad Premium</h3>
                <p className="text-gray-600 leading-relaxed">
                  Materiales TPU rígido de primera calidad. Protección garantizada contra caídas y rayones.
                </p>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Garantía incluida</Badge>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Atención Personal</h3>
                <p className="text-gray-600 leading-relaxed">
                  Te ayudamos a elegir la funda perfecta. Asesoramiento especializado vía WhatsApp.
                </p>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">24/7 disponible</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Mejorado */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Fundas Destacadas</h2>
              </div>
              <p className="text-xl text-gray-600">Las más elegidas por nuestros clientes</p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
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
                <div key={product.id} className="relative group">
                  <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg">
                    ⭐ Destacado
                  </Badge>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Best Sellers Mejorado */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Top Ventas</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Las fundas que más confían nuestros clientes. 
              <span className="font-semibold text-purple-600"> Diseños únicos</span> y protección garantizada.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : (
              bestSellers.map((product, index) => (
                <div key={product.id} className="relative group">
                  <Badge 
                    className={`absolute top-4 left-4 z-10 shadow-lg ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
                      index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' : 
                      'bg-gradient-to-r from-orange-400 to-orange-500'
                    }`}
                  >
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'} #{index + 1} Más Vendida
                  </Badge>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Models Section Mejorado */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Compatibles con todos los iPhone</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde iPhone 11 hasta iPhone 16 Pro Max. Encontrá la funda perfecta para tu modelo.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['iPhone 11', 'iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15', 'iPhone 16'].map((model) => (
              <Card 
                key={model} 
                className="text-center p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border-2 hover:border-blue-200"
                onClick={() => setSelectedCategory(model)}
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                    <Smartphone className="h-8 w-8 text-gray-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{model}</p>
                  <p className="text-xs text-gray-500 mt-1">Ver fundas</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿No sabés cuál elegir?
            </h2>
            <p className="text-xl mb-10 leading-relaxed">
              Nuestro equipo te ayuda a encontrar la funda perfecta para tu iPhone. 
              <span className="font-semibold text-yellow-300"> ¡Consultanos sin compromiso!</span>
            </p>
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 shadow-2xl text-lg px-8 py-4 h-auto"
              onClick={() => window.open('https://wa.me/543814199442?text=¡Hola! Necesito ayuda para elegir una funda para mi iPhone 😊', '_blank')}
            >
              💬 Consultar por WhatsApp
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* All Products Section Mejorado */}
      <section id="todas-las-fundas" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Todas las Fundas</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explorá nuestro catálogo completo y encontrá la funda perfecta para tu iPhone
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto">
              <div className="flex-1">
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
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">No encontramos fundas</h3>
              <p className="text-gray-600 mb-8 text-lg">
                {selectedCategory !== 'Todos' 
                  ? `No tenemos fundas disponibles para ${selectedCategory}` 
                  : 'Intenta con una búsqueda diferente'
                }
              </p>
              <Button 
                size="lg"
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
              <div className="flex items-center justify-between mb-8">
                <p className="text-lg text-gray-600">
                  Mostrando <span className="font-semibold text-gray-900">{filteredProducts.length}</span> funda{filteredProducts.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'Todos' && ` para ${selectedCategory}`}
                  {searchQuery && ` con "${searchQuery}"`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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