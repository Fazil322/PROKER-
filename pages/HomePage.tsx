import React from 'react';
// FIX: Add .tsx extension to file import.
import Header from '../components/Header.tsx';
// FIX: Add .tsx extension to file import.
import HeroSection from '../components/HeroSection.tsx';
// FIX: Add .tsx extension to file import.
import Announcements from '../components/Announcements.tsx';
// FIX: Add .tsx extension to file import.
import UpcomingEvents from '../components/UpcomingEvents.tsx';
// FIX: Add .tsx extension to file import.
import LatestNews from '../components/LatestNews.tsx';
// FIX: Add .tsx extension to file import.
import Achievements from '../components/Achievements.tsx';
// FIX: Add .tsx extension to file import.
import GalleryPreview from '../components/GalleryPreview.tsx';
// FIX: Add .tsx extension to file import.
import StatsCounter from '../components/StatsCounter.tsx';
// FIX: Add .tsx extension to file import.
import Testimonials from '../components/Testimonials.tsx';
// FIX: Add .tsx extension to file import.
import Footer from '../components/Footer.tsx';
// FIX: Add .tsx extension to file import.
import AboutOsis from '../components/AboutOsis.tsx';
// FIX: Add .tsx extension to file import.
import ProgramIdeaGenerator from '../components/ProgramIdeaGenerator.tsx';
// FIX: Add .tsx extension to file import.
import KotakSaran from '../components/KotakSaran.tsx';
// FIX: Add .tsx extension to file import.
import AdminControl from '../components/ui/AdminControl.tsx';
// FIX: Add .tsx extension to file import.
import AnimatedSection from '../components/ui/AnimatedSection.tsx';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Header />
      <main>
        <AdminControl section="content">
            <HeroSection />
        </AdminControl>

        <AnimatedSection>
            <AdminControl section="announcements">
                <Announcements />
            </AdminControl>
        </AnimatedSection>
        
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
    </div>
  );
};

export default HomePage;