import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from 'uuid';

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001",
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
            keepUnusedDataFor: 5
        }),
        getDeletedUser: builder.query({
            query: () => `deletedUsers`,
            keepUnusedDataFor: 5
        }),
        pushDeletedUser: builder.mutation({
            query: (user) => {
                const newId = {
                    ...user,
                    id:uuidv4(),
                };
                return {
                    url: 'deletedUsers',
                    method: 'POST',
                    body: newId
                }
            }
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE'
            })
        }),
        confirmUser: builder.mutation({
            query: (user) => {
                const confirmedUser = {
                    ...user,
                    confirmed: true, // Устанавливаем confirmed в true
                };
                return {
                    url: `users/${user.id}`, // Используем user.id для URL
                    method: 'PUT',
                    body: confirmedUser,
                };
            },
        }),
        confirmDeletedUser: builder.mutation({
            query: (user) => {
                const confirmedUser = {
                    ...user,
                    confirmed: true, // Устанавливаем confirmed в true
                };
                return {
                    url: `deletedUsers/${user.id}`, // Используем user.id для URL
                    method: 'PUT',
                    body: confirmedUser,
                };
            },
        }),
        banUser: builder.mutation({
            query: (user) => {
                const confirmedUser = {
                    ...user,
                    blocked: true, // Устанавливаем confirmed в true
                };
                return {
                    url: `users/${user.id}`, // Используем user.id для URL
                    method: 'PUT',
                    body: confirmedUser,
                };
            },
        }),
        banDeletedUser: builder.mutation({
            query: (user) => {
                const confirmedUser = {
                    ...user,
                    blocked: true, // Устанавливаем confirmed в true
                };
                return {
                    url: `deletedUsers/${user.id}`, // Используем user.id для URL
                    method: 'PUT',
                    body: confirmedUser,
                };
            },
        }),
    })
})

export const {
    useGetUsersQuery,
    useGetDeletedUserQuery,
    usePushDeletedUserMutation,
    useDeleteUserMutation,
    useConfirmUserMutation,
    useConfirmDeletedUserMutation,
    useBanUserMutation,
    useBanDeletedUserMutation,
} = usersApi;