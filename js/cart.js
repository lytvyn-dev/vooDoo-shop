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
	<ul class="flex flex-col justify-between">
		<li class="product-name">${cartItem.title}</li>
		<li>
			<button
				data-id=${cartItem.id}
				class="decrease-quantity border border-black w-[30px] cursor-pointer"
				role="decrease"
			>
				-
			</button>
			${cartItem.quantity}
			<button
				data-id=${cartItem.id}
				class="increase-quantity border border-black w-[30px] cursor-pointer"
				role="increase"
			>
				+
			</button>
		</li>
		<li>${cartItem.variants[0].price} KR.</li>
	</ul>
	</div>
	`;

  productsContainer.insertAdjacentHTML('afterbegin', html);
};

const renderCartTotalPrice = totalPrice => {
  const html = `
	<p>Total price: ${totalPrice} KR.</p>
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

  if (target.classList.contains('decrease-quantity')) {
    const itemId = target.dataset.id;
    store.dispatch(cartActions.decreaseQuantity({ id: +itemId }));
  } else if (target.classList.contains('increase-quantity')) {
    const itemId = target.dataset.id;
    store.dispatch(cartActions.increaseQuantity({ id: +itemId }));
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
