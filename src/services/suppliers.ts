import api from "@/lib/api";

export const getSuppliersFiltered = async ({ page = 1, limit = 10 } = {}) => {
  const response = await api.get('/suppliers', {
    params: { page, limit },
  });
  console.log(response.data)
  return response.data;
};

export const getSuppliers = async () => {
  const response = await api.get('/suppliers/all');
   console.log(response.data)
  return response.data;
};

export const getSupplier = async (id: number) => {
    const response = await api.get(`/suppliers/${id}`);
    return response.data;
  };
  
export const createSupplier = async (orderData: any) => {
    const response = await api.post('/suppliers', orderData);
    return response.data;
  };
  
  export const updateSupplier = async (
    id: number, 
    supplierData: {
      name: string;
      contact?: number | null;
      email?: string | null;
    }
  ) => {
    const response = await api.put(`/suppliers/${id}`, supplierData);
    return response.data;
  };
  
export const deleteSupplier = async (id: number) => {
    const response = await api.delete(`/suppliers/${id}`);
    return response.data;
  };