import React, { createContext, useContext, useState } from 'react';

const QueueContext = createContext();

export const useQueue = () => useContext(QueueContext);

export const QueueProvider = ({ children }) => {
    // 1. Hospital Database (Pune Focus)
    const [hospitals, setHospitals] = useState([
        {
            id: 1,
            name: 'Ruby Hall Clinic',
            branch: 'Sassoon Road',
            address: '40, Sassoon Rd, Pune',
            emergencyContact: '+91-20-66455100',
            doctors: [
                { id: 101, name: 'Dr. A. K. Singh', specialty: 'Cardiology', room: '101', status: 'Available', timings: '10:00 AM – 2:00 PM, 5:00 PM – 8:00 PM' },
                { id: 102, name: 'Dr. P. Sharma', specialty: 'Neurology', room: '202', status: 'Available', timings: '11:00 AM – 3:00 PM' }
            ]
        },
        {
            id: 2,
            name: 'Jehangir Hospital',
            branch: 'Bund Garden',
            address: '32, Sassoon Rd, Pune',
            emergencyContact: '+91-20-49153000',
            doctors: [
                { id: 201, name: 'Dr. R. Deshpande', specialty: 'Orthopedics', room: 'Ortho-1', status: 'Available', timings: '09:00 AM – 1:00 PM' },
                { id: 202, name: 'Dr. M. Kulkarni', specialty: 'Pediatrics', room: 'Ped-3', status: 'On Break', timings: '10:00 AM – 4:00 PM' }
            ]
        },
        {
            id: 3,
            name: 'Sahyadri Hospital',
            branch: 'Deccan Gymkhana',
            address: 'Plot No. 30, Erandwane, Pune',
            emergencyContact: '+91-20-67215000',
            doctors: [
                { id: 301, name: 'Dr. S. Joshi', specialty: 'Oncology', room: 'Onc-A', status: 'Available', timings: '02:00 PM – 6:00 PM' }
            ]
        },
        {
            id: 4,
            name: 'Deenanath Mangeshkar',
            branch: 'Erandwane',
            address: 'Near Mhatre Bridge, Pune',
            emergencyContact: '+91-20-40151000',
            doctors: [
                { id: 401, name: 'Dr. V. Gokhale', specialty: 'General Surgery', room: 'Surg-B', status: 'Available', timings: '08:00 AM – 12:00 PM' }
            ]
        },
        {
            id: 5,
            name: 'Sancheti Hospital',
            branch: 'Shivajinagar',
            address: '16, Shivajinagar, Pune',
            emergencyContact: '+91-20-25533333',
            doctors: [
                { id: 501, name: 'Dr. P. Sancheti', specialty: 'Orthopedics', room: 'Ortho-Main', status: 'Available', timings: '09:00 AM – 12:00 PM' }
            ]
        }
    ]);

    // Used for compatibility with existing code where single hospital focus was used in doctor dashboard
    // In a real multi-tenant app, the doctor login would determine which hospital they belong to.
    // For now, let's keep a method to get "my hospital" based on login, defaulting to first.
    const getHospitalForDoctor = () => hospitals[0];

    const [queue, setQueue] = useState([
        { id: 101, name: 'John Doe', token: 'A-101', status: 'waiting', doctorId: 101, hospitalId: 1 },
        { id: 102, name: 'Jane Smith', token: 'A-102', status: 'waiting', doctorId: 101, hospitalId: 1 },
    ]);

    const [currentServing, setCurrentServing] = useState({});

    // Patient History & Reports (Mock Database)
    const [patientHistory, setPatientHistory] = useState([
        { id: 1, patientName: 'Guest Patient', hospital: 'Ruby Hall Clinic', doctor: 'Dr. A. K. Singh', date: '2024-03-10', diagnosis: 'Mild Hypertension', prescription: 'Tab. Amlodipine 5mg', reportUrl: '#' },
        { id: 2, patientName: 'Guest Patient', hospital: 'Jehangir Hospital', doctor: 'Dr. R. Deshpande', date: '2024-01-15', diagnosis: 'Ankle Sprain', prescription: 'Rest, Ice, Compression', reportUrl: '#' }
    ]);

    // Actions
    const updateDoctorStatus = (hospitalId, doctorId, status) => {
        setHospitals(prev => prev.map(h => {
            if (h.id === hospitalId) {
                return {
                    ...h,
                    doctors: h.doctors.map(d => d.id === doctorId ? { ...d, status } : d)
                };
            }
            return h;
        }));
    };

    const nextPatient = (hospitalId, doctorId) => {
        const next = queue.find(p => p.doctorId === doctorId && p.status === 'waiting' && p.hospitalId === hospitalId);
        if (next) {
            setQueue(prev => prev.map(p => p.id === next.id ? { ...p, status: 'serving' } : p));
            setCurrentServing(prev => ({ ...prev, [doctorId]: next.token }));
        }
    };

    const joinQueue = (patientDetails, hospitalId, doctorId) => {
        const tokenNum = queue.filter(q => q.hospitalId === hospitalId).length + 100;
        const newToken = `Q-${tokenNum}`;
        const newPatient = {
            id: Date.now(),
            name: patientDetails.name,
            token: newToken,
            status: 'waiting',
            doctorId: parseInt(doctorId),
            hospitalId: parseInt(hospitalId)
        };
        setQueue(prev => [...prev, newPatient]);
        return newPatient;
    };

    const getDoctorQueue = (doctorId) => {
        return queue.filter(p => p.doctorId === parseInt(doctorId) && p.status === 'waiting');
    };

    const addReport = (report) => {
        setPatientHistory(prev => [report, ...prev]);
    };

    return (
        <QueueContext.Provider value={{
            hospitals,
            getHospitalForDoctor,
            queue,
            currentServing,
            patientHistory,
            updateDoctorStatus,
            nextPatient,
            joinQueue,
            getDoctorQueue,
            addReport
        }}>
            {children}
        </QueueContext.Provider>
    );
};
