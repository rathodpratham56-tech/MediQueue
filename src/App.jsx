import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientView from './pages/PatientView';
import ClinicDashboard from './pages/ClinicDashboard';
import { QueueProvider } from './context/QueueContext';

function App() {
    return (
        <QueueProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/patient" element={<PatientView />} />
                    <Route path="/clinic" element={<ClinicDashboard />} />
                </Routes>
            </Router>
        </QueueProvider>
    );
}

export default App;
