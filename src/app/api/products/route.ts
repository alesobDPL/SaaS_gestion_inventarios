import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {supplier: true}
    });
    return NextResponse.json(products);
  } catch{
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
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
