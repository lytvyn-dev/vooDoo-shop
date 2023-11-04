// ? Redux
import store from '../store';
import { getProducts } from '../store/slices/productsSlice';
//
import { renderCart } from './cards';

import { renderPagination } from './pagination';

store.dispatch(getProducts());

store.subscribe(() => {
  const state = store.getState();
  const products = state.products.items;

  products.forEach(product => {
    renderCart(product);
  });

  renderPagination();
  // getSearchParams();
});
