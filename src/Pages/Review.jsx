import React, { useState } from 'react';
//import { Star } from 'lucide-react';
import '../styles/Review.css';

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave, interactive = false }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={filled ? "gold" : "none"} 
    stroke="currentColor" 
    strokeWidth="2"
    className={`star-icon ${interactive ? 'interactive' : ''}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ThumbsUpIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    className="thumbs-up-icon"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

const Review = () => {
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    content: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Jane Cooper",
      rating: 5,
      date: "2025-02-15",
      title: "Absolutely fantastic!",
      content: "This product exceeded all my expectations. The quality is outstanding and the customer service was excellent.",
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      author: "Robert Smith",
      rating: 4,
      date: "2025-02-14",
      title: "Great value for money",
      content: "Very satisfied with my purchase. Would definitely recommend to others looking for a reliable solution.",
      helpful: 15,
      verified: true
    },
    {
      id: 3,
      author: "Alice Johnson",
      rating: 3,
      date: "2025-02-10",
      title: "Good but could be better",
      content: "The product works as advertised but there's room for improvement in terms of user interface.",
      helpful: 8,
      verified: false
    }
  ]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    const review = {
      id: reviews.length + 1,
      author: "Current User",
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      title: newReview.title,
      content: newReview.content,
      helpful: 0,
      verified: true
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 0, title: '', content: '' });
  };

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="reviews-container">
      {/* Heading moved to the top */}
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <div className="average-rating">
          <div className="rating-number">{averageRating.toFixed(1)}</div>
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} filled={star <= averageRating} />
            ))}
          </div>
          <div className="review-count">({reviews.length} reviews)</div>
        </div>
      </div>

      {/* Review Submission Form */}
      <div className="review-form-container">
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmitReview} className="review-form">
          <div className="rating-input">
            <label>Your Rating:</label>
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  filled={star <= (hoverRating || newReview.rating)}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  interactive={true}
                />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              placeholder="Give your review a title"
              required
            />
          </div>
          <div className="form-group">
            <label>Review:</label>
            <textarea
              value={newReview.content}
              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
              placeholder="Write your review here"
              required
            />
          </div>
          <button type="submit" className="submit-button5">Submit Review</button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div>
                <h3 className="review-title">{review.title}</h3>
                <div className="review-meta">
                  <div className="stars-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} filled={star <= review.rating} />
                    ))}
                  </div>
                  <span className="review-author">
                    by {review.author}
                    {review.verified && (
                      <span className="verified-badge">✓ Verified Purchase</span>
                    )}
                  </span>
                </div>
              </div>
              <span className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <div className="review-content">
              <p>{review.content}</p>
              <button
                onClick={() => handleHelpful(review.id)}
                className="helpful-button"
              >
                <ThumbsUpIcon />
                Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;