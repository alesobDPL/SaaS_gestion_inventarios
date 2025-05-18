import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: { product: true }
    });

    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json({ error: 'Error fetching suppliers' }, { status: 500 });
  }
}