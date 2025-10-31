import React from 'react';
import { useData } from '../../context/DataContext.tsx';

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

const QuickActionButton: React.FC<{ label: string; onClick: () => void; }> = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors flex items-center text-sm font-semibold text-gray-700"
    >
        <span className="mr-2 text-brand-blue-600">+</span> {label}
    </button>
);


const Dashboard: React.FC = () => {
    const { announcements, events, articles, documents, financials, setActiveAdminSection } = useData();

    const stats = [
        { label: 'Pengumuman', value: announcements.length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.5" /></svg> },
        { label: 'Agenda', value: events.length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
        { label: 'Artikel', value: articles.length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 1V4a2 2 0 00-2-2h-7a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2z" /></svg> },
        { label: 'Dokumen Publik', value: documents.length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>},
    ];

    const totalIncome = financials.filter(f => f.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = financials.filter(f => f.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang, Admin!</h1>
            <p className="text-gray-600 mb-8">Ini adalah ringkasan konten website Anda. Pilih menu di samping untuk mulai mengelola.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Keuangan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-green-600">Rp{totalIncome.toLocaleString('id-ID')}</p>
                            <p className="text-sm text-gray-500">Total Pemasukan</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-600">Rp{totalExpense.toLocaleString('id-ID')}</p>
                            <p className="text-sm text-gray-500">Total Pengeluaran</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-800">Rp{(totalIncome - totalExpense).toLocaleString('id-ID')}</p>
                            <p className="text-sm text-gray-500">Saldo Akhir</p>
                        </div>
                    </div>
                     <div className="text-right mt-4">
                         <button onClick={() => setActiveAdminSection('financials')} className="text-sm font-semibold text-brand-blue-600 hover:underline">Kelola Keuangan &rarr;</button>
                     </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
                    <div className="space-y-3">
                        <QuickActionButton label="Tambah Pengumuman" onClick={() => setActiveAdminSection('announcements')} />
                        <QuickActionButton label="Tambah Agenda Baru" onClick={() => setActiveAdminSection('events')} />
                        <QuickActionButton label="Tambah Dokumen" onClick={() => setActiveAdminSection('documents')} />
                        <QuickActionButton label="Tambah Artikel" onClick={() => setActiveAdminSection('articles')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;