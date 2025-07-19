// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { getProductsFromSheets } from '@/lib/sheets';

export async function GET() {
  try {
    console.log('🔍 API /products - Iniciando (método simple)...');
    
    // Verificar variables de entorno
    console.log('📋 Variables disponibles:', {
      hasGoogleSheetsId: !!process.env.GOOGLE_SHEETS_ID,
      hasGoogleApiKey: !!process.env.GOOGLE_API_KEY,
      googleSheetsIdPreview: process.env.GOOGLE_SHEETS_ID?.substring(0, 10) + '...',
      apiKeyPreview: process.env.GOOGLE_API_KEY?.substring(0, 10) + '...',
    });
    
    const products = await getProductsFromSheets();
    
    console.log('📦 Productos obtenidos:', {
      count: products.length,
      firstProductPrice: products[0]?.price,
      firstProductId: products[0]?.id,
      source: products.length === 14 ? 'Probablemente data.ts fallback' : 'Google Sheets API'
    });
    
    return NextResponse.json({
      success: true,
      products,
      lastUpdated: new Date().toISOString(),
      source: 'google-sheets-api',
      debug: {
        productCount: products.length,
        firstProductPrice: products[0]?.price,
        method: 'public-api',
        environmentCheck: {
          hasGoogleSheetsId: !!process.env.GOOGLE_SHEETS_ID,
          hasGoogleApiKey: !!process.env.GOOGLE_API_KEY,
        }
      }
    });
  } catch (error) {
    console.error('❌ Error en API /products:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Error al obtener productos',
      products: [],
      source: 'error'
    }, { status: 500 });
  }
}

// Opcional: endpoint para forzar actualización
export async function POST() {
  try {
    const products = await getProductsFromSheets();
    
    return NextResponse.json({
      success: true,
      message: 'Productos actualizados desde Google Sheets',
      products,
      count: products.length,
      lastUpdated: new Date().toISOString()
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Error al actualizar productos'
    }, { status: 500 });
  }
}