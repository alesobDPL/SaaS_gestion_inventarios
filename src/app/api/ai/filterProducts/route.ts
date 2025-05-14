import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { input } = body;

  // Llamada a la función Lambda que interpreta el input
  let filters;
  try {
    const lambdaResponse = await fetch('https://it71o79mzi.execute-api.sa-east-1.amazonaws.com/default/consult_AI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    const lambdaData = await lambdaResponse.json();
    filters = lambdaData;
  } catch (error) {
    console.error('Error llamando a Lambda:', error);
    return NextResponse.json({ error: 'Error al contactar a Lambda' }, { status: 500 });
  }

  // Construir el filtro de Prisma basado en lo recibido
  const where: any = {};
  if (filters.categories && Array.isArray(filters.categories)) {
    where.category = {
      in: filters.categories,
      mode: 'insensitive',
    };
  }
  if (filters.stock) {
    const op = filters.stock.operator;
    const value = filters.stock.value;
    if (op === '<') where.stock = { lt: value };
    else if (op === '>') where.stock = { gt: value };
    else if (op === '=') where.stock = value;
  }

  try {
    const results = await prisma.product.findMany({ where });
    return NextResponse.json(results);
  } catch (err) {
    console.error('Error con Prisma:', err);
    return NextResponse.json({ error: 'Error al consultar productos' }, { status: 500 });
  }
}
