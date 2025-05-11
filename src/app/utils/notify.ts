// src/utils/notify.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createNotification({
  title,
  message,
  type = 'stock',
}: {
  title: string;
  message: string;
  type?: string;
}) {
  await prisma.notification.create({
    data: {title, message, type,},
  });
}
