import React, { useState, useEffect } from "react";
import "../styles/Leaderboard.css";
import { FaMedal, FaSearch, FaTrophy, FaGift, FaBookReader } from "react-icons/fa";

const sampleUsers = [
    { id: 1, name: "Alice", credits: 320, donated: 15, received: 10 },
    { id: 2, name: "Bob", credits: 290, donated: 10, received: 12 },
    { id: 3, name: "Charlie", credits: 270, donated: 20, received: 8 },
    { id: 4, name: "David", credits: 250, donated: 8, received: 15 },
    { id: 5, name: "Emma", credits: 230, donated: 18, received: 7 },
    { id: 6, name: "Frank", credits: 210, donated: 12, received: 9 },
    { id: 7, name: "Grace", credits: 195, donated: 5, received: 20 },
    { id: 8, name: "Hank", credits: 180, donated: 14, received: 6 },
    { id: 9, name: "Ivy", credits: 160, donated: 7, received: 14 },
    { id: 10, name: "Jack", credits: 140, donated: 9, received: 11 }
];

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [showEmojis, setShowEmojis] = useState(false);

    useEffect(() => {
        const sortedUsers = [...sampleUsers].sort((a, b) => b.credits - a.credits);
        setUsers(sortedUsers);
        setShowEmojis(true);
        setTimeout(() => setShowEmojis(false), 3000);
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (type) => {
        setFilter(type);
    };

    // Get top 3 users (always displayed)
    const topThreeUsers = [...users].slice(0, 3);

    // Get remaining users filtered by search and sort criteria
    const getRemainingFilteredUsers = () => {
        let remainingUsers = [...users].slice(3);
        
        // Apply search filter if exists
        if (search) {
            remainingUsers = remainingUsers.filter(user => 
                user.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply sorting based on filter type
        switch(filter) {
            case "top-donors":
                remainingUsers.sort((a, b) => b.donated - a.donated);
                break;
            case "top-receivers":
                remainingUsers.sort((a, b) => b.received - a.received);
                break;
            default:
                remainingUsers.sort((a, b) => b.credits - a.credits);
        }

        return remainingUsers;
    };

    const remainingUsers = getRemainingFilteredUsers();

    return (
        <div className="leaderboard-container">
            {showEmojis && (
                <div className="emoji-container">
                    {[...Array(40)].map((_, i) => (
                        <span 
                            key={i} 
                            className="party-emoji"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                fontSize: `${Math.random() * (32 - 20) + 20}px`
                            }}
                        >
                            {['🎉', '🎊', '🎈', '🏆', '⭐', '🌟', '✨', '🎯'][Math.floor(Math.random() * 8)]}
                        </span>
                    ))}
                </div>
            )}
            <h1 className="leaderboard-title">🏆 Leaderboard</h1>
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input 
                    type="text" 
                    placeholder="Search user..." 
                    value={search} 
                    onChange={handleSearch}
                />
            </div>
            <div className="filter-buttons">
                <button onClick={() => handleFilterChange("all")} className={filter === "all" ? "active" : ""}>All</button>
                <button onClick={() => handleFilterChange("top-donors")} className={filter === "top-donors" ? "active" : ""}>Top Donors <FaGift /></button>
                <button onClick={() => handleFilterChange("top-receivers")} className={filter === "top-receivers" ? "active" : ""}>Top Receivers <FaBookReader /></button>
            </div>
            
            {/* Top three users - always displayed */}
            <div className="top-three">
                {topThreeUsers.map((user, index) => (
                    <div key={user.id} className={`top-user rank-${index + 1}`}>
                        <FaTrophy className={`trophy trophy-${index + 1}`} />
                        <span className="rank">#{index + 1}</span>
                        <span className="name">{user.name}</span>
                        <span className="credits">{user.credits} credits</span>
                    </div>
                ))}
            </div>
            {/* Remaining users - filtered and sorted */}
            <div className="leaderboard-list">
                {remainingUsers.map((user) => {
                    // Find original index in users array to maintain original ranking
                    const originalRank = users.findIndex(u => u.id === user.id) + 1;
                    return (
                        <div key={user.id} className="leaderboard-item">
                            <span className="rank">#{originalRank}</span>
                            <span className="name">{user.name}</span>
                            <span className="credits">{user.credits} credits</span>
                            <span className="donated">📚 {user.donated} donated</span>
                            <span className="received">🎁 {user.received} received</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Leaderboard;