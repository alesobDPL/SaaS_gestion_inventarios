"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProductFormData {
  name: string;
  sku: number;
  stock: number;
  price: number;
  note: string;
  category: string;
}

interface ProductFormProps {
  supplierId: number;
  onSave: (product: ProductFormData, supplierId: number) => void;
}

export default function ProductForm({ supplierId, onSave }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    sku: 10000, // Valor base para SKU
    stock: 0,
    price: 0,
    note: "",
    category: "",
  });

  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del formulario

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form, supplierId);
    setForm({ name: "", sku: 10000, stock: 0, price: 0, note: "", category: "" });
    setIsOpen(false); // Cerrar el acordeón después de guardar
  };

  return (
    <div className="mb-4">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        {isOpen ? "Ocultar Formulario" : "Agregar Producto"}
      </Button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 border p-6 rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-semibold text-gray-700">Agregar Producto</h2>

          <input
            type="text"
            placeholder="Nombre del producto"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 w-full rounded-lg"
            required
          />

          <input
            type="number"
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: Number(e.target.value) })}
            className="border p-2 w-full rounded-lg"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            className="border p-2 w-full rounded-lg"
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="border p-2 w-full rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Categoría"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 w-full rounded-lg"
            required
          />

          <textarea
            placeholder="Nota sobre el producto"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="border p-2 w-full rounded-lg h-24"
          />

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
            Guardar Producto
          </Button>
        </form>
      )}
    </div>
  );
}