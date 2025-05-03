import { Product_orderForm } from "@/types/products";

export function validateProduct(product: Product_orderForm | undefined) {
    if (!product) {
      alert("Producto no encontrado.");
      return false;
    }
    if (!product.name) {
      alert("El producto no tiene nombre válido.");
      return false;
    }
    if (product.price <= 0) {
      alert("El precio del producto debe ser mayor a 0.");
      return false;
    }
    return true;
  }

 // Función para validar la cantidad
export function validateQuantity(product: Product_orderForm, quantity: number) {
    if (quantity > product.stock) {
      alert(`No puedes pedir más de ${product.stock} unidades de ${product.name}`);
      return product.stock; // Forzar la cantidad al stock máximo
    }
    if (quantity <= 0) {
      alert("La cantidad debe ser mayor que 0.");
      return 1; // Forzar al menos 1
    }
    return quantity;
  }

// Función para validar toda la orden antes de enviar
export function validateOrder(orderItems: any[], allProducts: Product_orderForm[]) {
    if (orderItems.length === 0) {
      alert("Debes agregar al menos un producto al pedido.");
      return false;
    }
  
    for (const item of orderItems) {
      const product = allProducts.find((p) => p.id === item.productId);
      if (!product) {
        alert("Producto no encontrado en la base de datos.");
        return false;
      }
      if (item.quantity > product.stock) {
        alert(`Cantidad inválida para ${product.name}. Stock disponible: ${product.stock}`);
        return false;
      }
    }
  
    return true;
  }