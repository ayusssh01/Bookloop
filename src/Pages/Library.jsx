import { useState } from "react";
import { FaSearch, FaUpload, FaStar, FaFilePdf, FaVideo, FaFilter, FaTrophy, FaComment, FaBookmark, FaEye, FaBell } from "react-icons/fa";
import "../styles/Library.css";

const dummyContent = [
  { id: 1, title: "Advanced Data Structures", type: "pdf", uploader: "Alice", rating: 4.5, comments: 10, views: 200 },
  { id: 2, title: "Machine Learning Basics", type: "video", uploader: "Bob", rating: 5, comments: 15, views: 300 },
  { id: 3, title: "Operating Systems Notes", type: "pdf", uploader: "Charlie", rating: 4, comments: 8, views: 150 },
  { id: 4, title: "Introduction to Cybersecurity", type: "pdf", uploader: "Bhaskar Saha", rating: 4.5, comments: 10, views: 200 },
  { id: 5, title: "Database Management System", type: "pdf", uploader: "Dr.Moutishi Singh", rating: 4.5, comments: 10, views: 200 },
  { id: 6, title: "Human Psychology", type: "pdf", uploader: "Tapash Mukherjee", rating: 4.5, comments: 10, views: 200 },
  { id: 7, title: "Hamlet by William Shakepeare", type: "pdf", uploader: "Samay Raina", rating: 4.5, comments: 10, views: 200 },
  { id: 8, title: "Finance & Management", type: "pdf", uploader: "Vikram Ahuja", rating: 4.5, comments: 10, views: 200 },
  { id: 9, title: "Natural Language Processing", type: "video", uploader: "Dr.Sanchita Ghosh", rating: 4.5, comments: 10, views: 200 },
  { id: 10, title: "C++ Jenny lectures", type: "video", uploader: "Jenny Kumari", rating: 4.5, comments: 10, views: 200 },
  { id: 11, title: "Full Stack Course", type: "video", uploader: "Codehelp", rating: 4.5, comments: 10, views: 200 },
  { id: 12, title: "Deep learning Course", type: "video", uploader: "Krishh Naik", rating: 4.5, comments: 10, views: 200 },
];

export default function Library() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const filteredContent = [...dummyContent, ...uploadedFiles].filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) && (filterType === "all" || item.type === filterType)
  );

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFile = {
        id: filteredContent.length + 1,
        title: file.name,
        type: file.type.includes("pdf") ? "pdf" : "video",
        uploader: "You",
        rating: 0,
        comments: 0,
        views: 0,
      };
      setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  return (
    <div className="library-container">
      {/* Header Section */}
      <header className="library-header">
        <h1>Educational Content Library</h1>
        <p>Find and share study materials with ease</p>
      </header>
      
      {/* Search & Filters */}
      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select onChange={(e) => setFilterType(e.target.value)} defaultValue="all" className="filter-select">
          <option value="all">All Types</option>
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
        </select>
        <button className="filter-button"><FaFilter /> Filter</button>
      </div>
      
      {/* Content Grid */}
      <div className="content-grid">
        {filteredContent.map((content) => (
          <div key={content.id} className="content-card">
            <div className="content-icon">
              {content.type === "pdf" ? <FaFilePdf className="pdf-icon" /> : <FaVideo className="video-icon" />}
            </div>
            <h2 className="content-title">{content.title}</h2>
            <p className="content-uploader">Uploaded by: {content.uploader}</p>
            <div className="content-rating">
              <FaStar /> {content.rating}
            </div>
            <div className="content-views">
              <FaEye /> {content.views} Views
            </div>
            <div className="content-comments">
              <FaComment /> {content.comments} Comments
            </div>
            <div className="content-actions">
              <button className="bookmark-button"><FaBookmark /> Save</button>
              <button className="view-button">View</button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Uploads Section */}
      <div className="recent-uploads">
        <h2>📅 Recent Uploads</h2>
        <ul>
          <li>"Introduction to AI" - David</li>
          <li>"Deep Learning Notes" - Emma</li>
          <li>"Data Science Basics" - John</li>
        </ul>
      </div>
      
      {/* Leaderboard Section */}
      <div className="leaderboard-section">
        <h2><FaTrophy /> Top Contributors</h2>
        <ul>
          <li>Alice - 50 uploads</li>
          <li>Bob - 45 uploads</li>
          <li>Charlie - 40 uploads</li>
        </ul>
      </div>
      
      {/* Notification Section */}
      <div className="notification-section">
        <h2><FaBell /> Notifications</h2>
        <p>No new notifications</p>
      </div>
      
      {/* Upload Section */}
      <div className="upload-section">
        <FaUpload className="upload-icon" />
        <p className="upload-text">Drag & Drop to upload your study materials</p>
        <input type="file" onChange={handleFileUpload} className="upload-input" />
      </div>
    </div>
  );
}