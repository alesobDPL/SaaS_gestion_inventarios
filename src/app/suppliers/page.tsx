'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft, ChevronDown, ChevronUp, Plus, Edit, Trash2 } from "lucide-react";
import SupplierForm from "./SupplierForm";
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from "@/services/suppliers";
import { Product } from "@/types/products"
import { DataTableSuppliers } from "@/components/data-table-suppliers";

interface Supplier {
  id: number;
  name: string;
  contact: number;
  email: string;
  product: Product[];
}
type ProductFormData = Pick<Product, "name" | "stock" | "price" | "note" | "category">;

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const { toast } = useToast();
  type SupplierFormData = Pick<Supplier, "name" | "contact" | "email">;

  // Obtener proveedores
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const data = await getSuppliers();
        setSuppliers(data);
        setFilteredSuppliers(data);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        toast({
          title: "Error",
          description: "The suppliers could not be loaded",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [toast]);

  // Filtrar proveedores (se mantiene igual)
  useEffect(() => {
    const filtered = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplier.contact?.toString().includes(searchTerm) && supplier.contact.toString().includes(searchTerm)) ||
      (supplier.email?.toLowerCase().includes(searchTerm) && supplier.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredSuppliers(filtered);
  }, [searchTerm, suppliers]);

  // Guardar proveedor (actualizado)
  const handleSaveSupplier = async (supplierData: SupplierFormData, id?: number) => {
    try {
      let updatedSupplier;
      if (id) {
        updatedSupplier = await updateSupplier(id, supplierData);
      } else {
        updatedSupplier = await createSupplier(supplierData);
      }

      setSuppliers(prev =>
        id
          ? prev.map(s => s.id === id ? updatedSupplier : s)
          : [updatedSupplier, ...prev]
      );

      setEditingSupplier(null);
      toast({
        title: "Success",
        description: `Provider ${id ? "updated" : "Created"} correctly`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Error al guardar proveedor",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Eliminar proveedor (actualizado)
  const handleDeleteSupplier = async (id: number) => {
    try {
      setIsDeleting(id);
      await deleteSupplier(id);

      setSuppliers(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Provider eliminated correctly",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Error eliminated provider",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  // Agregar producto (se mantiene igual ya que no tenemos función en services)
  const handleSaveProduct = async (productData: ProductFormData, supplierId: number) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...productData, supplierId }),
      });

      if (!response.ok) throw new Error("Error creating new product");

      const newProduct = await response.json();

      setSuppliers(prev =>
        prev.map(s =>
          s.id === supplierId
            ? { ...s, products: [...s.product, newProduct] }
            : s
        )
      );

      setSelectedSupplierId(null);
      toast({
        title: "Success",
        description: "Producto creado correctamente",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Error creating Product",
        variant: "destructive",
      });
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

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

      <h1 className="text-2xl font-bold mb-6 text-center">Supplier Management</h1>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <Input
          placeholder="Search for suppliers by name, contact, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Formulario de proveedor */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {editingSupplier ? "Edit Supplier" : "Add New Supplier"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SupplierForm
            onSave={handleSaveSupplier}
            editingSupplier={editingSupplier}
            onCancel={() => setEditingSupplier(null)}
          />
        </CardContent>
      </Card>
      <h2 className="text-xl font-semibold mb-4">Existing Providers</h2>
      <DataTableSuppliers />
      </div>
  );
}