export type AuthContextInterface = {
    user: any; //firebaseUser || auth0User || cognitoUser
    loading: boolean;
    error: any;
    isAuthenticated: boolean;
    getTokens: () => Promise<{ accessToken: string | null, refreshToken: string | null } | null>
    loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
    verifyEmail: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    emailVerified: boolean;
    authHook?: any
}
