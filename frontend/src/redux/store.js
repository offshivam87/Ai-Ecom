import{ configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/UserSlice.js"
import cartReducer from "./features/CartSlice.js"

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

