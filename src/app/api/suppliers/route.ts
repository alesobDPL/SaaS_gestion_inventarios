import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// ✅ GET: Obtener todos los suppliers
export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {product: true}
    });
    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json({ error: 'Error fetching suppliers' }, { status: 500 });
  }
}

// ✅ POST: Crear un nuevo supplier
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newSupplier = await prisma.supplier.create({
      data: {
        name: body.name,
        contact: body.contact,
        email: body.email,
      },
    });

    return NextResponse.json(newSupplier, { status: 201 });
  } catch (error) {
    console.error("Error creating supplier:", error);
    return NextResponse.json({ error: 'Error creating supplier' }, { status: 500 });
  }
}
