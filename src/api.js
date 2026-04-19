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

export { getCurrentUser, signup, login, logout };