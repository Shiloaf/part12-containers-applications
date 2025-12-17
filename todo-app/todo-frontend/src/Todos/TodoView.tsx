import { useEffect, useState } from "react";
import axios from "../util/apiClient";

import List from "./List";
import Form from "./Form";
import { Todo } from "../types";

const TodoView = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const refreshTodos = async () => {
    const { data } = await axios.get("/todos");
    setTodos(data);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const createTodo = async (todo: { text: string }) => {
    const { data } = await axios.post("/todos", todo);
    setTodos([...todos, data]);
  };

  const deleteTodo = async (todo: Todo) => {
    await axios.delete(`/todos/${todo._id}`);
    refreshTodos();
  };

  const completeTodo = async (todo: Todo) => {
    await axios.put(`/todos/${todo._id}`, {
      text: todo.text,
      done: true,
    });
    refreshTodos();
  };

  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    </>
  );
};

export default TodoView;
