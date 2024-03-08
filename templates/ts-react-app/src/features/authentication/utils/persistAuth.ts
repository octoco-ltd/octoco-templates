import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUserSlice } from 'src/store/user/userSlice.contracts';

/**
 * Persists user authentication data asynchronously.
 *
 * @param params - The parameters for persisting user authentication.
 * @param params.userAuth - The user authentication data to persist.
 * @param rejectWithValue - A function to reject the async thunk with a value.
 * @returns A promise that resolves to the user authentication data or rejects with an error message.
 */
export const persistAuth = createAsyncThunk(
    'user/persistAuth',
    async (
        params: { userAuth: IUserSlice },
        { rejectWithValue }
    ) => {
        try {
            return params.userAuth;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);