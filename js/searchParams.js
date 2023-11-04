import { PRODUCTS_PER_PAGE } from '../constants/config';

export function setSearchParams(page) {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set('page', page || 1);
  searchParams.set(
    'itemsPerPage',
    parseInt(searchParams.get('itemsPerPage')) || PRODUCTS_PER_PAGE,
  );

  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  history.pushState({}, '', newUrl);
}
