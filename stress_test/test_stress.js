import http from 'k6/http';

export const options = {
  stages: [
    { duration: '30s', target: 100 }, // Sube a 100 usuarios virtuales
    { duration: '1m', target: 100 },  // Mantiene carga
    { duration: '30s', target: 0 },   // Baja la carga
  ],
};

export default function () {
  http.get('http://44.198.158.214:3000/api/products'); // Cambia esta URL por la de tu backend en producción
}