import React, {useState, useEffect} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Product } from "../types/Product";
// import StarRating from "../components/StarRating";
// import Button from "../components/Button";
// import ProductList from "../components/ProductList";
import TheSidebar from "./TheSidebar";
// import SelectDropdown from "../components/SelectDropdown";
// import ProductEditForm from "./ProductEditForm";

const Dash: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate=useNavigate()
  
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
  }, [selectedCategory,products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  }

  const handleNavigate=(id:number)=>{
    navigate(`/edit/${id}`)
  }

  const categories = [
    // {value: "All Products", label: "All Products"},     
    { value: 'jewelery', label: 'Jewelry' },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
    { value: 'electronics', label: 'Electronics' }
  ]
    return (
    <div className="flex">
      <TheSidebar
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        categories={categories}
      />
      <div className="product-list flex-1 p-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map(product => (
                <div>
              <div key={product.id} className="product-card border p-4 rounded">
                <img src={product.image} alt={product.title} className="mb-4" />
                <h3 className="font-bold mb-2">{product.title}</h3>
                <p className="font-bold">${product.price.toFixed(2)}</p>
                <button className="bg-orange-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition">Delete</button>
                <button onClick={()=>handleNavigate(product.id)}
                 className="bg-orange-600 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition mx-3">Edit</button>

              </div>
              </div>
            ))}
          </div>
        ) : (
        //     <div className="grid grid-cols-3 gap-4">
        //     {products.map(product => (
        //       <div key={product.id} className="product-card border p-4 rounded">
        //         <img src={product.image} alt={product.title} className="mb-4" />
        //         <h3 className="font-bold mb-2">{product.title}</h3>
        //         <p className="font-bold">${product.price.toFixed(2)}</p>
        //       </div>
        //     ))}
        //   </div>
        <p>No products</p>
        )}
      </div>
    </div>
  );
};

export default Dash;