// ? Redux
import store from '../store';
import { getProducts } from '../store/slices/productsSlice';
//
import { renderCardsProducts } from './cards';
import { renderPagination } from './pagination';
import { renderCartItems } from './cart';

store.subscribe(() => {
  const cardsContainer = document.getElementById('products-container');
  const state = store.getState();
  const products = state.products.items;

  if (state.products.isLoading) {
    const loadingMessage = `<p style="text-align: center; font-size: 2rem" >Loading...</p>`;
    cardsContainer.insertAdjacentHTML('afterbegin', loadingMessage);
  } else {
    renderCardsProducts(products);
    renderPagination();
    renderCartItems();
  }
});

store.dispatch(getProducts());
