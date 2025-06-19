'use client';

import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Filtrar por modelo:</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => onCategoryChange(category)}
            size="sm"
            className={`text-xs ${
              selectedCategory === category 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'hover:bg-blue-50 hover:border-blue-200'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}