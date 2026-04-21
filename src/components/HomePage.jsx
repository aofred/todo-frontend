import { useState, useEffect } from "react";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../api";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function HomePage({ user, onLogout }) {
  const [todos, setTodos] = useState([]);
  // const [newDescription, setNewDescription] = useState("");
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

  async function handleCreateTodo(description) {
    setMessage("");
    
    if (!description.trim()) {
      setMessage("Please enter a todo description");
      return;
    }
    

    try {
      const createdTodo = await createTodo(description);
      setTodos([...todos, createdTodo]);
      //setNewDescription("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleToggleTodo(todo) {
    setMessage("");

    try {
      const updatedTodo = await updateTodo({
        ...todo,
        done: !todo.done
      });

      setTodos((currentTodos) => 
        currentTodos.map((currentTodo) =>
          currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo)
      );
    } catch (error) {
    setMessage(error.message);
    }
  }

  async function handleDeleteTodo(id) {
    setMessage("");

    try {
      await deleteTodo(id);
      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>Logged in as: {user.username}</p>

      <h2>Todos</h2>

      <TodoForm onCreateTodo={handleCreateTodo} />
      <TodoList todos={todos} 
                onToggleTodo={handleToggleTodo} 
                onDeleteTodo={handleDeleteTodo} 
      />

      {message && <p>{message}</p>}

      <button onClick={onLogout}>Logout</button>
    </div>
  );

  /*
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
  */
}
