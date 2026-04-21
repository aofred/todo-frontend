const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return <p>No todos yet</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>
            {todo.done ? "[DONE] " : ""}
            {todo.description}
          </span>
          <button onClick={() => onToggleTodo(todo)}>
            {todo.done ? "Mark as open" : "Mark as done"}
          </button>
          <button onClick={() => onDeleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;