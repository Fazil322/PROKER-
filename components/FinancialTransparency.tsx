import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext.tsx';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const FinancialTransparency: React.FC = () => {
    const { financials } = useData();
    
    const availablePeriods = useMemo(() => [...new Set(financials.map(f => f.period))].sort((a, b) => b.localeCompare(a)), [financials]);
    const [selectedPeriod, setSelectedPeriod] = useState(availablePeriods[0] || '');

    const filteredFinancials = useMemo(() => financials.filter(item => item.period === selectedPeriod), [financials, selectedPeriod]);

    const expenses = filteredFinancials.filter(item => item.type === 'expense');
    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

    const chartData = {
        labels: expenses.map(item => item.category),
        datasets: [
            {
                label: 'Alokasi Dana (Rp)',
                data: expenses.map(item => item.amount),
                backgroundColor: [
                    'rgba(2, 82, 191, 0.8)',      // brand-blue-700
                    'rgba(73, 175, 255, 0.8)',    // brand-blue-600
                    'rgba(163, 214, 255, 0.8)',   // brand-blue-300
                    'rgba(250, 204, 21, 0.8)',    // yellow-400
                    'rgba(1, 66, 156, 0.8)',      // brand-blue-800
                ],
                borderColor: [
                    '#ffffff',
                ],
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(context.parsed);
                        }
                        return label;
                    }
                }
            }
        },
    };
    
    if (financials.length === 0) {
        return null;
    }

    return (
        <section id="financials" className="bg-white dark:bg-gray-800 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-4" data-aos="fade-up">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Transparansi Anggaran</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Alokasi dana untuk setiap kegiatan OSIS demi kemajuan bersama.</p>
                </div>

                {availablePeriods.length > 1 && (
                    <div className="max-w-xs mx-auto mb-10" data-aos="fade-up">
                        <label htmlFor="period-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-2">Tampilkan Periode:</label>
                        <select
                            id="period-select"
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            {availablePeriods.map(period => (
                                <option key={period} value={period}>{period}</option>
                            ))}
                        </select>
                    </div>
                )}
                
                {expenses.length > 0 ? (
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-center" data-aos="fade-up" data-aos-delay="100">
                        <div className="relative h-64 md:h-80 md:col-span-2">
                             <Doughnut data={chartData} options={chartOptions} />
                        </div>
                        <div className="md:col-span-3">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Rincian Alokasi Dana</h3>
                            <ul className="space-y-3">
                                {expenses.map((item, index) => {
                                    const percentage = totalExpense > 0 ? (item.amount / totalExpense * 100).toFixed(1) : 0;
                                    const color = chartData.datasets[0].backgroundColor[index % chartData.datasets[0].backgroundColor.length];
                                    return (
                                        <li key={item.id} className="flex items-center text-sm p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                                            <span className="block w-4 h-4 rounded-sm mr-3 flex-shrink-0" style={{ backgroundColor: color }}></span>
                                            <span className="flex-grow text-gray-700 dark:text-gray-300">{item.category}</span>
                                            <span className="font-semibold text-gray-900 dark:text-white ml-4">{percentage}%</span>
                                        </li>
                                    );
                                })}
                            </ul>
                             <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-baseline">
                                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Pengeluaran</h3>
                                 <p className="text-2xl font-bold text-brand-blue-700 dark:text-brand-blue-400">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalExpense)}
                                </p>
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/50 rounded-lg" data-aos="fade-up">
                        <p className="text-lg text-gray-500 dark:text-gray-400">Tidak ada data pengeluaran untuk periode {selectedPeriod}.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FinancialTransparency;