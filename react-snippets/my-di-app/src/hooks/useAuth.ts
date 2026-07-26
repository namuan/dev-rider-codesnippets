import {useEffect, useState} from "react";
import {useService} from "./useService";
import {IUser} from "../services/auth.service";

export const useAuth= () => useService('authService')

export const useAuthState = () => {
    const authService = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
    const [user, setUser] = useState<IUser | null>(authService.getUser());
    const [isLoading, setIsLoading] = useState(true); // To handle initial check

    useEffect(() => {
        const unsubscribe = authService.subscribe((isAuth, authUser) => {
            setIsAuthenticated(isAuth);
            setUser(authUser);
            setIsLoading(false); // Initial state set
        });
        // Ensure isLoading is false after first notification from subscribe
        if (isLoading && !authService.isAuthenticated()) {
            setIsLoading(false);
        }

        return () => unsubscribe(); // Cleanup on unmount
    }, [authService, isLoading]); // Add isLoading to deps to re-run if it was true

    return {isAuthenticated, user, isLoading, authService};
};
