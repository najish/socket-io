import React, { useState, useContext } from "react";
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import {} from 'jwt-decode'

function Signup() {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext); 

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        username: form.username
      });

      console.log("Signup success:", res.data);

      // 👈 Automatically log in the user after signup
      const user = res.data.user;
      const token = res.data.token;
      loginUser({ ...user, token });




      alert("Signup successful!");
      navigate('/'); // redirect to home/dashboard
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
          />
        </div>

        <button type="submit" className="auth-btn">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
