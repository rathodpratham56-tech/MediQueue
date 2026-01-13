import React, { createContext, useContext, useState, useEffect } from 'react';

const QueueContext = createContext();

export const useQueue = () => useContext(QueueContext);

export const QueueProvider = ({ children }) => {
    // Pre-seeded data for demo
    const [queue, setQueue] = useState([
        { id: 101, name: 'John Doe', status: 'waiting', token: 'A-101' },
        { id: 102, name: 'Jane Smith', status: 'waiting', token: 'A-102' },
        { id: 103, name: 'Robert Brown', status: 'waiting', token: 'A-103' },
        { id: 104, name: 'Emily White', status: 'waiting', token: 'A-104' },
        { id: 105, name: 'Michael Green', status: 'waiting', token: 'A-105' },
    ]);

    const [doctors, setDoctors] = useState([
        { id: 1, name: 'Dr. Sarah Connor', specialty: 'General', room: '101', status: 'Available', currentToken: null },
        { id: 2, name: 'Dr. John Snow', specialty: 'Cardiology', room: '102', status: 'In Consultation', currentToken: 'B-201' },
    ]);

    const [currentToken, setCurrentToken] = useState('A-100');

    // Logic to move queue
    const nextPatient = (moduleId) => {
        // Find the next waiting patient
        // We look for the first patient with 'waiting' status in the array, assuming array order is safe
        const nextWaiting = queue.find(p => p.status === 'waiting');

        if (!nextWaiting) return; // No one to serve

        setCurrentToken(nextWaiting.token);

        // Update queue status: serve the next one, mark previous serving as completed
        setQueue(prev => {
            const newList = prev.map(p => {
                if (p.token === nextWaiting.token) return { ...p, status: 'serving' };
                if (p.status === 'serving') return { ...p, status: 'completed' };
                return p;
            });
            return newList;
        });
    };

    const addPatient = () => {
        // Safe max ID finding
        const maxTokenId = queue.reduce((max, p) => {
            const pId = parseInt(p.token.split('-')[1]);
            return pId > max ? pId : max;
        }, 100);

        const newToken = `A-${maxTokenId + 1}`;
        const newPatient = { id: Date.now(), name: 'Guest User', status: 'waiting', token: newToken };
        setQueue([...queue, newPatient]);
        return newToken;
    };

    const prioritizePatient = (token) => {
        setQueue(prev => {
            const index = prev.findIndex(p => p.token === token);
            if (index === -1) return prev;

            const patient = prev[index];
            if (patient.status !== 'waiting') return prev;

            // Remove from current position
            const newQueue = prev.filter(p => p.token !== token);

            // Find where to insert (first waiting position)
            // If there are currently serving/completed people, we skip them
            let insertIndex = newQueue.findIndex(p => p.status === 'waiting');
            if (insertIndex === -1) insertIndex = newQueue.length;

            newQueue.splice(insertIndex, 0, { ...patient, isEmergency: true });
            return newQueue;
        });
    };

    const value = {
        queue,
        doctors,
        currentToken,
        nextPatient,
        addPatient,
        prioritizePatient
    };

    return (
        <QueueContext.Provider value={value}>
            {children}
        </QueueContext.Provider>
    );
};
