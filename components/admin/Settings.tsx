

import React, { useState, FormEvent } from 'react';
import { useData } from '../../context/DataContext.tsx';

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">{title}</h2>
        {children}
    </div>
);

const Settings: React.FC = () => {
    const { siteSettings, setSiteSettings, updatePassword, addToast } = useData();

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [siteData, setSiteData] = useState(siteSettings);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSiteDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSiteData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            addToast('Kata sandi baru tidak cocok!', 'error');
            return;
        }
        if (passwordData.newPassword.length < 6) {
            addToast('Kata sandi baru minimal 6 karakter!', 'error');
            return;
        }
        const success = updatePassword(passwordData.currentPassword, passwordData.newPassword);
        if (success) {
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }
    };

    const handleSiteDataSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSiteSettings(siteData);
        addToast('Pengaturan situs berhasil disimpan!', 'success');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Pengaturan Situs</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Ubah Kata Sandi Admin">
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kata Sandi Saat Ini</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Kata Sandi Baru</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi Baru</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                        <div className="text-right">
                             <button type="submit" className="bg-brand-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-brand-blue-700">
                                Simpan Kata Sandi
                            </button>
                        </div>
                    </form>
                </Card>

                <Card title="Info Kontak & Sosial Media">
                    <form onSubmit={handleSiteDataSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Kontak</label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={siteData.contactEmail}
                                onChange={handleSiteDataChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">URL Instagram</label>
                            <input
                                type="url"
                                name="instagramUrl"
                                value={siteData.instagramUrl}
                                onChange={handleSiteDataChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">URL Facebook</label>
                            <input
                                type="url"
                                name="facebookUrl"
                                value={siteData.facebookUrl}
                                onChange={handleSiteDataChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">URL YouTube</label>
                            <input
                                type="url"
                                name="youtubeUrl"
                                value={siteData.youtubeUrl}
                                onChange={handleSiteDataChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500"
                            />
                        </div>
                        <div className="text-right">
                             <button type="submit" className="bg-brand-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-brand-blue-700">
                                Simpan Pengaturan
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Settings;