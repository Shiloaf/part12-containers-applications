import React from "react";

import { Todo } from "../types";

const TodoList = ({
  todos,
  deleteTodo,
  completeTodo,
}: {
  todos: Todo[];
  deleteTodo: (todo: Todo) => void;
  completeTodo: (todo: Todo) => void;
}) => {
  const onClickDelete = (todo: Todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo: Todo) => () => {
    completeTodo(todo);
  };

  return (
    <>
      {todos.length > 0 &&
        todos
          .map((todo) => {
            const doneInfo = (
              <>
                <span>This todo is done</span>
                <span>
                  <button onClick={onClickDelete(todo)}> Delete </button>
                </span>
              </>
            );

            const notDoneInfo = (
              <>
                <span>This todo is not done</span>
                <span>
                  <button onClick={onClickDelete(todo)}> Delete </button>
                  <button onClick={onClickComplete(todo)}> Set as done </button>
                </span>
              </>
            );

            return (
              <div
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
              </div>
            );
          })
          .reduce(
            (acc, cur) => [...acc, <hr key={acc.length} />, cur],
            [] as React.ReactElement[],
          )}
    </>
  );
};

export default TodoList;
