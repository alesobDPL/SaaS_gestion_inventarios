"use client";

import { useState, useEffect,FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getProducts } from "@/services/products"; // Importar servicio
import { OrderFormProps, Product_orderForm as Product } from "@/types/products";
import { validateOrder, validateProduct, validateQuantity } from "@/lib/validations/orderValidations";

/* export default function OrderForm({ onSave }: Omit<OrderFormProps, 'products'>) { */
export default function OrderForm({ onSave, isSubmitting }: OrderFormProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<{ productId: number; quantity: number; price: number; productName: string }[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState("PENDING");
  const [showForm, setShowForm] = useState(false);

  // Fetch products al montar
  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);

        // Extraer proveedores únicos de los productos
        const uniqueSuppliers: any = Array.from(
          new Map(
            productsData.map((p: Product) => [p.supplier?.id, { id: p.supplier?.id, name: p.supplier?.name }])
          ).values()
        ).filter((supplier: any) => supplier.id !== undefined && supplier.name !== undefined);

        setSuppliers(uniqueSuppliers);
      } catch (error) {
        console.error("Error getting products:", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedSupplier) {
      setFilteredProducts(products.filter((p) => p.supplier?.id === selectedSupplier));
    } else {
      setFilteredProducts([]);
    }
  }, [selectedSupplier, products]);

  const handleAddProduct = (productId: number, price: number, productName: string) => {
    const product = filteredProducts.find((p) => p.id === productId);
    if (!validateProduct(product)) return;

    setOrderItems((prevItems) => {
      // Opcional: evitar agregar el mismo producto 2 veces
      if (prevItems.some((item) => item.productId === productId)) {
        alert("This product is already added to the order.");
        return prevItems;
      }

      const newItems = [...prevItems, { productId, quantity: 1, price, productName }];
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
    const productId = orderItems[index].productId;
    const product = filteredProducts.find((p) => p.id === productId);

    if (product) {
      quantity = validateQuantity(product, quantity);
    }

    const newItems = [...orderItems];
    newItems[index].quantity = quantity;
    updateTotalPrice(newItems);
    setOrderItems(newItems);
  };


  const updateTotalPrice = (items: any) => {
    const total = items.reduce((sum: number, item: any) => sum + item.quantity * item.price, 0);
    setTotalPrice(total);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!selectedSupplier) {
      alert("You must select a provider.");
      return;
    }

    if (!validateOrder(orderItems, products)) {

      return;
    }

    onSave({ orderItems, totalPrice, status, supplierId: selectedSupplier });
    resetForm();
  };

  // Nueva función para limpiar el formulario
  const resetForm = () => {
    setOrderItems([]);
    setTotalPrice(0);
    setStatus("PENDING");
    setSelectedSupplier(null);
    setShowForm(false);
  };


  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">New order</h2>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogTrigger asChild>
          <Button className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold">
            Add new order
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add new order</DialogTitle>
            <DialogDescription>Select provider and the products for the order.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="supplier" className="block text-sm font-medium">Provider</label>
              <select
                id="supplier"
                value={selectedSupplier || ""}
                onChange={(e) => setSelectedSupplier(Number(e.target.value))}
                className="border p-2 w-full mt-2"
              >
                <option value="">Select a Provider</option>
                {suppliers.length > 0 ? (
                  suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))
                ) : (
                  <option value="">No providers available</option>
                )}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="product" className="block text-sm font-medium">Product</label>
              <select
                id="product"
                onChange={(e) => {
                  const productId = Number(e.target.value);
                  const selectedProduct = filteredProducts.find((p) => p.id === productId);
                  if (selectedProduct) {
                    handleAddProduct(selectedProduct.id, selectedProduct.price, selectedProduct.name);
                  }
                }}
                className="border p-2 w-full mt-2"
                disabled={!selectedSupplier || filteredProducts.length === 0}
              >
                <option value="">Select a Product</option>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price}
                    </option>
                  ))
                ) : (
                  <option value="">There are no products available</option>
                )}
              </select>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium">Selected products:</h3>
              <ul>
                {orderItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {filteredProducts.find((p) => p.id === item.productId)?.name || "Unknown product"} - ${item.price} x {item.quantity} units
                    </span>
                    <Button onClick={() => handleRemoveProduct(index)} className="ml-2">
                      Delete
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

            <div className="mb-4">
              <label className="block text-sm font-medium">Total: ${totalPrice.toFixed(2)}</label>
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium">Order status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-2 w-full mt-2"
              >
                <option value="PENDING">Pendiente</option>
                <option value="SHIPPED">Enviado</option>
                <option value="COMPLETED">Completado</option>
                <option value="CANCELED">Cancelado</option>
              </select>
            </div>

            <Button type="submit" className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold">
              Create order
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
