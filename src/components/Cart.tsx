// import React from 'react';
// import { useCart } from '../contexts/CartContext';
// import Navbar from './Navbar';
// import { FiCheckCircle } from 'react-icons/fi';
// import Button from './Button';

// const Cart: React.FC = () => {
//   const { state, removeFromCart, updateQuantity } = useCart();

//   const calculateTotal = () => {
//     return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
//   };

//   const calculateTax = (subtotal: number) => {
//     return subtotal * 0.1; // Assuming a 10% tax rate
//   };

//   const subtotal = calculateTotal();
//   const tax = calculateTax(subtotal);
//   const total = subtotal + tax;

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
//         {state.items.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div className="flex flex-col md:flex-row">
//             <div className="w-full md:w-3/4 pr-4">
//               <ul>
//                 {state.items.map(item => (
//                   <li key={item.product.id} className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4">
//                     <img src={item.product.image} alt={item.product.title} className="w-24 h-24 object-cover rounded-md mr-4" />
//                     <div className="flex-1">
//                       <h2 className="text-lg font-bold">{item.product.title}</h2>
//                       <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
//                       <div className="mt-2">
//                         <label htmlFor={`quantity-${item.product.id}`} className="mr-2">Quantity:</label>
//                         <input
//                           type="number"
//                           id={`quantity-${item.product.id}`}
//                           value={item.quantity}
//                           onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
//                           min="1"
//                           className="border p-1 rounded w-16"
//                         />
//                       </div>
//                     </div>
//                     <Button onClick={() => removeFromCart(item.product.id)} text="Remove" className="text-red-500 ml-4" />
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 mt-4 md:mt-0">
//               <h3 className="text-xl font-bold mb-4">Order Summary</h3>
//               <div className="mb-2">
//                 <div className="flex justify-between text-gray-600 mb-1">
//                   <span>Subtotal:</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600 mb-1">
//                   <span>Estimated Tax:</span>
//                   <span>${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-xl font-bold">
//                   <span>Total:</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>
//               <Button
//                 onClick={() =>{

//                 }}
//                 className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition flex items-center justify-center"
//                 icon={<FiCheckCircle className="mr-2" />}
//                 text="Proceed to Checkout"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect } from "react";
// import { useCart } from "../contexts/CartContext";
import Navbar from "./Navbar";
import { FiCheckCircle } from "react-icons/fi";
import Button from "./Button";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth0/LoginButton";
import { Link } from "react-router-dom";

import { useAppSelector, UseAppDispatch } from "../app/hooks";
import { removeFromCart, updateQuantity, loadItems } from "../features/cart/cartSlice";

const Cart: React.FC = () => {
  const {items} = useAppSelector(state => state.cart)
  const dispatch = UseAppDispatch();
  const {user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      setTimeout(() => {
        const storedItem = JSON.parse(localStorage.getItem(`${user?.sub}-cartItems`) || "[]");
        console.log("Rehydrating storedItems after refresh:", storedItem);
        if (storedItem.length > 0) {
          dispatch(loadItems(storedItem));
        }
      }, 100); // Small delay to ensure LocalStorage is ready
    }
  }, [isAuthenticated, user, dispatch]);
  

  useEffect(() => {
    if (isAuthenticated && items.length > 0) {
      localStorage.setItem(`${user?.sub}-cartItems`, JSON.stringify(items));
      const storedItem2 = JSON.parse(localStorage.getItem(`${user?.sub}-cartItems`) || "[]");
      console.log("storeditem2:", storedItem2);
    } 
  }, [items, isAuthenticated, user]);

  
  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.1; // Assuming a 10% tax rate
  };

  const subtotal = calculateTotal();
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  if (isLoading) return "Loading";

  if (!isAuthenticated) {
    return (
      <>
        <div
          id="modal-backdrop"
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                You have not logged in yet
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Please log in to continue accessing your account.
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              {/* <button
                id="login-button"
                className="mr-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
              >
                Login
              </button> */}
              <LoginButton text="Login" />
              <Link
                className="ml-2 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm"
                to={"/products"}
              >
                Cancel
                </Link >
              
            </div>
          </div>
        </div>

        
      </>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 pr-4">
              <ul>
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-24 h-24 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-bold">
                        {item.product.title}
                      </h2>
                      <p className="text-gray-600">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <div className="mt-2">
                        <label
                          htmlFor={`quantity-${item.product.id}`}
                          className="mr-2"
                        >
                          Quantity:
                        </label>
                        <input
                          type="number"
                          id={`quantity-${item.product.id}`}
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(updateQuantity({
                              productId: item.product.id,
                              quantity: parseInt(e.target.value)
                            }
                            ))
                          }
                          min="1"
                          className="border p-1 rounded w-16"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      text="Remove"
                      className="text-red-500 ml-4"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 mt-4 md:mt-0">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="mb-2">
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Estimated Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                onClick={() => {}}
                className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition flex items-center justify-center"
                icon={<FiCheckCircle className="mr-2" />}
                text="Proceed to Checkout"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;



