'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Product {
  name: string
  stock: number
  minimumStock: number
}

export default function LowStockAlert({ data }: { data: Product[] }) {
  const lowStockItems = data.filter((p) => p.stock < p.minimumStock)

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Low Stock Alerts</CardTitle>
        <CardDescription>
          {lowStockItems.length > 0 ? (
            <span className="text-red-600">
              ⚠️ {lowStockItems.length} Low stock
              {lowStockItems.length > 1 ? 's' : ''} product
            </span>
          ) : (
            <span className="text-green-600">
              All inventory is within limits.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      {lowStockItems.length > 0 && (
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lowStockItems}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              />
              <Bar
                dataKey="stock"
                fill="#ef4444"
                name="Unidades actuales"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      )}
    </Card>
  )
}
