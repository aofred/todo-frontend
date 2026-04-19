import { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import HomePage from "./components/HomePage";
import { getCurrentUser, login, logout, signup } from "./api";

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleSignup(username, password) {
    setMessage("");

    try {
      await signup(username, password);
      setMessage("Signup successful. You can now log in.");
      setAuthMode("login");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleLogin(username, password) {
    setMessage("");

    try {
      await login(username, password);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleLogout() {
    setMessage("");

    try {
      await logout();
      setUser(null);
      setAuthMode("login");
    } catch (error) {
      setMessage(error.message);
    }
  }

  if (user) {
    return (
      <div>
        <HomePage user={user} onLogout={handleLogout} />
        {message && <p>{message}</p>}
      </div>
    );
  }

  return (
    <div>
      <AuthForm
        mode={authMode}
        onSubmit={authMode === "login" ? handleLogin : handleSignup}
        onSwitchMode={() => {
          setMessage("");
          setAuthMode(authMode === "login" ? "signup" : "login");
        }}
      />
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;