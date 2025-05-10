import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../types/Product';

import {useToken} from "./useToken.ts";

const fetchProduct = async (token: string): Promise<Product> => {
  const { data } = await axios.get('https://dummyjson.com/products/2', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export function useProduct() {
  const { token } = useToken();
  return useQuery({
    queryKey: ['product', token],
    queryFn: () => fetchProduct(token!),
    enabled: !!token,
  });
}