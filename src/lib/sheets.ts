// src/lib/sheets.ts
import { google } from 'googleapis';
import { Product } from '@/types';

// Configuración de autenticación
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getProductsFromSheets(): Promise<Product[]> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_ID no está configurado');
    }

    // Leer datos de la hoja "Productos"
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Productos!A2:I1000',
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      // Fallback si no hay datos
      const { products: fallbackProducts } = await import('./data');
      return fallbackProducts;
    }

    const products: Product[] = rows
      .filter(row => row.length >= 7 && row[0] && row[0] !== 'ID') // Filtrar filas vacías y headers
      .map((row, index) => {
        try {
          // Parsear los modelos (separados por comas)
          const modelsString = row[7] || '';
          const models = modelsString
            .split(',')
            .map((model: string) => model.trim())
            .filter((model: string) => model.length > 0);

          return {
            id: row[0]?.toString() || `product-${index + 1}`,
            name: row[1]?.toString() || 'Producto sin nombre',
            description: row[2]?.toString() || 'Sin descripción',
            price: parseFloat(row[3]?.toString().replace(/[^0-9.]/g, '') || '0'),
            image: row[4]?.toString() || 'placeholder',
            category: row[5]?.toString() || 'Fundas',
            stock: parseInt(row[6]?.toString() || '0', 10),
            model: models.length > 0 ? models : ['iPhone 11']
          };
        } catch {
          return null;
        }
      })
      .filter((product): product is Product => product !== null);

    return products;

  } catch {
    // Fallback en caso de error
    const { products: fallbackProducts } = await import('./data');
    return fallbackProducts;
  }
}

// Función para validar la configuración
export async function validateSheetsConnection(): Promise<boolean> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    
    if (!spreadsheetId) {
      return false;
    }

    await sheets.spreadsheets.get({
      spreadsheetId,
      includeGridData: false,
    });

    return true;
  } catch {
    return false;
  }
}