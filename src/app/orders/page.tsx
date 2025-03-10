"use client";

import { useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Supplier {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  supplier?: Supplier;  // Proveedor ahora es opcional
}

interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  product?: Product;  // Producto ahora es opcional
}

interface Order {
  id: number;
  status: "PENDING" | "COMPLETED";
  totalPrice: number;
  orderItems: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  const handleSaveOrder = async (order: any) => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const newOrder = await response.json();
      setOrders([...orders, newOrder]);
    }
  };

  const productsFromOrders = Array.from(
    new Map(
      orders.flatMap((order) =>
        order.orderItems.map((item) => [item.productId, item.product])
      )
    ).values()
  );

  // Filtrar pedidos por estado
  const filteredOrders = filterStatus === "ALL" ? orders : orders.filter((order) => order.status === filterStatus);

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <Button
        onClick={() => window.history.back()}
        className="mb-4 bg-transparent text-gray-700 hover:bg-gray-100"
      >
      ← Volver
      </Button>
      <h1 className="text-3xl font-bold text-center mb-6">Gestión de Pedidos</h1>
      
      <OrderForm onSave={handleSaveOrder} products={productsFromOrders}/>

      {/* 📊 Filtro por estado */}
      <div className="mt-6 mb-6 flex justify-center">
        <Select onValueChange={setFilterStatus} defaultValue="ALL">
          <SelectTrigger className="w-full p-2 bg-blue-200 border border-blue-400 rounded-md text-black hover:bg-blue-300">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <h2 className="text-xl font-semibold mt-6">Lista de Pedidos</h2>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No hay pedidos disponibles.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full mt-4">
          {filteredOrders.map((order) => (
            <AccordionItem key={order.id} value={`order-${order.id}`} className={`border rounded-lg mb-4 shadow-md ${order.status === "COMPLETED" ? "bg-green-50" : "bg-yellow-50"}`}>
              <AccordionTrigger className="p-4 flex justify-between items-center">
                <span className="font-medium text-lg">Pedido #{order.id} - ${order.totalPrice.toFixed(2)}</span>
                <Badge className={order.status === "COMPLETED" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}>
                  {order.status}
                </Badge>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-gray-50 rounded-b-lg">
                <h3 className="font-semibold text-lg">Productos en el pedido:</h3>
                <div className="space-y-2 mt-2">
                  {order.orderItems.map((item) => (
                    <Card key={item.productId} className="p-3">
                      <CardContent>
                        <p className="font-semibold">{item.product?.name || "Producto desconocido"}</p>
                        <p className="text-gray-600 text-sm">
                          Precio unitario: ${item.price.toFixed(2)} | Cantidad: {item.quantity}
                        </p>
                        <p className="text-gray-700 font-medium">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.product?.supplier && (
                          <p className="text-gray-600 text-sm">
                            Proveedor: <span className="font-medium">{item.product.supplier.name}</span>
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
