export interface Supplier {
    id: number;
    name: string;
    contact: number;
    email: string;
    product: Product[];
  }

  export interface Product_orderForm {
    id: number;
    name: string;
    price: number;
    stock: number
    supplier?: { id: number; name: string }; // Relación con proveedor
  }
  

  export interface OrderFormProps {
    onSave: (order: any) => void;
    products?: Product[];
    isSubmitting: boolean;
  }
  
  export interface Product {
    id: number;
    name: string;
    sku: number;
    stock: number;
    price: number;
    note?: string;
    category?: string;
    supplierId?: number | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: Boolean;
    supplier: Supplier;
    
  }
  
  export interface CreateProductDto {
    name: string;
    sku?: number;
    stock?: number;
    price: number;
    note?: string;
    category?: string;
    supplierId: number;
  }
  
  export interface UpdateProductDto extends Partial<CreateProductDto> {
    id: number;
  }


  //New interfaces to use, meanwhile do not use it.
  export interface Order {
    id: number;
    status: OrderStatus;
    totalPrice: number;
    orderItems: Product[];
    createdAt?: any;
    
  }

  export enum OrderStatus{
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED"
  }