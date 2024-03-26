import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserAuthState = {
    user: any | null,
    userStatus: 'authenticated' | 'error' | 'idle' | 'loading'
    accessToken: string | null,
    refreshToken: string | null,
    error: null | undefined | string,
}

export interface UserAuthActionsState {
    setUser: (user: any) => void,
    setUserStatus: (status: 'authenticated' | 'error' | 'idle' | 'loading') => void,
    setAccessToken: (accessToken: string) => void,
    setRefreshToken: (refreshToken: string) => void,
    setError: (error: null | undefined | string) => void,
    setUserState: (user: UserAuthState) => void,
    resetUserState: () => void,
}

// define the initial state
const userInitialState: UserAuthState = {
    user: null,
    userStatus: 'idle',
    accessToken: null,
    refreshToken: null,
    error: null,
};

/**
 * Custom hook for managing user authentication state.
 * @returns An object containing user authentication state and actions.
 */
export const useUserAuthStore = create<UserAuthState & UserAuthActionsState>()(
    persist(
        (set) => ({
            ...userInitialState,
            /**
             * Sets the user object.
             * @param user - The user object.
             * TODO: Define the user object type.
             */
            setUser: (user: any) => set({ user: user }),
            /**
             * Sets the user authentication status.
             * @param {'authenticated' | 'error' | 'idle' | 'loading'} status - The user authentication status.
             */
            setUserStatus: (status: 'authenticated' | 'error' | 'idle' | 'loading') => set({ userStatus: status }),
            /**
             * Sets the access token.
             * @param {string} accessToken - The access token.
             */
            setAccessToken: (accessToken: string) => set({ accessToken: accessToken }),
            /**
             * Sets the refresh token.
             * @param {string} refreshToken - The refresh token.
             */
            setRefreshToken: (refreshToken: string) => set({ refreshToken: refreshToken }),
            /**
             * Sets the error message.
             * @param error - The error message.
             */
            setError: (error: null | undefined | string) => set({ error: error }),
            /**
             * Sets the entire user authentication state.
             * @param {UserAuthState} userState - The user authentication state.
             */
            setUserState: (userState: UserAuthState) => set(userState),
            /**
             * Resets the user authentication state to its initial values.
             */
            resetUserState: () => set(userInitialState),
        }),
        // The key used to save the values of the store in localStorage.
        { name: 'userAuthStore' },
    ),
);
