// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from '../contexts/CartContext';
// import Navbar from './Navbar';
// import { Product } from '../types/Product';
// import StarRating from './StarRating';
// import Button from './Button';

// const ProductDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`https://fakestoreapi.com/products/${id}`)
//       .then(response => setProduct(response.data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, [id]);

//   useEffect(() => {
//     if (product) {
//       axios.get(`https://fakestoreapi.com/products/category/${product.category}`)
//         .then(response => {
//           const related = response.data.filter((p: { id: number; }) => p.id !== product.id)
//                                        .sort((a: Product, b: Product) => b.rating.count - a.rating.count);
//           setRelatedProducts(related);
//         })
//         .catch(error => console.error('Error fetching related products:', error));
//     }
//   }, [product]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const handleAddToCart = () => {
//     addToCart(product);
//     navigate('/products');
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto p-4">
//         <div className="flex border-b pb-4 mb-4 shadow-lg">
//           <img src={product.image} alt={product.title} className="w-1/3 object-cover rounded shadow-md" />
//           <div className="ml-6">
//             <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//             <p className="text-gray-600 mb-4">{product.description}</p>
//             <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
//             <div className="flex items-center mb-4">
//               <StarRating rate={product.rating.rate} />
//               <span className="ml-2 text-gray-600">({product.rating.count})</span>
//             </div>
//             <Button onClick={handleAddToCart} text="Add to Cart" className="mt-4 bg-orange-600 text-white px-6 py-2 rounded shadow-md hover:bg-green-600 transition"/>
//           </div>
//         </div>
//         <h2 className="text-xl font-bold mt-8 mb-4">Related Products</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {relatedProducts.map(rp => (
//             <div key={rp.id} className="border rounded p-4 shadow-md flex flex-col">
//               <img src={rp.image} alt={rp.title} className="w-full h-40 object-cover mb-4" />
//               <h3 className="text-lg font-bold mb-2">{rp.title}</h3>
//               <p className="text-gray-600 mb-2">${rp.price.toFixed(2)}</p>
//               <div className="flex items-center mb-4">
//                 <StarRating rate={rp.rating.rate} />
//                 <span className="ml-2 text-gray-600">({rp.rating.count})</span>
//               </div>
//               <div className="flex justify-between mt-auto">
//                 <Link to={`/products/${rp.id}`} className="bg-gray-800 text-white px-4 py-2 rounded shadow-md transition">
//                   View Details
//                 </Link>
//                 <Button onClick={() => addToCart(rp)} text="Add to Cart" className="bg-orange-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import Navbar from "./Navbar";
import { Product } from "../types/Product";
import StarRating from "./StarRating";
import Button from "./Button";
import { useAuth0 } from "@auth0/auth0-react";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  useEffect(() => {
    if (product) {
      axios
        .get(`https://fakestoreapi.com/products/category/${product.category}`)
        .then((response) => {
          const related = response.data
            .filter((p: { id: number }) => p.id !== product.id)
            .sort((a: Product, b: Product) => b.rating.count - a.rating.count);
          setRelatedProducts(related);
        })
        .catch((error) =>
          console.error("Error fetching related products:", error)
        );
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/products");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex border-b pb-4 mb-4 shadow-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-1/3 object-cover rounded shadow-md"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-4">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center mb-4">
              <StarRating rate={product.rating.rate} />
              <span className="ml-2 text-gray-600">
                ({product.rating.count})
              </span>
            </div>
            {isAuthenticated &&
            <Button
              onClick={handleAddToCart}
              text="Add to Cart"
              className="mt-4 bg-orange-600 text-white px-6 py-2 rounded shadow-md hover:bg-green-600 transition"
            />
}
          </div>
        </div>
        <h2 className="text-xl font-bold mt-8 mb-4">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((rp) => (
            <div
              key={rp.id}
              className="border rounded p-4 shadow-md flex flex-col"
            >
              <img
                src={rp.image}
                alt={rp.title}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{rp.title}</h3>
              <p className="text-gray-600 mb-2">${rp.price.toFixed(2)}</p>
              <div className="flex items-center mb-4">
                <StarRating rate={rp.rating.rate} />
                <span className="ml-2 text-gray-600">({rp.rating.count})</span>
              </div>
              <div className="flex justify-between mt-auto">
                <Link
                  to={`/products/${rp.id}`}
                  className="bg-gray-800 text-white px-4 py-2 rounded shadow-md transition"
                >
                  View Details
                </Link>
                {isAuthenticated && (
                  <Button
                    onClick={() => addToCart(rp)}
                    text="Add to Cart"
                    className="bg-orange-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
