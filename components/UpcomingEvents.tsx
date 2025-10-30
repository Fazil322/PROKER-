
import React from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../context/DataContext.tsx';
// FIX: Add .ts extension to file import.
import { Event } from '../types.ts';

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const date = new Date(event.date);
    const day = date.toLocaleDateString('id-ID', { day: '2-digit' });
    const month = date.toLocaleDateString('id-ID', { month: 'short' });

    return (
        <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex-shrink-0 text-center bg-brand-blue-100 dark:bg-brand-blue-900/50 rounded-md p-3 w-20">
                <p className="text-3xl font-bold text-brand-blue-700 dark:text-brand-blue-300">{day}</p>
                <p className="text-sm font-semibold text-brand-blue-600 dark:text-brand-blue-400 uppercase">{month}</p>
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.time} - {event.location}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{event.description}</p>
            </div>
        </div>
    );
};

const UpcomingEvents: React.FC = () => {
    const { events } = useData();

    return (
        <section id="events" className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Agenda Terdekat</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Jangan lewatkan kegiatan-kegiatan seru yang akan datang.</p>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.slice(0, 4).map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
