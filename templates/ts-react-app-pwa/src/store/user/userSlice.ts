import { createSlice } from '@reduxjs/toolkit';
import { persistAuth } from 'src/features/authentication/utils/persistAuth';
import { RootState } from '../store';
import { IUserSlice } from './userSlice.contracts';
import { resetUser } from 'src/features/authentication/utils/resetUser';

const initialState: IUserSlice = {
  user: null,
  status: 'idle',
  accessToken: null,
  refreshToken: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Dispatch resetUser to reset the redux store. Handy when clearing user sessions when logging out.
     */
    resetUser(state, action) {
      console.log('resetting store');
    }
  },
  extraReducers(builder) {
    builder
      //########################### Persist Auth ###########################
      .addCase(persistAuth.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(persistAuth.fulfilled, (state, action) => {
        state.status = action.payload.status
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.user = action.payload.user
        state.error = action.payload.error
      })
      .addCase(persistAuth.rejected, (state, action) => {
        state.status = 'error'
        state.accessToken = null
        state.refreshToken = null
        state.user = null
        state.error = action.error.message
      })
      //########################### Reset User ###########################
      .addCase(resetUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(resetUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.accessToken = null
        state.refreshToken = null
        state.user = null
        state.error = null
      })
      .addCase(resetUser.rejected, (state, action) => {
        state.status = 'error'
        state.accessToken = null
        state.refreshToken = null
        state.user = null
        state.error = action.error.message
      })
  }
}
);

export default userSlice.reducer;

export const selectUser = (state: RootState): typeof initialState => state.user;
