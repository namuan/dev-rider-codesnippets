import {createContext} from "react";
import {ApiService} from "../services/publicApiService";
import {IAuthService} from "../services/auth.service";

export interface DependencyContainer {
    authService: IAuthService;
    apiService: ApiService;
}

export const DependencyContext = createContext<DependencyContainer | null>(null);
