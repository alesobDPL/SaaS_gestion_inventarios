"use client";

import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { Button } from "@/components/ui/button";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  sku: number; // Cambiado a number
  stock: number;
  price: number;
  note: string;
  supplier: Supplier | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener productos desde la API
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrar productos cuando cambia el término de búsqueda
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(product.sku).toLowerCase().includes(searchTerm.toLowerCase()) // Convertir sku a string
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  async function handleSaveEdit(updatedProduct: Product) {
    try {
      const response = await fetch(`/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      setProducts(products.map((product) => (product.id === data.id ? data : product)));
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Botón para volver */}
      <Button
        onClick={() => window.history.back()}
        className="mb-4 bg-transparent text-gray-700 hover:bg-gray-100"
      >
        ← Volver
      </Button>

      <h1 className="text-3xl font-bold mb-6 text-gray-900">Gestión de Productos</h1>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos por nombre o SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
        />
      </div>

      {/* Formulario para agregar productos */}
      <ProductForm onProductAdded={fetchProducts} />

      <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Productos Existentes</h2>

      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                <p className="text-gray-600">SKU: {product.sku}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setExpandedProductId(expandedProductId === product.id ? null : product.id)}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {expandedProductId === product.id ? "Ocultar" : "Detalles"}
                </Button>
                <Button
                  onClick={() => setEditingProduct(product)}
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  Eliminar
                </Button>
              </div>
            </div>

            {/* Información adicional (acordeón) */}
            {expandedProductId === product.id && (
              <div className="mt-4 space-y-2 transition-all duration-300 ease-in-out">
                <p className="text-gray-600">Stock: {product.stock} unidades</p>
                <p className="text-gray-600">Precio: ${product.price}</p>
                <p className="text-gray-600 italic">Nota: {product.note || "Sin notas"}</p>

                {/* Información del proveedor */}
                {product.supplier ? (
                  <div className="mt-3 p-2 bg-gray-50 rounded">
                    <h4 className="font-medium text-gray-700">Proveedor:</h4>
                    <p className="text-gray-600">{product.supplier.name}</p>
                    <p className="text-sm text-gray-500">{product.supplier.contact} - {product.supplier.email}</p>
                  </div>
                ) : (
                  <p className="text-red-500 mt-2">Sin proveedor asignado</p>
                )}
              </div>
            )}

            {/* Formulario de edición */}
            {editingProduct?.id === product.id && (
              <div className="mt-4 space-y-2 transition-all duration-300 ease-in-out">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />
                <input
                  type="number"
                  placeholder="SKU"
                  value={editingProduct.sku}
                  onChange={(e) => setEditingProduct({ ...editingProduct, sku: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Precio"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />
                <textarea
                  placeholder="Nota"
                  value={editingProduct.note}
                  onChange={(e) => setEditingProduct({ ...editingProduct, note: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                />

                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => handleSaveEdit(editingProduct)}
                    className="bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                  >
                    Guardar
                  </Button>
                  <Button
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}