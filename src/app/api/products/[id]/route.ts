import prisma from '@/lib/prisma';
import { param } from 'motion/react-client';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: any) {
  const params = context.params
  const id = Number(params.id);
  try {
    
    const product = await prisma.product.findUnique({
      where: { id},
      include: {
        supplier: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching product', details: error instanceof Error ? error.message : null },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context:any) {
  const params = await context.params
  const id = Number(params.id);

  try {
    const body = await req.json();
    
    // Validación básica
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        sku: body.sku,
        stock: body.stock ? parseInt(body.stock) : undefined,
        price: parseFloat(body.price),
        note: body.note,
        category: body.category,
        /* supplierId: parseInt(body.supplierId), */ //Do not update supplier now. This is a future feature.
        isActive: body.isActive,
      },
      include: {
        supplier: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Producto actualizado exitosamente",
      data: updatedProduct
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { 
        error: 'Error updating product',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req:Request, context:any) {
  const params = context.params
  const id = Number(params.id)
  try {
    
    await prisma.product.delete({
      where: { id },
      
    });

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { 
        error: 'Error deleting product',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}