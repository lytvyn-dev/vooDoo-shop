export function getSearchParams() {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('page', parseInt(searchParams.get('page')) || 1);
  searchParams.set(
    'itemsPerPage',
    parseInt(searchParams.get('itemsPerPage')) || 10,
  );
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  history.pushState({}, '', newUrl);
}
