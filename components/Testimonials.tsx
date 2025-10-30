

import React from 'react';
import { useData } from '../context/DataContext.tsx';

const QuoteIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 32 32">
    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
  </svg>
);

const Testimonials: React.FC = () => {
  const { testimonials } = useData();
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-pink rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple rounded-full blur-3xl animate-pulse-slow animation-delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent">Apa Kata</span> Mereka?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Kesan dan pesan dari keluarga besar SMK LPPMRI 2 Kedungreja.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover-lift group border border-gray-100 dark:border-gray-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <QuoteIcon className="absolute top-4 left-4 w-8 h-8 text-brand-blue-100 dark:text-gray-700" />
              <div className="relative mb-4">
                <img
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-brand-blue-200 dark:ring-brand-blue-800 transition-transform duration-300 group-hover:scale-110"
                  src={testimonial.avatar}
                  alt={testimonial.name}
                />
                <div className="absolute -bottom-2 -right-2 bg-brand-blue-600 rounded-full p-2 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-gray-600 dark:text-gray-300 italic mb-6 text-base leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 w-full">
                <div className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</div>
                <div className="text-sm text-brand-blue-600 dark:text-brand-blue-400 font-medium">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;