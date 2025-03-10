"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ordersData = [
  { month: "Jan", orders: 320 },
  { month: "Feb", orders: 450 },
  { month: "Mar", orders: 500 },
  { month: "Apr", orders: 620 },
  { month: "May", orders: 720 },
];

export default function OrdersChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Pedidos por Mes</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={ordersData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" fill="#F5A623" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
