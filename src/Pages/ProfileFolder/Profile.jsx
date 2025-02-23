import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext"; 
import "../../styles/Profile.css";
import ChangePass from "./ChangePass";
import UpdateProf from "./UpdateProf";

export default function Profile() {
  const { logout } = useAuth(); 
  const navigate = useNavigate(); 

  const [user, setUser] = useState({
    name: "John Doe",
    phone: "123-456-7890",
    email: "johndoe@example.com",
    address: "123 Street, City",
    state: "California",
    credits: 120,
    booksDonated: 15,
    booksReceived: 5,
    contentShared: 8,
  });

  const [creditHistory] = useState([
    { id: 1, type: "Donated", book: "The Great Gatsby", credits: 20, date: "2024-02-01" },
    { id: 2, type: "Received", book: "To Kill a Mockingbird", credits: -15, date: "2024-01-15" },
    { id: 3, type: "Donated", book: "1984", credits: 10, date: "2024-01-10" },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showBuyCreditsModal, setShowBuyCreditsModal] = useState(false);
  const [creditsToBuy, setCreditsToBuy] = useState(0);

  const handleBuyCredits = () => {
    setUser({ ...user, credits: user.credits + parseInt(creditsToBuy, 10) });
    setShowBuyCreditsModal(false);
  };

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <div className="profile-container">
      <div className="card">
        <div className="heading-box">
          <h3>Personal details</h3>
        </div>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>State:</strong> {user.state}</p>
          <p><strong>Credits:</strong> {user.credits}</p>
        </div>
        <div className="button-group">
          <button onClick={() => setShowEditModal(true)} className="edit-button">Edit Profile</button>
          <button onClick={() => setShowPasswordModal(true)} className="change-password-button">Change Password</button>
          <button onClick={() => setShowBuyCreditsModal(true)} className="buy-credits-button">Buy Credits</button>
        </div>
      </div>

      <div className="card">
        <div className="heading-box">
          <h3>Activity Summary</h3>
        </div>
        <div className="activity-grid">
          <div className="activity-item"><p>Books Donated</p><span>{user.booksDonated}</span></div>
          <div className="activity-item"><p>Books Received</p><span>{user.booksReceived}</span></div>
          <div className="activity-item full-width">
            <p>Content Shared</p>
            <span>{user.contentShared}</span>
            <progress value={(user.contentShared / 10) * 100} max="100"></progress>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="heading-box">
          <h3>Credit History</h3>
        </div>
        <table className="history-table">
          <thead>
            <tr><th>Type</th><th>Book</th><th>Credits</th><th>Date</th></tr>
          </thead>
          <tbody>
            {creditHistory.map((entry) => (
              <tr key={entry.id} className={entry.type.toLowerCase()}>
                <td>{entry.type}</td>
                <td>{entry.book}</td>
                <td>{entry.credits}</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleLogout} className="logout-button">Logout</button>

      {/* Change Password Modal */}
      <ChangePass show={showPasswordModal} onClose={() => setShowPasswordModal(false)} />

      {/* Update Profile Modal */}
      <UpdateProf show={showEditModal} onClose={() => setShowEditModal(false)} />

      {/* Buy Credits Modal */}
      {showBuyCreditsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Buy Credits</h3>
            <input
              type="number"
              value={creditsToBuy}
              onChange={(e) => setCreditsToBuy(e.target.value)}
              placeholder="Enter credits to buy"
            />
            <div className="modal-buttons">
              <button onClick={handleBuyCredits}>Confirm</button>
              <button onClick={() => setShowBuyCreditsModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
