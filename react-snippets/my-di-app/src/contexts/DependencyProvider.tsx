import {DependencyContext, IDependencyContainer} from "./DependencyContext";
import React, {useMemo} from "react";
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";

interface DependencyProviderProps {
    children: React.ReactNode;
}

export const DependencyProvider = ({children}: DependencyProviderProps) => {
    const container = useMemo<IDependencyContainer>(() => {
        console.log("DependencyProvider: Instantiating Services");

        const authServiceInstance = new AuthService();
        const apiServiceInstance = new ApiService(authServiceInstance);

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
