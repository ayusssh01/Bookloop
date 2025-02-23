import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    phoneNumber: "",
    address: "",
    role: "" // Ensure role starts as an empty string
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      newErrors.email = "Invalid email format.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.state) newErrors.state = "State selection is required.";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.role) newErrors.role = "Role selection is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      login({
        name: formData.name,
        email: formData.email,
        state: formData.state,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        role: formData.role,
      });

      // Redirect based on role
      if (formData.role === "donor_receiver") {
        navigate("/landing");
      } else if (formData.role === "courier_partner") {
        navigate("/courier-dashboard");
      } else if (formData.role === "course_partner") {
        navigate("/course-dashboard");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        {errors.name && <span className="error">{errors.name}</span>}
        
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        {errors.email && <span className="error">{errors.email}</span>}
        
        <select name="state" value={formData.state} onChange={handleChange} required>
          <option value="">Select State</option>
          {[
            "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
            "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
            "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
            "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
          ].map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <span className="error">{errors.state}</span>}
        
        <input type="text" name="phoneNumber" placeholder="Phone number" value={formData.phoneNumber} onChange={handleChange} required />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        {errors.address && <span className="error">{errors.address}</span>}

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        {errors.password && <span className="error">{errors.password}</span>}

        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

        {/* Role Selection Dropdown */}
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="" disabled>
            Select Your Role
          </option>
          <option value="donor_receiver">Donor / Receiver</option>
          <option value="courier_partner">Courier Partner</option>
          <option value="course_partner">Course Partner</option>
        </select>
        {errors.role && <span className="error">{errors.role}</span>}

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;