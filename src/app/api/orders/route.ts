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

// Crear un nuevo pedido
export async function POST(req: Request) {
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

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creando pedido" }, { status: 500 });
  }
}
