'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
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
}

export default function StockChart({ data }: { data: Product[] }) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Stock per Product</CardTitle>
        <CardDescription>
          Review of current inventory
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
            <Legend />
            <Bar
              dataKey="stock"
              fill="#6366f1"
              name="Unidades en stock"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
