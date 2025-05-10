import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../types/Product';

const fetchProduct = async (token: string): Promise<Product> => {
  const { data } = await axios.get('https://dummyjson.com/products/1', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export function useProduct(token: string | null) {
  return useQuery({
    queryKey: ['product', token],
    queryFn: () => fetchProduct(token!),
    enabled: !!token,
  });
}