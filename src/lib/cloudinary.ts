// src/lib/cloudinary.ts
export const getProductImage = (imageSource: string): string => {
  // Si ya es una URL completa, devolverla tal como está
  if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
    return imageSource;
  }
  
  // Si es solo un nombre de archivo, asumir que es placeholder
  return `https://via.placeholder.com/400x400/efecdd/9d1d25?text=${encodeURIComponent(imageSource)}`;
};