import React from "react";

import {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
} from "../store/apiSlice";

const TodoList = () => {
  const { data: todos, isLoading } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();

  if (!todos || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {todos.length > 0 &&
        todos
          .map((todo) => {
            const doneInfo = (
              <>
                <span>This todo is done</span>
                <span>
                  <button onClick={() => deleteTodo(todo._id)}> Delete </button>
                </span>
              </>
            );

            const notDoneInfo = (
              <>
                <span>This todo is not done</span>
                <span>
                  <button onClick={() => deleteTodo(todo._id)}> Delete </button>
                  <button onClick={() => completeTodo(todo._id)}>
                    {" "}
                    Set as done{" "}
                  </button>
                </span>
              </>
            );

            return (
              <li
                key={todo._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: "70%",
                  margin: "auto",
                }}
              >
                <span>{todo.text}</span>
                {todo.done ? doneInfo : notDoneInfo}
              </li>
            );
          })
          .reduce(
            (acc, cur) => [...acc, <hr key={acc.length} />, cur],
            [] as React.ReactElement[],
          )}
    </ul>
  );
};

export default TodoList;
