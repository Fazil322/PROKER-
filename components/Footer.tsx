import React from 'react';
import { useData } from '../context/DataContext';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} className="text-gray-400 hover:text-white transition-colors">
        {children}
    </a>
);

const Footer: React.FC = () => {
  const { setShowLogin } = useData();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">OSIS SMK LPPMRI 2 KEDUNGREJA</h3>
            <p className="text-gray-400 text-sm">
              Platform digital untuk informasi, aspirasi, dan kolaborasi siswa. Membangun generasi yang aktif, kreatif, dan berprestasi.
            </p>
            <div className="flex space-x-4 mt-4">
                <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.688.072 4.948.072s3.668-.014 4.948-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.688.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path></svg></SocialIcon>
                <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z"></path></svg></SocialIcon>
                <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.701V8.115l6.064 3.886-6.064 3.884z"></path></svg></SocialIcon>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-400 hover:text-white">Tentang Kami</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white">Program & Divisi</a></li>
              <li><a href="#achievements" className="text-gray-400 hover:text-white">Database Prestasi</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Kotak Saran Digital</a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start"><span className="w-5 h-5 mr-2 mt-1"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></span>Jl. Raya Kedungreja No.1, Kedungreja, Cilacap, Jawa Tengah 53263</li>
              <li className="flex items-start"><span className="w-5 h-5 mr-2 mt-1"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></span>osis@smklppri2.sch.id</li>
            </ul>
          </div>
          {/* Map */}
          <div>
             <h3 className="text-lg font-semibold mb-4">Lokasi Sekolah</h3>
             <div className="rounded-lg overflow-hidden">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.57685608684!2d108.8313360147764!3d-7.512015294580665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656c1d1aaaaaab%3A0xe54e1b80c102a0a2!2sSMK%20LPPMRI%202%20KEDUNGREJA!5e0!3m2!1sen!2sid!4v1672580000000" 
                    width="100%" 
                    height="150" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
             </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>&copy; {year} OSIS SMK LPPMRI 2 Kedungreja. All rights reserved.</p>
          <p>Didesain dan dikembangkan dengan ❤️ oleh Tim OSIS.</p>
          <div className="mt-2">
            <button onClick={() => setShowLogin(true)} className="hover:text-white transition-colors text-xs">
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;