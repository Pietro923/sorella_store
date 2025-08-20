// src/lib/sheets.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '@/types';

export async function getProductsFromSheets(): Promise<Product[]> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const apiKey = process.env.GOOGLE_API_KEY;
    
    if (!spreadsheetId || !apiKey) {
      throw new Error('GOOGLE_SHEETS_ID o GOOGLE_API_KEY no configurados');
    }

    const range = 'Productos!A2:J1000';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      return []; // ✅ NO MORE FALLBACK - Devolver array vacío
    }

    const products: Product[] = data.values
      .filter((row: string[]) => row[0] && row[0] !== 'ID' && row[0].trim() !== '')
      .map((row: string[], index: number): Product | null => {
        try {
          // Decidir qué imagen usar: Nueva_Ima (F) o Imagen (E)
          let imageToUse = row[5]?.toString().trim(); // Nueva_Ima (columna F)
          if (!imageToUse || imageToUse === '') {
            imageToUse = row[4]?.toString().trim(); // Imagen original (columna E)
          }

          // Parsear modelos
          const modelsString: string = row[8] || '';
          const models: string[] = modelsString
            .split(',')
            .map((model: string) => model.trim())
            .filter((model: string) => model.length > 0);

          const product: Product = {
            id: row[0]?.toString() || `product-${index + 1}`,
            name: row[1]?.toString() || 'Producto sin nombre',
            description: row[2]?.toString() || 'Sin descripción',
            price: parseFloat(row[3]?.toString().replace(/[^0-9.]/g, '') || '0'),
            image: imageToUse || 'placeholder',
            category: row[6]?.toString() || 'Fundas',
            stock: parseInt(row[7]?.toString() || '0', 10),
            model: models.length > 0 ? models : ['iPhone 11']
          };

          return product;
        } catch (error) {
          return null;
        }
      })
      .filter((product: Product | null): product is Product => product !== null);

    return products;

  } catch (error) {
    throw error; // ✅ NO MORE FALLBACK - Que falle si falla
  }
}