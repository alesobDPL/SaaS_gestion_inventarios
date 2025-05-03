'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/types/products";

// Tomando solo los campos que necesito desde Product
type ProductFormData = Pick<Product, "name" | "stock" | "price" | "note" | "category">;

interface ProductFormProps {
  supplierId: number;
  onSave: (product: ProductFormData, supplierId: number) => void;
  onCancel?: () => void;
}

export default function ProductForm({ supplierId, onSave }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    stock: 0,
    price: 0,
    note: "",
    category: "",
  });

  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del Dialog

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    onSave(form, supplierId);
    setForm({ name: "", stock: 0, price: 0, note: "", category: "" });
    setIsOpen(false); // Cerrar el Dialog después de guardar
  };

  return (
    <div className="mb-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Add new product
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add new product</DialogTitle>
            <DialogDescription>Complete the fields to add a new product.</DialogDescription>

          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="Nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Product name
              </label>
              <input
                type="text"
                placeholder="Product name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 w-full rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="Stock" className="block text-sm font-medium text-gray-700 mb-1">
                Product stock
              </label>
              <input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                className="border p-2 w-full rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price {form.price > 0 ? `($${form.price.toFixed(2)})` : "(Chilean pesos)"}
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="border p-2 w-full rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="Categoría" className="block text-sm font-medium text-gray-700 mb-1">
                Product categoty
              </label>
              <input
                type="text"
                placeholder="Categoría"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border p-2 w-full rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="Nota" className="block text-sm font-medium text-gray-700 mb-1">
                Notes about the product
              </label>
              <textarea
                placeholder="Note about the product"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="border p-2 w-full rounded-lg h-24"
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
