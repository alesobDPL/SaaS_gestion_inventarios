import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Leer los parámetros de la query
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    // Obtener productos paginados y el total
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        include: { supplier: true },
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json({ data: products, total });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        sku: Math.floor(10000 + Math.random() * 90000),
        stock: body.stock,
        price: body.price,
        note: body.note,
        category: body.category,
        supplierId: body.supplierId
      },
      include: {
        supplier: true //include supplier in the response
      }
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch{
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}
