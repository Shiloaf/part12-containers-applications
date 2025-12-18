import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

const TodoView = () => {
  return (
    <>
      <h1>Todos</h1>
      <TodoForm />
      <TodoList />
    </>
  );
};

export default TodoView;
