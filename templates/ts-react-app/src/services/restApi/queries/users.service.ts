import { GridPaginationModel } from '@mui/x-data-grid/models';
import { ENDPOINT, TAG, TAG_ID } from '../config/apiTags';
import { UserSchemaVM } from '../../../models/users.model';
import { baseApi } from './baseApi.service';

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ############################## GET ALL USERS w. PAGINATION ###################################
    // NOTE: Mock API does not support pagination
    getAllUsersPaginated: builder.query<UserSchemaVM[], GridPaginationModel>({
      query: (paginationModel) =>
        `${ENDPOINT.USERS}?limit=${paginationModel.pageSize}&offset=${paginationModel.page * paginationModel.pageSize}`,
      providesTags: (result, error, page) =>
        result
          ? [
            // Provides a tag for each user in the current page,
            // as well as the 'PARTIAL-LIST' tag.
            ...result.map(({ name }: { name: string }) => ({ type: TAG.USERS as const, name })),
            { type: TAG.USERS, id: TAG_ID.PARTIAL_LIST },
          ]
          : [{ type: TAG.USERS, id: TAG_ID.PARTIAL_LIST }],
      extraOptions: { maxRetries: 1 } // will retry this 1 times
    }),
    // ############################## GET ALL USERS ###################################
    getAllUsers: builder.query<UserSchemaVM[], void>({
      query: () => ENDPOINT.USERS,
      providesTags: [TAG.USERS],
    }),
    // ############################## GET USER BY ID ###################################
    getUserById: builder.query<UserSchemaVM, string>({
      query: (userId) => ({
        url: `${ENDPOINT.USERS}/${userId}/`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: TAG.USER, id: arg }],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetAllUsersPaginatedQuery,
} = usersApi;