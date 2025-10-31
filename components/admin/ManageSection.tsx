import React, { useState, useEffect } from 'react';
import { useData, TableName } from '../../context/DataContext.tsx';
import { AdminSection, EventRegistration } from '../../types.ts';
import GenericForm, { Field } from './forms/GenericForm.tsx';
import ConfirmModal from '../ui/ConfirmModal.tsx';
import Modal from '../ui/Modal.tsx';

const sectionConfig: Record<string, { title: string; fields: Field[]; dataKey: TableName | 'saran' }> = {
    announcements: {
        title: 'Pengumuman',
        dataKey: 'announcements',
        fields: [
            { name: 'title', label: 'Judul', type: 'text', required: true },
            { name: 'category', label: 'Kategori', type: 'text', required: true },
            { name: 'date', label: 'Tanggal', type: 'text', required: true, },
        ],
    },
    events: {
        title: 'Agenda',
        dataKey: 'events',
        fields: [
            { name: 'title', label: 'Nama Acara', type: 'text', required: true },
            { name: 'date', label: 'Tanggal & Waktu', type: 'datetime-local', required: true },
            { name: 'time', label: 'Waktu (display)', type: 'text', required: true },
            { name: 'location', label: 'Lokasi', type: 'text', required: true },
            { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 3 },
            { name: 'is_registration_open', label: 'Buka Pendaftaran', type: 'checkbox' },
            { name: 'is_live', label: 'Sedang Live', type: 'checkbox' },
            { name: 'live_stream_url', label: 'URL Live Stream (Embed)', type: 'url' },
        ]
    },
    articles: {
        title: 'Artikel',
        dataKey: 'articles',
        fields: [
            { name: 'title', label: 'Judul', type: 'text', required: true },
            { name: 'author', label: 'Penulis', type: 'text', required: true },
            { name: 'date', label: 'Tanggal', type: 'text', required: true },
            { name: 'image', label: 'URL Gambar', type: 'url', required: true },
            { name: 'excerpt', label: 'Kutipan', type: 'textarea', rows: 4, required: true },
            { name: 'content', label: 'Konten Lengkap (Markdown)', type: 'textarea', rows: 10, required: true },
        ]
    },
    achievements: {
        title: 'Prestasi',
        dataKey: 'achievements',
        fields: [
            { name: 'student', label: 'Nama Siswa/Tim', type: 'text', required: true },
            { name: 'competition', label: 'Kompetisi', type: 'text', required: true },
            { name: 'level', label: 'Tingkat', type: 'text', required: true },
            { name: 'image', label: 'URL Foto', type: 'url', required: true },
        ]
    },
    gallery: {
        title: 'Galeri',
        dataKey: 'gallery',
        fields: [
            { name: 'src', label: 'URL Gambar', type: 'url', required: true },
            { name: 'alt', label: 'Teks Alternatif', type: 'text', required: true },
        ]
    },
    testimonials: {
        title: 'Testimoni',
        dataKey: 'testimonials',
        fields: [
            { name: 'name', label: 'Nama', type: 'text', required: true },
            { name: 'role', label: 'Peran (e.g. Alumni, Orang Tua)', type: 'text', required: true },
            { name: 'quote', label: 'Kutipan', type: 'textarea', rows: 4, required: true },
            { name: 'avatar', label: 'URL Avatar', type: 'url', required: true },
        ]
    },
    osisTeam: {
        title: 'Tim OSIS',
        dataKey: 'osisTeam',
        fields: [
            { name: 'name', label: 'Nama', type: 'text', required: true },
            { name: 'position', label: 'Jabatan', type: 'text', required: true },
            { name: 'image', label: 'URL Foto', type: 'url', required: true },
            { name: 'quote', label: 'Kutipan', type: 'text' },
        ]
    },
    stats: {
        title: 'Statistik',
        dataKey: 'stats',
        fields: [
            { name: 'label', label: 'Label', type: 'text', required: true },
            { name: 'value', label: 'Nilai', type: 'number', required: true },
            { name: 'suffix', label: 'Suffix (e.g., +)', type: 'text' },
            { name: 'icon', label: 'Ikon (SVG string)', type: 'textarea', rows: 3 },
        ]
    },
    documents: {
        title: 'Dokumen Publik',
        dataKey: 'documents',
        fields: [
            { name: 'title', label: 'Judul Dokumen', type: 'text', required: true },
            { name: 'description', label: 'Deskripsi Singkat', type: 'textarea', rows: 2 },
            { name: 'file_url', label: 'URL Dokumen (PDF, etc)', type: 'url', required: true },
            { name: 'category', label: 'Kategori', type: 'text' },
        ]
    },
    financials: {
        title: 'Keuangan',
        dataKey: 'financials',
        fields: [
            { name: 'category', label: 'Kategori', type: 'text', required: true },
            { name: 'amount', label: 'Jumlah (Rp)', type: 'number', required: true },
            { name: 'type', label: 'Tipe', type: 'select', options: ['income', 'expense'], required: true },
            { name: 'period', label: 'Periode (e.g. 2023/2024)', type: 'text', required: true },
        ]
    },
     saran: {
        title: 'Kotak Saran',
        dataKey: 'saran',
        fields: [] // Readonly
    }
};

const ManageSection: React.FC<{ section: AdminSection }> = ({ section }) => {
    const config = sectionConfig[section];
    if (!config) return <div>Konfigurasi untuk seksi '{section}' tidak ditemukan.</div>;

    const { addItem, updateItem, deleteItem, addToast, getRegistrationsForEvent, ...dataContext } = useData();
    const items = (dataContext as any)[config.dataKey] as any[];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
    
    const [registrants, setRegistrants] = useState<EventRegistration[]>([]);
    const [viewingRegistrantsEvent, setViewingRegistrantsEvent] = useState<any | null>(null);

    const handleOpenModal = (item: any | null = null) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = async (formData: any) => {
        try {
            if (editingItem) {
                await updateItem(config.dataKey as TableName, editingItem.id, formData);
                addToast(`${config.title} berhasil diperbarui!`, 'success');
            } else {
                await addItem(config.dataKey as TableName, formData);
                addToast(`${config.title} baru berhasil ditambahkan!`, 'success');
            }
            handleCloseModal();
        } catch (error) {
            console.error("Submit failed:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteItem(config.dataKey as TableName, id);
            addToast(`${config.title} berhasil dihapus!`, 'success');
            setDeletingItemId(null);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };
    
    const handleViewRegistrants = async (event: any) => {
        const data = await getRegistrationsForEvent(event.id);
        setRegistrants(data);
        setViewingRegistrantsEvent(event);
    };

    if (section === 'saran') {
      return (
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Kelola {config.title}</h1>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {items.length === 0 ? <p>Belum ada saran yang masuk.</p> : (
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.id} className="border p-4 rounded-md bg-gray-50">
                    <p className="font-semibold">{item.suggestion}</p>
                    <p className="text-sm text-gray-500 mt-2">Dari: {item.name} ({item.class}) pada {new Date(item.created_at).toLocaleString('id-ID')}</p>
                    <button onClick={() => setDeletingItemId(item.id)} className="text-red-500 text-xs mt-2 hover:underline">Hapus</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ConfirmModal
              isOpen={deletingItemId !== null}
              onClose={() => setDeletingItemId(null)}
              onConfirm={() => handleDelete(deletingItemId!)}
              title="Konfirmasi Hapus"
              message="Apakah Anda yakin ingin menghapus saran ini? Tindakan ini tidak dapat dibatalkan."
          />
        </div>
      );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Kelola {config.title}</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-brand-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-brand-blue-700"
                >
                    + Tambah Baru
                </button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                {config.fields.slice(0, 4).map(field => <th key={field.name} scope="col" className="px-6 py-3">{field.label}</th>)}
                                <th scope="col" className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items && items.map(item => (
                                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                    {config.fields.slice(0, 4).map(field => (
                                        <td key={field.name} className="px-6 py-4">
                                            {field.type === 'checkbox' ? (item[field.name] ? 'Ya' : 'Tidak') : String(item[field.name]).substring(0, 50) + (String(item[field.name]).length > 50 ? '...' : '')}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                                        {section === 'events' && <button onClick={() => handleViewRegistrants(item)} className="font-medium text-purple-600 hover:underline">Pendaftar</button>}
                                        <button onClick={() => handleOpenModal(item)} className="font-medium text-brand-blue-600 hover:underline">Edit</button>
                                        <button onClick={() => setDeletingItemId(item.id)} className="font-medium text-red-600 hover:underline">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingItem ? `Edit ${config.title}` : `Tambah ${config.title} Baru`}>
                <GenericForm
                    fields={config.fields}
                    initialData={editingItem}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                />
            </Modal>

            <ConfirmModal
                isOpen={deletingItemId !== null}
                onClose={() => setDeletingItemId(null)}
                onConfirm={() => handleDelete(deletingItemId!)}
                title={`Hapus ${config.title}`}
                message={`Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.`}
            />

            {viewingRegistrantsEvent && (
                <Modal isOpen={!!viewingRegistrantsEvent} onClose={() => setViewingRegistrantsEvent(null)} title={`Pendaftar: ${viewingRegistrantsEvent.title}`}>
                    {registrants.length > 0 ? (
                        <ul className="space-y-2 max-h-80 overflow-y-auto">
                            {registrants.map(reg => (
                                <li key={reg.id} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                                    <span className="font-semibold text-gray-800 dark:text-white">{reg.name}</span> - <span className="text-sm text-gray-600 dark:text-gray-300">{reg.class}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center">Belum ada pendaftar untuk acara ini.</p>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default ManageSection;