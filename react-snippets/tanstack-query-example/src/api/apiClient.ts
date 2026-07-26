import axios, {AxiosError} from "axios";
import {QueryClient} from "@tanstack/react-query";

const apiClient = axios.create({
    baseURL: 'https://dummyjson.com/',
})

let queryClient: QueryClient | null = null;

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401 && queryClient) {
            await queryClient.invalidateQueries({queryKey: ['token']})
            throw new Error('Authentication error, refreshing token and retrying...')
        }

        return Promise.reject(error);
    }
);

export const setApiClientQueryClient = (qc: QueryClient) => {
    queryClient = qc;
}

export default apiClient;
