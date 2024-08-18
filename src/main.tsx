// // src/main.tsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import ProductList from './components/ProductList';
// import ProductDetail from './components/ProductDetail';
// import Cart from './components/Cart';
// import './index.css';
// import { CartProvider } from './contexts/CartContext';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <CartProvider>
//       <Router>
//         <Routes>
//           <Route path="/products" element={<ProductList />} />
//           <Route path="/products/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="*" element={<Navigate to="/products" />} /> {/* Redirect to products page */}
//         </Routes>
//       </Router>
//     </CartProvider>
//   </React.StrictMode>,
// );

// src/main.tsx
import { Provider } from "react-redux";
import { store } from "./app/store";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

// const domain:string = process.env.AUTH0_DOMAIN!;
// const clientId:string = process.env.AUTH0_CLIENT_ID!;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    
    <Auth0Provider
      domain="dev-perooutlnqi831jy.us.auth0.com"
      clientId="NytPHYYkBfhdof6ccBlS0foDil1XZU5f"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/",
      }}
    >
      
      {/* <CartProvider> */}
        <Provider store = {store}>

          <Router>
            <App />
          </Router>
        </Provider>

      {/* </CartProvider> */}
      
    </Auth0Provider>
   
  </>
);
