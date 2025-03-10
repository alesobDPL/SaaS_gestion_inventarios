import { PrismaClient } from '@prisma/client';

declare global {
  // Agregar una propiedad para el cliente de Prisma
  var prisma: PrismaClient | undefined;
}
