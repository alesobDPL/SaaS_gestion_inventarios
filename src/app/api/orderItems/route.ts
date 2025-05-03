import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const ordersItem = await prisma.orderItem.findMany({
      include: {
        order: {},
        product: {include:{
            supplier:{}
        }},
        
      },
    });

    return NextResponse.json(ordersItem);
  } catch (error) {
    console.error("Error fetching ordersItem:", error);
    return NextResponse.json({ error: "Error fetching ordersItem" }, { status: 500 });
  }
}



