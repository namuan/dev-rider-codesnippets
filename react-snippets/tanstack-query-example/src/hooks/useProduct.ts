import {QueryClient, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {Product} from '../types/Product';
import {useToken} from "../context/tokenUtils.ts";

const fetchProduct = async (token: string, productId: number, queryClient: QueryClient): Promise<Product> => {
    try {
        const {data} = await axios.get(`https://dummyjson.com/products/${productId}`, {
            headers: {
                Authorization: `Bearer invalid${token}`,
            },
        })
        return data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
            await queryClient.invalidateQueries({queryKey: ['token']})
            throw new Error('Authentication error, refreshing token and retrying...')
        }
        throw err;
    }
};

export function useProduct() {
    const {token} = useToken();
    const queryClient = useQueryClient();
    const productId = 3;
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProduct(token!, productId, queryClient),
        enabled: !!token,
        retry: (failureCount, error) => {
            return !!(error.message.includes('Authentication error') && failureCount < 3);
        }
    });
}
