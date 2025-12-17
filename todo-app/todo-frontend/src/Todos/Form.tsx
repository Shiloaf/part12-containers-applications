import React, { useState } from "react";

const TodoForm = ({
  createTodo,
}: {
  createTodo: ({ text }: { text: string }) => Promise<void>;
}) => {
  const [text, setText] = useState("");

  const onChange = ({ target }: { target: HTMLInputElement }) => {
    setText(target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setText("");
    createTodo({ text });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="text" value={text} onChange={onChange} />
      <button type="submit"> Submit </button>
    </form>
  );
};

export default TodoForm;
