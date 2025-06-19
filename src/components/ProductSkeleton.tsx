import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Imagen skeleton */}
      <Skeleton className="aspect-square w-full" />
      
      <CardContent className="p-4 space-y-3">
        {/* Título */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Descripción */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Precio */}
        <Skeleton className="h-8 w-1/2" />
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {/* Botón */}
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

// Componente para mostrar múltiples skeletons
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}