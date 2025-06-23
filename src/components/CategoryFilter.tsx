'use client';

import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data';
import { Smartphone } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-black"
          style={{ backgroundColor: '#9d1d25' }}
        >
          <Smartphone className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-lg font-black" style={{ color: '#282828' }}>
          FILTRAR POR MODELO:
        </h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onCategoryChange(category)}
            size="sm"
            className={`text-sm font-bold border-3 border-black shadow-[3px_3px_0px_0px_#282828] hover:shadow-[4px_4px_0px_0px_#282828] transition-all duration-300 transform hover:-translate-y-0.5 hover:-translate-x-0.5 ${
              selectedCategory === category 
                ? 'text-white' 
                : 'hover:bg-white'
            }`}
            style={{ 
              backgroundColor: selectedCategory === category ? '#9d1d25' : 'white',
              color: selectedCategory === category ? 'white' : '#282828'
            }}
          >
            {category === 'Todos' ? 'TODOS' : category.replace('iPhone ', '')}
          </Button>
        ))}
      </div>
    </div>
  );
}