import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext.tsx';

const LiveStreamBanner: React.FC = () => {
    const { events } = useData();
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000); // Update every second for countdown
        return () => clearInterval(timer);
    }, []);

    const fifteenMinutes = 15 * 60 * 1000;
    let relevantEvent = null;
    let eventState: 'live' | 'starting_soon' | null = null;

    const liveEvent = events.find(e => e.is_live && e.live_stream_url);

    if (liveEvent) {
        relevantEvent = liveEvent;
        eventState = 'live';
    } else {
        const soonEvents = events
            .filter(e => {
                if (!e.live_stream_url) return false;
                const eventTime = new Date(e.date).getTime();
                const timeDifference = eventTime - now.getTime();
                return timeDifference > 0 && timeDifference <= fifteenMinutes;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        if (soonEvents.length > 0) {
            relevantEvent = soonEvents[0];
            eventState = 'starting_soon';
        }
    }

    if (!relevantEvent) {
        return null;
    }

    if (eventState === 'live') {
        return (
            <section id="live-stream" className="bg-red-600 text-white py-12" data-aos="fade-down">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center space-x-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">Sedang Berlangsung</h2>
                        </div>
                        <p className="mt-2 text-lg font-semibold">{relevantEvent.title}</p>
                    </div>
                    <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto bg-black rounded-lg shadow-2xl overflow-hidden">
                        <iframe 
                            src={relevantEvent.live_stream_url} 
                            title={relevantEvent.title} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </section>
        );
    }

    if (eventState === 'starting_soon') {
        const diff = new Date(relevantEvent.date).getTime() - now.getTime();
        const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

        return (
            <section id="live-stream-soon" className="bg-brand-blue-700 text-white py-8" data-aos="fade-down">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="animate-pulse flex items-center justify-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55a2 2 0 01.45 2.12l-2.02 5.05a2 2 0 01-3.96 0l-2.02-5.05a2 2 0 01.45-2.12L15 10zM15 10V4a2 2 0 00-2-2h- стабильно" /></svg>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight uppercase">Akan Segera Dimulai</h2>
                    </div>
                    <p className="mt-2 text-md font-semibold">{relevantEvent.title}</p>
                    <div className="mt-3 text-3xl font-bold font-mono tracking-widest">
                        <span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                </div>
            </section>
        );
    }
    
    return null;
};

export default LiveStreamBanner;
