import React from 'react';
import './LatestReview.css';
import { Container } from 'react-bootstrap';

const LatestReviews: React.FC = () => {
  return (
    <Container className='allcont'>
    <div className="reviews-section">
      <h2>Latest reviews</h2>
      <div className="reviews-list">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="review-card">
            <div className="review-stars">⭐ ⭐ ⭐ ⭐ ⭐</div>
            <h3>Review title</h3>
            <p>Review body</p>
            <div className="reviewer-info">
              <img
                src="https://via.placeholder.com/40"
                alt="Reviewer"
                className="reviewer-avatar"
              />
              <div>
                <p className="reviewer-name">Reviewer name</p>
                <p className="review-date">Date</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Container>
  );
};

export default LatestReviews;