import { GridPaginationModel } from '@mui/x-data-grid/models';
import { PostSchemaVM } from 'src/models/posts.model';
import { ENDPOINT, TAG, TAG_ID } from '../config/apiTags';
import { baseApi } from './baseApi.service';

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ############################## GET ALL POSTS w. PAGINATION ###################################
    // NOTE: Mock API does not support pagination
    getAllPostsPaginated: builder.query<PostSchemaVM[], GridPaginationModel>({
      query: (paginationModel) =>
        `${ENDPOINT.POSTS}?limit=${paginationModel.pageSize}&offset=${paginationModel.page * paginationModel.pageSize}`,
      providesTags: (result, error, page) =>
        result
          ? [
            // Provides a tag for each post in the current page,
            // as well as the 'PARTIAL-LIST' tag.
            ...result.map(({ id }: { id: string }) => ({ type: TAG.POSTS as const, id })),
            { type: TAG.POSTS, id: TAG_ID.PARTIAL_LIST },
          ]
          : [{ type: TAG.POSTS, id: TAG_ID.PARTIAL_LIST }],
      extraOptions: { maxRetries: 1 } // will retry this 1 times
    }),
    // ############################## GET ALL POSTS ###################################
    getAllPosts: builder.query<PostSchemaVM[], void>({
      query: () => ENDPOINT.POSTS,
      providesTags: [TAG.POSTS],
    }),
    // ############################## GET POST BY ID ###################################
    getPostById: builder.query<PostSchemaVM, string>({
      query: (postId) => ({
        url: `${ENDPOINT.POSTS}/${postId}/`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: TAG.POST, id: arg }],
    }),
    // ############################## UPDATE ENTIRE POST BY ID ###################################
    putPostById: builder.mutation<any, PostSchemaVM>({
      query: (post) => ({
        url: `${ENDPOINT.POSTS}/${post.id}/`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: TAG.POSTS, id: arg.id }, TAG.POSTS],
    }),
    // ############################## UPDATE PARTIAL POSTS BY ID ###################################
    patchPostById: builder.mutation<any, PostSchemaVM>({
      query: (post) => ({
        url: `${ENDPOINT.POSTS}/${post.id}/`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: TAG.POSTS, id: arg.id }, TAG.POSTS],
    }),
  }),
})

export const {
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  usePutPostByIdMutation,
  usePatchPostByIdMutation,
  useGetAllPostsPaginatedQuery,
  useLazyGetAllPostsPaginatedQuery,
} = postsApi;