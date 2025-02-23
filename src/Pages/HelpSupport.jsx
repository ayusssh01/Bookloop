import React, { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { Button2 } from "../MyComponents/ui/Button2";
import { Card, CardContent } from "../MyComponents/ui/Card";
import '../styles/HelpSupport.css'; // Import the CSS file

const faqs = [
  {
    question: "How does this book donation platform work?",
    answer: "You can donate books by listing them on our platform, and interested users can request them.",
  },
  {
    question: "Is there any cost involved in donating or receiving books?",
    answer: "No, our platform is completely free to use.",
  },
  {
    question: "How do I list a book for donation?",
    answer: "Go to the Donate Books page, fill in the book details, and submit.",
  },
  {
    question: "Can I donate books in bulk?",
    answer: "Yes, you can donate multiple books at once.",
  },
  {
    question: "How can I request a book?",
    answer: "Browse the available books and click the Request Books button. Our platform will make sure of the further proceedings.",
  },
];

const HelpSupport = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [openReportForm, setOpenReportForm] = useState(false);
  const [reportData, setReportData] = useState({ name: "", email: "", issue: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReportChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log("Reported Issue:", reportData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setReportData({ name: "", email: "", issue: "" });
      setOpenReportForm(false);
    }, 3000);
  };

  return (
    <div className="help-support-container">
      <h1 className="title">Help & Support 📚</h1>

      {/* FAQ Section */}
      <Card>
        <CardContent className="faq-section">
          <h2 className="section-title">Frequently Asked Questions (FAQs)</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button className="faq-question" onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
                  {faq.question}
                  {openFAQ === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFAQ === index && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Us */}
      <Card>
        <CardContent className="contact-section">
          <h2 className="section-title">Contact Us</h2>
          <p>📧 Email: bookloop025@gmail.com</p>
          <p>📞 Phone: +91 12345 XXXXX</p>
        </CardContent>
      </Card>

      {/* Report a Problem */}
      <Card>
        <CardContent className="report-section">
          <h2 className="section-title">Report a Problem
          <button className="report-button" onClick={() => setOpenReportForm(!openReportForm)}>
            {openReportForm ? "Close Form" : "Click here to report"}
          </button>
          </h2>

          {openReportForm && (
            <form className="report-form" onSubmit={handleReportSubmit}>
              <input type="text" name="name" placeholder="Your Name" value={reportData.name} onChange={handleReportChange} required />
              <input type="email" name="email" placeholder="Your Email" value={reportData.email} onChange={handleReportChange} required />
              <textarea name="issue" placeholder="Describe the issue..." rows="4" value={reportData.issue} onChange={handleReportChange} required></textarea>
              <button type="submit" className="submit-button">Submit Report</button>
              {isSubmitted && <p className="success-message">✅ Issue reported successfully!</p>}
            </form>
          )}
        </CardContent>
      </Card>

      {/* Live Chat Button */}
      <Button2 className="live-chat-button">
        <MessageCircle /> Live Chat
      </Button2>
    </div>
  );
};

export default HelpSupport;