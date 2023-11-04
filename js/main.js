// ? Redux
import store from '../store';
import { getProducts } from '../store/slices/productsSlice';
//
import { renderCart } from './cards';
import { renderPagination } from './pagination';
//? utils
import { clearContainer } from '../utils/helpers';

store.subscribe(() => {
  const cardsContainer = document.getElementById('products-container');
  const state = store.getState();
  const products = state.products.items;

  if (state.products.isLoading) {
    const loadingMessage = `<p style="text-align: center; font-size: 2rem" >Loading...</p>`;
    cardsContainer.insertAdjacentHTML('afterbegin', loadingMessage);
  } else {
    clearContainer(cardsContainer);
    products.forEach(product => {
      renderCart(product);
    });
    renderPagination();
  }
});

store.dispatch(getProducts());
