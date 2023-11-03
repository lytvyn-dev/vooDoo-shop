import store from './store';
import { getProducts } from './store/slices/productsSlice';
const cardsContainer = document.getElementById('products-container');

const renderCart = product => {
  const html = `
	<article
	class="font-bold flex flex-col gap-[12px] md:w-[34.1%] lg:w-[25.4%] px-[12px] mx-[-12px]"
>
<figure class="border border-black rounded min-h-[300px] relative">
  <span style="top: 12px; left: 12px" class="absolute bottom-0 left-0 transform -translate-x-1/2 -translate-y-1/2 uppercase rounded bg-black text-white p-[8px] text-[1.2rem] leading-none ">
    used
  </span>
</figure>

	<div class="flex justify-between text-sm">
		<div>
			<p>Product name</p>
			<p>000 KR.</p>
		</div>
		<div class="text-right">
			<p class="font-medium">Condition</p>
			<p class="font-normal">Slightly used</p>
		</div>
	</div>
	<button
		class="uppercase text-white bg-black font-bold py-[16px] rounded leading-none"
	>
		Add to cart
	</button>
</article>
	`;

  cardsContainer.insertAdjacentHTML('beforeend', html);
};

store.dispatch(getProducts());

store.subscribe(() => {
  const state = store.getState();
  const products = state.products.items;
  console.log(state.products.items);

  products.forEach(product => {
    renderCart(product);
  });
});
