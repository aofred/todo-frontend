const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return <p>No todos yet</p>;
  }

  const sorted = [...todos].sort((a, b) => a.done - b.done);

  return (
    <ul>
      {sorted.map((todo) => (
        <li key={todo.id}>
          <div className="todo-row">
            <span className={todo.done ? "done" : ""}>
              {todo.done ? "[DONE] " : ""}
              {todo.description}
            </span>

            <div className="todo-actions">
              <button onClick={() => onToggleTodo(todo)}>
                {todo.done ? "Mark as open" : "Mark as done"}
              </button>
              <button onClick={() => onDeleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;