'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from 'react-intersection-observer';

const StockChart = dynamic(() => import('@/components/stock-chart'), {
  ssr: false,
  loading: () => 
  <Skeleton className="h-[250px] w-full rounded-xl" />,

});

export default function StockChartWrapper({ data }: { data: any }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Comienza a cargar cuando el 10% del componente es visible
  });

  return (
    <div ref={ref}>
      {inView ? (
        <StockChart data={data} />
      ) : (
        <Skeleton className="h-[250px] w-full rounded-xl" />
      )}
    </div>
  );
}
