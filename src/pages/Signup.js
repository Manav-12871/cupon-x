import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ThreeDBackground from '../components/ThreeDBackground';
import { useAuth } from '../AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password, name);
            navigate('/');
        } catch (err) {
            setError('Failed to create an account: ' + err.message);
        }
        setLoading(false);
    };

    return (
        <>
            <ThreeDBackground />
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", position: 'relative', zIndex: 1, paddingTop: '80px' }}>
                <style type="text/css">
                    {`
            .auth-card {
              background-color: rgba(13, 2, 33, 0.85);
              border: 1px solid rgba(0, 255, 255, 0.3);
              backdrop-filter: blur(10px);
              border-radius: 20px;
              color: white;
            }
            .auth-input {
              background-color: rgba(0,0,0,0.3) !important;
              color: white !important;
              border: 1px solid rgba(0, 255, 255, 0.4) !important;
            }
            .auth-input:focus {
              box-shadow: 0 0 10px rgba(0, 255, 255, 0.5) !important;
            }
            .auth-btn {
              background-color: #00ffff !important;
              border-color: #00ffff !important;
              color: #0D0221 !important;
              font-weight: bold;
              border-radius: 50px;
            }
            .auth-btn:hover {
              box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
            }
          `}
                </style>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card className="auth-card p-4">
                        <Card.Body>
                            <h2 className="text-center mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="name" className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} className="auth-input" />
                                </Form.Group>
                                <Form.Group id="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" />
                                </Form.Group>
                                <Form.Group id="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" />
                                </Form.Group>
                                <Form.Group id="password-confirm" className="mb-4">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" required value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="auth-input" />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 auth-btn" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                Already have an account? <Link to="/login" style={{ color: '#00ffff' }}>Log In</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    );
};

export default Signup;
