import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Actualizar un pedido
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const { status } = await req.json();

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: "Error actualizando pedido" }, { status: 500 });
  }
}

// Eliminar un pedido
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    await prisma.order.delete({ where: { id } });

    return NextResponse.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    return NextResponse.json({ error: "Error eliminando pedido" }, { status: 500 });
  }
}
