import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Reutilizar instancia en desarrollo
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function PATCH(req: Request, context: any) {
  const params = await context.params
  const body = await req.json();
  try {
    await prisma.notification.update({
      where: { id: params.id },
      data: { isRead: body.isRead },
    });

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error al marcar notificación como leída:', error);
    return NextResponse.json(
      { error: "Error al actualizar la notificación" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: any) {
  const params = await context.params
  try {
    await prisma.notification.delete({
      where: { id: params.id }
    });

      return NextResponse.json(
      { message: 'Notificacion borrada' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al intentar eliminar la notificación" },
      { status: 500 }
    );
  }
}
