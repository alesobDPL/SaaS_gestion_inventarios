import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// GET
export async function GET(request: Request, context: any) {
  try {
    const id = Number(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id }
    });

    return NextResponse.json(order || { error: 'No encontrado' }, {
      status: order ? 200 : 404
    });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}


// PUT
export async function PUT(request: Request, context: any) {
  const params = await context.params;
  const id = Number(params.id);
  try {
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 });
    }

    const { status } = await request.json();

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      status: "success",
      message: "Pedido actualizado correctamente",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error actualizando pedido:", error);
    return NextResponse.json({ error: "Error actualizando pedido" }, { status: 500 });
  }
}


// DELETE
export async function DELETE(request: Request, context: any) {
  const params = await context.params
  const id = Number(params.id)
  try {
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    await prisma.orderItem.deleteMany({ where: { orderId: id }, });
    await prisma.order.delete({ where: { id } });

    return NextResponse.json(
      { message: "Pedido eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error eliminando pedido:", error);
    return NextResponse.json({ error: "Error eliminando pedido" }, { status: 500 });
  }
}
