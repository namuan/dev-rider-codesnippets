import {DependencyContext, DependencyContainer} from "./DependencyContext";
import React, {useMemo} from "react";
import {AuthService} from "../services/auth.service";
import {PublicApiService} from "../services/publicApiService";

interface DependencyProviderProps {
    children: React.ReactNode;
}

export const DependencyProvider = ({children}: DependencyProviderProps) => {
    const container = useMemo<DependencyContainer>(() => {
        console.log("DependencyProvider: Instantiating Services");

        const authServiceInstance = new AuthService();
        const apiServiceInstance = new PublicApiService(authServiceInstance);

        return {
            authService: authServiceInstance,
            apiService: apiServiceInstance,
        }
    }, []);
    return (
        <DependencyContext.Provider value={container}>
            {children}
        </DependencyContext.Provider>
    );
};
