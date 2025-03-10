"use client";

import { useEffect, useState } from "react";
import SupplierForm from "./SupplierForm";
import ProductForm from "@/app/products/ProductForm";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  sku: number;
  name: string;
  stock: number;
  price: number;
  note: string;
  category: string;
}

interface Supplier {
  id: number;
  name: string;
  contact: number | null; // Asegúrate de que contact pueda ser null
  email: string | null; // Asegúrate de que email pueda ser null
  product: Product[];
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const [expandedSupplierId, setExpandedSupplierId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener proveedores desde la API
  useEffect(() => {
    async function fetchSuppliers() {
      const response = await fetch("/api/suppliers");
      const data = await response.json();
      setSuppliers(data);
      setFilteredSuppliers(data);
    }
    fetchSuppliers();
  }, []);

  // Filtrar proveedores cuando cambia el término de búsqueda
  useEffect(() => {
    const filtered = suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  }, [searchTerm, suppliers]);

  // Guardar un proveedor (nuevo o editado)
  const handleSaveSupplier = async (supplier: Omit<Supplier, "id">, id?: number) => {
    const response = await fetch(id ? `/api/suppliers/${id}` : "/api/suppliers", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(supplier),
    });

    if (response.ok) {
      const updatedSupplier = await response.json();
      setSuppliers((prev) =>
        id ? prev.map((s) => (s.id === id ? updatedSupplier : s)) : [...prev, updatedSupplier]
      );
      setEditingSupplier(null);
    }
  };

  // Eliminar un proveedor
  const handleDeleteSupplier = async (id: number) => {
    const response = await fetch(`/api/suppliers/${id}`, { method: "DELETE" });
    if (response.ok) {
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Guardar un producto y vincularlo con el proveedor
  const handleSaveProduct = async (product: Omit<Product, "id">, supplierId: number) => {
    const response = await fetch(`/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, supplierId }),
    });

    if (response.ok) {
      const newProduct = await response.json();
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === supplierId ? { ...s, product: [...(s.product || []), newProduct] } : s
        )
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Botón para volver */}
      <Button
        onClick={() => window.history.back()}
        className="mb-4 bg-transparent text-gray-700 hover:bg-gray-100"
      >
        ← Volver
      </Button>

      <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Proveedores</h1>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar proveedores por nombre, contacto o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
        />
      </div>

      {/* Formulario para agregar/editar proveedores */}
      <SupplierForm onSave={handleSaveSupplier} editingSupplier={editingSupplier} />

      <h2 className="text-xl font-semibold mt-6">Lista de Proveedores</h2>
      <div className="space-y-4 mt-4">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            {/* Encabezado del proveedor */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setExpandedSupplierId(expandedSupplierId === supplier.id ? null : supplier.id)}
            >
              <span className="font-medium">{supplier.name}</span>
              <div className="flex space-x-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que el clic se propague al contenedor
                    setEditingSupplier(supplier);
                  }}
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  Editar
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que el clic se propague al contenedor
                    handleDeleteSupplier(supplier.id);
                  }}
                  className="bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  Eliminar
                </Button>
              </div>
            </div>

            {/* Detalles expandidos del proveedor */}
            {expandedSupplierId === supplier.id && (
              <div className="mt-4 space-y-2 transition-all duration-300 ease-in-out">
                <p className="text-gray-600">{supplier.contact}</p>
                <p className="text-gray-600">{supplier.email}</p>

                {/* Lista de productos */}
                <h3 className="mt-4 font-semibold">Productos:</h3>
                {supplier.product?.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {supplier.product.map((product) => (
                      <li key={product.id} className="mb-2">
                        <strong>{product.name}</strong> - {product.stock} unidades - ${product.price} - SKU: {product.sku} <br />
                        <span className="text-sm text-gray-600">{product.category} | {product.note}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">Este proveedor aún no tiene productos.</p>
                )}

                {/* Botón para agregar producto */}
                <Button
                  onClick={() => setSelectedSupplierId(supplier.id)}
                  className="mt-2 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                >
                  Agregar Producto
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Formulario para agregar productos */}
      {selectedSupplierId && (
        <ProductForm supplierId={selectedSupplierId} onSave={handleSaveProduct} />
      )}
    </div>
  );
}