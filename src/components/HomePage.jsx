export default function HomePage({ user, onLogout }) {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Logged in as: {user.username}</p>

      <h2>Todos</h2>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
