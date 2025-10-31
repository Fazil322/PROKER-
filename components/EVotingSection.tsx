import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import { EVotingCandidate } from '../types.ts';
import ConfirmModal from './ui/ConfirmModal.tsx';
import Modal from './ui/Modal.tsx';

const CandidateCard: React.FC<{ candidate: EVotingCandidate; onSelect: () => void; isSelected: boolean; isVotingAllowed: boolean; showDetails: () => void; }> = ({ candidate, onSelect, isSelected, isVotingAllowed, showDetails }) => (
    <div className={`border-2 rounded-lg p-4 text-center transition-all duration-300 ${isSelected ? 'border-brand-blue-600 ring-4 ring-brand-blue-200 dark:ring-brand-blue-800' : 'border-gray-200 dark:border-gray-700'}`}>
        <img src={candidate.image_url} alt={candidate.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-gray-600 shadow-md" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{candidate.name}</h3>
        <button onClick={showDetails} className="text-sm text-brand-blue-600 dark:text-brand-blue-400 hover:underline mt-1">Lihat Visi & Misi</button>
        <button 
            onClick={onSelect}
            disabled={!isVotingAllowed}
            className={`w-full mt-4 font-bold py-2 px-4 rounded-md transition-colors ${
                isSelected 
                ? 'bg-brand-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            } ${isVotingAllowed ? 'hover:bg-brand-blue-500' : 'cursor-not-allowed opacity-50'}`}
        >
            {isSelected ? 'Terpilih' : 'Pilih'}
        </button>
    </div>
);

const EVotingSection: React.FC = () => {
    const { activeEVotingEvent, castVote, addToast } = useData();
    const [token, setToken] = useState('');
    const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [voteSuccess, setVoteSuccess] = useState(false);
    const [detailsCandidate, setDetailsCandidate] = useState<EVotingCandidate | null>(null);

    if (!activeEVotingEvent) {
        return null;
    }
    
    const selectedCandidate = activeEVotingEvent.candidates.find(c => c.id === selectedCandidateId);

    const handleVote = async () => {
        if (!token.trim() || !selectedCandidateId) {
            addToast('Silakan masukkan token dan pilih kandidat.', 'error');
            return;
        }
        setIsLoading(true);
        const result = await castVote(token, selectedCandidateId, activeEVotingEvent.id);
        setIsLoading(false);

        if (result.success) {
            setVoteSuccess(true);
        } else {
            addToast(result.message, 'error');
        }
    };
    
    if (voteSuccess) {
        return (
             <section id="evoting" className="bg-white dark:bg-gray-900 py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-md mx-auto bg-green-50 dark:bg-green-900/50 p-8 rounded-lg border border-green-200 dark:border-green-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Terima Kasih!</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Suara Anda telah berhasil direkam. Partisipasi Anda sangat berarti untuk masa depan OSIS.</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="evoting" className="bg-white dark:bg-gray-800/50 py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-brand-blue-700 dark:text-brand-blue-400 sm:text-4xl">E-Voting: {activeEVotingEvent.title}</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{activeEVotingEvent.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {activeEVotingEvent.candidates.map(candidate => (
                        <CandidateCard 
                            key={candidate.id} 
                            candidate={candidate}
                            onSelect={() => setSelectedCandidateId(candidate.id)}
                            isSelected={selectedCandidateId === candidate.id}
                            isVotingAllowed={!!token.trim()}
                            showDetails={() => setDetailsCandidate(candidate)}
                        />
                    ))}
                </div>

                <div className="max-w-md mx-auto bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md border dark:border-gray-700">
                     <h3 className="text-lg font-bold text-center text-gray-800 dark:text-white">Masukkan Token Anda</h3>
                     <p className="text-sm text-center text-gray-500 mb-4">Gunakan token unik yang telah diberikan untuk memberikan suara.</p>
                     <input
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value.toUpperCase())}
                        placeholder="KODE TOKEN"
                        className="w-full px-4 py-3 text-center tracking-widest font-mono border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        disabled={isLoading}
                    />
                    <button
                        onClick={() => setIsConfirming(true)}
                        disabled={!token || !selectedCandidateId || isLoading}
                        className="w-full mt-4 bg-brand-blue-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-blue-800 transition-colors disabled:bg-brand-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Berikan Suara'}
                    </button>
                </div>
            </div>
            
            <ConfirmModal
                isOpen={isConfirming}
                onClose={() => setIsConfirming(false)}
                onConfirm={() => { setIsConfirming(false); handleVote(); }}
                title="Konfirmasi Pilihan"
                message={`Anda akan memberikan suara untuk ${selectedCandidate?.name}. Pilihan ini tidak dapat diubah. Lanjutkan?`}
            />

            {detailsCandidate && (
                <Modal isOpen={!!detailsCandidate} onClose={() => setDetailsCandidate(null)} title={detailsCandidate.name}>
                    <div className="space-y-4">
                        <img src={detailsCandidate.image_url} alt={detailsCandidate.name} className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-gray-200 dark:border-gray-600 shadow-lg"/>
                        <div>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">Visi</h4>
                            <p className="text-gray-600 dark:text-gray-300">{detailsCandidate.vision}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">Misi</h4>
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{detailsCandidate.mission}</p>
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default EVotingSection;
