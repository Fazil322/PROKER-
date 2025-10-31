import React from 'react';
import Header from '../components/Header.tsx';
import HeroSection from '../components/HeroSection.tsx';
import UpcomingEvents from '../components/UpcomingEvents.tsx';
import LatestNews from '../components/LatestNews.tsx';
import Achievements from '../components/Achievements.tsx';
import GalleryPreview from '../components/GalleryPreview.tsx';
import StatsCounter from '../components/StatsCounter.tsx';
import Testimonials from '../components/Testimonials.tsx';
import Footer from '../components/Footer.tsx';
import AboutOsis from '../components/AboutOsis.tsx';
import KotakSaran from '../components/KotakSaran.tsx';
import AdminControl from '../components/ui/AdminControl.tsx';
import BackToTopButton from '../components/BackToTopButton.tsx';
import ReadingProgressBar from '../components/ui/ReadingProgressBar.tsx';
import EVotingSection from '../components/EVotingSection.tsx';
import Announcements from '../components/Announcements.tsx';
import LiveStreamBanner from '../components/LiveStreamBanner.tsx';
import PublicDocuments from '../components/PublicDocuments.tsx';
import FinancialTransparency from '../components/FinancialTransparency.tsx';
import ProgramIdeaGenerator from '../components/ProgramIdeaGenerator.tsx';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <ReadingProgressBar />
      <Header />
      <main>
        <AdminControl section="content">
            <HeroSection />
        </AdminControl>
        
        <LiveStreamBanner />

        <div data-aos="fade-up">
            <AdminControl section="evoting">
                <EVotingSection />
            </AdminControl>
        </div>
        
        <div data-aos="fade-up" id="announcements-cards">
            <AdminControl section="announcements">
                <Announcements />
            </AdminControl>
        </div>

        <div data-aos="fade-up">
            <AdminControl section="events">
                <UpcomingEvents />
            </AdminControl>
        </div>
        
        <div data-aos="fade-up">
            <AdminControl section="financials">
                <FinancialTransparency />
            </AdminControl>
        </div>

        <div data-aos="fade-up">
            <AdminControl section="documents">
                <PublicDocuments />
            </AdminControl>
        </div>

        <div data-aos="fade-up">
            <AdminControl section="articles">
                <LatestNews />
            </AdminControl>
        </div>

        <div data-aos="fade-up">
            <AdminControl section="achievements">
                <Achievements />
            </AdminControl>
        </div>
        
        <div data-aos="fade-up">
            <AdminControl section="stats">
                <StatsCounter />
            </AdminControl>
        </div>

        <div data-aos="fade-up">
            <AdminControl section="gallery">
                <GalleryPreview />
            </AdminControl>
        </div>

        <div data-aos="fade-up">
           <AdminControl section="osisTeam">
             <AboutOsis />
           </AdminControl>
        </div>

        <div data-aos="fade-up">
            <AdminControl section="content">
                <ProgramIdeaGenerator />
            </AdminControl>
        </div>
        
        <div data-aos="fade-up">
            <AdminControl section="testimonials">
                <Testimonials />
            </AdminControl>
        </div>

        <div data-aos="fade-up">
            <AdminControl section="saran">
                <KotakSaran />
            </AdminControl>
        </div>
        
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default HomePage;