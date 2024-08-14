// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from './Navbar';
// import { Product } from '../types/Product';
// import Button from './Button';
// import StarRating from './StarRating';
// import SelectDropdown from './SelectDropdown';
// import { Link } from 'react-router-dom';

// const ProductList: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [filter, setFilter] = useState('');
//   const [sort, setSort] = useState('');

//   useEffect(() => {
//     axios.get('https://fakestoreapi.com/products')
//       .then(response => {
//         setProducts(response.data);
//         setFilteredProducts(response.data);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   useEffect(() => {
//     let updatedProducts = [...products];
//     if (filter) {
//       updatedProducts = updatedProducts.filter(product =>
//         product.category.toLowerCase().startsWith(filter.toLowerCase())
//       );
//     }
//     if (sort) {
//       updatedProducts.sort((a, b) =>
//         sort === 'price' ? a.price - b.price
//         : sort === 'title' ? a.title.localeCompare(b.title)
//         : b.rating.count - a.rating.count
//       );
//     }
//     setFilteredProducts(updatedProducts);
//   }, [filter, sort, products]);

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Product List</h1>
//         <div className="flex mb-4 space-x-4">
//           <SelectDropdown
//             value={filter}
//             onChange={setFilter}
//             options={[

//               { value: 'jewelery', label: 'Jewelry' },
//               { value: "men's clothing", label: "Men's Clothing" },
//               { value: "women's clothing", label: "Women's Clothing" },
//               { value: 'electronics', label: 'Electronics' }
//             ]}
//             placeholder="Filter by category"
//           />
//           <SelectDropdown
//             value={sort}
//             onChange={setSort}
//             options={[
//               { value: 'price', label: 'Price' },
//               { value: 'title', label: 'Title' },
//               { value: 'popularity', label: 'Popularity' }
//             ]}
//             placeholder="Sort By"
//           />
//         </div>
//         <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {filteredProducts.map(product => (
//             <li key={product.id} className="border rounded p-4 shadow-md flex flex-col">
//               <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-4" />
//               <h2 className="text-lg font-bold mb-2">{product.title}</h2>
//               <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
//               <div className="flex items-center mb-4">
//                 <StarRating rate={product.rating.rate} />
//                 <span className="ml-2 text-gray-600">({product.rating.count})</span>
//               </div>
//               <Button
//                 component={Link}
//                 to={`/products/${product.id}`}
//                 text="View Details"
//                 className="mt-auto bg-orange-600 text-white hover:bg-gray-800 text-center"
//                 icon={null}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Product } from "../types/Product";
import Button from "./Button";
import StarRating from "./StarRating";
import SelectDropdown from "./SelectDropdown";
import { Link } from "react-router-dom";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];
    if (filter) {
      updatedProducts = updatedProducts.filter((product) =>
        product.category.toLowerCase().startsWith(filter.toLowerCase())
      );
    }
    if (sort) {
      updatedProducts.sort((a, b) =>
        sort === "price"
          ? a.price - b.price
          : sort === "title"
          ? a.title.localeCompare(b.title)
          : b.rating.count - a.rating.count
      );
    }
    setFilteredProducts(updatedProducts);
  }, [filter, sort, products]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <div className="flex mb-4 space-x-4">
          <SelectDropdown
            value={filter}
            onChange={setFilter}
            options={[
              { value: "jewelery", label: "Jewelry" },
              { value: "men's clothing", label: "Men's Clothing" },
              { value: "women's clothing", label: "Women's Clothing" },
              { value: "electronics", label: "Electronics" },
            ]}
            placeholder="Filter by category"
          />
          <SelectDropdown
            value={sort}
            onChange={setSort}
            options={[
              { value: "price", label: "Price" },
              { value: "title", label: "Title" },
              { value: "popularity", label: "Popularity" },
            ]}
            placeholder="Sort By"
          />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="border rounded p-4 shadow-md flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <div className="flex items-center mb-4">
                <StarRating rate={product.rating.rate} />
                <span className="ml-2 text-gray-600">
                  ({product.rating.count})
                </span>
              </div>
              <Button
                component={Link}
                to={`/products/${product.id}`}
                text="View Details"
                className="mt-auto bg-orange-600 text-white hover:bg-gray-800 text-center"
                icon={null}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
