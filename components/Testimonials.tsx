import React, { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext.tsx';

const Testimonials: React.FC = () => {
  const { testimonials } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [isAnimating, testimonials.length]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
  }

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  useEffect(() => {
      if(isAnimating) {
          const timer = setTimeout(() => setIsAnimating(false), 500); // Corresponds to animation duration
          return () => clearTimeout(timer);
      }
  }, [isAnimating]);


  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Apa Kata Mereka?</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Kesan dan pesan dari keluarga besar SMK LPPMRI 2 Kedungreja.</p>
        </div>
        <div className="relative max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          <div className="relative h-64 sm:h-56">
             <div 
                key={currentIndex}
                className="w-full h-full px-4 absolute inset-0 animate-fade-slide-in"
             >
                <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col items-center text-center h-full">
                  <div className="absolute top-4 left-4 text-8xl text-gray-100 dark:text-gray-700 font-serif opacity-50 z-0">
                    &ldquo;
                  </div>
                  <div className="relative z-10">
                    <img
                      className="h-20 w-20 rounded-full object-cover mb-4"
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                    />
                    <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4 h-24">
                      {currentTestimonial.quote}
                    </blockquote>
                    <div className="font-semibold text-gray-900 dark:text-white">{currentTestimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{currentTestimonial.role}</div>
                  </div>
                </div>
              </div>
          </div>
          
          <button onClick={prevSlide} className="absolute top-1/2 -mt-8 left-0 sm:-left-8 transform -translate-y-1/2 bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-md z-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 -mt-8 right-0 sm:-right-8 transform -translate-y-1/2 bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-md z-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-brand-blue-600' : 'bg-gray-300 dark:bg-gray-600 hover:bg-brand-blue-300'}`}
                    aria-label={`Go to slide ${index + 1}`}
                ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;