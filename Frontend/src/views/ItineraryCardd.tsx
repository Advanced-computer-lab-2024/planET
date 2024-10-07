import React, { useState } from 'react';
import './ItineraryCardd.css';
import { Container, Badge, Modal, Button } from 'react-bootstrap';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { MdTimeline } from 'react-icons/md';
import Rating from '../components/Rating/Rating'; // Optional

const ItineraryCardd: React.FC = () => {
  // State to handle modals and bookmarking
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showTourGuideModal, setShowTourGuideModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showDatesModal, setShowDatesModal] = useState(false);

  // State for selected date and time
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: '2024-10-10',
    time: '10:00 AM'
  });

  // Sample itinerary data
  const itineraryData = {
    name: 'Historical Cairo Tour',
    tags: ['History', 'Cultural', 'Walking'],
    average_rating: 4.5,
    tourGuide: {
      name: 'John Doe',
    },
    category: 'Cultural Tour',
    availableDates: [
      { date: '2024-10-10', time: '10:00 AM' },
      { date: '2024-10-11', time: '02:00 PM' },
    ],
    price: 100,
    timeline: ['Visit the Pyramids', 'Lunch at a local restaurant', 'Visit the Egyptian Museum'],
  };

  // Function to toggle bookmark state
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Functions to open and close modals
  const handleDetailsModal = () => setShowDetailsModal(!showDetailsModal);
  const handleTourGuideModal = () => setShowTourGuideModal(!showTourGuideModal);
  const handleTimelineModal = () => setShowTimelineModal(!showTimelineModal);
  const handleDatesModal = () => setShowDatesModal(!showDatesModal);

  // Function to handle date selection
  const handleDateSelection = (dateObj: { date: string, time: string }) => {
    setSelectedDateTime(dateObj); // Set the selected date and time
    setShowDatesModal(false); // Close the dates modal
  };

  return (
    <Container className='mt-3'>
      <div className="activity-card">
        <div className="activity-details">
          <div className="image-placeholder">
            {/* Placeholder for image if necessary */}
          </div>
          <div className="details">
            <div className="d-flex align-items-center">
              <h2 className="me-3">{itineraryData.name}</h2>
              {itineraryData.tags.map((tag, index) => (
                <Badge key={index} pill bg="tag" className="me-2 custom-badge">
                  {tag}
                </Badge>
              ))}
              <div className="d-flex align-items-center ms-5 rating-stars">
                <div style={{ marginLeft: '12rem' }}>
                  <Rating rating={itineraryData.average_rating} readOnly={true} />
                </div>
                <Badge className="ms-2 review-badge text-center" style={{ fontSize: "1rem" }}>
                  {itineraryData.average_rating}
                </Badge>
              </div>
            </div>
            <p className='Category'>{itineraryData.category}</p>
            
            <p className='date' onClick={handleTourGuideModal} style={{ cursor: 'pointer', color: '#d76f30' }}>
              {itineraryData.tourGuide.name}
            </p>
            
            <p className="date" onClick={handleDatesModal} style={{ cursor: 'pointer', color: '#d76f30' }}>
              View Available Dates
            </p>
            <p className="date" onClick={handleTimelineModal} style={{ cursor: 'pointer', color: '#d76f30' }}>
              View Timeline
            </p>
            <p className="price">${itineraryData.price}</p>

            <div className="d-flex justify-content-center">
              <button className="reserve-button" onClick={handleDetailsModal}>View Details</button>
            </div>

          </div>
        </div>
      </div>

      {/* Modal for Itinerary Details */}
      <Modal show={showDetailsModal} onHide={handleDetailsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Itinerary Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {itineraryData.name}</p>
          <p><strong>Category:</strong> {itineraryData.category}</p>
          <p><strong>Date & Time:</strong> {new Date(selectedDateTime.date).toLocaleDateString()} at {selectedDateTime.time}</p>
          <p><strong>Price:</strong> ${itineraryData.price}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Tour Guide Info */}
      <Modal show={showTourGuideModal} onHide={handleTourGuideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tour Guide Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {itineraryData.tourGuide.name}</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Phone:</strong> +1 234-567-8901</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTourGuideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Timeline */}
      <Modal show={showTimelineModal} onHide={handleTimelineModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Itinerary Timeline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {itineraryData.timeline.map((event, index) => (
              <li key={index}><strong>{index + 1}:</strong> {event}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTimelineModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Available Dates */}
      <Modal show={showDatesModal} onHide={handleDatesModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Available Dates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {itineraryData.availableDates.map((dateObj, index) => (
              <li key={index} onClick={() => handleDateSelection(dateObj)} style={{ cursor: 'pointer', color: '#d76f30' }}>
                {new Date(dateObj.date).toLocaleDateString()} - {dateObj.time}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDatesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ItineraryCardd;