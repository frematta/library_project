import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../api/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("jwt", token);
      onLogin(token);
    } catch {
      setError("Invalid credentials");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don’t have an account? 👉 <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}