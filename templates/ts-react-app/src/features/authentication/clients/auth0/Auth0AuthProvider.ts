import { AppAuthProvider } from '../../services/AuthenticationServiceInterface';

export class Auth0AuthProvider implements AppAuthProvider {
    signInWithEmailAndPassword(email: string, password: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    signInWithGoogle(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    signOut(): void {
        throw new Error('Method not implemented.');
    }
    register(email: string, password: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    resetPassword(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getUser() {
        throw new Error('Method not implemented.');
    }
    verifyEmail(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getEmailVerified(): boolean {
        throw new Error('Method not implemented.');
    }
    useAuthHook?() {
        throw new Error('Method not implemented.');
    }
    persistAuth(userAuth: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    refreshToken(): Promise<{ accessToken: string; refreshToken: string; } | null> {
        throw new Error('Method not implemented.');
    }
}