// ✅ src/pages/Login.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { setUser } = useAuth(); // ← only works if AuthProvider is wrapping App
  const navigate = useNavigate();

  const login = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", form);
      setUser(data.username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      navigate("/board");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
