// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { getProductsFromSheets } from '@/lib/sheets';

export async function GET() {
  try {
    const products = await getProductsFromSheets();
    
    return NextResponse.json({
      success: true,
      products,
      lastUpdated: new Date().toISOString(),
      source: 'google-sheets-api'
    });
  } catch (error) {
    console.error('Error en API /products:', error);
    
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