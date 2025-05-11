import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../types/Product';
import {useToken} from "../context/tokenUtils.ts";

const fetchProduct = async (token: string, productId: number): Promise<Product> => {
  const { data } = await axios.get(`https://dummyjson.com/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export function useProduct() {
  const { token } = useToken();
  const productId = 3;
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(token!, productId),
    enabled: !!token,
  });
}
