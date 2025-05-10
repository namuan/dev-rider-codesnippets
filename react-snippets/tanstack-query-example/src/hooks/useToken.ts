import {useTokenContext} from "../context/tokenUtils.ts";

export function useToken() {
    return useTokenContext();
}