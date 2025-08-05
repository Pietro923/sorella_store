// src/lib/imageUtils.ts

// Función para detectar si es URL directa o ID de Cloudinary
const isDirectUrl = (imageSource: string): boolean => {
  return imageSource.startsWith('http://') || imageSource.startsWith('https://');
};

// Función para transformar URL de Google Drive
export const transformGoogleDriveUrl = (driveUrl: string): string => {
  // Si ya está en formato correcto, devolverla tal como está
  if (driveUrl.includes('/uc?id=')) {
    return driveUrl;
  }
  
  // Convertir URL de Google Drive al formato directo
  const fileIdMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/uc?id=${fileId}`;
  }
  
  return driveUrl;
};

// Tu Cloud Name (mantener para productos existentes)
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

  const transformations = `w_${width},h_${height},q_${quality},f_${format},c_${crop}`;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};

// Función principal que maneja tanto URLs directas como IDs de Cloudinary
export const getProductImage = (
  imageSource: string, 
  size: 'thumb' | 'card' | 'detail' | 'hero' = 'card'
) => {
  // Si es una URL directa (Google Drive, etc.)
  if (isDirectUrl(imageSource)) {
    // Si es de Google Drive, transformarla al formato correcto
    if (imageSource.includes('drive.google.com')) {
      return transformGoogleDriveUrl(imageSource);
    }
    return imageSource;
  }

  // Si es un ID de Cloudinary, usar la función original
  const sizes = {
    thumb: { width: 150, height: 150 },
    card: { width: 400, height: 400 },
    detail: { width: 800, height: 800 },
    hero: { width: 1200, height: 1200 }
  };

  return getCloudinaryUrl(imageSource, sizes[size]);
};

// Función para validar URLs de imágenes
export const isValidImageUrl = (url: string): boolean => {
  if (!isDirectUrl(url)) {
    return true; // Asumir que los IDs de Cloudinary son válidos
  }
  
  const knownServices = [
    'drive.google.com/uc?id=',
    'i.imgur.com/',
    'imgbb.com/',
    'i.imgbb.com/',
    'raw.githubusercontent.com/'
  ];
  
  return knownServices.some(service => url.includes(service));
};