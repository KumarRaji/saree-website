import React from 'react';
import Hero from '../components/Hero';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

const featuredProducts = [
  { id: 1, name: 'Crimson Silk Saree', category: 'Women', price: 199.99, imageUrl: 'https://picsum.photos/400/500?random=10' },
  { id: 2, name: 'Royal Blue Kurta', category: 'Men', price: 89.99, imageUrl: 'https://picsum.photos/400/500?random=11' },
  { id: 3, name: 'Emerald Green Anarkali', category: 'Women', price: 249.99, imageUrl: 'https://picsum.photos/400/500?random=12' },
  { id: 4, name: 'Golden Weave Sherwani', category: 'Men', price: 349.99, imageUrl: 'https://picsum.photos/400/500?random=13' },
];

const HomePage = () => {
  return (
    <>
      <Hero />
      <Container className="py-16 sm:py-24">
        <h2 className="text-3xl font-bold font-serif text-center text-text-primary">Featured Collection</h2>
        <p className="mt-4 text-center text-text-secondary max-w-2xl mx-auto">Our handpicked selection of the finest traditional wear, blending classic designs with a modern touch.</p>
        <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default HomePage;