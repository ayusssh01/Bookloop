import React, { useState } from "react";
import "../styles/PassRecovery.css"; // Ensure this CSS file exists for styling

const PassRecovery = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOTP = (e) => {
    e.preventDefault();
    // Simulating API call for OTP generation
    setMessage("OTP has been sent to your email ID.");
    setOtpSent(true);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    // Simulating OTP verification (you can replace this with an API call)
    if (otp === "123456") {
      setMessage("OTP verified successfully. You can reset your password now.");
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="modal-overlay3">
      <div className="modal-content3">
        <h2>Recover Password</h2>
        {message && <p className="success-message">{message}</p>}
        {!otpSent ? (
          <form onSubmit={handleSendOTP}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit">Verify OTP</button>
          </form>
        )}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PassRecovery;
