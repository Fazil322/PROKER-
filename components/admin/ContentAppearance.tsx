import React, { useState, useRef, FormEvent } from 'react';
import { useData } from '../../context/DataContext';
import { NavLink } from '../../types';

const Card: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">{title}</h2>
        {children}
    </div>
);

const NavLinkEditor: React.FC<{
    links: NavLink[];
    onLinksChange: (newLinks: NavLink[]) => void;
}> = ({ links, onLinksChange }) => {
    
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const handleLinkChange = (index: number, field: 'name' | 'href', value: string) => {
        const newLinks = [...links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        onLinksChange(newLinks);
    };

    const addLink = () => {
        onLinksChange([...links, { id: Date.now(), name: '', href: '' }]);
    };

    const removeLink = (id: number) => {
        onLinksChange(links.filter(link => link.id !== id));
    };

    const handleDragSort = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;
        const linksCopy = [...links];
        const draggedItemContent = linksCopy.splice(dragItem.current, 1)[0];
        linksCopy.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        onLinksChange(linksCopy);
    };

    return (
        <div className="space-y-4">
            {links.map((link, index) => (
                <div 
                    key={link.id} 
                    className="flex items-center space-x-2 p-2 border rounded-md bg-gray-50"
                    draggable
                    onDragStart={() => dragItem.current = index}
                    onDragEnter={() => dragOverItem.current = index}
                    onDragEnd={handleDragSort}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <span className="cursor-grab text-gray-400 hover:text-gray-600" title="Drag to reorder">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Nama Tautan"
                        value={link.name}
                        onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                    <input
                        type="text"
                        placeholder="URL (e.g., #home)"
                        value={link.href}
                        onChange={(e) => handleLinkChange(index, 'href', e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                    <button onClick={() => removeLink(link.id)} className="bg-red-500 text-white rounded-md p-2 h-9 w-9 flex-shrink-0 flex items-center justify-center hover:bg-red-600">
                        &times;
                    </button>
                </div>
            ))}
            <button onClick={addLink} type="button" className="text-sm font-semibold text-brand-blue-600 hover:text-brand-blue-800">
                + Tambah Tautan Baru
            </button>
        </div>
    );
};


const ContentAppearance: React.FC = () => {
    const { siteContent, setSiteContent, addToast } = useData();
    const [formData, setFormData] = useState(siteContent);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleNavLinksChange = (key: 'headerNavLinks' | 'footerNavLinks', newLinks: NavLink[]) => {
        setFormData(prev => ({...prev, [key]: newLinks}));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSiteContent(formData);
        addToast("Pengaturan Konten & Tampilan berhasil disimpan!", 'success');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Konten & Tampilan</h1>
                <button type="submit" className="bg-brand-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-brand-blue-700">
                    Simpan Perubahan
                </button>
            </div>
            <div className="space-y-8">
                 <Card title="Umum & Header">
                    <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Situs</label>
                            <input
                                type="text" name="siteName" value={formData.siteName} onChange={handleChange} required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">URL Gambar Latar Hero</label>
                            <input
                                type="url" name="heroBackgroundImage" value={formData.heroBackgroundImage} onChange={handleChange} required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                    </div>
                </Card>

                <Card title="Navigasi Header">
                    <NavLinkEditor links={formData.headerNavLinks} onLinksChange={(links) => handleNavLinksChange('headerNavLinks', links)} />
                </Card>
                
                <Card title="Seksi 'Tentang OSIS'">
                     <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Judul</label>
                            <input
                                type="text" name="aboutOsisTitle" value={formData.aboutOsisTitle} onChange={handleChange} required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                             <textarea
                                name="aboutOsisDescription" value={formData.aboutOsisDescription} onChange={handleChange} required rows={4}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                    </div>
                </Card>

                 <Card title="Seksi 'Generator Ide'">
                     <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Judul</label>
                            <input
                                type="text" name="ideaGeneratorTitle" value={formData.ideaGeneratorTitle} onChange={handleChange} required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                             <textarea
                                name="ideaGeneratorDescription" value={formData.ideaGeneratorDescription} onChange={handleChange} required rows={3}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                    </div>
                </Card>

                <Card title="Footer">
                    <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Teks "Tentang"</label>
                             <textarea
                                name="footerAboutText" value={formData.footerAboutText} onChange={handleChange} required rows={3}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Alamat Kontak</label>
                            <input
                                type="text" name="contactAddress" value={formData.contactAddress} onChange={handleChange} required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">URL Google Maps Embed</label>
                            <input
                                type="url" name="googleMapsUrl" value={formData.googleMapsUrl} onChange={handleChange} required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Teks Copyright</label>
                            <input
                                type="text" name="footerCopyrightText" value={formData.footerCopyrightText} onChange={handleChange} required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Teks Kredit</label>
                            <input
                                type="text" name="footerCreditText" value={formData.footerCreditText} onChange={handleChange} required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                    </div>
                </Card>

                 <Card title="Navigasi Cepat Footer">
                    <NavLinkEditor links={formData.footerNavLinks} onLinksChange={(links) => handleNavLinksChange('footerNavLinks', links)} />
                </Card>

            </div>
        </form>
    );
};

export default ContentAppearance;