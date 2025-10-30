
import React, { useState, FormEvent, useEffect } from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../context/DataContext.tsx';

const Login: React.FC = () => {
    const { login, setShowLogin } = useData();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowLogin(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setShowLogin]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            const success = login(password);
            if (!success) {
                setError('Kode akses yang Anda masukkan salah.');
                setIsLoading(false);
                setPassword('');
            }
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center relative transform transition-all animate-fade-in-up"
            >
                <button
                    onClick={() => setShowLogin(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    aria-label="Close login"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Akses Terbatas</h2>
                <p className="text-gray-500 mb-6">Silakan masukkan kode akses admin.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                            placeholder="••••••••"
                            required
                            autoFocus
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm animate-shake">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue-800 transition-colors disabled:bg-brand-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Masuk'}
                    </button>
                </form>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
                
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                .animate-shake { animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both; }
            `}</style>
        </div>
    );
};

export default Login;
