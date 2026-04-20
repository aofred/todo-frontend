import { useState, useEffect } from "react";
import { createTodo, getTodos } from "../api";

export default function HomePage({ user, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleCreateTodo(event) {
    event.preventDefault();
    setMessage("");

    if (!newDescription.trim()) {
      setMessage("Please enter a todo title");
      return;
    }

    try {
      const createdTodo = await createTodo(newDescription);
      setTodos([...todos, createdTodo]);
      setNewDescription("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>Logged in as: {user.username}</p>

      <h2>Todos</h2>

      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
          placeholder="Enter a new todo"
        />
        <button type="submit">Add todo</button>
      </form>

      {message && <p>{message}</p>}

      {todos.length === 0 ? (
        <p>No todos yet</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.description}
            </li>
          ))}
        </ul>
      )}

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
