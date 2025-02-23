import React, { useState } from "react";
import "../styles/DonateBooks.css";

const DonateBooks = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [publicationYear, setPublicationYear] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactPreference, setContactPreference] = useState("Email");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBookImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      bookTitle,
      author,
      bookDescription,
      bookImage,
      publicationYear,
      phoneNumber,
      address,
      email,
      contactPreference,
    });
  };

  // Generate years from 1900 to current year
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1900; year <= currentYear; year++) {
    years.push(year);
  }

  // Reverse the years array so that the most recent year appears first
  const reversedYears = years.reverse();

  return (
    <div className="donatebooks-container">
      <h2>Donate a Book</h2>
      <form onSubmit={handleSubmit}>
        {/* Book Title */}
        <input
          type="text"
          placeholder="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          required
        />

        {/* Author Name */}
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        {/* Publication Year */}
        <select
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          required
        >
          <option value="">Select Publication Year</option>
          {reversedYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Phone Number */}
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        {/* Donator's Address */}
        <input
          type="text"
          placeholder="Donator's Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        {/* Book Description */}
        <textarea
          placeholder="Brief Description of the Book"
          value={bookDescription}
          onChange={(e) => setBookDescription(e.target.value)}
          required
        ></textarea>

        {/* Image Upload */}
        
        <div className="image-upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {bookImage && <img src={bookImage} alt="Book Preview" className="image-preview" />}
        </div>
     
        {/* Submit Button */}
        <button type="submit">Donate Book</button>
      </form>
    </div>
  );
};

export default DonateBooks;