'use client';

import { useEffect } from 'react';
import { getSocket } from '@/lib/socket';
import toast from 'react-hot-toast';

export default function StockAlerts() {
  useEffect(() => {
    const socket = getSocket();

    socket.on('low-stock', (products: any[]) => {
      console.log("Evento recibido: low-stock", products);
      products.forEach((product) => {
        toast.custom((t) => (
          <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/circle-alert.svg"
                    alt="alert"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Alerta de Stock Bajo
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {`Reponer ${product.name} (Stock: ${product.stock})`}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                Cerrar
              </button>
            </div>
          </div>
        ), { duration: Infinity });
      });
    });

    return () => {
      socket.off('low-stock');
    };
  }, []);

  return null;
}
