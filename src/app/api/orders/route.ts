import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                supplier: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const lowStockProducts: any = []

  try {
    const { orderItems, totalPrice } = await req.json();

    // Crear pedido con sus productos
    const newOrder = await prisma.order.create({
      data: {
        totalPrice,
        orderItems: {
          create: orderItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            productName: item.productName
          })),
        },
      },
      include: { orderItems: true },
    });


    for (const item of orderItems) {
      const product = await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });

      if (product.stock <= 5) {
        lowStockProducts.push({
          id: product.id,
          name: product.name,
          stock: product.stock
        });

        await prisma.notification.create({
          data: {
            title: 'Producto con bajo stock',
            message: `El producto ${product.name} tiene solo ${product.stock} unidades.`,
            type: 'stock',
          }
        })

      }


    }

    // Emitir evento al servidor de socket
    if (lowStockProducts.length > 0) {
      await fetch('http://localhost:3002/emit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'low-stock',
          data: lowStockProducts,
        }),
      });
    }

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creando pedido" }, { status: 500 });
  }
}
