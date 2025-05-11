import {useQuery} from '@tanstack/react-query';
import {Product} from '../types/Product';
import apiClient from "../api/apiClient.ts";

const fetchProduct = async (token: string, productId: number): Promise<Product> => {
    const {data} = await apiClient.get(`/products/${productId}`, {
        headers: {
            Authorization: `Bearer invalid${token}`,
        },
    })
    return data;
};

export function useToken(clientId: string, clientSecret: string, expiresInMins: number = 60) {
    return useQuery({
        queryKey: ["token", clientId],
        queryFn: () => fetchToken(clientId, clientSecret, expiresInMins),
        enabled: !!clientId && !!clientSecret,
        staleTime: 1000 * 60 * 10,
    });
}

export function useProduct(productId: number) {
    // Example usage: replace with your actual credentials
    const clientId = "emilys";
    const clientSecret = "emilyspass";
    const {data: token} = useToken(clientId, clientSecret);

    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProduct(token!, productId),
        enabled: !!token,
        retry: (failureCount, error) => {
            return !!(error.message.includes('Authentication error') && failureCount < 3);
        }
    });
}
// Helper function for token fetching
async function fetchToken(username: string, password: string, expiresInMins: number = 60): Promise<string> {
    console.log("Fetching token", username, password, expiresInMins);
    const {data} = await apiClient.post<{ accessToken?: string; token?: string; access_token?: string }>(
        '/auth/login',
        {
            username,
            password,
            expiresInMins,
        }
    );
    return data.accessToken || data.token || data.access_token || '';
}
