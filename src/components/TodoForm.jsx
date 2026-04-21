import { useState } from "react";

const TodoForm = ({ onCreateTodo }) => {
  const [description, setDescription] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    /*
    if (!description.trim()) {
      return;
    }
    */
    await onCreateTodo(description);
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Enter a new todo"
      />
      <button type="submit">Add todo</button>
    </form>
  );
};

export default TodoForm;