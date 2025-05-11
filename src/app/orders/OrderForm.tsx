"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProducts } from "@/services/products";
import { OrderFormProps, Product_orderForm as Product } from "@/types/products";
import {
  validateOrder,
  validateQuantity,
} from "@/lib/validations/orderValidations";

export default function OrderForm({ onSave, isSubmitting }: OrderFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
  const [orderItems, setOrderItems] = useState<
    {
      productId: number;
      quantity: number;
      price: number;
      productName: string;
      supplierId: number | null;
      supplierName: string;
    }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState("PENDING");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);

        const uniqueSuppliers: any = Array.from(
          new Map(
            productsData.map((p: Product) => [
              p.supplier?.id,
              { id: p.supplier?.id, name: p.supplier?.name },
            ])
          ).values()
        ).filter((s: any) => s.id && s.name);

        setSuppliers(uniqueSuppliers);
      } catch (error) {
        console.error("Error getting products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleAddProduct = (productId: number, price: number, productName: string, supplier: any) => {
    if (orderItems.some((item) => item.productId === productId)) {
      alert("Este producto ya fue agregado.");
      return;
    }

    setOrderItems((prev) => {
      const newItems = [
        ...prev,
        {
          productId,
          quantity: 1,
          price,
          productName,
          supplierId: supplier.id,
          supplierName: supplier.name,
        },
      ];
      updateTotalPrice(newItems);
      return newItems;
    });
  };

  const handleRemoveProduct = (index: number) => {
    const newItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newItems);
    updateTotalPrice(newItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const productId = orderItems[index].productId;
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    quantity = validateQuantity(product, quantity);

    const updated = [...orderItems];
    updated[index].quantity = quantity;
    setOrderItems(updated);
    updateTotalPrice(updated);
  };

  const updateTotalPrice = (items: typeof orderItems) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateOrder(orderItems, products)) return;

    onSave({ orderItems, totalPrice, status });
    resetForm();
  };

  const resetForm = () => {
    setOrderItems([]);
    setTotalPrice(0);
    setStatus("PENDING");
    setShowForm(false);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">New Order</h2>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogTrigger asChild>
          <Button className="mb-6 bg-blue-500 text-white">Add Order</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Order</DialogTitle>
            <DialogDescription>Select products grouped by providers.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="product" className="block mb-1">Products</label>
              <select
                id="product"
                onChange={(e) => {
                  const productId = Number(e.target.value);
                  const product = products.find(p => p.id === productId);
                  if (product) {
                    handleAddProduct(product.id, product.price, product.name, product.supplier);
                  }
                }}
                className="w-full border p-2"
              >
                <option value="">Select a product</option>
                {suppliers.map((supplier) => (
                  <optgroup key={supplier.id} label={supplier.name}>
                    {products
                      .filter((p) => p.supplier?.id === supplier.id)
                      .map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - ${product.price}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <h3 className="font-semibold">Selected products</h3>
              <ul>
                {orderItems.map((item, index) => (
                  <li key={index} className="flex items-center justify-between gap-2 py-1">
                    <span>
                      {item.productName} - ${item.price} x {item.quantity} ({item.supplierName})
                    </span>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                      className="w-16 border"
                    />
                    <Button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      className="text-red-500"
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-right font-bold">
              Total: ${totalPrice.toFixed(2)}
            </div>

            <div>
              <label htmlFor="status" className="block mb-1">Order Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border p-2"
              >
                <option value="PENDING">Pending</option>
                <option value="SHIPPED">Shipped</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELED">Canceled</option>
              </select>
            </div>

            <Button type="submit" className="w-full bg-green-500 text-white">
              Save Order
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
