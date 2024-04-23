/**
 * This module provides custom functionality for making authenticated API requests using Redux Toolkit Query.
 * It includes token handling and retrying requests in case of token expiration.
 *
 * @module AuthenticatedQuery
 * @preferred
 */

import {
  BaseQueryFn, FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery, retry,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { toast } from 'react-toastify';
import { logout, refreshToken } from 'src/features/authentication';
import { useUserAuthStore } from 'src/store/userAuth/userAuthStore';

/**
 * A mutex for ensuring only one token refresh operation occurs at a time.
 */
const mutex = new Mutex();

/**
 * The base query for making API requests. It includes handling authorization headers.
 */
const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers, { getState }: any) => {
    const token: string | null = useUserAuthStore.getState().accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  baseUrl: process.env.REACT_APP_BASE_API_URL,
});

/**
 * A staggered base query that allows for a maximum number of retries in case of network errors.
 * The maximum number of retries can be overridden with `extraOptions: { maxRetries: <N> }` within extra options on the injected endpoint.
 */
const staggeredBaseQuery = retry(baseQuery, {
  maxRetries: 2,
});

/**
 * A custom base query function that handles token expiration and refreshes the token when necessary.
 *
 * @param args - The API request arguments.
 * @param api - The API instance.
 * @param extraOptions - Extra options for the query.
 * @returns The result of the API request.
 */
export const baseQueryWithTokenExpirationCheck: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait until the mutex is available without locking it.
  await mutex.waitForUnlock();

  let result = await staggeredBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Checking whether the mutex is locked.
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // Get a new access token.
        // console.log('Getting New Refresh Token'); // TODO: REMOVE THIS TOAST IF THIS SOLUTION WORKS
        const refreshResult = await refreshToken();
        // console.log('refresh result', refreshResult); // TODO: REMOVE THIS TOAST IF THIS SOLUTION WORKS

        if (refreshResult && refreshResult.accessToken && refreshResult.refreshToken) {
          // Retry the initial query.
          // console.log('Running API again'); // TODO: REMOVE THIS TOAST IF THIS SOLUTION WORKS
          result = await staggeredBaseQuery(args, api, extraOptions);
        } else {
          throw new Error('Refresh Token Error');
        }
      } catch {
        toast.dismiss();
        toast.error('Session expired. Please log in again.');
        setTimeout(function () {
          logout()
        }, 2000);

        // We can bail out of retries if we know it is going to be redundant - not authenticated at all.
        retry.fail(result.error);
      } finally {
        // Release must be called once the mutex should be released again.
        release();
      }
    } else {
      // Wait until the mutex is available without locking it.
      await mutex.waitForUnlock();
      result = await staggeredBaseQuery(args, api, extraOptions);
    }
  }
  if (result.error && result.error.status === 401) {
    //The result is still 401 after a retry - logging out
    logout()
  }

  return result;
};
