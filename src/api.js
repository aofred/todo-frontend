const baseUrl = "http://localhost:8080/api";

async function getCurrentUser() {
  const response = await fetch(`${baseUrl}/auth/me`, {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  return await response.json();
}

async function signup(username, password) {
  const response = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }
}

async function login(username, password) {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }
}

async function logout() {
  const response = await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

async function getTodos() {
  const response = await fetch(`${baseUrl}/todos`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Couldn't fetch todos");
  }

  return await response.json();
}

async function createTodo(description) {
  const response = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      description,
      done: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not create todo");
  }

  return await response.json();
}


async function updateTodo(todo) {
  const response = await fetch(`${baseUrl}/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      description: todo.description,
      done: todo.done,
    }),
  });

  if (!response.ok) {
    throw new Error("Couldn't update todo");
  }

  return await response.json();
}

async function deleteTodo(id) {
  const response = await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Couldn't delete todo");
  }
}


export { getCurrentUser, signup, login, logout, getTodos, 
         createTodo, updateTodo, deleteTodo };