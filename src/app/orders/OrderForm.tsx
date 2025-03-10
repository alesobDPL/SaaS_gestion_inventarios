"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  supplier?: { id: number; name: string }; // Relación con proveedor
}

interface OrderFormProps {
  onSave: (order: any) => void;
  products?: Product[];
}

export default function OrderForm({ onSave, products = [] }: OrderFormProps) {
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Lista filtrada de productos
  const [orderItems, setOrderItems] = useState<{ productId: number; quantity: number; price: number }[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    async function fetchSuppliers() {
      const response = await fetch("/api/suppliers");
      const data = await response.json();
      setSuppliers(data);
    }
    fetchSuppliers();
  }, []);

  // Filtrar productos cuando se selecciona un proveedor
  useEffect(() => {
    if (selectedSupplier) {
      setFilteredProducts(products.filter((p) => p.supplier?.id === selectedSupplier));
    } else {
      setFilteredProducts([]); // Si no hay proveedor seleccionado, lista vacía
    }
  }, [selectedSupplier, products]);

  const handleAddProduct = (productId: number, price: number) => {
    setOrderItems((prevItems) => {
      const newItems = [...prevItems, { productId, quantity: 1, price }];
      updateTotalPrice(newItems);
      return newItems;
    });
  };

  const handleRemoveProduct = (index: number) => {
    const newItems = orderItems.filter((_, i) => i !== index);
    updateTotalPrice(newItems);
    setOrderItems(newItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...orderItems];
    newItems[index].quantity = quantity;
    updateTotalPrice(newItems);
    setOrderItems(newItems);
  };

  const updateTotalPrice = (items: any) => {
    const total = items.reduce((sum: number, item: any) => sum + item.quantity * item.price, 0);
    setTotalPrice(total);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSupplier) {
      onSave({ orderItems, totalPrice, status, supplierId: selectedSupplier });
      setOrderItems([]);
      setTotalPrice(0);
      setStatus("PENDING");
      setSelectedSupplier(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Nuevo Pedido</h2>

      {/* Seleccionar Proveedor */}
      <div className="mb-4">
        <label htmlFor="supplier" className="block text-sm font-medium">Proveedor</label>
        <select
          id="supplier"
          value={selectedSupplier || ""}
          onChange={(e) => setSelectedSupplier(Number(e.target.value))}
          className="border p-2 w-full mt-2"
        >
          <option value="">Seleccionar Proveedor</option>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))
          ) : (
            <option value="">No hay proveedores disponibles</option>
          )}
        </select>
      </div>

      {/* Agregar Producto (Filtrado por Proveedor) */}
      <div className="mb-4">
        <label htmlFor="product" className="block text-sm font-medium">Producto</label>
        <select
          id="product"
          onChange={(e) => {
            const productId = Number(e.target.value);
            const selectedProduct = filteredProducts.find((p) => p.id === productId);
            if (selectedProduct) {
              handleAddProduct(selectedProduct.id, selectedProduct.price);
            }
          }}
          className="border p-2 w-full mt-2"
          disabled={!selectedSupplier || filteredProducts.length === 0} // Bloquear si no hay proveedor o productos
        >
          <option value="">Seleccionar Producto</option>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))
          ) : (
            <option value="">No hay productos disponibles</option>
          )}
        </select>
      </div>

      {/* Lista de productos agregados al pedido */}
      <div className="mb-4">
        <h3 className="text-sm font-medium">Productos Seleccionados:</h3>
        <ul>
          {orderItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>
                {filteredProducts.find((p) => p.id === item.productId)?.name || "Producto desconocido"} - ${item.price} x {item.quantity} unidades
              </span>
              <Button onClick={() => handleRemoveProduct(index)} className="ml-2">
                Eliminar
              </Button>
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                className="ml-2 w-16"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Total del pedido */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Total: ${totalPrice.toFixed(2)}</label>
      </div>

      {/* Estado del Pedido */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium">Estado del Pedido</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full mt-2"
        >
          <option value="PENDING">Pendiente</option>
          <option value="COMPLETED">Completado</option>
          <option value="CANCELED">Cancelado</option>
        </select>
      </div>

      <Button type="submit" className="w-full mt-2">
        Crear Pedido
      </Button>
    </form>
  );
}
