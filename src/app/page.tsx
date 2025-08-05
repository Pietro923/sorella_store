'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import ProductSkeleton, { ProductGridSkeleton } from '@/components/ProductSkeleton';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, Truck, Shield, Smartphone, Sparkles, Award, Heart, Zap, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const { products, categories, isLoading, error, lastUpdated } = useProducts();
  
  useEffect(() => {
    if (error) {
      console.error('Error al cargar productos:', error);
    }
  }, [products, isLoading, error, lastUpdated]);

  const filteredProducts = useMemo(() => {
    if (isLoading) return [];
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || 
                              product.model.includes(selectedCategory);
      
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products, isLoading]);

  const featuredProducts = isLoading ? [] : products.slice(0, 4);
  const bestSellers = isLoading ? [] : products.sort((a, b) => b.stock - a.stock).slice(0, 3);
  

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#efecdd' }}>
      {/* Hero Section Retro */}
      <section className="relative overflow-hidden min-h-screen py-16 sm:py-24" style={{ background: 'linear-gradient(135deg, #9d1d25 0%, #be3a47 100%)' }}>
        {/* Efectos de fondo */}
        <img
          src="/fondo2.png"
          alt="fondo"
          className="absolute inset-0 w-full h-full object-cover "
          style={{ filter: 'blur(2px)' }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div 
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl flex items-center justify-center border-4 border-black shadow-2xl"
                style={{ backgroundColor: '#efecdd' }}
              >
                <img 
                  src="/sorella_logo_secundario_Mesa_de_trabajo_1.png" 
                  alt="Sorella" 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-4 text-black tracking-tight">
              FUNDAS
            </h1>
            <div className="relative inline-block">
              <h2 
                className="text-2xl sm:text-4xl md:text-5xl font-bold px-4 sm:px-8 py-2 sm:py-3 rounded-full border-4 border-black shadow-xl"
                style={{ backgroundColor: '#efecdd', color: '#9d1d25' }}
              >
                CON ESTILO
              </h2>
            </div>
          </div>

          {/* 
          <p className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed text-black font-black px-2 drop-shadow-lg">
            Protección para tu iPhone
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-black drop-shadow-xl">
              ¡Diseños que hacen la diferencia!
            </span>
          </p>
          */}
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 px-4">
            <Link href="#todas-las-fundas" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-full border-4 border-black shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1"
                style={{ backgroundColor: '#efecdd', color: '#9d1d25' }}
              >
                <Zap className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                VER FUNDAS
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              className="bg-white text-black w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-full border-4 border-black   hover:bg-white/10 shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1"
              onClick={() => window.open('https://wa.me/543814199442?text=¡Hola! Quiero consultar sobre las fundas para iPhone 😊', '_blank')}
            >
              <Phone className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              CONSULTAR
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section Retro */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: '#efecdd' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 
              className="text-3xl sm:text-5xl font-black mb-4 sm:mb-6 px-2"
              style={{ color: '#282828' }}
            >
              ¿POR QUÉ SOMOS LOS MEJORES?
            </h2>
            <p className="text-lg sm:text-xl font-medium max-w-2xl mx-auto px-4" style={{ color: '#9d1d25' }}>
              Especialistas en protección premium para tu iPhone desde 2020
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Truck,
                title: 'Envío Express',
                description: 'Entrega en 24-48hs en Tucumán. Coordinamos horario por WhatsApp para tu comodidad.',
                badge: 'Gratis en UNT/UTN',
                color: '#9d1d25'
              },
              {
                icon: Shield,
                title: 'Calidad Premium',
                description: 'Materiales TPU rígido de primera calidad. Protección garantizada contra caídas y rayones.',
                badge: 'Garantía incluida',
                color: '#be3a47'
              },
              {
                icon: Heart,
                title: 'Atención Personal',
                description: 'Te ayudamos a elegir la funda perfecta. Asesoramiento especializado vía WhatsApp.',
                badge: '24/7 disponible',
                color: '#282828'
              }
            ].map((feature, idx) => (
              <Card 
                key={idx}
                className="p-6 sm:p-8 border-4 border-black shadow-[6px_6px_0px_0px_#282828] sm:shadow-[8px_8px_0px_0px_#282828] hover:shadow-[8px_8px_0px_0px_#282828] sm:hover:shadow-[12px_12px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:-translate-x-1 bg-white"
              >
                <CardContent className="space-y-4 sm:space-y-6 p-0 text-center">
                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto border-3 border-black shadow-lg"
                    style={{ backgroundColor: feature.color }}
                  >
                    <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black" style={{ color: '#282828' }}>
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed font-medium text-sm sm:text-base" style={{ color: '#282828' }}>
                    {feature.description}
                  </p>
                  <Badge 
                    className="font-bold border-2 border-black shadow-lg text-xs sm:text-sm"
                    style={{ backgroundColor: '#efecdd', color: feature.color }}
                  >
                    {feature.badge}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Retro */}
      <section id="destacados" className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border-3 border-black shadow-lg  mx-auto sm:mx-0"
                  style={{ backgroundColor: '#9d1d25' }}
                >
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-center sm:text-left" style={{ color: '#282828' }}>
                  FUNDAS DESTACADAS
                </h2>
              </div>
              <p className="text-lg sm:text-xl font-medium text-center sm:text-left" style={{ color: '#9d1d25' }}>
                Las más elegidas por ustedes
              </p>
            </div>
            <Button 
              asChild 
              className="hidden lg:flex font-bold border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all"
              style={{ backgroundColor: '#efecdd', color: '#282828' }}
            >
              <Link href="#todas-las-fundas">
                Ver Todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ">
             {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : (
              featuredProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Best Sellers Retro */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: '#efecdd' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border-3 border-black shadow-lg "
                style={{ backgroundColor: '#be3a47' }}
              >
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-black" style={{ color: '#282828' }}>
                TOP VENTAS
              </h2>
            </div>
            <p className="text-lg sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed px-4" style={{ color: '#9d1d25' }}>
              🚀 Las fundas que más confían nuestros clientes
              <br />
              <span className="font-black">¡Diseños únicos y protección garantizada!</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : (
              bestSellers.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Models Section Retro */}
      <section className="py-16 sm:py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4 sm:mb-6 px-2" style={{ color: '#282828' }}>
              COMPATIBLE CON TODOS LOS iPHONE
            </h2>
            <p className="text-lg sm:text-xl font-medium max-w-3xl mx-auto px-4" style={{ color: '#9d1d25' }}>
              Desde iPhone 11 hasta iPhone 16 Pro Max. ¡Encontrá la funda perfecta para tu modelo!
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {['iPhone 11', 'iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15', 'iPhone 16'].map((model) => (
              <Card 
                key={model} 
                className="text-center p-4 sm:p-6 border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:-translate-x-1 bg-white"
                onClick={() => setSelectedCategory(model)}
              >
                <CardContent className="p-0">
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border-2 border-black"
                    style={{ backgroundColor: '#efecdd' }}
                  >
                    <Smartphone className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: '#282828' }} />
                  </div>
                  <p className="font-black text-xs sm:text-sm" style={{ color: '#282828' }}>
                    {model.replace('iPhone ', '')}
                  </p>
                  <p className="text-xs font-medium mt-1" style={{ color: '#9d1d25' }}>Ver fundas</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Retro 
      <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #282828 0%, #9d1d25 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-white transform -rotate-1 px-2">
              ¿NO SABÉS CUÁL ELEGIR? 
            </h2>
            <p className="text-lg sm:text-xl mb-8 sm:mb-10 leading-relaxed text-white/90 font-medium px-4">
              Nuestro equipo te ayuda a encontrar la funda perfecta para tu iPhone
              <br />
              <span className="font-black text-yellow-300">¡Consultanos sin compromiso!</span>
            </p>
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-black rounded-full border-4 border-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:rotate-1"
              style={{ backgroundColor: '#efecdd', color: '#9d1d25' }}
              onClick={() => window.open('https://wa.me/543814199442?text=¡Hola! Necesito ayuda para elegir una funda para mi iPhone 😊', '_blank')}
            >
              <Phone className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              CONSULTAR POR WHATSAPP
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>
      </section>
      */}

      {/* All Products Section Retro Mejorado */}
      <section id="todas-las-fundas" className="py-16 sm:py-20" style={{ backgroundColor: '#efecdd' }}>
        <div className="container mx-auto px-4">
          <div className="mb-8 sm:mb-12">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-5xl font-black mb-3 sm:mb-4 px-2" style={{ color: '#282828' }}>
                TODAS LAS FUNDAS
              </h2>
              <p className="text-lg sm:text-xl font-medium max-w-3xl mx-auto px-4" style={{ color: '#9d1d25' }}>
                Explorá nuestro catálogo completo y encontrá la funda perfecta para tu iPhone
              </p>
            </div>
            
            {/* Búsqueda y filtros mejorados */}
            <div className="max-w-6xl mx-auto">
              <div 
                className="p-6 sm:p-8 border-4 border-black shadow-[6px_6px_0px_0px_#282828] bg-white mb-8"
                style={{ borderRadius: '0px' }}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <SearchBar onSearch={setSearchQuery} />
                  </div>
                  <div className="flex-1">
                    <CategoryFilter 
                      selectedCategory={selectedCategory}
                      onCategoryChange={setSelectedCategory}
                      categories={categories}
                    />
                  </div>
                </div>
                
                {/* Resultados de búsqueda */}
                {(searchQuery || selectedCategory !== 'Todos') && (
                  <div className="mt-6 pt-6 border-t-3 border-black">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black" style={{ color: '#282828' }}>
                          RESULTADOS:
                        </span>
                        <span className="text-lg font-medium" style={{ color: '#9d1d25' }}>
                          {filteredProducts.length} funda{filteredProducts.length !== 1 ? 's' : ''} disponible{filteredProducts.length !== 1 ? 's' : ''}
                          {searchQuery && ` con "${searchQuery}"`}
                          {selectedCategory !== 'Todos' && searchQuery && ` para ${selectedCategory}`}
                          {selectedCategory !== 'Todos' && ` para ${selectedCategory}`}
                          {searchQuery && ` con "${searchQuery}"`}
                        </span>
                      </div>
                      
                      <Button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('Todos');
                        }}
                        size="sm"
                        className="font-bold border-2 border-black shadow-[2px_2px_0px_0px_#282828] hover:shadow-[3px_3px_0px_0px_#282828] transition-all"
                        style={{ backgroundColor: '#be3a47', color: 'white' }}
                      >
                        LIMPIAR FILTROS
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div 
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-4 border-black shadow-[6px_6px_0px_0px_#282828]"
                style={{ backgroundColor: '#be3a47' }}
              >
                <Star className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 px-2" style={{ color: '#282828' }}>
                NO ENCONTRAMOS FUNDAS
              </h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 font-medium px-4 max-w-md mx-auto" style={{ color: '#9d1d25' }}>
                {selectedCategory !== 'Todos' && searchQuery
                  ? `No hay fundas para ${selectedCategory} que coincidan con "${searchQuery}"`
                  : selectedCategory !== 'Todos' 
                  ? `No tenemos fundas disponibles para ${selectedCategory}` 
                  : searchQuery
                  ? `No encontramos fundas que coincidan con "${searchQuery}"`
                  : 'Intenta con una búsqueda diferente'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="font-black border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all"
                  style={{ backgroundColor: '#9d1d25', color: 'white' }}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Todos');
                  }}
                >
                  VER TODAS LAS FUNDAS
                </Button>
                {searchQuery && (
                  <Button 
                    size="lg"
                    className="font-black border-3 border-black shadow-[4px_4px_0px_0px_#282828] hover:shadow-[6px_6px_0px_0px_#282828] transition-all bg-white"
                    style={{ color: '#282828' }}
                    onClick={() => setSearchQuery('')}
                  >
                    LIMPIAR BÚSQUEDA
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Estadísticas de productos */}
              <div className="mb-8">
                <div 
                  className="max-w-2xl mx-auto text-center p-4 border-3 border-black shadow-[4px_4px_0px_0px_#282828] bg-white"
                >
                  <span className="text-lg font-black" style={{ color: '#282828' }}>
                    MOSTRANDO {filteredProducts.length} FUNDAS DISPONIBLES
                  </span>
                </div>
              </div>
              
              {/* Grid de productos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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