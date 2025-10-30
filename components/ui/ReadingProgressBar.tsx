
import React, { useState, useEffect } from 'react';

const ReadingProgressBar: React.FC = () => {
    const [width, setWidth] = useState(0);

    const scrollHeight = () => {
        const el = document.documentElement,
            scrollTotal = el.scrollHeight - el.clientHeight;
        if(scrollTotal > 0) {
            setWidth((el.scrollTop / scrollTotal) * 100);
        } else {
            setWidth(0);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHeight);
        return () => window.removeEventListener("scroll", scrollHeight);
    });

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[100]">
            <div 
                className="h-full bg-brand-blue-600 dark:bg-brand-blue-400 transition-all duration-75 ease-out" 
                style={{ width: `${width}%` }}
            />
        </div>
    );
};

export default ReadingProgressBar;
