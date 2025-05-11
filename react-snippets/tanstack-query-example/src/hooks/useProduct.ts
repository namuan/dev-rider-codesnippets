import {useQuery} from '@tanstack/react-query';
import {Product} from '../types/Product';
import {useToken} from "../context/tokenUtils.ts";
import apiClient from "../api/apiClient.ts";

const fetchProduct = async (token: string, productId: number): Promise<Product> => {
    const {data} = await apiClient.get(`/products/${productId}`, {
        headers: {
            Authorization: `Bearer invalid${token}`,
        },
    })
    return data;
};

export function useProduct() {
    const {token} = useToken();
    const productId = 3;
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProduct(token!, productId),
        enabled: !!token,
        retry: (failureCount, error) => {
            return !!(error.message.includes('Authentication error') && failureCount < 3);
        }
    });
}
