import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Evitar múltiples instancias en desarrollo (hot reload)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Podés quitar esto si no querés logs en consola
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(req: NextRequest) {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
      take: 30,
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    return NextResponse.json(
      { error: "Error obteniendo notificaciones" },
      { status: 500 }
    );
  }
}
