import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable as DataTableProduct } from "@/components/data-table-products"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import StockChart from "@/components/stock-chart";
import LowStockAlert from "@/components/LowStockAlert";

export default function HomePage() {

  const text = "Manage your products, suppliers and orders in an profesional and efficient way. Simplified your work flow using a clean design and intuitive tools."

  const inventoryData = [
    { name: 'Laptop HP', stock: 34, minimumStock: 20 },
    { name: 'Mouse Logitech', stock: 12, minimumStock: 15 },
    { name: 'Monitor LG 1', stock: 7, minimumStock: 10 },
    { name: 'Monitor LG 2', stock: 70, minimumStock: 10 },
    { name: 'Monitor LG 3', stock: 77, minimumStock: 10 },
    { name: 'Monitor LG 4', stock: 77, minimumStock: 10 },
    { name: 'Teclado Redragon 1', stock: 25, minimumStock: 10 },
    { name: 'Teclado Redragon 2', stock: 30, minimumStock: 10 },
    { name: 'Teclado Redragon 3', stock: 5, minimumStock: 10 },
    { name: 'Teclado Redragon 4', stock: 77, minimumStock: 10 },

  ]

  return (
    <div>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <ChartAreaInteractive />
            <div className="space-y-6 columns-2">
              <StockChart data={inventoryData} />
              <LowStockAlert data={inventoryData} />
            </div>
            <DataTableProduct />
          </div>
        </div>
      </div>
    </div>
  );
}
