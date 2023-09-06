import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    setCartEmpty: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = [];
    },
  },
});

export const { addProduct, setCartEmpty } = cartSlice.actions;
export default cartSlice.reducer;
