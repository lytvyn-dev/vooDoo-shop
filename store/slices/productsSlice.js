import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProducts, setLoading } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;

export const getProducts = () => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        'https://voodoo-sandbox.myshopify.com/products.json?limit=24',
      );

      const data = response.data.products;
      dispatch(setProducts(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      throw new Error('Could not get products!');
    }
  };
};
