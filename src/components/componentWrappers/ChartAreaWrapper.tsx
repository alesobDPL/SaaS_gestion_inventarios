'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from 'react-intersection-observer';

const ChartAreaInteractive = dynamic(() => import('@/components/chart-area-interactive'), {
  ssr: false,
  loading: () => <div className="h-[250px] w-full rounded-xl bg-gray-200" />,
  /* <Skeleton className="h-[250px] w-full rounded-xl" />, */
});

export default function ChartAreaWrapper() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Se renderiza cuando el 10% está visible
  });

  return (
    <div ref={ref}>
      {inView ? (
        <ChartAreaInteractive />
      ) : (
        <Skeleton className="h-[250px] w-full rounded-xl" />
      )}
    </div>
  )
}