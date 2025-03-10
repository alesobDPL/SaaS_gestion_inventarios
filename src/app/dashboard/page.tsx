"use client"
import AnimatedText from "@/components/AnimatedText";
import DashboardMetrics from "@/components/DashboardMetrics";
import SalesChart from "@/components/SalesChart";
import OrdersChart from "@/components/OrdersChart";
import CustomersChart from "@/components/CustomersChart";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">

            {/* Botón para volver */}
      <Button
        onClick={() => window.history.back()}
        className="mb-4 bg-transparent text-gray-700 hover:bg-gray-100"
      >
        ← Volver
      </Button>
      {/* Título animado */}
      <AnimatedText text="Dashboard Empresarial" className="text-gray-900 text-4xl font-bold text-center mb-12" />

      {/* Métricas clave */}
      <DashboardMetrics />

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <SalesChart />
        <OrdersChart />
        <CustomersChart />
      </div>
    </div>
  );
}
