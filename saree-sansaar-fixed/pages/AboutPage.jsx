import React from 'react';
import Container from '../components/Container';

const AboutPage = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-bold text-primary sm:text-5xl">Our Story</h1>
          <p className="mt-6 text-lg text-text-secondary">
            Saree Sansaar was born from a passion for preserving the rich textile heritage of India. We travel across the country to bring you authentic, handcrafted pieces that celebrate the skill of our master weavers.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://source.unsplash.com/600x400/?weaver,dress" alt="Weaver at work" className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold text-text-primary">Our Mission</h2>
            <p className="mt-4 text-text-secondary">
              Our mission is to bridge the gap between artisans and connoisseurs of fine ethnic wear. We are committed to fair trade practices, ensuring that every purchase supports the artisan communities and helps keep these timeless traditions alive. We believe that every saree is not just a piece of clothing, but a work of art with a soul.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;