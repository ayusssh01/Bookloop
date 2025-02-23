//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ToasterComponent from "./MyComponents/ui/Toaster";
import Landing from "./Pages/Landing";
import Navbar from "./MyComponents/Navbar";
import Footer from "./MyComponents/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Review from "./Pages/Review";
import Profile from "./Pages/ProfileFolder/Profile";
import DonateBooks from "./Pages/DonateBooks";
import Library from "./Pages/Library";
import About from "./Pages/About";
import Leaderboard from "./Pages/Leaderboard";

import HelpSupport from "./Pages/HelpSupport";
import Admin from "./Pages/Admin";
import ReceiverDashboard from "./Pages/ReceiverDashboard";
import Courses from "./Pages/Courses";
import Chat from "./Pages/Chat";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/*<Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/reviewPath" element={<Review />} />
          <Route path="/profilePath" element={<Profile />} />
          <Route path="/donateBooks" element={<DonateBooks />} />
          <Route path="/library" element={<Library />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/HelpSupport" element={<HelpSupport />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/receiverDashboard" element={<ReceiverDashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/chat" element={<Chat />} />
         
        </Routes>
        <Footer/>
        <ToasterComponent />
      </Router>
    </AuthProvider>
  );
};

export default App;
