import store from '../store';
import { cartActions } from '../store/slices/cartSlice';
const cardsContainer = document.getElementById('products-container');
//? utils
import { clearContainer } from '../utils/helpers';

const handleAddToCart = product => {
  store.dispatch(cartActions.addToCart(product));
};

export const renderCard = product => {
  const html = `
    <article
    class="font-bold flex flex-col gap-[12px] md:w-[34.1%] lg:w-[25.4%] px-[12px] mx-[-12px]"
    >

  <figure class="border border-black rounded min-h-[300px] relative">
    <span style="top: 24px; left: 32px" class="absolute bottom-0 left-0 transform -translate-x-1/2 -translate-y-1/2 uppercase rounded bg-black text-white p-[8px] text-[1.2rem] leading-none ">
      used
    </span>
  </figure>

    <div class="flex justify-between text-sm grow">
      <div>
        <p>${product.title}</p>
        <p>${product.variants[0].price} KR.</p>
      </div>
      <div class="text-right">
        <p class="font-medium">Condition</p>
        <p class="font-normal">Slightly used</p>
      </div>
    </div>

    <button
      class="add-to-cart uppercase text-white bg-black font-bold py-[16px] rounded leading-none"
    >
      Add to cart
    </button>
  </article>
  `;

  cardsContainer.insertAdjacentHTML('beforeend', html);

  const addToCartButton =
    cardsContainer.lastElementChild.querySelector('.add-to-cart');

  addToCartButton.addEventListener('click', () => {
    handleAddToCart(product);
  });
};

export const renderCardsProducts = products => {
  clearContainer(cardsContainer);
  products.forEach(product => {
    renderCard(product);
  });
};
