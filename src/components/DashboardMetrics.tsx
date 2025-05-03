"use client";
import * as motion from "motion/react-client";
/* import { getOrders } from "@/services/orders";
import { useState, useEffect } from "react";
import { Order } from "@/types/products";
import { toast } from "@/hooks/use-toast"; */


const metrics = [
  { label: "Ingresos Mensuales", value: "$42,500", color: "bg-green-100 text-green-800" },
  { label: "Pedidos Pendientes", value: "78", color: "bg-yellow-100 text-yellow-800" },
  { label: "Clientes Activos", value: "1,245", color: "bg-blue-100 text-blue-800" },
  { label: "Productos en Stock", value: "3,560", color: "bg-purple-100 text-purple-800" },
];
/* const [orders, setOrders] = useState<Product[]>([]); */

/*   useEffect(() => {
    const fetchData = async () => {
      try {
         setLoading(true); 
        const [OrdersData] = await Promise.all([
          getOrders(),
          
        ]);
        setOrders(OrdersData);
        
      } catch (err: any) {
         setError(err.message); 
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos",
          variant: "destructive",
        });
      } finally {
         setLoading(false); 
      }
    };
  }, [toast]) */;

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          className={`p-6 rounded-lg shadow-md ${metric.color}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <h3 className="text-lg font-semibold">{metric.label}</h3>
          <p className="text-2xl font-bold">{metric.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
