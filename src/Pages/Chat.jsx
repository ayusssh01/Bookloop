import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import "../styles/Chat.css";

const Chat = () => {
  const { donator } = useParams(); // Donor's name from URL
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I'm interested in your book", sender: 'receiver', time: '10:30 AM' },
    { id: 2, text: "Hello! Yes, it's still available", sender: 'donor', time: '10:31 AM' },
    { id: 3, text: "Great! Is the condition exactly as described?", sender: 'receiver', time: '10:32 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'receiver', // New messages are from the receiver
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      {/* Combined Box for Header, Messages, and Input */}
      <div className="chat-box">
        {/* Header */}
        <div className="chat-header">
          <button onClick={() => navigate(0)} className="back-button">
            <ArrowLeft className="icon" />
          </button>
          <div className="header-text">
            <h2 className="donator-name">{donator}</h2> {/* Donor's name */}
            <p className="response-time">Usually responds within an hour</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'receiver' ? 'receiver' : 'donor'}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input (Footer) */}
        <form onSubmit={handleSendMessage} className="message-input">
          <div className="input-container">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="text-input"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="send-button"
            >
              <Send className="icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;