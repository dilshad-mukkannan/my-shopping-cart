import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartSlice'
import type { Action } from "@reduxjs/toolkit";



export const store = configureStore({
    
    reducer: {
         cart: cartReducer
    }
})

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type Rootstate = ReturnType<typeof store.getState>;