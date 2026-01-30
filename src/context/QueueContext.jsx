import React, { createContext, useContext, useState, useEffect } from 'react';

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
        }
    ]);

    const getHospitalForDoctor = () => hospitals[0];

    // Initial Mock Queue with extra details
    const [queue, setQueue] = useState([
        {
            id: 1001, name: 'Amit Rahul', token: 'A-101', status: 'waiting',
            mobile: '9876543210', whatsapp: '9876543210', email: 'amit@example.com',
            age: '28', gender: 'Male', symptoms: 'Mild headache, fatigue',
            doctorId: 101, hospitalId: 1, alertSent: null
        },
        {
            id: 1002, name: 'Sonal Patil', token: 'A-102', status: 'confirmed',
            mobile: '9123456789', whatsapp: '9123456789', email: 'sonal@example.com',
            age: '24', gender: 'Female', symptoms: 'Regular checkup',
            doctorId: 101, hospitalId: 1, alertSent: 'SMS'
        },
    ]);

    const [currentServing, setCurrentServing] = useState({});
    const [patientHistory, setPatientHistory] = useState([
        { id: 1, patientName: 'Guest Patient', hospital: 'Ruby Hall Clinic', doctor: 'Dr. A. K. Singh', date: '2024-03-10', diagnosis: 'Mild Hypertension', prescription: 'Tab. Amlodipine 5mg', reportUrl: '#' }
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

    const updatePatientStatus = (patientId, newStatus) => {
        setQueue(prev => prev.map(p => p.id === patientId ? { ...p, status: newStatus } : p));
    };

    const nextPatient = (hospitalId, doctorId) => {
        const next = queue.find(p => p.doctorId === doctorId && (p.status === 'waiting' || p.status === 'confirmed') && p.hospitalId === hospitalId);
        if (next) {
            setQueue(prev => prev.map(p => p.id === next.id ? { ...p, status: 'serving' } : p));
            setCurrentServing(prev => ({ ...prev, [doctorId]: next.token }));
        }
    };

    const sendAlertToPatient = (patientId, type, message) => {
        // Mocking API call
        setQueue(prev => prev.map(p => p.id === patientId ? { ...p, alertSent: type, lastMessage: message } : p));
        return true;
    };

    const joinQueue = (patientDetails, hospitalId, doctorId) => {
        const tokenNum = queue.filter(q => q.hospitalId === parseInt(hospitalId)).length + 100;
        const newToken = `Q-${tokenNum}`;
        const newPatient = {
            id: Date.now(),
            name: patientDetails.name,
            token: newToken,
            status: 'waiting',
            mobile: patientDetails.mobile || '',
            whatsapp: patientDetails.whatsapp || '',
            email: patientDetails.email || '',
            age: patientDetails.age || '',
            gender: patientDetails.gender || '',
            symptoms: patientDetails.symptoms || '',
            doctorId: parseInt(doctorId),
            hospitalId: parseInt(hospitalId),
            alertSent: null
        };
        setQueue(prev => [...prev, newPatient]);
        return newPatient;
    };

    const getDoctorQueue = (doctorId) => {
        return queue.filter(p => p.doctorId === parseInt(doctorId) && p.status !== 'serving' && p.status !== 'cancelled');
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
            updatePatientStatus,
            sendAlertToPatient,
            nextPatient,
            joinQueue,
            getDoctorQueue,
            addReport
        }}>
            {children}
        </QueueContext.Provider>
    );
};
沟通:
