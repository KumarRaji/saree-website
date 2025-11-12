// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

const fallbackImage = (seed) => `https://picsum.photos/400/500?random=${seed}`;

const categoryImage = (category, id) => {
  // simple placeholder chooser
  const key = `${category}-${id}`.length;
  return fallbackImage(100 + key);
};

export default function HomePage() {
  const API = import.meta.env?.VITE_API_URL || ""; // leave "" if using Vite proxy
  const [items, setItems] = useState([]);

  useEffect(() => {
    const url = API ? `${API}/featurecollection` : `/api/featurecollection`;
    fetch(url)
      .then(r => r.json())
      .then(rows => {
        const mapped = rows.map(r => ({
          id: r.id,
          name: r.title,
          category: r.category,
          price: Number(r.amount) || 0,
          imageUrl: categoryImage(r.category || "All", r.id)
        }));
        setItems(mapped);
      })
      .catch(() => setItems([]));
  }, []);

  return (
    <>
      <Hero />
      <Container className="py-16 sm:py-24">
        <h2 className="text-3xl font-bold font-serif text-center text-text-primary">Featured Collection</h2>
        <p className="mt-4 text-center text-text-secondary max-w-2xl mx-auto">
          Our handpicked selection of the finest traditional wear, blending classic designs with a modern touch.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {items.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No featured items yet</p>
          )}
        </div>
      </Container>
    </>
  );
}
