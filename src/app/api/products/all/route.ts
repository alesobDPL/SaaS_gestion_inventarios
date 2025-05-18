import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { supplier: true }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json({ error: 'Error fetching suppliers' }, { status: 500 });
  }
}