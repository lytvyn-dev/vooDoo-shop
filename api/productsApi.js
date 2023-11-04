import { PRODUCTS_PER_PAGE } from '../constants/config';
import axios from 'axios';

export const getProductsApi = async page => {
  try {
    const response = await axios.get(
      `https://voodoo-sandbox.myshopify.com/products.json?limit=${PRODUCTS_PER_PAGE}&page=${page}`,
    );

    return response.data.products;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
