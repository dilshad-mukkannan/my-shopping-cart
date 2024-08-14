// import React, {useState, useEffect, ElementType} from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import axios from "axios";
// // import { Product } from "../types/Product";



// const ProductEditForm = () => {
//     const [title,setTitle]=useState<string>('')
//     const [description, setDescription] = useState<string>('');
//     const [price, setPrice] = useState<number>(0);
//     const [url, setUrl] = useState<string>('');
//     const [category, setCategory] = useState<string>('');
//     const [rate, setRate] = useState<number>(0);
//     const [count, setCount] = useState<number>(0);

//     const {id}=useParams()


//     const result = async() =>{
//       await axios.get(`https://fakestoreapi.com/products/${id}`)
//       .then((response)=>{
//         const data=response.data
//         setTitle(data.title);
//         setDescription(data.description);
//         setPrice(data.price);
//         setUrl(data.image);
//         setCategory(data.category);
//         setRate(data.rating.rate);
//         setCount(data.rating.count);
//        }).catch((err)=>{
//         console.log(err);
        
//        })
//     }
//     useEffect(()=>{
//       result();
//     }, [])

//     const handlePostRequest = (e:any) => {
//       e.preventDefault();
//       const requestOptions = {
//         method:"PUT",
//         headers: { 'Content-Type': 'application/json' },
//         body:JSON.stringify(
//             {
//               title: title,
//               price: price,
//               description: description,
//               image: url,
//               category: category

//             }
//         )
//     }
//     fetch(`https://fakestoreapi.com/products/${id}`, requestOptions)
//       .then(res=>res.json())
//       .then(json=>{console.log(json)
//           alert(`The product ${json.title} updated!`)
//       })
      
//     }

    
//     return (
//         <form className="p-4 bg-white rounded shadow-md">
//   <div className="mb-4">
//     <label className="block text-sm font-bold mb-2">Title</label>
//     <input value={title} 
//     onChange={e => setTitle(e.target.value)} 
//     type="text" name="title" className="w-full border rounded p-2" />
//   </div>

//   <div className="mb-4">
//     <label className="block text-sm font-bold mb-2">Description</label>
//     <textarea name="description" value={description}
//     onChange={e => setDescription(e.target.value)}
//      className="w-full border rounded p-2"></textarea>
//   </div>

//   <div className="mb-4">
//     <label className="block text-sm font-bold mb-2">Price</label>
//     <input type="number" name="price" value={price} 
//     onChange={e => setPrice(Number(e.target.value))}
//     className="w-full border rounded p-2" />
//   </div>

//   <div className="mb-4">
//     <label className="block text-sm font-bold mb-2">Image URL</label>
//     <input type="text" name="image" value={url} 
//     onChange={e => setUrl(e.target.value)}
//     className="w-full border rounded p-2" />
//   </div>

//   <div className="mb-4">
//     <label className="block text-sm font-bold mb-2">Category</label>
//     <input type="text" name="category" value={category}
//     onChange={e => setCategory(e.target.value)}
//      className="w-full border rounded p-2" />
//   </div>

//   <div className="mb-4">
//     <label className="block text-sm font-bold mb-2">Rating</label>
//     <div className="flex space-x-4">
//       <div>
//         <label className="block text-xs font-bold mb-1">Rate</label>
//         <input type="number" name="rate" value={rate} 
//         onChange={e => setRate(Number(e.target.value))}
//         className="w-full border rounded p-2" step="0.1" min="0" max="5" />
//       </div>
//       <div>
//         <label className="block text-xs font-bold mb-1">Count</label>
//         <input type="number" name="count" value={count} 
//         onChange={e => setCount(Number(e.target.value))}
//         className="w-full border rounded p-2" min="0" />
//       </div>
//     </div>
//   </div>

//   <div className="flex justify-end space-x-4">
//     <button type="button" className="bg-gray-500 text-white rounded p-2">Cancel</button>
//     <button type="submit" 
//     onClick={handlePostRequest}
//     className="bg-blue-500 text-white rounded p-2">Save</button>
//   </div>
// </form>

//     );
// }

// export default ProductEditForm;

// src/components/ProductEditForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductEditForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [url, setUrl] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [rate, setRate] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        const data = response.data;
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setUrl(data.image);
        setCategory(data.category);
        setRate(data.rating.rate);
        setCount(data.rating.count);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`https://fakestoreapi.com/products/${id}`, {
      title, price, description, image: url, category
    })
      .then(response => {
        console.log(response.data);
        alert(`The product ${response.data.title} was updated!`);
        navigate('/admin');
      })
      .catch(err => console.error(err));
  };

  return (
    <form className="p-4 bg-white rounded shadow-md" onSubmit={handleUpdateProduct}>
      {/* Form fields */}
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
        <button type="submit" className="bg-blue-500 text-white rounded p-2">Save</button>
      </div>
    </form>
  );
};

export default ProductEditForm;
