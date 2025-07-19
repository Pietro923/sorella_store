// src/lib/sheets.ts
import { Product } from '@/types';

export async function getProductsFromSheets(): Promise<Product[]> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const apiKey = process.env.GOOGLE_API_KEY;
    
    console.log('🔍 Iniciando getProductsFromSheets (método simple)...');
    console.log('📋 Variables:', {
      hasSpreadsheetId: !!spreadsheetId,
      hasApiKey: !!apiKey,
      spreadsheetIdPreview: spreadsheetId?.substring(0, 15) + '...'
    });
    
    if (!spreadsheetId || !apiKey) {
      throw new Error('GOOGLE_SHEETS_ID o GOOGLE_API_KEY no configurados');
    }

    // URL de la API pública de Google Sheets
    const range = 'Productos!A2:I1000';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    
    console.log('🔗 Llamando a Google Sheets API pública...');
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Respuesta recibida:', {
      hasValues: !!data.values,
      rowCount: data.values?.length || 0
    });
    
    if (!data.values || data.values.length === 0) {
      console.log('⚠️ No hay datos en la hoja - usando fallback');
      const { products: fallbackProducts } = await import('./data');
      return fallbackProducts;
    }

    console.log('📊 Procesando', data.values.length, 'filas de datos');

    interface RawProductRow extends Array<string> {}

    interface ParsedProduct {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        category: string;
        stock: number;
        model: string[];
    }

    const products: Product[] = data.values
        .filter((row: RawProductRow) => row.length >= 7 && row[0] && row[0] !== 'ID')
        .map((row: RawProductRow, index: number): ParsedProduct | null => {
            try {
                // Parsear los modelos (separados por comas)
                const modelsString: string = row[7] || '';
                const models: string[] = modelsString
                    .split(',')
                    .map((model: string) => model.trim())
                    .filter((model: string) => model.length > 0);

                const product: ParsedProduct = {
                    id: row[0]?.toString() || `product-${index + 1}`,
                    name: row[1]?.toString() || 'Producto sin nombre',
                    description: row[2]?.toString() || 'Sin descripción',
                    price: parseFloat(row[3]?.toString().replace(/[^0-9.]/g, '') || '0'),
                    image: row[4]?.toString() || 'placeholder',
                    category: row[5]?.toString() || 'Fundas',
                    stock: parseInt(row[6]?.toString() || '0', 10),
                    model: models.length > 0 ? models : ['iPhone 11']
                };

                return product;
            } catch {
                return null;
            }
        })
        .filter((product: ParsedProduct | null): product is Product => product !== null);

    console.log('🎉', products.length, 'productos procesados exitosamente');
    console.log('📋 Primer producto:', { 
      name: products[0]?.name, 
      price: products[0]?.price,
      stock: products[0]?.stock 
    });

    return products;

  } catch (error) {
    console.error('❌ Error en getProductsFromSheets:', error);
    
    // Fallback en caso de error
    const { products: fallbackProducts } = await import('./data');
    console.log('📋 Usando fallback debido a error');
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