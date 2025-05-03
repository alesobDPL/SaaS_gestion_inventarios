import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

//Interceptor para manejar errores globalmente
api.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );


export default api