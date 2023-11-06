import store from '../store';
import { clearContainer } from '../utils/helpers';
import { cartActions } from '../store/slices/cartSlice';

const productsContainer = document.getElementById('cart-items-container');
const cartFooter = document.getElementById('cart-footer');
const cartButton = document.getElementById('cart-button');
const closeModalBtn = document.getElementById('close-btn');
const cartModal = document.getElementById('cart-modal');
const modalBackdrop = document.getElementById('backdrop');

const renderCartItem = cartItem => {
  const html = `
	<div class="flex gap-8">
	<img src="https://via.placeholder.com/100" alt="image" />
	<div class='flex justify-between grow'>
	<ul class="flex flex-col justify-between text-sm font-bold">
		<li class="product-name ">${cartItem.title}</li>
		<li>
			<button
				data-id=${cartItem.id}
				class="decrease-quantity w-[30px] cursor-pointer"
				role="decrease"
			>
				-
			</button>
			${cartItem.quantity}
			<button
				data-id=${cartItem.id}
				class="increase-quantity w-[30px] cursor-pointer"
				role="increase"
			>
				+
			</button>
		</li>
		<li>${cartItem.variants[0].price} KR.</li>
	</ul>
	<button class='delete-item' data-id=${cartItem.id}>
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_2720_971)">
    <path d="M7 4V2H17V4H22V6H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" fill="#000"/>
  </g>
  <defs>
    <clipPath id="clip0_2720_971">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
	</button>
	</div>
	</div>
	`;

  productsContainer.insertAdjacentHTML('afterbegin', html);
};

const renderCartTotalPrice = totalPrice => {
  const html = `
	<p>Total:</p>
	<span>${totalPrice} KR.</span>
	`;

  clearContainer(cartFooter);
  cartFooter.insertAdjacentHTML('afterbegin', html);
};

export const renderCartItems = () => {
  const state = store.getState();
  const cartItems = state.cart.items;
  const cartTotalPrice = state.cart.totalPrice;
  if (cartItems.length === 0) {
    clearContainer(cartFooter);
    productsContainer.innerHTML = 'There are no products in your cart!';
  } else {
    clearContainer(productsContainer);
    cartItems.forEach(item => {
      renderCartItem(item);
    });
    renderCartTotalPrice(cartTotalPrice);
  }
};

productsContainer.addEventListener('click', event => {
  const target = event.target;
  const button = target.closest('button');
  if (!button) return;

  const itemId = button.dataset.id;

  if (button.classList.contains('decrease-quantity')) {
    store.dispatch(cartActions.decreaseQuantity({ id: +itemId }));
  } else if (button.classList.contains('increase-quantity')) {
    store.dispatch(cartActions.increaseQuantity({ id: +itemId }));
  } else if (button.classList.contains('delete-item')) {
    store.dispatch(cartActions.removeItem({ id: +itemId }));
  }
});

cartButton.addEventListener('click', e => {
  if (e.target.closest('button').id !== 'cart-button') return;
  cartModal.classList.add('modal-active');
  modalBackdrop.classList.add('modal-active');
});

closeModalBtn.addEventListener('click', e => {
  cartModal.classList.remove('modal-active');
  modalBackdrop.classList.remove('modal-active');
});
