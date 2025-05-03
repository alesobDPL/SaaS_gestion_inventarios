import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Obtener un supplier por ID
export async function GET(req: Request, context: any) {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(context.params.id) },
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

// PUT: Actualizar un supplier
export async function PUT(request: Request, context: any) {
  const params = await context.params
  const id = Number(params.id)
  try {
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID de proveedor inválido" },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "El nombre es requerido" },
        { status: 400 }
      );
    }

    const updatedSupplier = await prisma.supplier.update({
      where: { id: id },
      data: {
        name: body.name,
        contact: body.contact ? Number(body.contact) : body.contact,
        email: body.email
      }
    });

    return NextResponse.json({
      status: "success",
      message: "Supplier actualizado correctamente",
      data: updatedSupplier,
    });
  } catch (error) {
    console.error("Error detallado:", error);

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: "Proveedor no encontrado" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar un supplier
export async function DELETE(req: Request, context: any) {
  try {
    await prisma.supplier.delete({
      where: { id: Number(context.params.id) },
    });
    return NextResponse.json({ message: "Supplier deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json({ error: 'Error deleting supplier' }, { status: 500 });
  }
}
