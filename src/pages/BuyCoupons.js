import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import ThreeDBackground from '../components/ThreeDBackground';
import { useAuth } from '../AuthContext';

const BuyCoupons = () => {
  const { currentUser } = useAuth();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/coupons");
      const data = await response.json();

      // Sort: Available coupons first, then Sold coupons
      data.sort((a, b) => {
        if (a.status === 'available' && b.status === 'sold') return -1;
        if (a.status === 'sold' && b.status === 'available') return 1;
        return 0; // preserve original order otherwise
      });

      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleBuy = async (couponId, sellerId) => {
    if (currentUser.uid === sellerId) {
      alert("You cannot buy your own coupon!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/buy-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponId,
          buyerId: currentUser.uid
        })
      });
      if (response.ok) {
        alert("Coupon purchased successfully!");
        fetchCoupons(); // Refresh the list
      } else {
        const errorData = await response.json();
        alert("Purchase failed: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error purchasing coupon:", error);
      alert("Failed to purchase coupon");
    }
  };

  const pageAnimationStyle = {
    opacity: pageLoaded ? 1 : 0,
    transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
  };
  const platforms = ['All', ...new Set(coupons.map(c => c.platform))];
  const filteredCoupons = coupons
    .filter(coupon => selectedPlatform === 'All' || coupon.platform === selectedPlatform)
    .filter(coupon =>
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.platform.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <ThreeDBackground />
      <div style={{ ...pageAnimationStyle, position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '50px', minHeight: '100vh' }}>
        <style type="text/css">
          {`
          .page-header {
            font-family: 'Exo 2', sans-serif;
            color: #ffffff;
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
          }
          .card {
            background-color: rgba(28, 9, 58, 0.75) !important;
            border: 1px solid rgba(200, 200, 200, 0.3) !important;
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
          .card-title, .card-subtitle {
             font-family: 'Poppins', sans-serif;
          }
          .card-button {
            font-family: 'Roboto Condensed', sans-serif;
            text-transform: none;
            letter-spacing: 1px;
            background-color: #00FFFF !important;
            border-color: #00FFFF !important;
            color: #0D0221 !important;
            font-weight: 700;
            transition: all 0.3s ease;
          }
          .card-button:hover {
            background-color: #66FFFF !important;
            border-color: #66FFFF !important;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
            transform: translateY(-3px);
          }
          .filter-form .form-control, .filter-form .form-select {
            background-color: rgba(0, 255, 255, 0.1) !important;
            border: 1px solid rgba(0, 255, 255, 0.4) !important;
            color: #FFFFFF !important;
            font-family: 'Poppins', sans-serif;
          }
          .filter-form .form-control:focus, .filter-form .form-select:focus {
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5) !important;
            background-color: rgba(0, 255, 255, 0.2) !important;
          }
          .filter-form .form-control::placeholder {
            color: #8D99AE;
          }
          `}
        </style>
        <Container>
          <h1 className="text-center mb-4 display-3 page-header">Available Deals</h1>

          <Form className="mb-5 filter-form">
            <Row className="justify-content-center g-3">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Search for a deal or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Select
                  aria-label="Filter by platform"
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                >
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form>

          <Row>
            {loading ? (
              <Col className="text-center">
                <Spinner animation="border" variant="info" style={{ width: '3rem', height: '3rem' }} />
                <p className="text-light fs-5 mt-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Loading Deals...</p>
              </Col>
            ) : filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon) => (
                <Col md={4} key={coupon.id} className="mb-4">
                  <Card className="h-100">
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-3">
                        <img src={`https://placehold.co/40x40/00ffff/0D0221?text=${coupon.platform.charAt(0)}`} alt={coupon.platform} className="me-3 rounded-circle" />
                        <div>
                          <Card.Title className="fw-bold mb-0">{coupon.title}</Card.Title>
                          <Card.Subtitle className="text-muted">{coupon.platform}</Card.Subtitle>
                        </div>
                      </div>
                      {coupon.status === 'sold' ? (
                        <Button disabled className="mt-auto w-100 fw-bold btn-secondary" style={{ opacity: 0.6 }}>
                          Sold Out
                        </Button>
                      ) : (
                        <Button onClick={() => handleBuy(coupon.id, coupon.sellerId)} className="mt-auto w-100 fw-bold card-button">
                          Buy for ₹{coupon.price}
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p className="text-light fs-4" style={{ fontFamily: "'Poppins', sans-serif" }}>No deals found matching your criteria.</p>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BuyCoupons;