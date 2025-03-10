"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const customerData = [
  { name: "Nuevos", value: 200 },
  { name: "Recurrentes", value: 800 },
];

const COLORS = ["#4CAF50", "#2196F3"];

export default function CustomersChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Clientes Nuevos vs Recurrentes</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <>
            <Pie data={customerData} dataKey="value" nameKey="name" outerRadius={100} label>
              {customerData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
