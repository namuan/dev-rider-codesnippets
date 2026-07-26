import {DependencyContext, DependencyContainer} from "../contexts/DependencyContext";
import {useContext} from "react";

export function useService<K extends keyof DependencyContainer>(serviceName: K): DependencyContainer[K] {
    const container = useContext(DependencyContext);

    if (!container) {
        throw new Error("useService must be used within a DependencyProvider");
    }

    if (!container[serviceName]) {
        throw new Error(`Service ${serviceName} not found in DependencyProvider`);
    }

    return container[serviceName];
}
