import React, { useState, useContext } from "react";
import axios from "axios";
import "./Login.css";

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext); 
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submitted:", form);

    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);
      console.log("Login success:", res.data);
      alert(res.data.message);

      const user = res.data.user;
      const token = res.data.token;

      loginUser(user, token)

      console.log("Saved user in context:", user);
      navigate('/');
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="auth-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
