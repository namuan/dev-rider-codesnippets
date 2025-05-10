import { useTokenContext } from './TokenContext';

export function useToken() {
  return useTokenContext();
}