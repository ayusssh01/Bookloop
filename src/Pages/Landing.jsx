import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { BookOpen, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Button from '../MyComponents/ui/Button';
import '../styles/Landing.css';
import { useAuth } from '../context/AuthContext';

// Sample Data for Books Donated vs. Received (Pie Chart)
const booksData = [
  { name: "Books Donated", value: 15000, color: "#4CAF50" },
  { name: "Books Received", value: 10000, color: "#FF9800" },
];

// Sample Data for Credits Earned vs. Spent (Histogram)
const creditsData = [
  { month: "Jan", earned: 500, spent: 300 },
  { month: "Feb", earned: 600, spent: 400 },
  { month: "Mar", earned: 750, spent: 500 },
  { month: "Apr", earned: 800, spent: 600 },
  { month: "May", earned: 950, spent: 750 },
  { month: "Jun", earned: 1100, spent: 900 },
];

const stats = [
  { id: 1, label: "Books Donated", value: "15,000+", icon: <BookOpen size={36} /> },
  { id: 2, label: "Happy Users", value: "10,000+", icon: <Users size={36} /> },
  { id: 3, label: "Average Rating", value: "4.9/5", icon: <Star size={36} /> },
];

// Course Partner Ads Data
const coursePartners = [
  {
    id: 1,
    name: "Coding Masterclass",
    logo: "coding-masterclass-logo.png",
    description: "Learn coding from industry experts. Enroll now!",
    link: "https://codingmasterclass.com",
  },
  {
    id: 2,
    name: "Data Science Bootcamp",
    logo: "data-science-logo.png",
    description: "Master data science in 12 weeks. Limited seats!",
    link: "https://datasciencebootcamp.com",
  },
  {
    id: 3,
    name: "UX Design Course",
    logo: "ux-design-logo.png",
    description: "Become a UX designer with hands-on projects.",
    link: "https://uxdesigncourse.com",
  },
];

// Carousel Settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1300,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from AuthContext

  const handleDonateClick = () => {
    if (user) {
      navigate('/donateBooks');
    } else {
      toast.error("Please log in to donate books.");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };

  const handleRequestClick = () => {
    if (user) {
      navigate('/ReceiverDashboard');
    } else {
      toast.error("Please log in to request books.");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };

  return (
    <div className="root-container">
      <main className="main-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="content-container">
            <h1 className="hero-title">
              Welcome to <span className="brand-highlight">BOOKLOOP</span>
            </h1>
            <p className="hero-subtitle">
              A world where every book finds its reader and every reader shares their knowledge!!
            </p>
            <div className="button-container">
              <Button className="donate-button" onClick={handleDonateClick}>
                Donate Books
              </Button>
              <Button className="request-button" onClick={handleRequestClick}>
                Request Books
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stats-grid">
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  className="stat-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <h2 className="stat-value">{stat.value}</h2>
                  <p className="stat-label">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <div className="chart123">
          {/* Books Donated vs. Received - Pie Chart */}
          <section className="chart-section1">
            <h2 className="chart-title">Books Donated vs. Received</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={booksData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {booksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </section>

          {/* Credits Earned vs. Spent - Histogram */}
          <section className="chart-section2">
            <h2 className="chart-title">Credits Earned vs. Spent</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={creditsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="earned" fill="#2196F3" name="Credits Earned" />
                <Bar dataKey="spent" fill="#F44336" name="Credits Spent" />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>

        {/* Course Partner Ads Section */}
        <section className="course-partners-section">
          <h2 className="section-title">Explore Courses from Our Partners</h2>
          <Slider {...settings}>
            {coursePartners.map((partner) => (
              <div key={partner.id} className="partner-card">
                <img src={partner.logo} alt={partner.name} className="partner-logo" />
                <h3 className="partner-name">{partner.name}</h3>
                <p className="partner-description">{partner.description}</p>
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-link"
                >
                  Learn More
                </a>
              </div>
            ))}
          </Slider>
          <div className="cta-container">
            <p className="cta-text">Want to feature your course here? Partner with us!</p>
            <Button className="cta-button" onClick={() => navigate('/register')}>
              Become a Partner
            </Button>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="content-container">
            <h2 className="testimonials-title">What Our Users Say</h2>
            <p className="testimonials-subtitle">
              Real experiences from our top donors and recipients.
            </p>
            <div className="testimonial-container">
              <motion.div
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="testimonial-text">
                  "BOOKLOOP changed my life! I received essential books for my studies and helped others in return!"
                </p>
                <p className="testimonial-author">- A Happy Receiver</p>
              </motion.div>

              <motion.div
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="testimonial-text">
                  "Amazing initiative! Now I don't have to buy expensive books. I can just borrow and return!"
                </p>
                <p className="testimonial-author">- Rajesh K.</p>
              </motion.div>

              <motion.div
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="testimonial-text">
                  "I donated my old books, and it feels great to help students who actually need them!"
                </p>
                <p className="testimonial-author">- Priya M.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;