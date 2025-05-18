import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import connectRedis from '@/lib/redis';

export async function GET() {
  try {
    const redis = await connectRedis();

    const cachedData = await redis.get('product');
    if (cachedData) {
      console.log('Desde caché');
      return new Response(cachedData, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const products = await prisma.product.findMany({
      include: { supplier: true }
    });

    await redis.set('product', JSON.stringify(products), { EX: 3600 });

    console.log('Desde base de datos');
    return NextResponse.json(products);

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}
