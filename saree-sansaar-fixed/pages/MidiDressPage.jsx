import React from 'react';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

const midiDresses = [
  { id: 501, name: 'Chic A-Line Midi Dress', category: 'Midi Dress', price: 99.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=501' },
  { id: 502, name: 'Floral Wrap Midi', category: 'Midi Dress', price: 89.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=502' },
  { id: 503, name: 'Block-Print Cotton Midi', category: 'Midi Dress', price: 109.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=503' },
];

const MidiDressPage = () => {
  return (
    <Container className="py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-text-primary">Midi Dresses</h1>
        <p className="mt-4 max-w-2xl mx-auto text-text-secondary">Versatile and stylish, our midi dresses blend comfort with contemporary ethnic fashion.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {midiDresses.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default MidiDressPage;