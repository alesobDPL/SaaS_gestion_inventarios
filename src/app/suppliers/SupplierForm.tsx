"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Supplier } from "@/types/products";

type SupplierFormData = Pick<Supplier, "name" | "contact" | "email">;

interface SupplierFormProps {
  onSave: (supplier: SupplierFormData, id?: number) => void;
  editingSupplier?: Supplier | null;
  onCancel: () => void;
}

export default function SupplierForm({ onSave, editingSupplier }: SupplierFormProps) {
  const [form, setForm] = useState<SupplierFormData>({
    name: "",
    contact: 9,
    email: "",
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (editingSupplier) {
      setForm({
        name: editingSupplier.name,
        contact: Number(editingSupplier.contact),
        email: editingSupplier.email,
      });
      setShowForm(true);
    }
  }, [editingSupplier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form, editingSupplier?.id);
    setForm({ name: "", contact: 9, email: "" });
    setShowForm(false);
  };

  return (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Provider Management</h2>

      {!editingSupplier && (
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold">
              Add new provider
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add new provider</DialogTitle>
              <DialogDescription>Complete the new supplier's details.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Provider name
              </label>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Provider contact number
              </label>
              <input
                type="tel"
                placeholder="Contacto"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: Number(e.target.value) })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />

              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold">
                Update
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Si estamos editando, el formulario se abre directo */}
      {editingSupplier && (
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Supplier</DialogTitle>
              <DialogDescription>Modify the data of the selected provider.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />
              <input
                type="number"
                placeholder="Contacto"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: Number(e.target.value) })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
              />
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold">
                Update
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
