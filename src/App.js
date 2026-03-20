import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Home from './pages/Home';
import BuyCoupons from './pages/BuyCoupons';
import SellCoupons from './pages/SellCoupons';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/buy-coupons" element={
            <PrivateRoute>
              <BuyCoupons />
            </PrivateRoute>
          } />
          <Route path="/sell-coupons" element={
            <PrivateRoute>
              <SellCoupons />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/add-coupon" element={
            <PrivateRoute>
              <SellCoupons />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
