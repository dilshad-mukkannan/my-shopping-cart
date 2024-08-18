// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useCart } from '../contexts/CartContext';
// import { FiShoppingCart, FiBox } from 'react-icons/fi';
// import { HiMiniShoppingBag } from "react-icons/hi2";
// import Button from './Button';

// const Navbar: React.FC = () => {
//   const location = useLocation();
//   const isCartPage = location.pathname === "/cart";
//   const { state } = useCart();
//   const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <nav className="bg-gray-800 p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <HiMiniShoppingBag className='w-8 h-8 text-white'/>
//           <span className="text-white text-xl font-bold">MyCart.com</span>
//         </div>
//         <div className="flex space-x-4">
//           <Button
//             component={Link}
//             to="/products"
//             className="text-black bg-gray-200 hover:bg-gray-300"
//             icon={<FiBox />}
//             iconPosition="right" // Icon on the right
//             text="View Products"
//           />
//           {!isCartPage && (
//             <div className="relative">
//               <Button
//                 component={Link}
//                 to="/cart"
//                 className="text-white bg-orange-500 hover:bg-orange-600"
//                 icon={<FiShoppingCart />}
//                 iconPosition="right" // Icon on the right
//                 text="View Cart"
//               />
//               {totalItems > 0 && (
//                 <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full px-2 text-xs">
//                   {totalItems}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import { FiShoppingCart, FiBox } from "react-icons/fi";
// import { HiMiniShoppingBag } from "react-icons/hi2";
// import Button from "./Button";
// import LoginButton from "../Auth0/LoginButton";
// import LogoutButton from "../Auth0/LogoutButton";
// import Profile from "../Auth0/Profile";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useAuth } from "../contexts/AuthContext";

// const Navbar: React.FC = () => {
//   const location = useLocation();
//   const isCartPage = location.pathname === "/cart";
//   const { state } = useCart();
//   const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
//   const { isLoading, error, isAuthenticated, user } = useAuth0();
//   // const {isAdmin, loginAsAdmin, logout} = useAuth();
//   const navigate = useNavigate();
//   const handleAdminLogin = () => {
//     navigate("/admin");
//   }
  

//   return (
//     <nav className="bg-gray-800 p-4 shadow-md sticky top-0">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <HiMiniShoppingBag className="w-8 h-8 text-white" />
//           <span className="text-white text-xl font-bold">MyCart.com</span>
//         </div>
//         <div className="flex space-x-4">
//           <Button
//             component={Link}
//             to="/products"
//             className="text-black bg-gray-200 hover:bg-gray-300"
//             icon={<FiBox />}
//             iconPosition="right" // Icon on the right
//             text="View Products"
//           />
//           {!isCartPage && (
//             <div className="relative">
//               <Button
//                 component={Link}
//                 to="/cart"
//                 className="text-white bg-orange-500 hover:bg-orange-600"
//                 icon={<FiShoppingCart />}
//                 iconPosition="right" // Icon on the right
//                 text="View Cart"
//               />
//               {totalItems > 0 && (
//                 <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full px-2 text-xs animate-ping">
//                   {totalItems}
//                 </span>
//               )}
//             </div>
//           )}

//           {error && <span>Authenticaton failed</span>}
//           {!error && isLoading && <span>Loading..</span>}
//           {!error && !isLoading && (
//             <>
//               <Profile />
//               {/* {isAuthenticated ? <LoginButton text="Login" /> : <LoginButton text="Signup" screen_hint="signup"/>} */}
//               <LoginButton text="Login" />
//               <LoginButton text="SignUp" screen_hint="signup"/>
//               <LogoutButton />
//             </>

            
//           )
//           }

//           {isAuthenticated && user?.sub === "google-oauth2|104660242862344822298" && (
//             <button className="block bg-white" onClick={handleAdminLogin}>Admin</button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
import { FiShoppingCart, FiBox } from "react-icons/fi";
import { HiMiniShoppingBag } from "react-icons/hi2";
import Button from "./Button";
import LoginButton from "../Auth0/LoginButton";
import LogoutButton from "../Auth0/LogoutButton";
import Profile from "../Auth0/Profile";
import { useAuth0 } from "@auth0/auth0-react";
// import { useAuth } from "../contexts/AuthContext";

import { useAppSelector } from "../app/hooks";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  // const { state } = useCart();
  const {items} = useAppSelector(state => state.cart);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const { isLoading, error, isAuthenticated, user } = useAuth0();
  // const {isAdmin, loginAsAdmin, logout} = useAuth();
  const navigate = useNavigate();
  const handleAdminLogin = () => {
    navigate("/admin");
  }
  

  return (
    <nav className="bg-gray-800 p-4 shadow-md sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HiMiniShoppingBag className="w-8 h-8 text-white" />
          <span className="text-white text-xl font-bold">MyCart.com</span>
        </div>
        <div className="flex space-x-4">
          <Button
            component={Link}
            to="/products"
            className="text-black bg-gray-200 hover:bg-gray-300"
            icon={<FiBox />}
            iconPosition="right" // Icon on the right
            text="View Products"
          />
          {!isCartPage && (
            <div className="relative">
              <Button
                component={Link}
                to="/cart"
                className="text-white bg-orange-500 hover:bg-orange-600"
                icon={<FiShoppingCart />}
                iconPosition="right" // Icon on the right
                text="View Cart"
              />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full px-2 text-xs animate-ping">
                  {totalItems}
                </span>
              )}
            </div>
          )}

          {error && <span>Authenticaton failed</span>}
          {!error && isLoading && <span>Loading..</span>}
          {!error && !isLoading && (
            <>
              <Profile />
              {/* {isAuthenticated ? <LoginButton text="Login" /> : <LoginButton text="Signup" screen_hint="signup"/>} */}
              <LoginButton text="Login" />
              <LoginButton text="SignUp" screen_hint="signup"/>
              <LogoutButton />
            </>

            
          )
          }

          {isAuthenticated && user?.sub === "google-oauth2|104660242862344822298" && (
            <button className="block bg-white" onClick={handleAdminLogin}>Admin</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

