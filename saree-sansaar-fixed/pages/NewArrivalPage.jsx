import React from 'react';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

const newArrivals = [
  { id: 301, name: 'Floral Print Georgette Saree', category: 'Women', price: 159.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=301' },
  { id: 302, name: 'Midnight Blue Bandhgala', category: 'Men', price: 299.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=302' },
  { id: 303, name: 'Hand-painted Kalamkari Dress', category: 'Women', price: 219.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=303' },
  { id: 304, name: 'Pastel Lucknowi Kurta', category: 'Men', price: 119.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=304' },
  { id: 305, name: 'Ruby Red Kanjeevaram', category: 'Women', price: 459.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=305' },
  { id: 306, name: 'Ivory Raw Silk Sherwani', category: 'Men', price: 499.99, imageUrl: 'https://source.unsplash.com/400x500/?dress&sig=306' },
];

const NewArrivalPage = () => {
  return (
    <Container className="py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-text-primary">New Arrivals</h1>
        <p className="mt-4 max-w-2xl mx-auto text-text-secondary">Be the first to explore our latest designs and freshest styles, straight from the looms.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default NewArrivalPage;