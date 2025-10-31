import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext.tsx';
import { Stat } from '../types.ts';

const useCountUp = (endValue: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let start = 0;
                const startTime = performance.now();

                const animate = (currentTime: number) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const currentCount = Math.floor(progress * (endValue - start) + start);
                    setCount(currentCount);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setCount(endValue);
                    }
                };
                requestAnimationFrame(animate);
                if(observer.current) observer.current.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.current.observe(currentRef);

        return () => {
            if(observer.current) observer.current.disconnect();
        };

    }, [endValue, duration]);

    return { count, ref };
};


const StatItem: React.FC<{ value: number; label: string; suffix?: string, icon?: string }> = ({ value, label, suffix, icon }) => {
    const { count, ref } = useCountUp(value);
    return (
        <div className="text-center flex flex-col items-center">
            {icon && <div className="text-brand-blue-600 dark:text-brand-blue-400 mb-2" dangerouslySetInnerHTML={{ __html: icon }} />}
            <span ref={ref} className="text-4xl sm:text-5xl font-extrabold text-brand-blue-900 dark:text-white">
                {count}
                {suffix && <span>{suffix}</span>}
            </span>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">{label}</p>
        </div>
    );
};


const StatsCounter: React.FC = () => {
    const { stats } = useData();
    return (
        <section className="bg-white dark:bg-gray-800/50 py-16 sm:py-20 relative">
            <div className="absolute inset-0 dot-grid-bg opacity-40"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map(stat => (
                        <StatItem key={stat.id} value={stat.value} label={stat.label} suffix={stat.suffix} icon={stat.icon} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;