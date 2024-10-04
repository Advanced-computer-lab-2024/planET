import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import './hero.css';
import Decore from '../../assets/Decore1.svg';

const Hero: React.FC = () => {
  return (
    <>
      <div className="hero-section">
        <img src={Decore} alt="Decore1" className="decore1" />
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="hero-text">
                <h5 className="hero-subtitle ">BEST DESTINATIONS AROUND THE WORLD</h5>
                <h1>
                  Travel, <span className="highlight">enjoy</span> and live a new and full life
                </h1>
                <p>
                  Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening.
                </p>
                <div className="hero-buttons">
                  <Button variant="warning" className="me-3">Find out more</Button>
                  <Button variant="outline-secondary">
                    <FaPlay /> Play Demo
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Hero;