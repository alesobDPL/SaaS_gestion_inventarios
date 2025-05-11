import ChartAreaWrapper from '@/components/componentWrappers/ChartAreaWrapper';
import LowStockAlertWrapper from '@/components/componentWrappers/LowStockAlertWrapper';
import StockChartWrapper from '@/components/componentWrappers/StockChartWrapper';
import SectionCardsWrapper from '@/components/componentWrappers/SectionCardsWrapper';

import data from "@/services/inventoryData.json"
import DataTableWrapper from '@/components/componentWrappers/DataTableWrapper';
import NotificationList from '@/components/NotificacionList';

export default function HomePage() {

  return (
    <div>
      <div className="px-8 py-32 text-center ">
        <h1 className="text-6xl font-bold">
          Welcome to the dashboard
        </h1>
        <p className="mt-2  text-muted-foreground">
          Here you'll find your metrics, inventory, and stock alerts.
        </p>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCardsWrapper />
            <ChartAreaWrapper />
            <div className="space-y-6 columns-2">
              <StockChartWrapper data={data} />
              <LowStockAlertWrapper data={data} />
            </div>
            <DataTableWrapper />
          </div>
        </div>
      </div>
    </div>
  );
}
