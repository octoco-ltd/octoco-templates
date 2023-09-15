import { createAsyncThunk } from '@reduxjs/toolkit';

export const persistAuth = createAsyncThunk(
    'user/persistAuth',
    async (params: { user: any; accessToken: string }, { rejectWithValue }) => {
        try {
            const userAuth = {
                user: params.user,
                accessToken: params.accessToken,
            };
            return userAuth;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);
