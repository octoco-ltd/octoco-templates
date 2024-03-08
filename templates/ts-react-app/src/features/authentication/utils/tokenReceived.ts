import { createAsyncThunk } from '@reduxjs/toolkit'
import store from 'src/store/store';
import { IUserSlice } from 'src/store/user/userSlice.contracts';

/**
 * Async thunk function to refresh the user token.
 * @param params - The access token and refresh token.
 * @param rejectWithValue - The function to reject the thunk with a value.
 * @returns A promise that resolves to the updated user object with the new tokens.
 */
export const tokenReceived = createAsyncThunk(
    'user/refreshUserToken',
    async (
        params: { accessToken: string; refreshToken: string; },
        { rejectWithValue }
    ) => {
        try {

            const user: IUserSlice = await store.getState().user
            return {
                ...user,
                accessToken: params.accessToken,
                refreshToken: params.refreshToken,
            };

        } catch (error: any) {

            return rejectWithValue(error.message)
        }
    }
);