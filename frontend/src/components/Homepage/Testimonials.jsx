import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    text: "I can't imagine my workflow without NumberATM. It's a must-have tool!",
    author: "Michael T.",
    rating: 5,
  },
  {
    text: "NumberATM has significantly boosted my productivity! Highly recommended.",
    author: "Sarah L.",
    rating: 5,
  },
  {
    text: "A simple yet powerful tool that I use every day. Love it!",
    author: "John D.",
    rating: 4,
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-white py-10 px-5">
      <div className="bg-gray-100 shadow-lg py-10 px-8 text-center border border-blue-500 rounded-lg mx-4 transition-opacity duration-500">
        <p className="text-xl italic text-gray-700">&ldquo;{currentTestimonial.text}&rdquo;</p>
        <p className="mt-5 text-lg font-semibold text-gray-900">- {currentTestimonial.author}</p>
        <div className="mt-4 text-yellow-500">
          {Array.from({ length: currentTestimonial.rating }, (_, i) => (
            <span key={i} className="text-2xl">&#9733;</span>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        {testimonials.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 mx-1 rounded-full cursor-pointer transition-colors duration-300 ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
