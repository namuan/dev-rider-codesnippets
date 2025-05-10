import {useState, useEffect, ReactNode} from 'react';
import axios from 'axios';
import {TokenContext} from './tokenUtils.ts';

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
    const [token, setToken] = useState<string | null>(
        typeof window !== 'undefined' ? sessionStorage.getItem('authToken') : null
    );
    const [tokenError, setTokenError] = useState<string | null>(null);
    const [tokenLoading, setTokenLoading] = useState(true);

    useEffect(() => {
        if (!clientId || !clientSecret) {
            setTokenError('Missing client credentials');
            setTokenLoading(false);
            return;
        }

        (async () => {
            setTokenLoading(true);
            setTokenError(null);
            try {
                const t = await fetchToken(clientId, clientSecret);
                setToken(t);
                sessionStorage.setItem('authToken', t);
            } catch (err: any) {
                setTokenError(err?.response?.data?.error_description || err.message || 'Failed to fetch token');
                sessionStorage.removeItem('authToken');
            } finally {
                setTokenLoading(false);
            }
        })();
    }, [clientId, clientSecret]);

    return (
        <TokenContext.Provider value={{token, tokenError, tokenLoading}}>
            {children}
        </TokenContext.Provider>
    );
};