import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // user types: null, 'doctor', 'patient'
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null); // 'doctor' | 'patient'

    // User Settings
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
        language: 'English',
        privacy: 'Standard'
    });

    const loginDoctor = (credentials) => {
        setUser({
            id: credentials.id || 101, // Demo ID
            name: credentials.name,
            specialty: credentials.specialty,
            hospitalName: credentials.hospitalName,
            branchName: credentials.branchName || '',
            timings: credentials.timings,
            hospitalId: credentials.hospitalId || 1 // Support multi-hospital logic
        });
        setUserRole('doctor');
    };

    const loginPatient = (details) => {
        setUser({
            id: Date.now(),
            name: details.name || 'Guest Patient',
        });
        setUserRole('patient');
    };

    const logout = () => {
        setUser(null);
        setUserRole(null);
    };

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
        // Apply theme for demo purposes (simple toggle)
        if (newSettings.darkMode !== undefined) {
            document.body.classList.toggle('dark-theme', newSettings.darkMode);
        }
    };

    return (
        <AuthContext.Provider value={{ user, userRole, settings, loginDoctor, loginPatient, logout, updateSettings }}>
            {children}
        </AuthContext.Provider>
    );
};
