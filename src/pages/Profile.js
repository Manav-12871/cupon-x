import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Spinner, Badge, Button } from 'react-bootstrap';
import ThreeDBackground from '../components/ThreeDBackground';
import { useAuth } from '../AuthContext';

const Profile = () => {
    const { currentUser } = useAuth();
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

    const fetchHistory = useCallback(async () => {
        setLoading(true);
        try {
            const [salesRes, purchasesRes] = await Promise.all([
                fetch(`${API_URL}/my-sales/${currentUser.uid}`),
                fetch(`${API_URL}/my-purchases/${currentUser.uid}`)
            ]);

            if (salesRes.ok && purchasesRes.ok) {
                const salesData = await salesRes.json();
                const purchasesData = await purchasesRes.json();
                setSales(salesData);
                setPurchases(purchasesData);
            }
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoading(false);
        }
    }, [API_URL, currentUser]);

    useEffect(() => {
        if (currentUser) {
            fetchHistory();
        }
    }, [currentUser, fetchHistory]);

    const handleDelete = async (couponId) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;

        try {
            const response = await fetch(`${API_URL}/delete-coupon`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ couponId, userId: currentUser.uid })
            });

            if (response.ok) {
                setSales(sales.filter(item => item.id !== couponId));
            } else {
                const errData = await response.json();
                alert(errData.error || "Failed to delete coupon");
            }
        } catch (error) {
            console.error("Error deleting coupon:", error);
            alert("Failed to delete coupon");
        }
    };

    return (
        <>
            <ThreeDBackground />
            <div style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '50px', minHeight: '100vh', color: 'white' }}>
                <style type="text/css">
                    {`
            .dashboard-card {
              background-color: rgba(28, 9, 58, 0.75) !important;
              border: 1px solid rgba(200, 200, 200, 0.3) !important;
              backdrop-filter: blur(10px);
              border-radius: 15px; 
              color: white;
            }
          `}
                </style>
                <Container>
                    <h1 className="mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>My Dashboard</h1>
                    <p className="mb-5 text-muted">Welcome back, <strong>{currentUser.displayName || currentUser.email.split('@')[0]}</strong>! ({currentUser.email})</p>

                    <Row>
                        {/* Sales Column */}
                        <Col md={6} className="mb-4">
                            <h3 className="mb-3" style={{ borderBottom: '1px solid rgba(0,255,255,0.3)', paddingBottom: '10px' }}>🏷️ My Listings</h3>
                            {loading ? <Spinner animation="border" variant="info" /> : sales.length === 0 ? <p className="text-muted">You haven't listed any coupons.</p> : (
                                sales.map(item => (
                                    <Card key={item.id} className="mb-3 dashboard-card">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <Card.Title className="fw-bold mb-1">{item.title}</Card.Title>
                                                    <Card.Subtitle className="text-info">{item.platform}</Card.Subtitle>
                                                </div>
                                                <div className="text-end">
                                                    <h4 className="mb-1">₹{item.price}</h4>
                                                    {item.status === 'sold' ? (
                                                        <Badge bg="success">Sold</Badge>
                                                    ) : (
                                                        <div>
                                                            <Badge bg="warning" text="dark" className="d-block mb-2">Available</Badge>
                                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </Col>

                        {/* Purchases Column */}
                        <Col md={6}>
                            <h3 className="mb-3" style={{ borderBottom: '1px solid rgba(0,255,255,0.3)', paddingBottom: '10px' }}>🛍️ My Purchases</h3>
                            {loading ? <Spinner animation="border" variant="info" /> : purchases.length === 0 ? <p className="text-muted">You haven't bought any coupons.</p> : (
                                purchases.map(item => (
                                    <Card key={item.id} className="mb-3 dashboard-card">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <Card.Title className="fw-bold mb-1">{item.title}</Card.Title>
                                                    <Card.Subtitle className="text-info">{item.platform}</Card.Subtitle>
                                                    <small className="text-muted d-block mt-2">Seller: {item.sellerEmail}</small>
                                                </div>
                                                <div className="text-end">
                                                    <h4 className="mb-1 text-success">- ₹{item.price}</h4>
                                                    <Badge bg="secondary">Purchased</Badge>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Profile;
