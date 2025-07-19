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
    
    console.log('🔍 Iniciando getProductsFromSheets...');
    console.log('📋 GOOGLE_SHEETS_ID:', spreadsheetId?.substring(0, 15) + '...');
    
    if (!spreadsheetId) {
      console.log('❌ GOOGLE_SHEETS_ID no está configurado');
      throw new Error('GOOGLE_SHEETS_ID no está configurado');
    }

    console.log('🔗 Intentando conectar a Google Sheets...');
    
    // Leer datos de la hoja "Productos" - AMPLIO EL RANGO PARA INCLUIR COLUMNA I (NOTAS)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Productos!A1:I1000', // Desde A1 para ver headers también
    });

    console.log('✅ Respuesta de Google Sheets recibida');
    console.log('📊 response.data.values existe:', !!response.data.values);
    console.log('📊 Número de filas:', response.data.values?.length || 0);
    
    if (response.data.values && response.data.values.length > 0) {
      console.log('📋 Headers (fila 1):', response.data.values[0]);
      console.log('📋 Primera fila de datos (fila 2):', response.data.values[1]);
      console.log('📋 Segunda fila de datos (fila 3):', response.data.values[2]);
    }

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.log('⚠️ No hay datos en la hoja');
      // Fallback si no hay datos
      const { products: fallbackProducts } = await import('./data');
      console.log('📋 Usando fallback con', fallbackProducts.length, 'productos');
      return fallbackProducts;
    }

    console.log('🔄 Procesando filas...');
    
    // SALTAR LA PRIMERA FILA (HEADERS) - EMPEZAR DESDE ÍNDICE 1
    const dataRows = rows.slice(1);
    console.log('📊 Filas de datos para procesar:', dataRows.length);

    const products: Product[] = dataRows
      .filter((row, index) => {
        const isValid = row.length >= 7 && row[0] && row[0] !== 'ID';
        if (!isValid) {
          console.log(`⚠️ Fila ${index + 2} filtrada:`, row);
        }
        return isValid;
      })
      .map((row, index) => {
        try {
          console.log(`🔄 Procesando producto ${index + 1}:`, {
            id: row[0],
            name: row[1],
            price: row[3],
            stock: row[6]
          });
          
          // Parsear los modelos (separados por comas)
          const modelsString = row[7] || '';
          const models = modelsString
            .split(',')
            .map((model: string) => model.trim())
            .filter((model: string) => model.length > 0);

          const product = {
            id: row[0]?.toString() || `product-${index + 1}`,
            name: row[1]?.toString() || 'Producto sin nombre',
            description: row[2]?.toString() || 'Sin descripción',
            price: parseFloat(row[3]?.toString().replace(/[^0-9.]/g, '') || '0'),
            image: row[4]?.toString() || 'placeholder',
            category: row[5]?.toString() || 'Fundas',
            stock: parseInt(row[6]?.toString() || '0', 10),
            model: models.length > 0 ? models : ['iPhone 11']
          };

          console.log(`✅ Producto procesado:`, {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock
          });

          return product;
        } catch (error) {
          console.error(`❌ Error procesando fila ${index + 2}:`, error);
          return null;
        }
      })
      .filter((product): product is Product => product !== null);

    console.log(`🎉 ${products.length} productos procesados exitosamente`);
    console.log('📋 Primer producto final:', {
      id: products[0]?.id,
      name: products[0]?.name,
      price: products[0]?.price,
      stock: products[0]?.stock
    });

    return products;

  } catch (error) {
    console.error('❌ Error en getProductsFromSheets:', error);
    console.error('📋 Detalles del error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Fallback en caso de error
    const { products: fallbackProducts } = await import('./data');
    console.log('📋 Usando fallback con', fallbackProducts.length, 'productos debido a error');
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