
import React from 'react';
// FIX: Add .tsx extension to file import.
import { useData } from '../context/DataContext.tsx';

const Testimonials: React.FC = () => {
  const { testimonials } = useData();
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Apa Kata Mereka?</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Kesan dan pesan dari keluarga besar SMK LPPMRI 2 Kedungreja.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col items-center text-center">
              <img
                className="h-20 w-20 rounded-full object-cover mb-4"
                src={testimonial.avatar}
                alt={testimonial.name}
              />
              <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
