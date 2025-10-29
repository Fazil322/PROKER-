import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import type { Event } from '../types';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (eventDate: string): TimeLeft | null => {
  const difference = +new Date(eventDate) - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
};

const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  
  if (!timeLeft) {
    return <div className="text-center text-red-500 font-bold text-lg">Acara Telah Berakhir</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div>
        <div className="text-2xl font-bold text-brand-blue-700">{String(timeLeft.days).padStart(2, '0')}</div>
        <div className="text-xs text-gray-500">Hari</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-brand-blue-700">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-xs text-gray-500">Jam</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-brand-blue-700">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-xs text-gray-500">Menit</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-brand-blue-700">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-xs text-gray-500">Detik</div>
      </div>
    </div>
  );
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
    <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{event.description}</p>
       <div className="mb-4">
        <Countdown targetDate={event.date} />
       </div>
      <a href="#events" className="mt-auto w-full text-center bg-brand-yellow-400 hover:bg-brand-yellow-500 text-brand-yellow-900 font-bold py-2 px-4 rounded-lg transition duration-300">
        Lihat Detail & Daftar
      </a>
    </div>
  </div>
);


const UpcomingEvents: React.FC = () => {
  const { events } = useData();
  return (
    <section id="events" className="bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Agenda Mendatang</h2>
          <p className="mt-4 text-lg text-gray-600">Jangan lewatkan keseruan acara-acara kami berikutnya!</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;