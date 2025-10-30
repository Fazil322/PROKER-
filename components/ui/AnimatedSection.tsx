
import React, { useRef, useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

const AnimatedSection: React.FC<Props> = ({ children, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`animated-section ${isVisible ? 'is-visible' : ''} ${className || ''}`}
        >
            {children}
        </div>
    );
};

export default AnimatedSection;
