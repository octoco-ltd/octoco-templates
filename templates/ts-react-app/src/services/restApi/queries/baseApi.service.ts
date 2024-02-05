import { baseQueryWithTokenExpirationCheck } from '../config/query.config';
import { TAG_TYPES } from '../config/apiTags';
import { createApi } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithTokenExpirationCheck,
  tagTypes: [...TAG_TYPES],
  endpoints: () => ({}),
});