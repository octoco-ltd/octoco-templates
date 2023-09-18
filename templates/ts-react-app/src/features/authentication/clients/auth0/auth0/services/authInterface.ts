export interface IAuthProvider {
    login: () => void;
    logout: () => void;
    getUser: () => void;
    clientUser: any;
    isLoading: boolean;
    error: Error | undefined;
    isAuthenticated: boolean;
    isEmailVerified: boolean;
    resetPassword?: () => Promise<void>;
    refreshToken?: () => Promise<{ accessToken: string; refreshToken: string; } | null>;
    signInWithEmailAndPassword?: (email: string, password: string) => Promise<void>;
    signInWithGoogle?: () => Promise<void>;
    register?: (email: string, password: string) => Promise<void>;
}

// export interface IAuthProvider {
//     login: any;
//     logout: any;
//     // Add other methods if needed
// }

export interface IAuthService {
    login: any;
    logout: any;
    // Add other methods if needed
}