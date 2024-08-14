// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card border p-4 rounded">
      <img src={product.image} alt={product.title} className="mb-4" />
      <h3 className="font-bold mb-2">{product.title}</h3>
      <p className="font-bold">${product.price.toFixed(2)}</p>
      <button onClick={() => onDelete(product.id)} className="bg-red-600 text-white px-4 py-2 rounded shadow-md hover:bg-red-800 transition">Delete</button>
      <button onClick={() => onEdit(product.id)} className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-800 transition mx-3">Edit</button>
    </div>
  );
};

export default ProductCard;
