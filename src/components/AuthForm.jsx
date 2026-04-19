import { useState } from "react";

export default function AuthForm({ mode, onSubmit, onSwitchMode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit(username, password);
    setUsername("");
    setPassword("");
  }

  return (
    <div>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">
          {isLogin ? "Login" : "Create account"}
        </button>
      </form>

      <button type="button" onClick={onSwitchMode}>
        {isLogin
          ? "Need an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </div>
  );
}
