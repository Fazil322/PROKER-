import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext.tsx';
import { EVotingEvent, EVotingCandidate } from '../../types.ts';
import Modal from '../ui/Modal.tsx';
import GenericForm, { Field } from './forms/GenericForm.tsx';
import ConfirmModal from '../ui/ConfirmModal.tsx';

// Schema Comments for Supabase:
//
// CREATE TABLE evoting_events (
//   id SERIAL PRIMARY KEY,
//   title TEXT NOT NULL,
//   description TEXT,
//   start_time TIMESTAMPTZ NOT NULL,
//   end_time TIMESTAMPTZ NOT NULL,
//   is_active BOOLEAN DEFAULT FALSE
// );
//
// CREATE TABLE evoting_candidates (
//   id SERIAL PRIMARY KEY,
//   event_id INTEGER REFERENCES evoting_events(id) ON DELETE CASCADE,
//   name TEXT NOT NULL,
//   image_url TEXT,
//   vision TEXT,
//   mission TEXT
// );
//
// CREATE TABLE evoting_tokens (
//   id SERIAL PRIMARY KEY,
//   event_id INTEGER REFERENCES evoting_events(id) ON DELETE CASCADE,
//   token TEXT NOT NULL UNIQUE,
//   is_used BOOLEAN DEFAULT FALSE,
//   used_at TIMESTAMPTZ,
//   voted_for_candidate_id INTEGER REFERENCES evoting_candidates(id)
// );
//
// CREATE OR REPLACE FUNCTION cast_vote(token_text TEXT, candidate_id_vote INT, event_id_vote INT)
// RETURNS TABLE (success BOOLEAN, message TEXT) AS $$
// DECLARE
//     target_token RECORD;
// BEGIN
//     SELECT * INTO target_token FROM evoting_tokens 
//     WHERE token = token_text AND event_id = event_id_vote;
//
//     IF NOT FOUND THEN
//         RETURN QUERY SELECT FALSE, 'Token tidak valid atau bukan untuk acara ini.';
//     ELSEIF target_token.is_used THEN
//         RETURN QUERY SELECT FALSE, 'Token ini sudah digunakan.';
//     ELSE
//         UPDATE evoting_tokens
//         SET is_used = TRUE, used_at = NOW(), voted_for_candidate_id = candidate_id_vote
//         WHERE id = target_token.id;
//         RETURN QUERY SELECT TRUE, 'Suara berhasil direkam.';
//     END IF;
// END;
// $$ LANGUAGE plpgsql;
//
// CREATE OR REPLACE FUNCTION get_vote_results(event_id_input INT)
// RETURNS TABLE (candidate_id INT, name TEXT, vote_count BIGINT) AS $$
// BEGIN
//   RETURN QUERY
//   SELECT
//     c.id as candidate_id,
//     c.name as name,
//     COUNT(t.id) as vote_count
//   FROM evoting_candidates c
//   LEFT JOIN evoting_tokens t ON c.id = t.voted_for_candidate_id AND t.is_used = TRUE
//   WHERE c.event_id = event_id_input
//   GROUP BY c.id, c.name
//   ORDER BY vote_count DESC;
// END;
// $$ LANGUAGE plpgsql;


const eventFields: Field[] = [
    { name: 'title', label: 'Judul Acara', type: 'text', required: true },
    { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 3 },
    { name: 'start_time', label: 'Waktu Mulai', type: 'datetime-local', required: true },
    { name: 'end_time', label: 'Waktu Selesai', type: 'datetime-local', required: true },
    // is_active is handled separately
];

const candidateFields: Field[] = [
    { name: 'name', label: 'Nama Kandidat', type: 'text', required: true },
    { name: 'image_url', label: 'URL Foto', type: 'url' },
    { name: 'vision', label: 'Visi', type: 'textarea', rows: 2 },
    { name: 'mission', label: 'Misi', type: 'textarea', rows: 4 },
];

const ManageEVoting: React.FC = () => {
    const { addToast, addItem, updateItem, deleteItem, fetchEVotingEvents, fetchCandidatesForEvent, generateTokens, getVoteResults } = useData();
    const [events, setEvents] = useState<EVotingEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<EVotingEvent | null>(null);

    const [managingCandidatesEvent, setManagingCandidatesEvent] = useState<EVotingEvent | null>(null);
    const [candidates, setCandidates] = useState<EVotingCandidate[]>([]);
    const [editingCandidate, setEditingCandidate] = useState<EVotingCandidate | null>(null);
    
    const [deletingId, setDeletingId] = useState<{type: 'event' | 'candidate', id: number} | null>(null);
    
    const [tokenGenEvent, setTokenGenEvent] = useState<EVotingEvent | null>(null);
    const [tokenCount, setTokenCount] = useState(10);
    const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);
    
    const [resultsEvent, setResultsEvent] = useState<EVotingEvent | null>(null);
    const [voteResults, setVoteResults] = useState<Array<{candidate_id: number; vote_count: number; name: string;}>>([]);


    const loadEvents = async () => {
        setIsLoading(true);
        const data = await fetchEVotingEvents();
        setEvents(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleOpenEventModal = (event: EVotingEvent | null = null) => {
        setEditingEvent(event);
        setIsEventModalOpen(true);
    };

    const handleEventSubmit = async (formData: any) => {
        try {
            if (editingEvent) {
                await updateItem('evoting_events', editingEvent.id, formData);
                addToast('Acara berhasil diperbarui', 'success');
            } else {
                await addItem('evoting_events', formData);
                addToast('Acara berhasil dibuat', 'success');
            }
            setIsEventModalOpen(false);
            setEditingEvent(null);
            loadEvents();
        } catch (e) { console.error(e); }
    };
    
    const handleToggleActive = async (event: EVotingEvent) => {
        try {
            // Deactivate all other events first if we are activating a new one.
            if (!event.is_active) {
                const updates = events.filter(e => e.is_active).map(e => updateItem('evoting_events', e.id, { is_active: false }));
                await Promise.all(updates);
            }
            // Toggle the selected one
            await updateItem('evoting_events', event.id, { is_active: !event.is_active });

            addToast(`Status acara "${event.title}" diperbarui.`, 'info');
            loadEvents();
        } catch (e) { console.error(e) }
    };
    
    const handleDelete = async () => {
        if(!deletingId) return;
        try {
            if (deletingId.type === 'event') {
                await deleteItem('evoting_events', deletingId.id);
                addToast('Acara berhasil dihapus', 'success');
                loadEvents();
            } else if (deletingId.type === 'candidate' && managingCandidatesEvent) {
                await deleteItem('evoting_candidates', deletingId.id);
                addToast('Kandidat berhasil dihapus', 'success');
                handleManageCandidates(managingCandidatesEvent); // Refresh
            }
        } catch (e) { console.error(e) }
        setDeletingId(null);
    };
    
    const handleManageCandidates = async (event: EVotingEvent) => {
        setManagingCandidatesEvent(event);
        const data = await fetchCandidatesForEvent(event.id);
        setCandidates(data);
    };

    const handleCandidateSubmit = async (formData: any) => {
        if (!managingCandidatesEvent) return;
        try {
            if (editingCandidate) {
                await updateItem('evoting_candidates', editingCandidate.id, formData);
                addToast('Kandidat diperbarui', 'success');
            } else {
                await addItem('evoting_candidates', { ...formData, event_id: managingCandidatesEvent.id });
                addToast('Kandidat ditambahkan', 'success');
            }
            handleManageCandidates(managingCandidatesEvent); // Refresh
            setEditingCandidate(null);
        } catch(e) { console.error(e) }
    };
    
    const handleGenerateTokens = async () => {
        if (!tokenGenEvent || tokenCount <= 0) return;
        const tokens = await generateTokens(tokenGenEvent.id, tokenCount);
        setGeneratedTokens(tokens);
    };
    
    const handleViewResults = async (event: EVotingEvent) => {
        const results = await getVoteResults(event.id);
        setVoteResults(results);
        setResultsEvent(event);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Kelola E-Voting</h1>
                <button onClick={() => handleOpenEventModal()} className="bg-brand-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-brand-blue-700">+ Buat Acara Baru</button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Judul Acara</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                           {isLoading ? (
                                <tr><td colSpan={3} className="text-center p-6 text-gray-500">Memuat acara...</td></tr>
                            ) : events.map(event => (
                                <tr key={event.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => handleToggleActive(event)}
                                            className={`px-3 py-1 text-xs font-semibold rounded-full ${event.is_active ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                            title={event.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                        >
                                            {event.is_active ? 'Aktif' : 'Tidak Aktif'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                                        <button onClick={() => handleManageCandidates(event)} className="font-medium text-sm text-purple-600 hover:underline">Kandidat</button>
                                        <button onClick={() => setTokenGenEvent(event)} className="font-medium text-sm text-yellow-600 hover:underline">Token</button>
                                        <button onClick={() => handleViewResults(event)} className="font-medium text-sm text-green-600 hover:underline">Hasil</button>
                                        <button onClick={() => handleOpenEventModal(event)} className="font-medium text-sm text-brand-blue-600 hover:underline">Edit</button>
                                        <button onClick={() => setDeletingId({type: 'event', id: event.id})} className="font-medium text-sm text-red-600 hover:underline">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title={editingEvent ? 'Edit Acara' : 'Buat Acara Baru'}>
                <GenericForm
                    fields={eventFields}
                    initialData={editingEvent}
                    onSubmit={handleEventSubmit}
                    onCancel={() => setIsEventModalOpen(false)}
                />
            </Modal>
            
            {managingCandidatesEvent && (
                <Modal isOpen={!!managingCandidatesEvent} onClose={() => {setManagingCandidatesEvent(null); setEditingCandidate(null);}} title={`Kelola Kandidat: ${managingCandidatesEvent.title}`}>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold mb-4">{editingCandidate ? 'Edit Kandidat' : 'Tambah Kandidat Baru'}</h3>
                            <GenericForm
                                key={editingCandidate ? editingCandidate.id : 'new'} // Re-mount form on change
                                fields={candidateFields}
                                initialData={editingCandidate}
                                onSubmit={handleCandidateSubmit}
                                onCancel={() => setEditingCandidate(null)}
                            />
                        </div>
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-bold mb-4">Daftar Kandidat</h3>
                            <ul className="space-y-2 max-h-60 overflow-y-auto">
                                {candidates.map(candidate => (
                                    <li key={candidate.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                        <span>{candidate.name}</span>
                                        <div className="space-x-2">
                                            <button onClick={() => setEditingCandidate(candidate)} className="font-medium text-sm text-brand-blue-600 hover:underline">Edit</button>
                                            <button onClick={() => setDeletingId({type: 'candidate', id: candidate.id})} className="font-medium text-sm text-red-600 hover:underline">Hapus</button>
                                        </div>
                                    </li>
                                ))}
                                {candidates.length === 0 && <p className="text-sm text-gray-500">Belum ada kandidat untuk acara ini.</p>}
                            </ul>
                        </div>
                    </div>
                </Modal>
            )}

            {tokenGenEvent && (
                <Modal isOpen={!!tokenGenEvent} onClose={() => {setTokenGenEvent(null); setGeneratedTokens([]); setTokenCount(10);}} title={`Generate Token: ${tokenGenEvent.title}`}>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <label htmlFor="tokenCount" className="text-sm font-medium">Jumlah Token:</label>
                            <input type="number" id="tokenCount" value={tokenCount} onChange={(e) => setTokenCount(Math.max(1, Number(e.target.value)))} className="w-24 px-3 py-2 border border-gray-300 rounded-md" min="1" />
                            <button onClick={handleGenerateTokens} className="bg-brand-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-brand-blue-700">Generate</button>
                        </div>
                        {generatedTokens.length > 0 && (
                            <div>
                                <h4 className="font-semibold mb-2">Token yang Dihasilkan ({generatedTokens.length}):</h4>
                                <textarea readOnly value={generatedTokens.join('\n')} rows={10} className="w-full p-2 border rounded-md font-mono text-xs bg-gray-100 focus:outline-none" />
                                <button onClick={() => { navigator.clipboard.writeText(generatedTokens.join('\n')); addToast('Token disalin ke clipboard!', 'success'); }} className="mt-2 text-sm font-semibold text-brand-blue-600 hover:underline">Salin ke Clipboard</button>
                            </div>
                        )}
                    </div>
                </Modal>
            )}

            {resultsEvent && (
                <Modal isOpen={!!resultsEvent} onClose={() => setResultsEvent(null)} title={`Hasil Voting: ${resultsEvent.title}`}>
                    <div>
                        <ul className="space-y-4">
                            {voteResults.map(result => (
                                <li key={result.candidate_id}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-gray-800">{result.name}</span>
                                        <span className="text-sm font-semibold text-gray-600">{result.vote_count} Suara</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-brand-blue-600 h-4 rounded-full transition-all duration-500" style={{ width: `${(result.vote_count / (voteResults.reduce((acc, r) => acc + r.vote_count, 0) || 1)) * 100}%` }}></div>
                                    </div>
                                </li>
                            ))}
                             {voteResults.reduce((acc, r) => acc + r.vote_count, 0) === 0 && <p className="text-sm text-gray-500 text-center py-4">Belum ada suara yang masuk.</p>}
                        </ul>
                        <p className="text-right text-sm font-bold mt-4 text-gray-700">Total Suara: {voteResults.reduce((acc, r) => acc + r.vote_count, 0)}</p>
                    </div>
                </Modal>
            )}

            <ConfirmModal
                isOpen={!!deletingId}
                onClose={() => setDeletingId(null)}
                onConfirm={handleDelete}
                title={`Hapus ${deletingId?.type === 'event' ? 'Acara' : 'Kandidat'}`}
                message="Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan."
            />
        </div>
    );
};

export default ManageEVoting;
