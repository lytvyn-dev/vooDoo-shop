import { createSlice } from '@reduxjs/toolkit';
import { getProductsApi } from '../../api/productsApi';

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
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProducts, setLoading } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;

export const getProducts = (page = 1) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const data = await getProductsApi(page);
      dispatch(setProducts(data));
    } catch (error) {
      console.error(error);
      throw new Error('Could not get products!');
    }
  };
};
