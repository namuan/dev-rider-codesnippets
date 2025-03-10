import {useEffect} from "react";

export function useTimeout(delay: number | undefined, callback: () => void) {
    useEffect(() => {
        if (!delay) return;
        const timeout = setTimeout(callback, delay);
        return () => {
            clearTimeout(timeout);
        }
    }, [delay, callback]);
}
