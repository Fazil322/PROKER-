import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import CountdownTimer from './ui/CountdownTimer.tsx';
import Modal from './ui/Modal.tsx';
import { Event } from '../types.ts';
import FilterableContent from './ui/FilterableContent.tsx';

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

const RegistrationForm: React.FC<{ event: Event; onRegistered: () => void; }> = ({ event, onRegistered }) => {
    const { registerForEvent } = useData();
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!name.trim() || !className.trim()) return;
        setIsSubmitting(true);
        await registerForEvent({ event_id: event.id, name, class: className });
        setIsSubmitting(false);
        onRegistered();
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nama Lengkap</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
            </div>
            <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Kelas</label>
                <input type="text" id="class" value={className} onChange={e => setClassName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
            </div>
            <div className="text-right">
                <button type="submit" disabled={isSubmitting} className="btn-animated bg-brand-blue-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-blue-800 disabled:bg-brand-blue-400">
                    {isSubmitting ? 'Mendaftar...' : 'Daftar'}
                </button>
            </div>
        </form>
    );
};

const EventListItem: React.FC<{ item: Event, past?: boolean }> = ({ item, past }) => (
    <li className={`p-3 rounded-md ${past ? 'bg-gray-100 dark:bg-gray-700 opacity-70' : 'bg-blue-50 dark:bg-gray-700/50'}`}>
        <p className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(item.date).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })} - {item.location}</p>
    </li>
);

const UpcomingEvents: React.FC = () => {
    const { events } = useData();
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [registeringEvent, setRegisteringEvent] = useState<Event | null>(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    
    const now = new Date();
    const upcomingEvents = events
        .filter(event => new Date(event.date) > now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
    const pastEvents = events
        .filter(event => new Date(event.date) <= now)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const nextEvent = upcomingEvents[0];
    const otherEvents = upcomingEvents.slice(1, 3);
    
    const handleRegistrationSuccess = () => {
        setRegistrationSuccess(true);
    };

    const closeRegistrationModal = () => {
        setRegisteringEvent(null);
        setTimeout(() => setRegistrationSuccess(false), 500);
    }

    return (
        <>
        <section id="events" className="bg-white dark:bg-gray-800/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Agenda Terdekat</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Jangan lewatkan kegiatan-kegiatan seru yang akan datang!</p>
                </div>

                {nextEvent ? (
                    <div data-aos="fade-up" data-aos-delay="100" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-50 dark:bg-gray-900/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
                        <div>
                            <span className="text-sm font-bold uppercase text-brand-blue-600 dark:text-brand-blue-400">Segera Hadir</span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4">{nextEvent.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{nextEvent.description}</p>
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 text-sm text-gray-700 dark:text-gray-200 mb-6">
                                <div className="flex items-center">
                                    <CalendarIcon className="w-5 h-5 mr-2 text-brand-blue-500" />
                                    <span>{new Date(nextEvent.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {nextEvent.time}</span>
                                </div>
                                <div className="flex items-center">
                                    <LocationIcon className="w-5 h-5 mr-2 text-brand-blue-500" />
                                    <span>{nextEvent.location}</span>
                                </div>
                            </div>
                            {nextEvent.is_registration_open && (
                                <button
                                    onClick={() => setRegisteringEvent(nextEvent)}
                                    className="btn-animated bg-brand-yellow-400 text-brand-blue-900 font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                >
                                    Daftar Sekarang
                                </button>
                            )}
                        </div>
                        <div className="flex-shrink-0">
                           <CountdownTimer targetDate={nextEvent.date} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg" data-aos="fade-up">
                        <p className="text-lg text-gray-500">Belum ada agenda baru yang akan datang. Nantikan informasi selanjutnya!</p>
                    </div>
                )}
                
                {otherEvents.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {otherEvents.map((event, index) => (
                            <div 
                                key={event.id} 
                                className="card-lift-glow bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-brand-blue-500 group"
                                data-aos={index === 0 ? "fade-right" : "fade-left"}
                                data-aos-delay="200"
                            >
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800 dark:text-white">{event.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date(event.date).toLocaleDateString('id-ID', { month: 'long', day: 'numeric' })} - {event.location}</p>
                                    {event.is_registration_open && (
                                        <button 
                                            onClick={() => setRegisteringEvent(event)} 
                                            className="text-sm font-semibold text-brand-blue-600 dark:text-brand-blue-400 hover:underline mt-3"
                                        >
                                            Ikut Mendaftar &rarr;
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                 <div className="text-center mt-12" data-aos="fade-up">
                    <button
                        onClick={() => setIsArchiveOpen(true)}
                        className="btn-animated bg-gray-100 dark:bg-gray-700 text-brand-blue-700 dark:text-brand-blue-300 font-bold py-3 px-8 rounded-full ring-2 ring-brand-blue-700 dark:ring-brand-blue-300 transition-all duration-300 transform hover:scale-105"
                    >
                        Lihat Semua Agenda
                    </button>
                </div>
            </div>
        </section>

        <Modal isOpen={isArchiveOpen} onClose={() => setIsArchiveOpen(false)} title="Arsip Agenda Kegiatan">
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white border-b pb-2">Akan Datang</h3>
                    {upcomingEvents.length > 0 ? (
                        <FilterableContent<Event>
                            items={upcomingEvents}
                            searchPlaceholder="Cari agenda akan datang..."
                            searchKeys={['title', 'location']}
                            renderItem={(item) => <EventListItem key={item.id} item={item} />}
                            gridClasses="space-y-3"
                        />
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tidak ada agenda yang akan datang.</p>
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white border-b pb-2">Telah Berakhir</h3>
                     {pastEvents.length > 0 ? (
                        <FilterableContent<Event>
                            items={pastEvents}
                            searchPlaceholder="Cari agenda yang lalu..."
                            searchKeys={['title', 'location']}
                            renderItem={(item) => <EventListItem key={item.id} item={item} past />}
                            gridClasses="space-y-3"
                        />
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada riwayat agenda.</p>
                    )}
                </div>
            </div>
        </Modal>
        
        {registeringEvent && (
            <Modal isOpen={!!registeringEvent} onClose={closeRegistrationModal} title={registrationSuccess ? "Pendaftaran Berhasil" : `Daftar: ${registeringEvent.title}`}>
                {registrationSuccess ? (
                     <div className="text-center p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">Terima Kasih!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Anda telah berhasil terdaftar untuk acara ini. Sampai jumpa!</p>
                    </div>
                ) : (
                    <RegistrationForm event={registeringEvent} onRegistered={handleRegistrationSuccess} />
                )}
            </Modal>
        )}
        </>
    );
};

export default UpcomingEvents;