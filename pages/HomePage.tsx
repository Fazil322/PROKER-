import React from 'react';
import Header from '../components/Header.tsx';
import HeroSection from '../components/HeroSection.tsx';
import AnnouncementTicker from '../components/AnnouncementTicker.tsx';
import UpcomingEvents from '../components/UpcomingEvents.tsx';
import LatestNews from '../components/LatestNews.tsx';
import Achievements from '../components/Achievements.tsx';
import GalleryPreview from '../components/GalleryPreview.tsx';
import StatsCounter from '../components/StatsCounter.tsx';
import Testimonials from '../components/Testimonials.tsx';
import Footer from '../components/Footer.tsx';
import AboutOsis from '../components/AboutOsis.tsx';
import ProgramIdeaGenerator from '../components/ProgramIdeaGenerator.tsx';
import KotakSaran from '../components/KotakSaran.tsx';
import AdminControl from '../components/ui/AdminControl.tsx';
import AnimatedSection from '../components/ui/AnimatedSection.tsx';
import BackToTopButton from '../components/BackToTopButton.tsx';
import ReadingProgressBar from '../components/ui/ReadingProgressBar.tsx';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <ReadingProgressBar />
      <Header />
      <main>
        <AdminControl section="content">
            <HeroSection />
        </AdminControl>

        <AdminControl section="announcements">
            <AnnouncementTicker />
        </AdminControl>
        
        <AnimatedSection>
            <AdminControl section="events">
                <UpcomingEvents />
            </AdminControl>
        </AnimatedSection>

        <AnimatedSection>
            <AdminControl section="articles">
                <LatestNews />
            </AdminControl>
        </AnimatedSection>

        <AnimatedSection>
            <AdminControl section="achievements">
                <Achievements />
            </AdminControl>
        </AnimatedSection>
        
        <AnimatedSection>
            <AdminControl section="stats">
                <StatsCounter />
            </AdminControl>
        </AnimatedSection>

        <AnimatedSection>
            <AdminControl section="gallery">
                <GalleryPreview />
            </AdminControl>
        </AnimatedSection>

        <AnimatedSection>
           <AdminControl section="osisTeam">
             <AboutOsis />
           </AdminControl>
        </AnimatedSection>

        <AnimatedSection>
            <ProgramIdeaGenerator />
        </AnimatedSection>

        <AnimatedSection>
            <AdminControl section="testimonials">
                <Testimonials />
            </AdminControl>
        </AnimatedSection>

        <AnimatedSection>
            <AdminControl section="saran">
                <KotakSaran />
            </AdminControl>
        </AnimatedSection>
        
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default HomePage;