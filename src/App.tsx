// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import "./index.css";
// import Dash from './portal/Dash';
import Dashboard from "./portal/Dashboard";
import ProductEditForm from "./portal/ProductEditForm";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProductCreateForm from "./portal/ProductCreateForm";
import Chart from "./portal/charts/Chart";
// import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from "./portal/ProtectedRoute";
import NotAuthorized from "./portal/NotAuthorized";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      {/* <Route path="/admin" element= {<Dash/>} />
          <Route path="/edit/:id" element = {<ProductEditForm/>} /> */}
      {/* {isAdmin && <Route path="/admin" element={<Dashboard />} />}
      {isAdmin && <Route path="/edit/:id" element={<ProductEditForm />} />}
      {isAdmin && <Route path="/create" element={<ProductCreateForm />} />}
      {isAdmin && <Route path="/charts" element={<Chart />} />} */}

      <Route path="/admin" element={<ProtectedRoute />}>
        <Route path="" element={<Dashboard />} />
        <Route path="edit/:id" element={<ProductEditForm />} />
        <Route path="create" element={<ProductCreateForm />} />
        <Route path="charts" element={<Chart />} />
      </Route>

      <Route path="/not-authorized" element={<NotAuthorized />} />

      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      {/* <Route path="*" element={<Navigate to="/products" />} /> Redirect to products page */}
    </Routes>
  );
};

export default App;
