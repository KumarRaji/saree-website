import React from 'react';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

const womenProducts = [
  { id: 101, name: 'Classic Banarasi Saree', category: 'Saree', price: 299.99, imageUrl: 'https://picsum.photos/400/500?random=101' },
  { id: 102, name: 'Chikankari Kurti Set', category: 'Kurti', price: 129.99, imageUrl: 'https://picsum.photos/400/500?random=102' },
  { id: 103, name: 'Designer Lehenga Choli', category: 'Lehenga', price: 499.99, imageUrl: 'https://picsum.photos/400/500?random=103' },
  { id: 104, name: 'Pastel Organza Saree', category: 'Saree', price: 179.99, imageUrl: 'https://picsum.photos/400/500?random=104' },
  { id: 105, name: 'Printed Cotton Salwar', category: 'Salwar', price: 79.99, imageUrl: 'https://picsum.photos/400/500?random=105' },
  { id: 106, name: 'Velvet Sharara Suit', category: 'Sharara', price: 219.99, imageUrl: 'https://picsum.photos/400/500?random=106' },
];

const WomenPage = () => {
  return (
    <Container className="py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-text-primary">Women's Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-text-secondary">Explore our exquisite range of sarees, lehengas, and kurtis designed for the modern woman.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {womenProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default WomenPage;