
import React from 'react';
import { useData } from '../context/DataContext.tsx';
import CountdownTimer from './ui/CountdownTimer.tsx';

const CalendarIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
    </svg>
);

const LocationIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);


const UpcomingEvents: React.FC = () => {
    const { events } = useData();
    const upcomingEvents = events
        .filter(event => new Date(event.date) > new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const nextEvent = upcomingEvents[0];
    const otherEvents = upcomingEvents.slice(1, 3);

    return (
        <section id="events" className="bg-white dark:bg-gray-800/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Agenda Terdekat</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Jangan lewatkan kegiatan-kegiatan seru yang akan datang!</p>
                </div>

                {nextEvent ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
                        <div>
                            <span className="text-sm font-bold uppercase text-brand-blue-600 dark:text-brand-blue-400">Segera Hadir</span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4">{nextEvent.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{nextEvent.description}</p>
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 text-sm text-gray-700 dark:text-gray-200">
                                <div className="flex items-center">
                                    <CalendarIcon className="w-5 h-5 mr-2 text-brand-blue-500" />
                                    <span>{new Date(nextEvent.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {nextEvent.time}</span>
                                </div>
                                <div className="flex items-center">
                                    <LocationIcon className="w-5 h-5 mr-2 text-brand-blue-500" />
                                    <span>{nextEvent.location}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                           <CountdownTimer targetDate={nextEvent.date} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <p className="text-lg text-gray-500">Belum ada agenda baru yang akan datang. Nantikan informasi selanjutnya!</p>
                    </div>
                )}
                
                {otherEvents.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {otherEvents.map(event => (
                            <div key={event.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-brand-blue-500">
                                <h4 className="font-bold text-lg text-gray-800 dark:text-white">{event.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date(event.date).toLocaleDateString('id-ID', { month: 'long', day: 'numeric' })} - {event.location}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEvents;
