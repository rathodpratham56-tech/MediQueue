import React, { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import { Bell, Clock, User, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PatientView = () => {
    const { queue, currentToken, addPatient } = useQueue();
    const [myToken, setMyToken] = useState(null);

    // Calculate stats based on List Position
    const myIndex = queue.findIndex(p => p.token === myToken);

    // Count people ahead who are waiting and have a lower index in the list
    let peopleAhead = 0;
    if (myIndex !== -1) {
        // Only count those before me who are also waiting
        // (If there are served/completed people above me, they don't count as 'ahead' in the waiting line, they are gone)
        // Actually, if I am waiting, everyone above me who is 'waiting' is ahead.
        // Everyone 'serving' is not 'ahead' in the waiting line, but occupying the doctor.
        // Usually "Position in queue" means number of waiting people before you.
        peopleAhead = queue.slice(0, myIndex).filter(p => p.status === 'waiting').length;
    }

    const estimatedWait = peopleAhead * 15; // 15 mins per person approx

    const handleGetToken = () => {
        const token = addPatient();
        setMyToken(token);
    };

    if (!myToken) {
        return (
            <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', background: 'var(--surface)', padding: '1rem' }} className="animate-fade-in">
                <header style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <Link to="/" style={{ color: 'var(--primary)', marginRight: '1rem' }}><ArrowLeft /></Link>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>City Health Clinic</h2>
                </header>

                <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                    <div style={{ background: '#e0f2fe', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: 'var(--primary)' }}>
                        <User size={32} />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Check In</h1>
                    <p style={{ color: 'var(--text-muted)', mb: '2rem' }}>Join the queue remotely to save time.</p>
                    <button onClick={handleGetToken} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}>
                        Get Digital Token
                    </button>
                    <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Current Token Serving: <strong>{currentToken}</strong>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }} className="animate-fade-in">
            {/* Header */}
            <header style={{ padding: '1.5rem', background: 'var(--primary)', color: 'white', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <Link to="/" style={{ color: 'white', opacity: 0.8 }}><ArrowLeft /></Link>
                    <div style={{ fontWeight: 600 }}>Track Status</div>
                    <Bell size={20} />
                </div>
                <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Your Token Number</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>{myToken}</div>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>
                        General Pool
                    </div>
                </div>
            </header>

            {/* Status Cards */}
            <div style={{ padding: '1.5rem', marginTop: '-2rem' }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="card"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}
                >
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Now Serving</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{currentToken}</div>
                    </div>
                    <div style={{ height: '40px', width: '1px', background: '#eee' }}></div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>People Ahead</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{peopleAhead}</div>
                    </div>
                </motion.div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: '#fef3c7', padding: '0.75rem', borderRadius: '12px', color: '#d97706' }}>
                        <Clock size={24} />
                    </div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Estimated Wait</div>
                        <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>~{estimatedWait} mins</div>
                    </div>
                </div>

                {peopleAhead <= 3 && peopleAhead > 0 && (
                    <motion.div
                        initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                        style={{ padding: '1rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', color: '#065f46', marginBottom: '1rem' }}
                    >
                        <strong>Almost your turn!</strong> Please head to the waiting area.
                    </motion.div>
                )}

                {myToken === currentToken && (
                    <motion.div
                        initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                        style={{ padding: '1rem', background: 'var(--primary)', borderRadius: '12px', color: 'white', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.5)' }}
                    >
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>It's Your Turn!</div>
                        <div>Please proceed to Room 101</div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PatientView;
