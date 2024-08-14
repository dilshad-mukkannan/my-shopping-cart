// // src/pages/Dashboard.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Product } from '../types/Product';
// import TheSidebar from './TheSidebar';
// import ProductList from './ProductList';
// import { useAuth } from '../contexts/AuthContext';
// import { useAuth0 } from '@auth0/auth0-react';

// const Dashboard: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const { isAdmin, logout, loginAsAdmin } = useAuth();
//   const navigate = useNavigate();
//   const {user} = useAuth0();

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
//     if (selectedCategory) {
//       updatedProducts = updatedProducts.filter(product =>
//         product.category.toLowerCase().startsWith(selectedCategory.toLowerCase())
//       );
//     }
//     setFilteredProducts(updatedProducts);
//   }, [selectedCategory, products]);

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//   };

//   const handleEdit = (id: number) => {
//     navigate(`edit/${id}`);
//   };

//   const handleDelete = (id: number) => {
//     axios.delete(`https://fakestoreapi.com/products/${id}`)
//       .then(() => {
//         setProducts(products.filter(product => product.id !== id));
//         setFilteredProducts(filteredProducts.filter(product => product.id !== id));
//       })
//       .catch(error => console.error('Error deleting product:', error));
//   };
  
//   const handleLogout = () => {
//     logout();
//     navigate("/products")
//   }

//   if (!isAdmin && user?.sub !== "google-oauth2|104660242862344822298") {
//     return <p>Access denied. Only admins can view this page.</p>;
//   }

//   const categories = [
//     { value: 'jewelery', label: 'Jewelry' },
//     { value: "men's clothing", label: "Men's Clothing" },
//     { value: "women's clothing", label: "Women's Clothing" },
//     { value: 'electronics', label: 'Electronics' }
//   ];

//   console.log("isAdmin:", isAdmin);
//   console.log("User:", user?.name)



//   return (
//     <div className="flex">
//       <TheSidebar
//         selectedCategory={selectedCategory}
//         onSelectCategory={handleCategoryChange}
//         categories={categories}
//       />
//       <div className="product-list flex-1 p-4">
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={() => navigate('/admin/create')}
//             className="bg-green-500 text-white rounded p-2"
//           >
//             Create New Product
//           </button>
//           <button
//             onClick={()=> navigate("/admin/charts")}
//             className="bg-orange-500 text-white rounded p-1"
//           >
//             charts
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white rounded p-1"
//           >
//             Back
//           </button>
//         </div>
//         {filteredProducts.length > 0 ? (
//           <ProductList products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />
//         ) : (
//           <p>No products</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types/Product';
import TheSidebar from './TheSidebar';
import ProductList from './ProductList';
import { useAuth } from '../contexts/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const {user} = useAuth0();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];
    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(product =>
        product.category.toLowerCase().startsWith(selectedCategory.toLowerCase())
      );
    }
    setFilteredProducts(updatedProducts);
  }, [selectedCategory, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = (id: number) => {
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
        setFilteredProducts(filteredProducts.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };
  
  const handleLogout = () => {
    navigate("/products")
  }

  if (user?.sub !== "google-oauth2|104660242862344822298") {
    return <p>Access denied. Only admins can view this page.</p>;
  }

  const categories = [
    { value: 'jewelery', label: 'Jewelry' },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
    { value: 'electronics', label: 'Electronics' }
  ];

  // console.log("isAdmin:", isAdmin);
  console.log("User:", user?.name)



  return (
    <div className="flex">
      <TheSidebar
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        categories={categories}
      />
      <div className="product-list flex-1 p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate('/admin/create')}
            className="bg-green-500 text-white rounded p-2"
          >
            Create New Product
          </button>
          <button
            onClick={()=> navigate("/admin/charts")}
            className="bg-orange-500 text-white rounded p-1"
          >
            charts
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white rounded p-1"
          >
            Back
          </button>
        </div>
        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <p>No products</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

