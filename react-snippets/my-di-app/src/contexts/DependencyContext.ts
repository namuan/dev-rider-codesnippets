import {createContext} from "react";
import {IApiService} from "../services/api.service";
import {IAuthService} from "../services/auth.service";

export interface IDependencyContainer {
    authService: IAuthService;
    apiService: IApiService;
}

export const DependencyContext = createContext<IDependencyContainer | null>(null);
