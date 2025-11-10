import React from 'react';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

const menProducts = [
  { id: 201, name: 'Silk Jacquard Kurta Set', category: 'Kurta', price: 149.99, imageUrl: 'https://picsum.photos/400/500?random=201' },
  { id: 202, name: 'Embroidered Sherwani', category: 'Sherwani', price: 399.99, imageUrl: 'https://picsum.photos/400/500?random=202' },
  { id: 203, name: 'Nehru Jacket', category: 'Jacket', price: 99.99, imageUrl: 'https://picsum.photos/400/500?random=203' },
  { id: 204, name: 'Linen Pathani Suit', category: 'Suit', price: 189.99, imageUrl: 'https://picsum.photos/400/500?random=204' },
];

const MenPage = () => {
  return (
    <Container className="py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-text-primary">Men's Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-text-secondary">Discover traditional and contemporary ethnic wear for men, perfect for any celebration.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {menProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default MenPage;