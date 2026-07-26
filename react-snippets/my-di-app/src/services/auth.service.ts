export interface IUser {
    id: string
    name: string
    email: string
}

type AuthStateListener = (isAuthenticated: boolean, user: IUser | null) => void;

export interface IAuthService {
    login(username: string, password_DO_NOT_USE: string): Promise<IUser>;
    logout(): void;
    getUser(): IUser | null;
    isAuthenticated(): boolean;
    getToken(): string | null;
    subscribe(listener: AuthStateListener): () => void;
}

export class AuthService implements IAuthService {
    private user: IUser | null = null;
    private token: string | null = null;
    private listeners: Set<AuthStateListener> = new Set();

    constructor() {
        console.log("AuthService instantiated");
        const storedUser = localStorage.getItem("authUser");
        const storedToken = localStorage.getItem("authToken");
        if (storedUser && storedToken) {
            this.user = JSON.parse(storedUser);
            this.token = storedToken;
        }
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener(this.isAuthenticated(), this.user));
    }

    getToken(): string | null {
        return this.token;
    }

    getUser(): IUser | null {
        return this.user;
    }

    isAuthenticated(): boolean {
        return !!this.user && !!this.token;
    }

    async login(username: string, password_DO_NOT_USE: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === "user" && password_DO_NOT_USE === "password") {
                    this.user = {id: "1", name: "Test User", email: "blah@jj.com"};
                    this.token = "fake-jwt-token";
                    localStorage.setItem("authUser", JSON.stringify(this.user));
                    localStorage.setItem("authToken", this.token);
                    console.log("AuthService: Login successful");
                    this.notifyListeners();
                    resolve(this.user);
                } else {
                    console.log("AuthService: Login failed.");
                    reject(new Error(`Invalid username or password: ${username}`));
                }
            }, 500);
        });
    }

    logout(): void {
        console.log("AuthService logout");
        this.user = null;
        this.token = null;
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
        this.notifyListeners();
        console.log("AuthService logout successful");
    }

    subscribe(listener: AuthStateListener): () => void {
        this.listeners.add(listener);
        listener(this.isAuthenticated(), this.user);

        return () => {
            this.listeners.delete(listener);
        }
    }
}