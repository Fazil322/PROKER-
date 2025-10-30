
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext.tsx';

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


const StatItem: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix }) => {
    const { count, ref } = useCountUp(value);
    return (
        <div className="text-center">
            <span ref={ref} className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-brand-blue-700 to-accent-purple bg-clip-text text-transparent">
                {count}
                {suffix && <span>{suffix}</span>}
            </span>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">{label}</p>
        </div>
    );
};


const StatsCounter: React.FC = () => {
    const { stats } = useData();
    return (
        <section className="relative bg-gradient-to-br from-white via-brand-blue-50/30 to-white dark:from-gray-800/50 dark:via-gray-800/70 dark:to-gray-800/50 py-16 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 right-20 w-64 h-64 bg-brand-blue-500 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-10 left-20 w-64 h-64 bg-accent-purple rounded-full blur-3xl animate-pulse-slow animation-delay-500"></div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map(stat => (
                        <div key={stat.id} className="text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                            <StatItem value={stat.value} label={stat.label} suffix={stat.suffix} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
