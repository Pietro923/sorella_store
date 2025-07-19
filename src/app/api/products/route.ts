// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { getProductsFromSheets } from '@/lib/sheets';

export async function GET() {
  try {
    console.log('🔍 API /products - Iniciando...');
    
    // Verificar variables de entorno
    console.log('📋 Variables disponibles:', {
      hasGoogleSheetsId: !!process.env.GOOGLE_SHEETS_ID,
      hasGoogleCredentialsBase64: !!process.env.GOOGLE_CREDENTIALS_BASE64,
      hasOldServiceAccountEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasOldPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      googleSheetsIdPreview: process.env.GOOGLE_SHEETS_ID?.substring(0, 10) + '...',
    });
    
    const products = await getProductsFromSheets();
    
    console.log('📦 Productos obtenidos:', {
      count: products.length,
      firstProductPrice: products[0]?.price,
      firstProductId: products[0]?.id,
      source: products.length === 14 ? 'Probablemente data.ts fallback' : 'Probablemente Google Sheets'
    });
    
    return NextResponse.json({
      success: true,
      products,
      lastUpdated: new Date().toISOString(),
      source: 'google-sheets',
      debug: {
        productCount: products.length,
        firstProductPrice: products[0]?.price,
        environmentCheck: {
          hasGoogleSheetsId: !!process.env.GOOGLE_SHEETS_ID,
          hasGoogleCredentialsBase64: !!process.env.GOOGLE_CREDENTIALS_BASE64,
          hasOldServiceAccountEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          hasOldPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
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