// src/components/ProductList.tsx
import React from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ProductList;
