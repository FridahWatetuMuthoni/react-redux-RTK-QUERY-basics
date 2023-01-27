import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    //'api' is the name of the folder that contains your slice
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes:['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse:res=> res.sort((a,b)=> b.id - a.id), //new todos come at the top of the list
            providesTags:['Todos']
        }),
        addTodos: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body:todo
            }),
            invalidatesTags:['Todos']
        }),
        updateTodos: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body:todo
            }),
            invalidatesTags:['Todos']
        }),
        deleteTodos: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body:id
            }),
            invalidatesTags:['Todos']
        })
    })
})

export const {
    useGetTodosQuery,
    useAddTodosMutation,
    useUpdateTodosMutation,
    useDeleteTodosMutation
} = apiSlice