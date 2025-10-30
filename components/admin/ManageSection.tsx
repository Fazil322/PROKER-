import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { AdminSection, GalleryImage } from '../../types';
import Modal from '../ui/Modal';
import GenericForm, { Field } from './forms/GenericForm';
import ConfirmModal from '../ui/ConfirmModal';

const sectionConfig: Record<Exclude<AdminSection, 'dashboard' | 'settings' | 'content-appearance' | 'hero' | 'gallery'>, { title: string; fields: Field[]; itemFactory: (values: any) => any, dataKey: keyof Omit<ReturnType<typeof useData>, 'isLoggedIn' | 'login' | 'logout' | 'toasts' | 'addToast' | 'activeAdminSection' | 'setActiveAdminSection' | 'galleryImages' | 'setGalleryImages' | 'heroData' | 'setHeroData' | 'updatePassword' | 'siteSettings' | 'setSiteSettings' | 'showLogin' | 'setShowLogin' | 'siteContent' | 'setSiteContent'>, singular: string }> = {
    'about-osis': {
        title: "Kelola Tim OSIS",
        singular: "Anggota Tim",
        dataKey: 'osisTeam',
        fields: [
            { name: 'name', label: 'Nama', type: 'text', required: true },
            { name: 'position', label: 'Jabatan', type: 'text', required: true },
            { name: 'quote', label: 'Kutipan', type: 'textarea', required: true },
            { name: 'image', label: 'URL Foto', type: 'url', required: true },
        ],
        itemFactory: (values: any) => ({ ...values, id: Date.now() }),
    },
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
            { name: 'date', label: 'Tanggal & Waktu', type: 'datetime-local', required: true },
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
};

interface ItemCardProps {
    item: any;
    onEdit: () => void;
    onDelete: () => void;
    isDraggable?: boolean;
    draggableProps?: any;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete, isDraggable, draggableProps }) => (
    <div className="bg-white p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row justify-between sm:items-center" {...draggableProps}>
         <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            {isDraggable && (
                <div className="cursor-grab text-gray-400 hover:text-gray-600" title="Drag to reorder">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </div>
            )}
            {(item.image || item.avatar) && (
                <img src={item.image || item.avatar} alt={item.title || item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
            )}
            <div>
                <p className="font-bold text-lg text-gray-800">{item.title || item.student || item.name || item.label}</p>
                <p className="text-sm text-gray-500">{item.category || item.competition || item.role || item.position || (item.value !== undefined ? `Value: ${item.value}${item.suffix || ''}` : '')}</p>
            </div>
        </div>
        <div className="flex-shrink-0 flex space-x-2 self-end sm:self-center">
            <button onClick={onEdit} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md text-sm">Edit</button>
            <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm">Hapus</button>
        </div>
    </div>
);

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const ManageSection: React.FC<{ section: AdminSection }> = ({ section }) => {
    const { addToast, ...data } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [confirmModalState, setConfirmModalState] = useState<{ isOpen: boolean; onConfirm: (() => void) | null; title: string; message: string; }>({ isOpen: false, onConfirm: null, title: '', message: '' });
    const [galleryFormData, setGalleryFormData] = useState<Partial<GalleryImage>>({});

    // Drag and Drop State
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const openConfirmModal = (onConfirm: () => void, title: string, message: string) => {
        setConfirmModalState({ isOpen: true, onConfirm, title, message });
    };

    const closeConfirmModal = () => {
        setConfirmModalState({ isOpen: false, onConfirm: null, title: '', message: '' });
    };

    if (section === 'dashboard' || section === 'settings' || section === 'content-appearance') return null;
    
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
        
        const handleOpenGalleryModal = (image: GalleryImage | null) => {
            setEditingItem(image);
            setGalleryFormData(image || { alt: '', src: '' });
            setIsModalOpen(true);
        };

        const handleGalleryFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setGalleryFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const base64 = await fileToBase64(e.target.files[0]);
                setGalleryFormData(prev => ({ ...prev, src: base64 }));
            }
        };

        const handleGallerySubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!galleryFormData.src || !galleryFormData.alt) {
                addToast('URL Gambar dan Teks Alternatif harus diisi!', 'error');
                return;
            }

            if (editingItem) { // Edit
                setGalleryImages(prev => prev.map(img => img.id === editingItem.id ? { ...img, ...galleryFormData } : img));
                addToast('Gambar berhasil diperbarui!', 'success');
            } else { // Add
                setGalleryImages(prev => [...prev, { id: Date.now(), ...galleryFormData } as GalleryImage]);
                addToast('Gambar berhasil ditambahkan!', 'success');
            }
            setIsModalOpen(false);
        };

        const handleDeleteGalleryImage = (id: number) => {
            openConfirmModal(
                () => {
                    setGalleryImages(prev => prev.filter(img => img.id !== id));
                    addToast('Gambar berhasil dihapus!', 'success');
                    closeConfirmModal();
                },
                "Hapus Gambar",
                "Apakah Anda yakin ingin menghapus gambar ini dari galeri?"
            );
        };

        return (
             <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Kelola Galeri</h1>
                    <button onClick={() => handleOpenGalleryModal(null)} className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-2 px-4 rounded">Tambah Gambar</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {galleryImages.map((img) => (
                        <div key={img.id} className="relative group aspect-square">
                            <img src={img.src} className="w-full h-full object-cover rounded-md" alt={img.alt}/>
                             <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                {img.alt}
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2 transition-opacity rounded-md">
                                <button onClick={() => handleOpenGalleryModal(img)} className="w-10 h-10 bg-yellow-400 text-white rounded-full flex items-center justify-center hover:bg-yellow-500" aria-label="Edit">✏️</button>
                                <button onClick={() => handleDeleteGalleryImage(img.id)} className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600" aria-label="Delete">🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "Edit Gambar Galeri" : "Tambah Gambar Baru"}>
                    <form onSubmit={handleGallerySubmit} className="space-y-4">
                         {galleryFormData.src && <img src={galleryFormData.src} alt="Preview" className="w-full h-48 object-contain rounded-md bg-gray-100 mb-4" />}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Teks Alternatif (Alt Text)</label>
                             <input type="text" name="alt" value={galleryFormData.alt || ''} onChange={handleGalleryFormChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Gambar</label>
                             <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue-50 file:text-brand-blue-700 hover:file:bg-brand-blue-100"/>
                        </div>
                        <div className="text-center text-sm text-gray-500">atau</div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
                             <input type="url" name="src" value={galleryFormData.src || ''} onChange={handleGalleryFormChange} placeholder="https://example.com/image.jpg" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                        </div>
                         <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300">Batal</button>
                            <button type="submit" className="bg-brand-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-brand-blue-700">Simpan</button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
    
    // Generic section handling
    const config = sectionConfig[section as keyof typeof sectionConfig];
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
        openConfirmModal(
            () => {
                setItems(prevItems => prevItems.filter(item => item.id !== id));
                addToast(`${config.singular} berhasil dihapus!`, 'success');
                closeConfirmModal();
            },
            `Hapus ${config.singular}`,
            `Apakah Anda yakin ingin menghapus ${config.singular.toLowerCase()} ini? Tindakan ini tidak dapat diurungkan.`
        );
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

    const handleDragSort = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;
        const itemsCopy = [...items];
        const draggedItemContent = itemsCopy.splice(dragItem.current, 1)[0];
        itemsCopy.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setItems(itemsCopy);
        addToast("Urutan berhasil disimpan!", "success");
    };

    const isDraggable = section === 'about-osis';

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">{config.title}</h1>
                <button onClick={handleOpenAddModal} className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap">
                    Tambah {config.singular} Baru
                </button>
            </div>
             {isDraggable && <p className="text-sm text-gray-500 mb-4 italic">Drag dan drop untuk mengurutkan anggota tim.</p>}
            <div className="space-y-4">
                {items.length > 0 ? items.map((item: any, index: number) => (
                    <ItemCard 
                        key={item.id} 
                        item={item} 
                        onEdit={() => handleOpenEditModal(item)}
                        onDelete={() => handleDelete(item.id)}
                        isDraggable={isDraggable}
                        draggableProps={isDraggable ? {
                            draggable: true,
                            onDragStart: () => dragItem.current = index,
                            onDragEnter: () => dragOverItem.current = index,
                            onDragEnd: handleDragSort,
                            onDragOver: (e: React.DragEvent) => e.preventDefault(),
                        } : {}}
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
             <ConfirmModal
                isOpen={confirmModalState.isOpen}
                onClose={closeConfirmModal}
                onConfirm={confirmModalState.onConfirm!}
                title={confirmModalState.title}
                message={confirmModalState.message}
            />
        </div>
    );
};

export default ManageSection;