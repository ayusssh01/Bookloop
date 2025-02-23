import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PassRecovery from "./PassRecovery"; // Import the modal
import "../styles/Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", role: "" });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email: formData.email, password: formData.password, role: formData.role });
      navigate('/');
    } catch (err) {
      setError(err.message || "Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      
      <p>
        <span 
          className="forgot-password-text" 
          onClick={() => setShowModal(true)}
        >
          Forgot Password?
        </span>
      </p>
      
      <p>Don't have an account? <Link to="/register">Register</Link></p>

      {showModal && <PassRecovery onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Login;
