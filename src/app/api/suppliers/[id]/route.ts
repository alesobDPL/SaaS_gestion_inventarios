import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// ✅ GET: Obtener un supplier por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(params.id) },
      include: { product: true },
    });

    if (!supplier) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
    }

    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error fetching supplier:", error);
    return NextResponse.json({ error: 'Error fetching supplier' }, { status: 500 });
  }
}

// ✅ PUT: Actualizar un supplier
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const updatedSupplier = await prisma.supplier.update({
      where: { id: Number(params.id) },
      data: {
        name: body.name,
        contact: body.contact,
        email: body.email,
      },
    });

    return NextResponse.json(updatedSupplier);
  } catch (error) {
    console.error("Error updating supplier:", error);
    return NextResponse.json({ error: 'Error updating supplier' }, { status: 500 });
  }
}

// ✅ DELETE: Eliminar un supplier
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.supplier.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Supplier deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json({ error: 'Error deleting supplier' }, { status: 500 });
  }
}
