import {AuthService, IUser} from "./auth.service";

export interface IApiService {
    fetchUserProfile(): Promise<IUser>;

    fetchSomePublicData(): Promise<{ message: string }>;
}

export class ApiService implements IApiService {

    constructor(private authService: AuthService) {
        console.log("ApiService instantiated");
    }

    fetchSomePublicData(): Promise<{ message: string }> {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                console.log("ApiService: fetchSomePublicData");
                return resolve({message: "This is some public data fetched from the API"});
            }, 300);
        });
    }

    fetchUserProfile(): Promise<IUser> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.authService.isAuthenticated()) {
                    console.log("ApiService: User not authenticated");
                    return reject(new Error("User not authenticated"));
                }

                const user = this.authService.getUser();
                if (!user) {
                    return reject(new Error("ApiService: User not found after authenticated"));
                }

                console.log(`ApiService: Fetching profile for ${user.email}`);
                return resolve(user);
            }, 700);
        });
    }
}
