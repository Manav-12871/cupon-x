import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ThreeDBackground from '../components/ThreeDBackground';
import Chatbox from '../components/Chatbox';

// Custom hook to detect when an element is in the viewport
const useOnScreen = (options) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};


const Home = () => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [heroRef, heroIsVisible] = useOnScreen({ threshold: 0.1 });
  const [howItWorksRef, howItWorksIsVisible] = useOnScreen({ threshold: 0.1, rootMargin: "-100px" });
  const [popularDealsRef, popularDealsIsVisible] = useOnScreen({ threshold: 0.1, rootMargin: "-100px" });
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  useEffect(() => {
    // Trigger the page entry animation
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const heroStyle = {
    color: 'white',
    padding: '15vh 0',
    textAlign: 'center',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const animationStyle = (isVisible, delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
    transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    transitionDelay: `${delay}s`,
  });

  const dummyCoupons = [
    { id: 1, title: '50% off on Shoes', platform: 'Myntra', price: 99, logo: 'https://placehold.co/40x40/a83232/ffffff?text=M' },
    { id: 2, title: '₹200 Cashback', platform: 'Amazon', price: 49, logo: 'https://placehold.co/40x40/f7941d/ffffff?text=A' },
    { id: 3, title: 'BOGO Pizza', platform: 'Dominos', price: 149, logo: 'https://placehold.co/40x40/2575fc/ffffff?text=D' },
  ];

  const pageAnimationStyle = {
    opacity: pageLoaded ? 1 : 0,
    transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
  };

  return (
    <>
      <ThreeDBackground />
      <div style={{ ...pageAnimationStyle, position: 'relative', zIndex: 1 }}>
        <style type="text/css">
          {`
          /* --- FONT STYLES --- */
          .display-2, .section-header, h3.fs-4.fw-semibold {
            font-family: 'Exo 2', sans-serif;
          }
          .hero-button, .card-button {
            font-family: 'Roboto Condensed', sans-serif;
            text-transform: none;
            letter-spacing: 1px;
          }
          .lead, .text-muted, .card-body {
            font-family: 'Poppins', sans-serif;
          }

          /* --- COMPONENT STYLES --- */
          .hero-button {
            transition: transform 0.3s ease, box-shadow 0.3s ease !important;
            border-radius: 50px;
            padding: 12px 30px;
            background-color: rgba(0, 255, 255, 0.1); /* Cyan tint */
            border: 1px solid rgba(0, 255, 255, 0.4);
            backdrop-filter: blur(10px);
            color: #FFFFFF !important;
          }
          .hero-button:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 8px 25px rgba(0, 255, 255, 0.3);
            background-color: rgba(0, 255, 255, 0.2);
            border-color: rgba(0, 255, 255, 0.6);
          }
          .feature-icon-wrapper {
            background-color: rgba(0, 255, 255, 0.1);
            border-radius: 50%;
            width: 80px;
            height: 80px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
            border: 1px solid rgba(0, 255, 255, 0.3);
          }
          .feature-icon-wrapper:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            background-color: rgba(0, 255, 255, 0.2);
          }
          .feature-icon {
            width: 40px;
            height: 40px;
            stroke-width: 1.5;
            color: #00ffff; /* Cyan color for icons */
          }
          .luffy-chat-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 70px;
            height: 70px;
            background: linear-gradient(45deg, #888888, #00ffff); /* Grey to Cyan gradient */
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            cursor: pointer;
            border: none;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 1000;
          }
          .luffy-chat-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 30px rgba(0, 255, 255, 0.4);
          }
          .card {
            background-color: rgba(28, 9, 58, 0.75) !important; /* Deep Purple */
            border: 1px solid rgba(200, 200, 200, 0.3) !important; /* Grey border */
            color: #f8f9fa !important;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            backdrop-filter: blur(10px);
            border-radius: 15px; 
          }
          .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.25);
            border-color: rgba(200, 200, 200, 0.5) !important;
          }
          .section-container {
            background-color: rgba(13, 2, 33, 0.7); /* Even darker purple */
            padding: 80px 40px; /* Added horizontal padding */
            border-radius: 25px;
            margin-bottom: 40px;
            border: 1px solid rgba(200, 200, 200, 0.2); 
            backdrop-filter: blur(5px);
            /* New textured background */
            background-image: 
              linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
          }
          .card-button {
            background-color: #8D99AE !important; /* Cool grey button */
            border-color: #8D99AE !important;
            color: #FFFFFF !important;
            transition: background-color 0.3s ease, border-color 0.3s ease;
          }
          .card-button:hover {
            background-color: #B2BECD !important; /* Lighter grey on hover */
            border-color: #B2BECD !important;
          }
          .section-header {
            color: #ffffff;
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.5); /* Pure Cyan glow */
          }
          .text-muted {
            color: #ced4da !important; 
          }
          h3.fs-4.fw-semibold {
            color: #FFFFFF; /* High-contrast white for titles */
          }
          `}
        </style>

        <Container ref={heroRef} style={{ ...animationStyle(heroIsVisible), ...heroStyle }}>
          <div style={{ position: 'relative', zIndex: 1, textShadow: '0px 2px 10px rgba(0,0,0,0.5)' }}>
            <h1 className="display-2 fw-bold" style={animationStyle(heroIsVisible, 0.2)}>
              The Ultimate Coupon Marketplace
            </h1>
            <p className="lead mt-3 fs-4" style={animationStyle(heroIsVisible, 0.4)}>
              Discover, buy, and sell exclusive coupons from your favorite brands.
            </p>
            <div className="mt-5" style={animationStyle(heroIsVisible, 0.6)}>
              <Link to="/buy-coupons">
                <Button variant="light" size="lg" className="me-3 fw-bold hero-button">
                  Find a Deal
                </Button>
              </Link>
              <Link to="/add-coupon">
                <Button variant="outline-light" size="lg" className="fw-bold hero-button">
                  Sell Your Coupon
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        <Container ref={howItWorksRef} style={animationStyle(howItWorksIsVisible)} className="my-5">
          <div className="section-container">
            <h2 className="text-center mb-5 fw-bold section-header">How It Works</h2>
            <Row className="text-center">
              {[
                { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", title: "1. Find Your Deal", text: "Search through thousands of verified coupons from top brands." },
                { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "2. Purchase Securely", text: "Buy the coupons you want with our safe and secure payment system." },
                { icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", title: "3. Save Instantly", text: "Use your purchased coupon code immediately and enjoy the savings." }
              ].map((feature, index) => (
                <Col md={4} className="mb-4" key={index} style={animationStyle(howItWorksIsVisible, index * 0.2)}>
                  <div className="feature-icon-wrapper">
                    <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="fs-4 fw-semibold">{feature.title}</h3>
                  <p className="text-muted">{feature.text}</p>
                </Col>
              ))}
            </Row>
          </div>
        </Container>

        <Container ref={popularDealsRef} style={animationStyle(popularDealsIsVisible)} className="my-5">
          <div className="section-container">
            <h2 className="text-center mb-5 fw-bold section-header">Popular Deals</h2>
            <Row>
              {dummyCoupons.map((coupon, index) => (
                <Col md={4} key={coupon.id} className="mb-4" style={animationStyle(popularDealsIsVisible, index * 0.2)}>
                  <Card className="h-100">
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-3">
                        <img src={coupon.logo} alt={coupon.platform} className="me-3 rounded-circle" />
                        <div>
                          <Card.Title className="fw-bold mb-0">{coupon.title}</Card.Title>
                          <Card.Subtitle className="text-muted">{coupon.platform}</Card.Subtitle>
                        </div>
                      </div>
                      <Button className="mt-auto w-100 fw-bold card-button">
                        Buy for ₹{coupon.price}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>

        <button className="luffy-chat-btn" onClick={() => setIsChatboxOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        <Chatbox isOpen={isChatboxOpen} onClose={() => setIsChatboxOpen(false)} />
      </div>
    </>
  );
};

export default Home;

