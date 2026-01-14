import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueueProvider } from './context/QueueContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
    const { user, userRole } = useAuth();
    if (!user) return <Navigate to="/" />;
    if (allowedRole && userRole !== allowedRole) return <Navigate to="/" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <QueueProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login/doctor" element={<LoginPage role="doctor" />} />
                        <Route path="/login/patient" element={<LoginPage role="patient" />} />

                        <Route
                            path="/dashboard/doctor"
                            element={
                                <ProtectedRoute allowedRole="doctor">
                                    <DoctorDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/patient"
                            element={
                                <ProtectedRoute allowedRole="patient">
                                    <PatientDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
            </QueueProvider>
        </AuthProvider>
    );
}

export default App;
