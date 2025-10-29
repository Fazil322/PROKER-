import React from 'react';
import { useData } from '../../context/DataContext';

const StatCard: React.FC<{ label: string; value: number; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-brand-blue-100 text-brand-blue-600 rounded-full p-3">
            {icon}
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const { announcements, events, articles, achievements, testimonials } = useData();

    const stats = [
        { label: 'Pengumuman', value: announcements.length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.5" /></svg> },
        { label: 'Agenda', value: events.length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
        { label: 'Artikel', value: articles.length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 1V4a2 2 0 00-2-2h-7a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2z" /></svg> },
        { label: 'Prestasi', value: achievements.length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg> },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang, Admin!</h1>
            <p className="text-gray-600 mb-8">Ini adalah ringkasan konten website Anda. Pilih menu di samping untuk mulai mengelola.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Terbaru</h2>
                <div className="space-y-4">
                    {announcements.slice(0, 2).map(item => (
                        <div key={item.id} className="p-3 bg-gray-50 rounded-md">
                            <p className="font-semibold text-gray-700">{item.title}</p>
                            <span className="text-xs text-gray-500">Pengumuman baru ditambahkan pada {item.date}</span>
                        </div>
                    ))}
                     {testimonials.slice(0, 1).map(item => (
                        <div key={item.id} className="p-3 bg-gray-50 rounded-md">
                            <p className="font-semibold text-gray-700">"{item.quote}"</p>
                            <span className="text-xs text-gray-500">Testimoni baru dari {item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;