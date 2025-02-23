import React, { useState } from "react";
import "../styles/ReceiverDashboard.css";
import { FaFilter, FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";
import Chat from "./Chat";

const ReceiverDashboard = () => {
  const [activeSection, setActiveSection] = useState("availableBooks");
  const [conditionFilter, setConditionFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [currentDonator, setCurrentDonator] = useState(null);
  const [myRequests, setMyRequests] = useState([]); // State for My Requests

  const availableBooks = [
    { id: "BK001", title: "React Basics", author: "John Doe", condition: "Good", genre: "Technology", credits: 50, description: "Learn React from scratch.", donator: "Alice", rating: 4.5 },
    { id: "BK002", title: "TypeScript", author: "Jane Wilson", condition: "Excellent", genre: "Technology", credits: 40, description: "Master Python programming.", donator: "Bob", rating: 4.8 },
    { id: "BK003", title: "The Hamlet", author: "F. Scott Fitzgerald", condition: "Fair", genre: "Fiction", credits: 30, description: "A classic American novel.", donator: "Charlie", rating: 4.2 },
    { id: "BK004", title: "Astrophysics", author: "Neil deGrasse Tyson", condition: "Excellent", genre: "Science", credits: 45, description: "A simple guide to astrophysics.", donator: "David", rating: 4.7 },
  ];

  const filteredBooks = availableBooks.filter((book) => {
    return (
      (conditionFilter === "" || book.condition === conditionFilter) &&
      (genreFilter === "" || book.genre === genreFilter) &&
      (searchQuery === "" || book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  // Updated chat handler
  const handleChatWithDonor = () => {
    setCurrentDonator(selectedBook.donator);
    setShowChat(true);
    closeModal();
  };

  // Add book to My Requests
  const handleRequestBook = () => {
    if (selectedBook && !myRequests.some((request) => request.id === selectedBook.id)) {
      setMyRequests([...myRequests, selectedBook]);
      closeModal();
    }
  };

  // Remove book from My Requests
  const handleCancelRequest = () => {
    if (selectedBook) {
      setMyRequests(myRequests.filter((book) => book.id !== selectedBook.id));
      closeModal();
    }
  };

  const toggleWishlist = (book) => {
    if (wishlist.find(item => item.id === book.id)) {
      setWishlist(wishlist.filter(item => item.id !== book.id));
    } else {
      setWishlist([...wishlist, book]);
    }
  };

  const isInWishlist = (bookId) => {
    return wishlist.some(book => book.id === bookId);
  };

  // Check if book is already requested
  const isRequested = (bookId) => {
    return myRequests.some(book => book.id === bookId);
  };

  // Modal Component
  const BookDetailsModal = () => {
    if (!showModal || !selectedBook) return null;

    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>
            <FaTimes />
          </button>
          <div className="modal-body">
            <div className="modal-info-section">
              <h3>{selectedBook.title}</h3>
              <div className="book-info-grid">
                <div className="info-item">
                  <label>Author</label>
                  <span>{selectedBook.author}</span>
                </div>
                <div className="info-item">
                  <label>Condition</label>
                  <span>{selectedBook.condition}</span>
                </div>
                <div className="info-item">
                  <label>Genre</label>
                  <span>{selectedBook.genre}</span>
                </div>
                <div className="info-item">
                  <label>Rating</label>
                  <span>{selectedBook.rating} ⭐</span>
                </div>
                <div className="info-item">
                  <label>Donator</label>
                  <span>{selectedBook.donator}</span>
                </div>
              </div>
              <div className="modal-description">
                <label>Description</label>
                <p>{selectedBook.description}</p>
              </div>
              <div className="modal-actions">
                <button className="chat-btn" onClick={handleChatWithDonor}>
                  Chat with {selectedBook.donator}
                </button>
                {isRequested(selectedBook.id) ? (
                  <button className="cancel-request-btn" onClick={handleCancelRequest}>
                    Cancel Request
                  </button>
                ) : (
                  <button className="request-btn" onClick={handleRequestBook}>
                    Request Book
                  </button>
                )}
                <button 
                  className={`wishlist-btn ${isInWishlist(selectedBook.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(selectedBook)}
                >
                  {isInWishlist(selectedBook.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                  {isInWishlist(selectedBook.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showChat ? (
        <Chat 
          donator={currentDonator}
          onBack={() => setShowChat(false)}
        />
      ) : (
        <div className="dashboard-container">
          <h2>📚 Book Receiver Dashboard</h2>

          <div className="nav-buttons">
            <button onClick={() => setActiveSection("availableBooks")}>Available Books</button>
            <button onClick={() => setActiveSection("myRequests")}>
              My Requests ({myRequests.length})
            </button>
            <button onClick={() => setActiveSection("wishlist")}>
              Wishlist ({wishlist.length})
            </button>
          </div>

          {activeSection === "availableBooks" && (
            <>
              <div className="filter-container">
                <input
                  type="text"
                  className="search-bar1"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
                  <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              {showFilters && (
                <div className="filters">
                  <select onChange={(e) => setConditionFilter(e.target.value)}>
                    <option value="">All Conditions</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                  <select onChange={(e) => setGenreFilter(e.target.value)}>
                    <option value="">All Genres</option>
                    <option value="Technology">Technology</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                  </select>
                </div>
              )}

              <div className="section">
                <h3>Available Books</h3>
                <div className="book-list">
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                      <div className="book-card" key={book.id}>
                        <h3>{book.title}</h3>
                        <p><strong>Donator:</strong> {book.donator}</p>
                        <p><strong>Rating:</strong> {book.rating} ⭐</p>
                        <div className="book-actions">
                          <button onClick={() => handleViewBook(book)}>View</button>
                          <button 
                            onClick={() => toggleWishlist(book)}
                            className={`wishlist-btn ${isInWishlist(book.id) ? 'active' : ''}`}
                          >
                            {isInWishlist(book.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No books available with selected filters.</p>
                  )}
                </div>
              </div>
            </>
          )}

          {activeSection === "myRequests" && (
            <div className="section">
              <h3>My Requests ({myRequests.length})</h3>
              <div className="book-list">
                {myRequests.length > 0 ? (
                  myRequests.map((book) => (
                    <div className="book-card" key={book.id}>
                      <h3>{book.title}</h3>
                      <p><strong>Donator:</strong> {book.donator}</p>
                      <p><strong>Rating:</strong> {book.rating} ⭐</p>
                      <div className="book-actions">
                        <button onClick={() => handleViewBook(book)}>View</button>
                        <button 
                          className="cancel-request-btn"
                          onClick={() => handleCancelRequest(book.id)}
                        >
                          Cancel Request
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>You have no requests yet.</p>
                )}
              </div>
            </div>
          )}

          {activeSection === "wishlist" && (
            <div className="section">
              <h3>My Wishlist ({wishlist.length})</h3>
              <div className="book-list">
                {wishlist.length > 0 ? (
                  wishlist.map((book) => (
                    <div className="book-card" key={book.id}>
                      <h3>{book.title}</h3>
                      <p><strong>Donator:</strong> {book.donator}</p>
                      <p><strong>Rating:</strong> {book.rating} ⭐</p>
                      <div className="book-actions">
                        <button onClick={() => handleViewBook(book)}>View</button>
                        <button 
                          onClick={() => toggleWishlist(book)}
                          className="wishlist-btn active"
                        >
                          <FaHeart color="red" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Your wishlist is empty.</p>
                )}
              </div>
            </div>
          )}

          <BookDetailsModal />
        </div>
      )}
    </>
  );
};

export default ReceiverDashboard;