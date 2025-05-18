import api from "@/lib/api";

export const getProductsFiltered = async ({ page = 1, limit = 10 } = {}) => {
  const response = await api.get('/products', {
    params: { page, limit }
  });
  return response.data
};

export const getProducts = async () => {
    const response = await api.get(`/products/all`);
    return response.data;
  };

  export const getProductsWithRedis = async () => {
    const response = await api.get(`/products/with-redis`);
    return response.data;
  };

export const getProduct = async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  };
  
export const createProduct = async (orderData: any) => {
    const response = await api.post('/products', orderData);
    return response.data;
  };
  
export const updateProduct = async (id: number, product: any) => {
    const response = await api.put(`/products/${id}`, product );
    return response.data;
  };
  
export const deleteProduct = async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  };