import React, { useState } from "react";
import "../../styles/UpdateProf.css";

export default function UpdateProfile({ show, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [image, setImage] = useState(null);

  if (!show) return null;

  const handleUpdate = () => {
    if (!name || !email || !contact || !address || !state || !pincode) {
      alert("All fields are required!");
      return;
    }
    alert("Profile updated successfully!");
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay2">
      <div className="modal-content2">
        <h2>Update Profile</h2>
        <label>
          <input 
            type="text" 
            placeholder="Enter new name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </label>
        <label>
          <input 
            type="email" 
            placeholder="Enter new email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </label>
        <label>
          <input 
            type="text" 
            placeholder="Enter contact number"
            value={contact} 
            onChange={(e) => setContact(e.target.value)} 
          />
        </label>
        <label>
          <input 
            type="text" 
            placeholder="Enter your state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text" 
            placeholder="Enter your pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </label>
        <label>
          <input 
            type="text" 
            placeholder="Enter address"
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
          />
        </label>
        <label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </label>
        {image && <img src={image} alt="Profile Preview" className="profile-preview" />}
        <div className="button-container2">
          <button onClick={handleUpdate} className="update-button">Update</button>
          <button onClick={onClose} className="cancel1-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}
