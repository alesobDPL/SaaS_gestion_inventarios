'use client'

import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { Product, Supplier } from '@/types/products';
import { getProducts, createProduct, deleteProduct } from "@/services/products";
import { getSuppliers } from "@/services/suppliers";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, ChevronDown, ChevronUp, X, Save, Edit, Trash2 } from "lucide-react";
import DataTableWrapper from "@/components/componentWrappers/DataTableWrapper";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  type ProductFormData = Pick<Product, "name" | "stock" | "price" | "note" | "category">;
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Obtener productos y proveedores
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, suppliersData] = await Promise.all([
          getProducts(),
          getSuppliers()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setSuppliers(suppliersData);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: "Error",
          description: "The data could not be loaded.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Crear nuevo producto
  const handleCreateProduct = async (productData: Omit<ProductFormData, 'supplierId'>) => {
    try {
      if (!selectedSupplierId) {
        throw new Error("Debe seleccionar un proveedor");
      }

      const newProduct = await createProduct({
        ...productData,
        supplierId: selectedSupplierId
      });

      setProducts(prev => [newProduct, ...prev]);
      setSelectedSupplierId(null);

      toast({
        title: "Éxito",
        description: "Producto creado correctamente",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
      throw err;
    }
  };

  // Eliminar producto
  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(id);
      await deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
      toast({
        title: "Éxito",
        description: "Producto eliminado correctamente",
      });
    } catch {
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
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

      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search producto by name or sku."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Formulario para agregar productos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add new producto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Provider
            </label>
            <select
              value={selectedSupplierId || ""}
              onChange={(e) => setSelectedSupplierId(Number(e.target.value) || null)}
              className="border p-2 w-full rounded-lg"
              required
            >
              <option value="">Select a Provider</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name} ({supplier.contact})
                </option>
              ))}
            </select>
          </div>

          {selectedSupplierId ? (
            <ProductForm
              onSave={handleCreateProduct}
              supplierId={selectedSupplierId}
            />
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              Select a providor to enable the form
            </p>
          )}
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Existing products</h2>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center p-4">
          {searchTerm ? "No products found" : "There are no registered products"}
        </p>
      ) : (
        <div className="space-y-4">
          {/* <DataTable /> */}
          <DataTableWrapper/>
        </div>
      )}
    </div>
  );
}