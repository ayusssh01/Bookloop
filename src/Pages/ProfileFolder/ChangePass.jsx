import React, { useState } from "react";
import "../../styles/ChangePass.css";

export default function ChangePass({ show, onClose, onForgotPassword }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!show) return null;

  const handlePasswordChange = () => {
    setError(""); // Clear previous errors

    if (!oldPassword.trim()) {
      setError("Old password cannot be empty!");
      return;
    }
    if (!newPassword.trim()) {
      setError("New password cannot be empty!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match!");
      return;
    }

    alert("Password changed successfully!");
    onClose();
  };

  return (
    <div className="modal-overlay1">
      <div className="modal-content1">
        <h2>Change Password</h2>

        {error && <div className="error-message">{error}</div>}

        <input 
          type="password" 
          value={oldPassword} 
          onChange={(e) => setOldPassword(e.target.value)} 
          placeholder="Enter Old Password" 
          required
        />

        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          placeholder="Enter New Password" 
          required
        />

        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm New Password" 
          required
        />

        <button onClick={handlePasswordChange} className="save-button">Save</button>
        <button onClick={onClose} className="cancel-button">Cancel</button>

        
      </div>
    </div>
  );
}
