import api from "@/lib/api";

export const getOrders = async ({ page = 1, limit = 10 }) => {
  const response = await api.get('/orders', {
    params: { page, limit },
  });
  return response.data; 
}

export const getProducts = async () => {
  const response = await api.get('/products/all');
  return response.data;
};

export const getOrder = async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  };
  
export const createOrder = async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  };
  
export const updateOrder = async (id: number, status: any) => {
    const response = await api.put(`/orders/${id}`, { status });
    console.log("updateOrder", response)
    return response.data;
  };
  
export const deleteOrder = async (id: number) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  };