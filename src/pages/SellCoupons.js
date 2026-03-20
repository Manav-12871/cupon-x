import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import ThreeDBackground from '../components/ThreeDBackground';
import { useAuth } from '../AuthContext';

const SellCoupons = () => {
  const { currentUser } = useAuth();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [coupon, setCoupon] = useState({
    title: "",
    price: "",
    platform: "",
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const pageAnimationStyle = {
    opacity: pageLoaded ? 1 : 0,
    transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
  };

  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(''); // Clear previous messages

    try {
      const response = await fetch("http://localhost:5001/add-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...coupon,
          sellerId: currentUser.uid,
          sellerEmail: currentUser.email
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add coupon");
      }

      setSuccessMessage('Coupon listed successfully!');
      setCoupon({ title: "", price: "", platform: "" });

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      console.error("Error adding coupon: ", error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ThreeDBackground />
      <div style={{ ...pageAnimationStyle, position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '50px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <style type="text/css">
          {`
          .page-header {
            font-family: 'Exo 2', sans-serif;
            color: #ffffff;
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
          }
          .form-container {
            background-color: rgba(13, 2, 33, 0.7);
            padding: 40px;
            border-radius: 25px;
            border: 1px solid rgba(200, 200, 200, 0.2);
            backdrop-filter: blur(5px);
          }
          .form-label-custom {
            color: #f8f9fa;
            font-family: 'Poppins', sans-serif;
          }
          .form-control-custom {
            background-color: rgba(0,0,0,0.3) !important;
            color: white !important;
            border: 1px solid rgba(0, 255, 255, 0.4) !important;
            font-family: 'Poppins', sans-serif;
          }
          .form-control-custom::placeholder {
            color: #aaa;
          }
          .form-control-custom:focus {
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5) !important;
            border-color: rgba(0, 255, 255, 0.8) !important;
          }
          .submit-btn {
            font-family: 'Roboto Condensed', sans-serif;
            text-transform: none;
            letter-spacing: 1px;
            background-color: #00ffff !important;
            border-color: #00ffff !important;
            color: #0D0221 !important;
            padding: 12px 30px;
            border-radius: 50px;
            transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          }
          .submit-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 255, 255, 0.4);
          }
          /* Updated styles for the success message to handle transitions */
          .success-message {
            color: #00ffff;
            background-color: rgba(0, 255, 255, 0.1);
            border: 1px solid rgba(0, 255, 255, 0.4);
            border-radius: 10px;
            text-align: center;
            font-family: 'Poppins', sans-serif;
            transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out, padding 0.5s ease, margin 0.5s ease;
            opacity: 0;
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
            margin-top: 0;
            overflow: hidden;
          }
          .success-message.show {
            opacity: 1;
            max-height: 100px; /* Animate to a height large enough for the content */
            padding: 1rem;
            margin-top: 1.5rem;
          }
          `}
        </style>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="form-container">
                <h1 className="text-center mb-4 page-header">💰 Sell a Coupon</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Coupon Title</Form.Label>
                    <Form.Control
                      className="form-control-custom"
                      type="text"
                      name="title"
                      value={coupon.title}
                      onChange={handleChange}
                      placeholder="e.g. Flipkart ₹100 Off"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Price (₹)</Form.Label>
                    <Form.Control
                      className="form-control-custom"
                      type="number"
                      name="price"
                      value={coupon.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="form-label-custom">Platform</Form.Label>
                    <Form.Control
                      className="form-control-custom"
                      type="text"
                      name="platform"
                      value={coupon.platform}
                      onChange={handleChange}
                      placeholder="e.g. Amazon, Flipkart"
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100 mt-3 submit-btn fw-bold" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="ms-2">Adding...</span>
                      </>
                    ) : (
                      'Add Coupon'
                    )}
                  </Button>

                  {/* Updated rendering to toggle a class */}
                  <div className={`success-message ${successMessage ? 'show' : ''}`}>
                    {successMessage}
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SellCoupons;

