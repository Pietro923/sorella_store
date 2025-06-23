'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center border-2 border-black"
          style={{ backgroundColor: '#be3a47' }}
        >
          <Search className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-lg font-black" style={{ color: '#282828' }}>
          BUSCAR FUNDAS:
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#9d1d25' }} />
          <Input
            placeholder="Buscar por nombre o descripción..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value); // Búsqueda en tiempo real
            }}
            className="pl-12 pr-20 h-12 border-3 border-black shadow-[3px_3px_0px_0px_#282828] font-medium text-base bg-white focus:shadow-[4px_4px_0px_0px_#282828] transition-all"
            style={{ color: '#282828' }}
          />
          {query && (
            <Button
              type="button"
              onClick={handleClear}
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3 font-bold border-2 border-black shadow-[2px_2px_0px_0px_#282828] hover:shadow-[3px_3px_0px_0px_#282828] transition-all"
              style={{ backgroundColor: '#be3a47', color: 'white' }}
            >
              LIMPIAR
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}