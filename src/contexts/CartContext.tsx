// import React, { createContext, useReducer, useContext, useEffect } from 'react';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
// }

// interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: JSON.parse(localStorage.getItem('cartItems') || '[]'), // Load from localStorage
// };

// type Action =
//   | { type: 'ADD_TO_CART'; product: Product }
//   | { type: 'REMOVE_FROM_CART'; productId: number }
//   | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number };

// function cartReducer(state: CartState, action: Action): CartState {
//   switch (action.type) {
//     case 'ADD_TO_CART': {
//       const existingItem = state.items.find(item => item.product.id === action.product.id);
//       if (existingItem) {
//         return {
//           ...state,
//           items: state.items.map(item =>
//             item.product.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           items: [...state.items, { product: action.product, quantity: 1 }],
//         };
//       }
//     }
//     case 'REMOVE_FROM_CART':
//       return {
//         ...state,
//         items: state.items.filter(item => item.product.id !== action.productId),
//       };
//     case 'UPDATE_QUANTITY':
//       return {
//         ...state,
//         items: state.items.map(item =>
//           item.product.id === action.productId ? { ...item, quantity: action.quantity } : item
//         ),
//       };
//     default:
//       return state;
//   }
// }

// const CartContext = createContext<{
//   state: CartState;
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
// } | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(state.items));
//   }, [state.items]);

//   const addToCart = (product: Product) => dispatch({ type: 'ADD_TO_CART', product });
//   const removeFromCart = (productId: number) => dispatch({ type: 'REMOVE_FROM_CART', productId });
//   const updateQuantity = (productId: number, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });

//   return (
//     <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// import React, { createContext, useReducer, useContext, useEffect } from 'react';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
// }

// interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: JSON.parse(localStorage.getItem('cartItems') || '[]'), // Load from localStorage
// };

// type Action =
//   | { type: 'ADD_TO_CART'; product: Product }
//   | { type: 'REMOVE_FROM_CART'; productId: number }
//   | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number };

// function cartReducer(state: CartState, action: Action): CartState {
//   switch (action.type) {
//     case 'ADD_TO_CART': {
//       const existingItem = state.items.find(item => item.product.id === action.product.id);
//       if (existingItem) {
//         return {
//           ...state,
//           items: state.items.map(item =>
//             item.product.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           items: [...state.items, { product: action.product, quantity: 1 }],
//         };
//       }
//     }
//     case 'REMOVE_FROM_CART':
//       return {
//         ...state,
//         items: state.items.filter(item => item.product.id !== action.productId),
//       };
//     case 'UPDATE_QUANTITY':
//       return {
//         ...state,
//         items: state.items.map(item =>
//           item.product.id === action.productId ? { ...item, quantity: action.quantity } : item
//         ),
//       };
//     default:
//       return state;
//   }
// }

// const CartContext = createContext<{
//   state: CartState;
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
// } | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(state.items));
//   }, [state.items]);

//   const addToCart = (product: Product) => dispatch({ type: 'ADD_TO_CART', product });
//   const removeFromCart = (productId: number) => dispatch({ type: 'REMOVE_FROM_CART', productId });
//   const updateQuantity = (productId: number, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });

//   return (
//     <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

import { useAuth0 } from "@auth0/auth0-react";
import React, { createContext, useReducer, useContext, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

type Action =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "LOAD_ITEMS"; items: CartItem[] };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product: action.product, quantity: 1 }],
        };
      }
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.productId
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };

    case "LOAD_ITEMS":
      return {
        ...state,
        items: action.items,
      };
    default:
      return state;
  }
}

const CartContext = createContext<
  | {
      state: CartState;
      addToCart: (product: Product) => void;
      removeFromCart: (productId: number) => void;
      updateQuantity: (productId: number, quantity: number) => void;
    }
  | undefined
>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useAuth0();


  useEffect(() => {
    if (isAuthenticated) {
      const storedItems = JSON.parse(
        localStorage.getItem(`${user?.sub}-cartItems`) || "[]"
      );
      dispatch({ type: "LOAD_ITEMS", items: storedItems });
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(
        `${user?.sub}-cartItems`,
        JSON.stringify(state.items)
      );
    }
  }, [state.items, isAuthenticated, user]);

  const addToCart = (product: Product) =>
    dispatch({ type: "ADD_TO_CART", product });
  const removeFromCart = (productId: number) =>
    dispatch({ type: "REMOVE_FROM_CART", productId });
  const updateQuantity = (productId: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
