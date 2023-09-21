import { createAsyncThunk } from '@reduxjs/toolkit'

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