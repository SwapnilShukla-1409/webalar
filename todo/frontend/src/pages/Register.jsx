import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",        // ✅ added email
    password: ""
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered successfully! Now you can log in.");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
