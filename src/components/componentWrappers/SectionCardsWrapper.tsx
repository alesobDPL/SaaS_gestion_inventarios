'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from 'react-intersection-observer';

const ChartAreaInteractive = dynamic(() => import('@/components/section-cards'), {
    ssr: false,
    loading: () => <Skeleton className="h-[250px] w-full rounded-xl" />,
});

export default function SectionCardsWrapper() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1, // Comienza a cargar cuando el 10% del componente es visible
      });


      
        return (
          <div ref={ref}>
            {inView ? (
              <ChartAreaInteractive />
            ) : (
              <Skeleton className="h-[250px] w-full rounded-xl" />
            )}
          </div>
        );
}