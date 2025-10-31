

import React, { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext.tsx';

const Testimonials: React.FC = () => {
  const { testimonials } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Apa Kata Mereka?</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Kesan dan pesan dari keluarga besar SMK LPPMRI 2 Kedungreja.</p>
        </div>
        <div className="relative max-w-3xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col items-center text-center">
                  <img
                    className="h-20 w-20 rounded-full object-cover mb-4"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4 h-24">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={prevSlide} className="absolute top-1/2 left-0 sm:-left-8 transform -translate-y-1/2 bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 right-0 sm:-right-8 transform -translate-y-1/2 bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          
          <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-brand-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
