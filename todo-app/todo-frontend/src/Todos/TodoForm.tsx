import React, { useState } from "react";
import { useCreateTodoMutation } from "../store/apiSlice";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [createTodo] = useCreateTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        value={text}
        onChange={({ target }) => setText(target.value)}
      />
      <button type="submit"> Submit </button>
    </form>
  );
};

export default TodoForm;
