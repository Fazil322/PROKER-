import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Announcements from './components/Announcements';
import UpcomingEvents from './components/UpcomingEvents';
import LatestNews from './components/LatestNews';
import Achievements from './components/Achievements';
import GalleryPreview from './components/GalleryPreview';
import StatsCounter from './components/StatsCounter';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import { useData } from './context/DataContext';
import ToastContainer from './components/ui/ToastContainer';
import Login from './components/Login';
import AdminControl from './components/ui/AdminControl';
import AboutOsis from './components/AboutOsis';
import ProgramIdeaGenerator from './components/ProgramIdeaGenerator';

const PublicSite: React.FC = () => (
  <div className="bg-gray-50 text-gray-800 font-sans">
    <Header />
    <main>
      <AdminControl section="hero">
        <HeroSection />
      </AdminControl>
      <AdminControl section="about-osis">
        <AboutOsis />
      </AdminControl>
      <AdminControl section="announcements">
        <Announcements />
      </AdminControl>
      <AdminControl section="events">
        <UpcomingEvents />
      </AdminControl>
      <AdminControl section="articles">
        <LatestNews />
      </AdminControl>
      <AdminControl section="achievements">
        <Achievements />
      </AdminControl>
      <AdminControl section="stats">
        <StatsCounter />
      </AdminControl>
      <AdminControl section="gallery">
        <GalleryPreview />
      </AdminControl>
      <ProgramIdeaGenerator />
      <AdminControl section="testimonials">
        <Testimonials />
      </AdminControl>
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  const { isLoggedIn, showLogin } = useData();

  return (
    <>
      {isLoggedIn ? <AdminPanel /> : <PublicSite />}
      {showLogin && !isLoggedIn && <Login />}
      <ToastContainer />
    </>
  );
};

export default App;
