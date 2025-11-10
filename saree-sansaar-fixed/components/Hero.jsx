import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';

const slides = [
  {
    imageUrl: 'https://picsum.photos/1600/900?random=1',
    title: 'Draped in Dreams, Woven with Tradition',
    subtitle: 'Discover a timeless collection of handcrafted sarees that tell a story of heritage and artistry.',
    buttonText: 'Shop New Arrivals',
    link: '/new-arrivals',
  },
  {
    imageUrl: 'https://picsum.photos/1600/900?random=2',
    title: 'For the Modern Gentleman',
    subtitle: 'Explore our regal collection of Kurtas and Sherwanis, designed for distinction.',
    buttonText: "Shop Men's Wear",
    link: '/men',
  },
  {
    imageUrl: 'https://picsum.photos/1600/900?random=3',
    title: 'Elegance Redefined',
    subtitle: 'Our latest collection for women combines contemporary styles with classic elegance.',
    buttonText: "Shop Women's Wear",
    link: '/women',
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <div className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden bg-secondary">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={currentIndex !== index}
          >
            <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
            <Container className="relative h-full flex items-center justify-center lg:justify-start">
              <div className={`max-w-xl text-center lg:text-left transition-all duration-1000 transform ${currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-200">
                  {slide.subtitle}
                </p>
                <div className="mt-10">
                  <Link
                    to={slide.link}
                    className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark transition-transform transform hover:scale-105"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </Container>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-2 bg-white/30 rounded-full hover:bg-white/50 transition-colors"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-2 bg-white/30 rounded-full hover:bg-white/50 transition-colors"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-primary' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;