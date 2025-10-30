
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
    const otherEvents = upcomingEvents.slice(1, 4);

    return (
        <section id="events" className="bg-gradient-to-br from-white via-blue-50/20 to-white dark:from-gray-800/50 dark:via-gray-800/70 dark:to-gray-800/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
                        <span className="bg-gradient-to-r from-brand-blue-600 to-accent-purple bg-clip-text text-transparent">Agenda</span> Terdekat
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Jangan lewatkan kegiatan-kegiatan seru yang akan datang!</p>
                </div>

                {nextEvent ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-brand-blue-600 to-brand-blue-800 p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue-900/30 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10">
                            <span className="inline-block text-sm font-bold uppercase bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">Segera Hadir</span>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">{nextEvent.title}</h3>
                            <p className="text-blue-100 mb-6 text-lg leading-relaxed">{nextEvent.description}</p>
                            <div className="flex flex-col space-y-3 text-sm text-white">
                                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                                    <CalendarIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span>{new Date(nextEvent.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {nextEvent.time}</span>
                                </div>
                                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                                    <LocationIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span>{nextEvent.location}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 relative z-10">
                           <CountdownTimer targetDate={nextEvent.date} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                        <svg className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg text-gray-500 dark:text-gray-400">Belum ada agenda baru yang akan datang. Nantikan informasi selanjutnya!</p>
                    </div>
                )}
                
                {otherEvents.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Agenda Lainnya</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherEvents.map((event, index) => (
                                <div 
                                    key={event.id} 
                                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-brand-blue-500 hover-lift group"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-brand-blue-600 dark:group-hover:text-brand-blue-400 transition-colors">{event.title}</h4>
                                        <svg className="w-5 h-5 text-brand-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center">
                                            <CalendarIcon className="w-4 h-4 mr-2 text-brand-blue-500" />
                                            <span>{new Date(event.date).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <LocationIcon className="w-4 h-4 mr-2 text-brand-blue-500" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEvents;
