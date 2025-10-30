
import React, { useState } from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../context/DataContext.tsx';

const KotakSaran: React.FC = () => {
    const { addSaran } = useData();
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!suggestion.trim()) {
            setError('Kolom saran/masukan wajib diisi.');
            return;
        }
        setError('');
        setIsSubmitting(true);
        try {
            await addSaran({ name: name || "Anonim", class: className || "N/A", suggestion });
            setName('');
            setClassName('');
            setSuggestion('');
        } catch (error) {
            // Error toast is handled by the context
            console.error("Failed to submit suggestion:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="saran" className="bg-white dark:bg-gray-800 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Kotak Saran Digital</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Punya ide, kritik, atau masukan untuk OSIS? Sampaikan di sini. Identitas Anda akan kami jaga kerahasiaannya.
                    </p>
                </div>
                <div className="mt-12 max-w-xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 dark:bg-gray-700/50 p-8 rounded-lg shadow-md">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nama (Opsional)</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="class" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Kelas (Opsional)</label>
                            <input type="text" id="class" value={className} onChange={e => setClassName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm" />
                        </div>
                         <div>
                            <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Saran/Masukan <span className="text-red-500">*</span></label>
                            <textarea id="suggestion" value={suggestion} onChange={e => setSuggestion(e.target.value)} rows={5} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"></textarea>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="text-right">
                             <button type="submit" disabled={isSubmitting} className="bg-brand-blue-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-blue-800 transition-colors disabled:bg-brand-blue-400">
                                {isSubmitting ? 'Mengirim...' : 'Kirim'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default KotakSaran;
