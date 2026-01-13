import React from 'react';
import { useQueue } from '../context/QueueContext';
import { Users, Clock, Calendar, Settings, Bell, ChevronRight, Activity, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, active }) => (
    <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
        borderRadius: '8px', cursor: 'pointer', marginBottom: '0.5rem',
        background: active ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
        color: active ? 'var(--primary)' : 'var(--text-muted)',
        fontWeight: active ? 600 : 400
    }}>
        <Icon size={20} />
        <span>{label}</span>
    </div>
);

const StatCard = ({ label, value, trend, trendUp }) => (
    <div className="card">
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{label}</div>
        <div style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>{value}</div>
        <div style={{ fontSize: '0.75rem', color: trendUp ? 'var(--success)' : 'var(--error)' }}>{trend}</div>
    </div>
);

const ClinicDashboard = () => {
    const { queue, nextPatient, currentToken, doctors, prioritizePatient } = useQueue();

    // Filter queue
    const waitingQueue = queue.filter(p => p.status === 'waiting');

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }} className="animate-fade-in">
            {/* Sidebar */}
            <aside style={{ width: '260px', background: 'white', borderRight: '1px solid #e2e8f0', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '3rem' }}>
                    <Activity size={28} />
                    <span>MediQueue</span>
                </div>

                <nav style={{ flex: 1 }}>
                    <SidebarItem icon={Users} label="Queue Management" active />
                    <SidebarItem icon={Calendar} label="Appointments" />
                    <SidebarItem icon={Clock} label="History" />
                    <SidebarItem icon={Settings} label="Settings" />
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <SidebarItem icon={LogOut} label="Logout" />
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>Welcome back, Reception Desk</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bell size={20} color="var(--text-muted)" />
                        </div>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            RD
                        </div>
                    </div>
                </header>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <StatCard label="Patients Waiting" value={waitingQueue.length} trend="+12% since last hour" trendUp={false} />
                    <StatCard label="Avg. Wait Time" value="18m" trend="-5% vs yesterday" trendUp={true} />
                    <StatCard label="Doctors Active" value="2/3" trend="Dr. Strange is away" trendUp={false} />
                    <StatCard label="Total Served" value="45" trend="+8% vs avg" trendUp={true} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Queue Control */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.125rem', margin: 0 }}>Current Queue Flow</h2>
                            <button onClick={() => nextPatient(1)} className="btn btn-primary">
                                Next Patient <ChevronRight size={18} />
                            </button>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>NOW SERVING</div>
                            <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{currentToken}</div>
                            <div style={{ marginTop: '0.5rem' }}>Room 101 • Dr. Sarah Connor</div>
                        </div>

                        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Up Next</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {waitingQueue.slice(0, 5).map((p, i) => (
                                <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>{i + 1}</div>
                                        <span style={{ fontWeight: 500 }}>{p.name}</span>
                                    </div>
                                    <div style={{ fontWeight: 'bold', color: 'var(--primary)', minWidth: '60px', textAlign: 'right' }}>{p.token}</div>
                                    <button
                                        onClick={() => prioritizePatient(p.token)}
                                        title="Mark as Emergency / Priority"
                                        style={{
                                            background: p.isEmergency ? '#fee2e2' : 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            marginLeft: '0.5rem',
                                            padding: '0.25rem',
                                            borderRadius: '4px',
                                            color: p.isEmergency ? '#b91c1c' : '#94a3b8'
                                        }}>
                                        <Activity size={16} />
                                    </button>
                                </div>
                            ))}
                            {waitingQueue.length === 0 && (
                                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>None waiting</div>
                            )}
                        </div>
                    </div>

                    {/* Doctor Status */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.125rem', margin: '0 0 1.5rem 0' }}>Doctor Status</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {doctors.map(doc => (
                                <div key={doc.id} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{doc.name}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{doc.specialty} • Room {doc.room}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{
                                            fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px',
                                            background: doc.status === 'Available' ? '#dcfce7' : '#fef3c7',
                                            color: doc.status === 'Available' ? '#166534' : '#b45309'
                                        }}>
                                            {doc.status}
                                        </span>
                                        <label className="switch" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                                            <input type="checkbox" defaultChecked={doc.status === 'Available'} style={{ accentColor: 'var(--primary)' }} />
                                            <span>Active</span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClinicDashboard;
