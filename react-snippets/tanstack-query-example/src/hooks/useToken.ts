import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchToken = async (username: string, password: string, expiresInMins: number = 60): Promise<string> => {
  const { data } = await axios.post(
    'https://dummyjson.com/auth/login',
    {
      username,
      password,
      expiresInMins
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return data.accessToken || data.token || data.access_token;
};

export function useToken(clientId: string, clientSecret: string) {
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      setTokenLoading(true);
      setTokenError(null);
      try {
        const t = await fetchToken(clientId, clientSecret);
        setToken(t);
      } catch (err: any) {
        setTokenError(err?.response?.data?.error_description || err.message || 'Failed to fetch token');
      } finally {
        setTokenLoading(false);
      }
    };
    getToken();
  }, [clientId, clientSecret]);

  return { token, tokenError, tokenLoading };
}