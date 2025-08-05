// src/lib/cloudinary.ts

// Tu Cloud Name
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'diedtwuhp';

// 🆕 NUEVA FUNCIÓN: Detectar si es URL directa o ID de Cloudinary
const isDirectUrl = (imageSource: string): boolean => {
  return imageSource.startsWith('http://') || imageSource.startsWith('https://');
};

// 🆕 NUEVA FUNCIÓN: Transformar URLs de Google Drive
export const transformGoogleDriveUrl = (driveUrl: string): string => {
  // Si ya está en formato correcto, devolverla tal como está
  if (driveUrl.includes('/uc?id=')) {
    return driveUrl;
  }
  
  // Convertir URL de Google Drive al formato directo
  // De: https://drive.google.com/file/d/1ABC123XYZ/view
  // A: https://drive.google.com/uc?id=1ABC123XYZ
  const fileIdMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/uc?id=${fileId}`;
  }
  
  return driveUrl;
};

// ✅ FUNCIÓN EXISTENTE - No cambió nada
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

  // URL sin folder y con transformaciones automáticas
  const transformations = `w_${width},h_${height},q_${quality},f_${format},c_${crop}`;
  
  // Cloudinary automáticamente manejará la versión y extensión
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};

// 🔄 FUNCIÓN MODIFICADA - Ahora maneja URLs directas Y IDs de Cloudinary
export const getProductImage = (
  imageSource: string, // ← Cambié nombre de 'publicId' a 'imageSource'
  size: 'thumb' | 'card' | 'detail' | 'hero' = 'card'
) => {
  // 🆕 Si es una URL directa (Google Drive, etc.)
  if (isDirectUrl(imageSource)) {
    // Si es de Google Drive, transformarla al formato correcto
    if (imageSource.includes('drive.google.com')) {
      return transformGoogleDriveUrl(imageSource);
    }
    // Si es otra URL directa (ImgBB, etc.), devolverla tal como está
    return imageSource;
  }

  // ✅ Si es un ID de Cloudinary, usar la lógica original
  const sizes = {
    thumb: { width: 150, height: 150 },     // Para miniaturas
    card: { width: 400, height: 400 },      // Para cards de productos
    detail: { width: 800, height: 800 },    // Para página de detalle
    hero: { width: 1200, height: 1200 }     // Para imágenes grandes
  };

  return getCloudinaryUrl(imageSource, sizes[size]);
};

// 🔄 FUNCIÓN MODIFICADA - Ahora maneja URLs directas Y IDs de Cloudinary
export const getResponsiveImage = (imageSource: string) => {
  // 🆕 Si es una URL directa, no generar srcSet (las URLs directas no tienen transformaciones)
  if (isDirectUrl(imageSource)) {
    const processedUrl = imageSource.includes('drive.google.com') 
      ? transformGoogleDriveUrl(imageSource) 
      : imageSource;
    
    return {
      src: processedUrl,
      srcSet: processedUrl, // Una sola versión para URLs directas
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
    };
  }

  // ✅ Si es ID de Cloudinary, usar la lógica original
  return {
    src: getProductImage(imageSource, 'card'),
    srcSet: `
      ${getProductImage(imageSource, 'thumb')} 150w,
      ${getProductImage(imageSource, 'card')} 400w,
      ${getProductImage(imageSource, 'detail')} 800w,
      ${getProductImage(imageSource, 'hero')} 1200w
    `,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
  };
};

// 🆕 NUEVA FUNCIÓN: Validar URLs de imágenes
export const isValidImageUrl = (url: string): boolean => {
  if (!isDirectUrl(url)) {
    return true; // Asumir que los IDs de Cloudinary son válidos
  }
  
  // Verificar servicios conocidos de hosting de imágenes
  const knownServices = [
    'drive.google.com/uc?id=',
    'i.imgur.com/',
    'imgbb.com/',
    'i.imgbb.com/',
    'raw.githubusercontent.com/'
  ];
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  const isKnownService = knownServices.some(service => 
    url.includes(service)
  );
  
  return hasImageExtension || isKnownService;
};

// 🆕 NUEVA FUNCIÓN: Generar placeholder en caso de error
export const getImagePlaceholder = (productName: string): string => {
  // Generar un placeholder usando el nombre del producto
  const encodedName = encodeURIComponent(productName.substring(0, 20));
  return `https://via.placeholder.com/400x400/efecdd/9d1d25?text=${encodedName}`;
};