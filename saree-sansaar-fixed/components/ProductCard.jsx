import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="group relative border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-text-primary">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
        <p className="mt-1 text-sm text-text-secondary">{product.category}</p>
        <p className="mt-2 text-lg font-semibold text-text-primary">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;