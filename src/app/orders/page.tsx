'use client'

import { useState } from "react";
import OrderForm from "./OrderForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react";
import { createOrder } from "@/services/orders";
import { Product } from "@/types/products"
import { DataTableOrders } from "@/components/data-table-orders";


interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  product?: Product;
}

interface Order {
  id: number;
  status: "PENDING" | "COMPLETED";
  totalPrice: number;
  orderItems: OrderItem[];
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [isCreating, setIsCreating] = useState(false);

  const { toast } = useToast();

  const handleSaveOrder = async (orderData: any) => {
    try {
      setIsCreating(true);
      const newOrder = await createOrder(orderData);
      setOrders(prev => [newOrder, ...prev]);
      toast({
        title: "Success",
        description: "Orden created correctly",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not create order",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsCreating(false);
    }
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        onClick={() => window.history.back()}
        variant="ghost"
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Return
      </Button>

      <h1 className="text-3xl font-bold text-center mb-6">Order Management</h1>

      <OrderForm
        onSave={handleSaveOrder}
        isSubmitting={isCreating}
      />

      <div className="mt-8 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <DataTableOrders />
      </div>

    </div>
  );
}