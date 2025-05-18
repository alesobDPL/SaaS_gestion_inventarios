//Proxima ruta

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createClient } from 'redis';


const client = createClient({ url: 'redis://localhost:6379' });
await client.connect();


export async function GET() {
  // 1. Intenta obtener datos desde Redis
  const cachedData = await client.get('product');
  if (cachedData) {
    console.log('Desde caché');
    return new Response(cachedData, { status: 200 });
  }

  // 2. Si no hay en caché, busca desde la DB
  try {
    const products = await prisma.product.findMany({
      include: { supplier: true }
    });
    // 3. Guarda en Redis por 1 hora (3600 segundos)
     await client.set('product', JSON.stringify(products), { EX: 3600 }); 

    console.log('Desde base de datos');
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}