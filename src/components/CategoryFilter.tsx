// src/components/CategoryFilter.tsx
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
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category)}
          size="sm"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}