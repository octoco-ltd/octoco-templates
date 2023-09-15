import { createAsyncThunk } from '@reduxjs/toolkit';

export const syncUserSlice = createAsyncThunk(
    'user/syncUserSlice',
    async (params: { user: any }, { rejectWithValue }) => {
        try {
            const userAuth = {
                user: params.user,
            };
            return userAuth;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);
