import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, variants } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ id, title, variants, quantity: 1 });
      }

      state.totalPrice += parseFloat(variants[0].price);
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;

      const itemToIncrease = state.items.find(item => item.id === id);
      if (itemToIncrease) {
        itemToIncrease.quantity++;
        state.totalPrice += parseFloat(itemToIncrease.variants[0].price);
      }
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const itemToDecrease = state.items.find(item => item.id === id);

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity--;
        state.totalPrice -= parseFloat(itemToDecrease.variants[0].price);
      } else if (itemToDecrease && itemToDecrease.quantity === 1) {
        const itemIndex = state.items.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
          const removedItem = state.items.splice(itemIndex, 1)[0];
          state.totalPrice -=
            parseFloat(removedItem.variants[0].price) * removedItem.quantity;
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
