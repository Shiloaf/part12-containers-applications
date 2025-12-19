import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todo } from "../types";

const url =
  import.meta.env.VITE_USE_PROXY === "yes"
    ? "/api"
    : import.meta.env.VITE_BACKEND_URL;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "Todo" as const, id: _id }))
          : [],
    }),
    createTodo: builder.mutation<Todo, string>({
      query: (text) => ({
        url: "/todos",
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Todo" as const, id }],
    }),
    completeTodo: builder.mutation<Todo, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: { done: true },
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Todo" as const, id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
} = apiSlice;

export default apiSlice;
