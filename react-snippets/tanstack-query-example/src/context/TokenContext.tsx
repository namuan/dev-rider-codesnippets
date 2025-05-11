import {ReactNode, useEffect} from 'react';
import axios from 'axios';
import {TokenContext} from './tokenUtils.ts';
import {useQuery} from "@tanstack/react-query";

interface TokenResponse {
    accessToken?: string;
    token?: string;
    access_token?: string;
}

const apiClient = axios.create({
    baseURL: 'https://dummyjson.com',
});

const fetchToken = async (username: string, password: string, expiresInMins: number = 60): Promise<string> => {
    const {data} = await apiClient.post<TokenResponse>(
        '/auth/login',
        {
            username,
            password,
            expiresInMins,
        }
    );
    return data.accessToken || data.token || data.access_token || '';
};

interface TokenProviderProps {
    clientId: string;
    clientSecret: string;
    children: ReactNode;
}

export const TokenProvider = ({clientId, clientSecret, children}: TokenProviderProps) => {
    const {data: token, isLoading: tokenLoading, error: tokenError} = useQuery({
        queryKey: ["token", clientId],
        queryFn: () => fetchToken(clientId, clientSecret),
        enabled: !!clientId && !!clientSecret,
    });

    useEffect(() => {
        if (token) {
            sessionStorage.setItem("authToken", token);
        }
        if (tokenError) {
            sessionStorage.removeItem("authToken");
        }
    }, [token, tokenError]);

    return (
        <TokenContext.Provider value={{
            token: token ?? null,
            tokenError: tokenError ? tokenError.message : null,
            tokenLoading
        }}>
            {children}
        </TokenContext.Provider>
    )
};