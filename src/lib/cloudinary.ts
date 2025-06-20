// src/lib/cloudinary.ts

// Tu Cloud Name
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'diedtwuhp';

export const getCloudinaryUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'scale';
  } = {}
) => {
  const {
    width = 400,
    height = 400,
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options;

  // URL sin folder - todas las imágenes están en la raíz
  const transformations = `w_${width},h_${height},q_${quality},f_${format},c_${crop}`;
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};

// Función específica para productos con tamaños predefinidos
export const getProductImage = (
  publicId: string, 
  size: 'thumb' | 'card' | 'detail' | 'hero' = 'card'
) => {
  const sizes = {
    thumb: { width: 150, height: 150 },     // Para miniaturas
    card: { width: 400, height: 400 },      // Para cards de productos
    detail: { width: 800, height: 800 },    // Para página de detalle
    hero: { width: 1200, height: 1200 }     // Para imágenes grandes
  };

  // ✅ Todas las imágenes están en la raíz, sin carpeta
  return getCloudinaryUrl(publicId, sizes[size]);
};

// Función para imágenes responsivas (Next.js Image)
export const getResponsiveImage = (publicId: string) => {
  return {
    src: getProductImage(publicId, 'card'),
    srcSet: `
      ${getProductImage(publicId, 'thumb')} 150w,
      ${getProductImage(publicId, 'card')} 400w,
      ${getProductImage(publicId, 'detail')} 800w,
      ${getProductImage(publicId, 'hero')} 1200w
    `,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
  };
};