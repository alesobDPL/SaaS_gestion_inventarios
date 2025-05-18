import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

//Obtener todos los suppliers
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const [suppliers, total] = await Promise.all([
      prisma.supplier.findMany({
        include: { product: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      prisma.supplier.count(),
    ]);
      console.log("response",suppliers, total)

    return NextResponse.json({ data: suppliers, total });
  } catch (error) {
    console.log("response",error)
    console.error('Error fetching suppliers:', error);
    return NextResponse.json({ error: 'Error fetching suppliers' }, { status: 500 });
  }
}

//Crear un nuevo supplier
export async function POST(req: Request) {
  try {
    const body = await req.json();
  
    const newSupplier = await prisma.supplier.create({
      data: {
        name: body.name,
        contact: Number(body.contact),
        email: body.email

      },
    });

    return NextResponse.json(newSupplier, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creating supplier' }, { status: 500 });
  }
}
