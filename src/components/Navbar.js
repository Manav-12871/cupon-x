import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const CustomNavbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <>
      <style type="text/css">
        {`
        .navbar-custom {
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 1030;
          background-color: rgba(13, 2, 33, 0.7);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 255, 255, 0.2);
          padding: 1rem 0;
          transition: background-color 0.3s ease;
        }
        .navbar-custom .navbar-brand,
        .navbar-custom .nav-link {
          color: #ffffff !important;
          font-family: 'Exo 2', sans-serif;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }
        .navbar-custom .navbar-brand {
          font-size: 1.75rem;
          font-weight: 700;
        }
        .navbar-custom .nav-link {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 1px;
          margin: 0 1rem;
          position: relative;
        }
        .navbar-custom .nav-link:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #00ffff;
          transition: width 0.3s ease;
        }
        .navbar-custom .nav-link:hover,
        .navbar-custom .nav-link.active {
          color: #00ffff !important;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }
        .navbar-custom .nav-link:hover:after,
        .navbar-custom .nav-link.active:after {
          width: 100%;
        }
        `}
      </style>
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/">CouponX</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/buy-coupons">Buy Coupons</Nav.Link>
              <Nav.Link as={NavLink} to="/sell-coupons">Sell Coupon</Nav.Link>
              {currentUser ? (
                <>
                  <Nav.Link as={NavLink} to="/profile" className="fw-bold" style={{ color: '#00ffff' }}>
                    Welcome, {currentUser.displayName || currentUser.email.split('@')[0]}!
                  </Nav.Link>
                  <Button variant="outline-info" onClick={handleLogout} className="ms-3" style={{ borderRadius: '20px' }}>Log Out</Button>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" className="ms-md-3">Log In</Nav.Link>
                  <Button as={Link} to="/signup" variant="info" className="ms-2 fw-bold" style={{ borderRadius: '20px', color: '#0D0221' }}>Sign Up</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default CustomNavbar;

