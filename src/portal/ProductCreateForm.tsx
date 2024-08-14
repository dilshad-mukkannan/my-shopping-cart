// src/components/ProductCreateForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCreateForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [url, setUrl] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [rate, setRate] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('https://fakestoreapi.com/products', {
      title, price, description, image: url, category, rating: { rate, count }
    })
      .then(response => {
        console.log(response.data);
        alert(`Product ${response.data.title} created!`);
        navigate('/admin');
      })
      .catch(err => console.error(err));
  };

  return (
    <form className="p-4 bg-white rounded shadow-md" onSubmit={handleCreateProduct}>
      {/* Form fields (same as in ProductEditForm) */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full border rounded p-2" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded p-2"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Price</label>
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full border rounded p-2" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Image URL</label>
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} className="w-full border rounded p-2" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Category</label>
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded p-2" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Rating</label>
        <div className="flex space-x-4">
          <div>
            <label className="block text-xs font-bold mb-1">Rate</label>
            <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full border rounded p-2" step="0.1" min="0" max="5" />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Count</label>
            <input type="number" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full border rounded p-2" min="0" />
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => navigate('/admin')} className="bg-gray-500 text-white rounded p-2">Cancel</button>
        <button type="submit" className="bg-green-500 text-white rounded p-2">Create</button>
      </div>
    </form>
  );
};

export default ProductCreateForm;
