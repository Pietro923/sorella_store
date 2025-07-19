// src/lib/sheets.ts
import { google } from 'googleapis';
import { Product } from '@/types';

// Función para manejar la clave privada
function getPrivateKey(): string {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const privateKeyBase64 = process.env.GOOGLE_PRIVATE_KEY_BASE64;
  
  console.log('🔑 Procesando clave privada...');
  console.log('📋 privateKey existe:', !!privateKey);
  console.log('📋 privateKeyBase64 existe:', !!privateKeyBase64);
  
  if (privateKeyBase64) {
    // Si tenemos la versión Base64, decodificarla
    console.log('✅ Usando GOOGLE_PRIVATE_KEY_BASE64');
    return Buffer.from(privateKeyBase64, 'base64').toString('utf8');
  }
  
  if (privateKey) {
    // Intentar limpiar la clave normal
    console.log('⚠️ Usando GOOGLE_PRIVATE_KEY (puede fallar en Vercel)');
    return privateKey.replace(/\\n/g, '\n');
  }
  
  throw new Error('No se encontró GOOGLE_PRIVATE_KEY ni GOOGLE_PRIVATE_KEY_BASE64');
}

// Configuración de autenticación
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: getPrivateKey(),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getProductsFromSheets(): Promise<Product[]> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    
    console.log('🔍 Iniciando getProductsFromSheets...');
    
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_ID no está configurado');
    }

    // Leer datos de la hoja "Productos"
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Productos!A2:I1000', // Saltamos headers directamente
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.log('⚠️ No hay datos en la hoja - usando fallback');
      const { products: fallbackProducts } = await import('./data');
      return fallbackProducts;
    }

    console.log('✅ Datos recibidos de Google Sheets:', rows.length, 'filas');

    const products: Product[] = rows
      .filter(row => row.length >= 7 && row[0] && row[0] !== 'ID')
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

    console.log('🎉 Productos procesados exitosamente:', products.length);
    console.log('📋 Primer producto:', { 
      name: products[0]?.name, 
      price: products[0]?.price 
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