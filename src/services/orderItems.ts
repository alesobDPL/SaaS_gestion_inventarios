import api from "@/lib/api";

export const getOrderItems = async ()=>{
    const response = await api.get('/orderItems');
    return response.data;
}

/* export const getOrder = async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  };
  
export const createOrder = async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  };
  
export const updateOrder = async (id: number, status: string) => {
    const response = await api.put(`/orders/${id}`, { status });
    return response.data;
  };
  
export const deleteOrder = async (id: number) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  }; */