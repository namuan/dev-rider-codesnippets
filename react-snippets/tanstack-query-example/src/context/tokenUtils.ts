import {createContext, useContext} from 'react';

interface TokenContextProps {
    token: string | null;
    tokenError: string | null;
    tokenLoading: boolean;
}

export const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const useTokenContext = (): TokenContextProps => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useTokenContext must be used within a TokenProvider');
    }
    return context;
};

export function useToken() {
    return useTokenContext();
}
