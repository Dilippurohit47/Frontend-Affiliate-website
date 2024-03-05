import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  user: null,
  loading: true,
};
export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      (state.loading = false), (state.user = null);
    },
    SetcartList: (state, action) => {
      state.user.cartItems = [...state?.user?.cartItems, action.payload];
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      const indexToRemove = state?.user?.cartItems?.findIndex?.(
        (item) => item._id === productIdToRemove
      );
      if (indexToRemove !== -1) {
        state?.user?.cartItems?.splice?.(indexToRemove, 1);
      }
    },
    removeAdminProduct: (state, action) => {
      console.log(action.payload);
      const removeId = action.payload;
      state.user.productsCreated = state.user.productsCreated?.filter((product) => product._id !== removeId);

    },
    AddAdminProduct: (state, action) => {
      console.log(action.payload);
      const product = action.payload;
  state.user.productsCreated.push(product); 

    },
  },
});

export const {
  userExist,
  userNotExist,
  SetcartList,
  removeFromCart,
  removeAdminProduct,
  AddAdminProduct,
} = userReducer.actions;
