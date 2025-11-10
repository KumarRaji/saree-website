import React from 'react';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

const longDresses = [
  { id: 401, name: 'Regal Anarkali Gown', category: 'Long Dress', price: 259.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=401' },
  { id: 402, name: 'Bohemian Maxi Dress', category: 'Long Dress', price: 129.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=402' },
  { id: 403, name: 'Embellished Evening Gown', category: 'Long Dress', price: 349.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=403' },
];

const LongDressPage = () => {
  return (
    <Container className="py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-text-primary">Live Long Dresses</h1>
        <p className="mt-4 max-w-2xl mx-auto text-text-secondary">Graceful and flowing, our long dresses are perfect for making a statement at any event.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {longDresses.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default LongDressPage;