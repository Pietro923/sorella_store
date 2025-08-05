// src/lib/sheets.ts
import { Product } from '@/types';

export async function getProductsFromSheets(): Promise<Product[]> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!spreadsheetId || !apiKey) {
      throw new Error('GOOGLE_SHEETS_ID o GOOGLE_API_KEY no configurados');
    }

    // URL de la API pública de Google Sheets
    const range = 'Productos!A2:J1000'; // ← Cambié a J porque ahora hay más columnas
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      // Fallback si no hay datos
      const { products: fallbackProducts } = await import('./data');
      return fallbackProducts;
    }

    const products: Product[] = data.values
      .filter((row: string[]) => row.length >= 7 && row[0] && row[0] !== 'ID')
      .map((row: string[], index: number): Product | null => {
        try {
          // 🔧 ESTRUCTURA ACTUALIZADA SEGÚN TU EXCEL:
          // A=ID, B=Nombre, C=Descripción, D=Precio, E=Imagen, F=Nueva_Ima, G=Categoría, H=Stock, I=Modelos
          
          // Decidir qué imagen usar: Nueva_Ima (columna F) o Imagen (columna E)
          let imageToUse = row[5]?.toString().trim(); // Nueva_Ima (columna F)
          if (!imageToUse || imageToUse === '') {
            imageToUse = row[4]?.toString().trim(); // Imagen original (columna E)
          }

          // Parsear los modelos (ahora en columna I)
          const modelsString: string = row[8] || ''; // Columna I
          const models: string[] = modelsString
            .split(',')
            .map((model: string) => model.trim())
            .filter((model: string) => model.length > 0);

          const product: Product = {
            id: row[0]?.toString() || `product-${index + 1}`,           // A: ID
            name: row[1]?.toString() || 'Producto sin nombre',          // B: Nombre
            description: row[2]?.toString() || 'Sin descripción',       // C: Descripción
            price: parseFloat(row[3]?.toString().replace(/[^0-9.]/g, '') || '0'), // D: Precio
            image: imageToUse || 'placeholder',                         // E o F: Imagen
            category: row[6]?.toString() || 'Fundas',                   // G: Categoría
            stock: parseInt(row[7]?.toString() || '0', 10),             // H: Stock
            model: models.length > 0 ? models : ['iPhone 11']          // I: Modelos
          };

          // Debug: Mostrar qué imagen está usando
          console.log(`Producto ${product.name}: usando imagen "${product.image}"`);

          return product;
        } catch (error) {
          console.error(`Error procesando fila ${index + 1}:`, error);
          return null;
        }
      })
      .filter((product: Product | null): product is Product => product !== null);

    console.log(`✅ Cargados ${products.length} productos desde Google Sheets`);
    return products;

  } catch (error) {
    console.error('Error en getProductsFromSheets:', error);
    // Fallback en caso de error
    const { products: fallbackProducts } = await import('./data');
    console.log('📋 Usando productos fallback');
    return fallbackProducts;
  }
}

// Función para validar la configuración
export async function validateSheetsConnection(): Promise<boolean> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!spreadsheetId || !apiKey) {
      return false;
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;
    const response = await fetch(url);
    
    return response.ok;
  } catch {
    return false;
  }
}