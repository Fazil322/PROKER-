
import React, { useState, useEffect, useRef } from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../context/DataContext.tsx';

const CountUp: React.FC<{ end: number, duration?: number, suffix?: string }> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isMounted = useRef(true);

  const easeOutCubic = (t: number) => (--t) * t * t + 1;

  useEffect(() => {
    isMounted.current = true;
    let frameId: number;
    let startTimestamp: number | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animate = (timestamp: number) => {
            if (!isMounted.current) return;
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const percentage = Math.min(progress / duration, 1);
            const easedPercentage = easeOutCubic(percentage);
            const currentCount = Math.floor(easedPercentage * end);
            setCount(currentCount);

            if (progress < duration) {
              frameId = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
          };
          frameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      isMounted.current = false;
      if (frameId) {
          cancelAnimationFrame(frameId);
      }
      observer.disconnect();
    };
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString('id-ID')}{suffix}</span>;
};

const StatsCounter: React.FC = () => {
  const { stats } = useData();
  return (
    <div className="bg-white dark:bg-gray-800 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(stat => (
            <div key={stat.id}>
              <p className="text-4xl md:text-5xl font-extrabold text-brand-blue-700 dark:text-brand-blue-400">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
