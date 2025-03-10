"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface SupplierFormData {
  name: string;
  contact: string;
  email: string;
}

interface SupplierFormProps {
  onSave: (supplier: SupplierFormData, id?: number) => void;
  editingSupplier?: { id: number; name: string; contact: string; email: string } | null;
}

export default function SupplierForm({ onSave, editingSupplier }: SupplierFormProps) {
  const [form, setForm] = useState<SupplierFormData>({
    name: "",
    contact: "",
    email: "",
  });

  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    if (editingSupplier) {
      setForm({
        name: editingSupplier.name,
        contact: editingSupplier.contact,
        email: editingSupplier.email,
      });
      setShowForm(true); // Mostrar el formulario si estamos editando
    }
  }, [editingSupplier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form, editingSupplier?.id);
    setForm({ name: "", contact: "", email: "" });
    setShowForm(false); // Ocultar el formulario después de guardar
  };

  return (
    <div className="mb-4">
      {/* Botón para mostrar/ocultar el formulario */}
      {!editingSupplier && ( // Solo mostrar el botón si no estamos editando
        <Button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          {showForm ? "Ocultar Formulario" : "Agregar Proveedor"}
        </Button>
      )}

      {/* Formulario condicional */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded-lg shadow-sm bg-white">
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
          <input
            type="text"
            placeholder="Contacto"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
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
          <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
            {editingSupplier ? "Actualizar" : "Agregar"}
          </Button>
        </form>
      )}
    </div>
  );
}