import { PRODUCTS_PER_PAGE, PRODUCTS_LENGTH } from '../constants/config';

const paginationContainer = document.getElementById('pagination-container');

let totalCount = Math.ceil(PRODUCTS_LENGTH / PRODUCTS_PER_PAGE);
let currentPage = 1;

const renderPageNumber = page => {
  const li = document.createElement('li');
  li.classList =
    'w-[39px] h-[39px] flex justify-center items-center active:text-white text-black border border-black active:bg-black rounded-full cursor-pointer';

  li.textContent = page;

  li.addEventListener('click', e => {
    if (page === '...') return;
    currentPage = parseInt(page, 10);
    renderPagination();
  });

  paginationContainer.insertAdjacentElement('beforeend', li);
};

export const renderPagination = () => {
  paginationContainer.innerHTML = '';
  if (totalCount <= 6) {
    for (i = 1; i <= totalCount; i++) {
      renderPageNumber(i);
    }
  } else {
    renderPageNumber('1');
    if (currentPage > 3) {
      renderPageNumber('...');
    }
    if (currentPage === totalCount) {
      renderPageNumber(currentPage - 2);
    }
    if (currentPage > 2) {
      renderPageNumber(currentPage - 1);
    }
    if (currentPage !== 1 && currentPage != totalCount) {
      renderPageNumber(currentPage);
    }
    if (currentPage < totalCount - 1) {
      renderPageNumber(currentPage + 1);
    }
    if (currentPage === 1) {
      renderPageNumber(currentPage + 2);
    }
    if (currentPage < totalCount - 2) {
      renderPageNumber('...');
    }
    renderPageNumber(totalCount);
  }
};
