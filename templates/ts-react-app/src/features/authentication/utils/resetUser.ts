import { createAsyncThunk } from '@reduxjs/toolkit'

/**
 * Resets the user.
 * @returns A promise that resolves to a boolean indicating whether the user was successfully reset.
 */
export const resetUser = createAsyncThunk(
    'user/resetUser',
    async (
        _,
        { rejectWithValue }
    ) => {
        try {
            return true;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);