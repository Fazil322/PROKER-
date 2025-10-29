import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AdminSection } from '../../types';
import Modal from '../ui/Modal';
import GenericForm, { Field } from './forms/GenericForm';

const sectionConfig: Record<AdminSection, { title: string; fields: Field[]; itemFactory: (values: any) => any, dataKey: keyof Omit<ReturnType<typeof useData>, 'isLoggedIn' | 'login' | 'logout' | 'toasts' | 'addToast' | 'activeAdminSection' | 'setActiveAdminSection' | 'galleryImages' | 'setGalleryImages' | 'heroData' | 'setHeroData'>, singular: string }> = {
    dashboard: {} as any, // Should not be managed here
    hero: {} as any, // Special case
    announcements: {
        title: "Kelola Pengumuman",
        singular: "Pengumuman",
        dataKey: 'announcements',
        fields: [
            { name: 'title', label: 'Judul', type: 'text', required: true },
            { name: 'date', label: 'Tanggal', type: 'text', required: true },
            { name: 'category', label: 'Kategori', type: 'text', required: true },
        ],
        itemFactory: (values: any) => ({ ...values, id: Date.now() }),
    },
    events: {
        title: "Kelola Agenda",
        singular: "Agenda",
        dataKey: 'events',
        fields: [
            { name: 'title', label: 'Judul Acara', type: 'text', required: true },
            { name: 'description', label: 'Deskripsi', type: 'textarea', required: true },
            { name: 'date', label: 'Tanggal & Waktu (YYYY-MM-DDTHH:MM:SS)', type: 'text', required: true },
            { name: 'image', label: 'URL Gambar', type: 'url', required: true },
        ],
        itemFactory: (values: any) => ({ ...values, id: Date.now() }),
    },
    articles: {
        title: "Kelola Artikel",
        singular: "Artikel",
        dataKey: 'articles',
        fields: [
            { name: 'title', label: 'Judul', type: 'text', required: true },
            { name: 'category', label: 'Kategori', type: 'text', required: true },
            { name: 'excerpt', label: 'Kutipan', type: 'textarea', required: true },
            { name: 'image', label: 'URL Gambar', type: 'url', required: true },
        ],
        itemFactory: (values: any) => ({ ...values, id: Date.now() }),
    },
    achievements: {
        title: "Kelola Prestasi",
        singular: "Prestasi",
        dataKey: 'achievements',
        fields: [
            { name: 'student', label: 'Nama Siswa/Tim', type: 'text', required: true },
            { name: 'competition', label: 'Nama Kompetisi', type: 'text', required: true },
            { name: 'level', label: 'Tingkat', type: 'text', required: true },
            { name: 'image', label: 'URL Gambar', type: 'url', required: true },
        ],
        itemFactory: (values: any) => ({ ...values, id: Date.now() }),
    },
    testimonials: {
        title: "Kelola Testimoni",
        singular: "Testimoni",
        dataKey: 'testimonials',
        fields: [
            { name: 'name', label: 'Nama', type: 'text', required: true },
            { name: 'role', label: 'Peran (e.g. Siswa Kelas XII)', type: 'text', required: true },
            { name: 'quote', label: 'Kutipan', type: 'textarea', required: true },
            { name: 'avatar', label: 'URL Avatar', type: 'url', required: true },
        ],
        itemFactory: (values: any) => ({ ...values, id: Date.now() }),
    },
    stats: {
        title: "Kelola Statistik",
        singular: "Statistik",
        dataKey: 'stats',
        fields: [
            { name: 'label', label: 'Label', type: 'text', required: true },
            { name: 'value', label: 'Nilai', type: 'number', required: true },
            { name: 'suffix', label: 'Suffix (e.g., +)', type: 'text', required: false },
        ],
        itemFactory: (values: any) => ({ ...values, id: Date.now() }),
    },
    gallery: {} as any, // Special case
};

// FIX: Define a props interface and use React.FC to correctly type the component,
// ensuring TypeScript's JSX transform recognizes `key` as a special prop and doesn't type-check it against ItemCard's props.
interface ItemCardProps {
    item: any;
    onEdit: () => void;
    onDelete: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => (
    <div className="bg-white p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row justify-between sm:items-center">
        <div className="mb-4 sm:mb-0">
            <div className="flex items-center space-x-4">
                {(item.image || item.avatar) && (
                    <img src={item.image || item.avatar} alt={item.title || item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                )}
                <div>
                    <p className="font-bold text-lg text-gray-800">{item.title || item.student || item.name || item.label}</p>
                    <p className="text-sm text-gray-500">{item.category || item.competition || item.role || (item.value !== undefined ? `Value: ${item.value}${item.suffix || ''}` : '')}</p>
                </div>
            </div>
        </div>
        <div className="flex-shrink-0 flex space-x-2">
            <button onClick={onEdit} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md text-sm">Edit</button>
            <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm">Hapus</button>
        </div>
    </div>
);


const ManageSection: React.FC<{ section: AdminSection }> = ({ section }) => {
    const { addToast, ...data } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null);

    if (section === 'dashboard') return null;
    
    // Handle special sections
    if (section === 'hero') {
        const { heroData, setHeroData } = data;
        const handleSubmit = (formData: any) => {
            setHeroData(formData);
            addToast('Hero section updated successfully!', 'success');
            setIsModalOpen(false);
        };
        return (
            <div>
                 <h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Hero Section</h1>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    {Object.entries(heroData).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-2 border-b">
                            <p><span className="font-semibold capitalize">{key}: </span>{value}</p>
                        </div>
                    ))}
                    <button onClick={() => { setEditingItem(heroData); setIsModalOpen(true); }} className="mt-4 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-2 px-4 rounded">Edit Hero Section</button>
                 </div>
                 <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Hero Section">
                     <GenericForm
                        fields={[
                            { name: 'title', label: 'Judul', type: 'text', required: true },
                            { name: 'subtitle', label: 'Subjudul', type: 'textarea', required: true },
                            { name: 'cta1', label: 'Tombol Aksi 1', type: 'text', required: true },
                            { name: 'cta2', label: 'Tombol Aksi 2', type: 'text', required: true },
                        ]}
                        initialData={editingItem}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsModalOpen(false)}
                     />
                 </Modal>
            </div>
        );
    }
    
    if (section === 'gallery') {
        const { galleryImages, setGalleryImages } = data;
        const handleAdd = () => {
            const newImage = prompt("Masukkan URL gambar baru:", "https://picsum.photos/seed/newgallery/600/600");
            if (newImage) {
                setGalleryImages(prev => [...prev, newImage]);
                addToast('Gambar berhasil ditambahkan!', 'success');
            }
        };
        const handleEdit = (index: number) => {
            const newImage = prompt("Edit URL gambar:", galleryImages[index]);
            if (newImage) {
                setGalleryImages(prev => prev.map((img, i) => i === index ? newImage : img));
                addToast('Gambar berhasil diperbarui!', 'success');
            }
        };
        const handleDelete = (index: number) => {
            if (window.confirm("Yakin ingin menghapus gambar ini?")) {
                setGalleryImages(prev => prev.filter((_, i) => i !== index));
                addToast('Gambar berhasil dihapus!', 'success');
            }
        };
        return (
             <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Kelola Galeri</h1>
                    <button onClick={handleAdd} className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-2 px-4 rounded">Tambah Gambar</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {galleryImages.map((img, index) => (
                        <div key={index} className="relative group aspect-square">
                            <img src={img} className="w-full h-full object-cover rounded-md" alt={`Gallery ${index}`}/>
                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2 transition-opacity rounded-md">
                                <button onClick={() => handleEdit(index)} className="w-10 h-10 bg-yellow-400 text-white rounded-full flex items-center justify-center hover:bg-yellow-500">✏️</button>
                                <button onClick={() => handleDelete(index)} className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    // Generic section handling
    const config = sectionConfig[section];
    const items = data[config.dataKey as keyof typeof data] as any[];
    const setItems = data[`set${config.dataKey.charAt(0).toUpperCase() + config.dataKey.slice(1)}` as keyof typeof data] as React.Dispatch<React.SetStateAction<any[]>>;

    const handleOpenAddModal = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (item: any) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm(`Yakin ingin menghapus ${config.singular.toLowerCase()} ini?`)) {
            setItems(prevItems => prevItems.filter(item => item.id !== id));
            addToast(`${config.singular} berhasil dihapus!`, 'success');
        }
    };
    
    const handleSubmit = (formData: any) => {
        if (editingItem) { // Editing
            setItems(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
            addToast(`${config.singular} berhasil diperbarui!`, 'success');
        } else { // Adding
            const newItem = config.itemFactory(formData);
            setItems(prev => [...prev, newItem]);
            addToast(`${config.singular} baru berhasil ditambahkan!`, 'success');
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">{config.title}</h1>
                <button onClick={handleOpenAddModal} className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap">
                    Tambah {config.singular} Baru
                </button>
            </div>
            <div className="space-y-4">
                {items.length > 0 ? items.map((item: any) => (
                    <ItemCard 
                        key={item.id} 
                        item={item} 
                        onEdit={() => handleOpenEditModal(item)}
                        onDelete={() => handleDelete(item.id)}
                    />
                )) : (
                    <p className="text-gray-500 text-center py-8 bg-white rounded-lg shadow-sm">Belum ada data.</p>
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? `Edit ${config.singular}` : `Tambah ${config.singular} Baru`}
            >
                <GenericForm 
                    fields={config.fields}
                    initialData={editingItem}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default ManageSection;