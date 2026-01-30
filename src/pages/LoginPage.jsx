import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Activity, ChevronLeft, Stethoscope, ArrowRight, Building, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = ({ role }) => {
    const { loginDoctor, loginPatient } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', specialty: '' });
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate loading briefly for effect
        const btn = document.getElementById('login-btn');
        if (btn) btn.innerText = 'Authenticating...';

        setTimeout(() => {
            if (role === 'doctor') {
                loginDoctor(formData);
                navigate('/dashboard/doctor');
            } else {
                loginPatient(formData);
                navigate('/dashboard/patient');
            }
        }, 800);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)', position: 'relative', overflow: 'hidden' }}>

            {/* Background Decor */}
            <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: 'var(--primary)', opacity: 0.05, borderRadius: '50%', filter: 'blur(80px)' }}></div>
            <div style={{ position: 'absolute', bottom: -100, right: -100, width: 300, height: 300, background: 'var(--success)', opacity: 0.05, borderRadius: '50%', filter: 'blur(80px)' }}></div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="card glass neon-border-cyan"
                style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', position: 'relative', zIndex: 10 }}
            >
                <div className="mb-6 flex items-center text-muted hover:text-primary transition cursor-pointer" onClick={() => navigate('/')}>
                    <ChevronLeft size={16} /> <span className="text-sm font-medium">Back to Home</span>
                </div>

                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-${role === 'doctor' ? 'primary' : 'success'}-light text-${role === 'doctor' ? 'primary' : 'success'}`}
                        style={{ background: role === 'doctor' ? '#e0f2fe' : '#dcfce7', color: role === 'doctor' ? '#0ea5e9' : '#10b981' }}
                    >
                        {role === 'doctor' ? <Stethoscope size={32} /> : <User size={32} />}
                    </motion.div>

                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                        {role === 'doctor' ? 'Doctor Portal' : 'Patient Access'}
                    </h2>
                    <p className="text-muted">
                        {role === 'doctor' ? 'Manage your queue & patients' : 'Join queue & track status'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
                    {/* Role-based Fields */}
                    {role === 'doctor' ? (
                        <>
                            <div className="text-xs font-bold text-muted uppercase tracking-widest border-b pb-2 mb-2">Doctor Details</div>

                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                                <label className="label">Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: focusedField === 'name' ? 'var(--primary)' : '#94a3b8', transition: 'color 0.3s' }} />
                                    <input
                                        type="text"
                                        className="input"
                                        style={{ paddingLeft: '3rem' }}
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                                <label className="label">Specialization</label>
                                <div style={{ position: 'relative' }}>
                                    <Activity size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: focusedField === 'specialty' ? 'var(--primary)' : '#94a3b8', transition: 'color 0.3s' }} />
                                    <input
                                        type="text"
                                        className="input"
                                        style={{ paddingLeft: '3rem' }}
                                        placeholder="e.g. Cardiology"
                                        value={formData.specialty}
                                        onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                                        onFocus={() => setFocusedField('specialty')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    />
                                </div>
                            </motion.div>

                            <div className="text-xs font-bold text-muted uppercase tracking-widest border-b pb-2 mt-4 mb-2">Hospital Details</div>

                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                                <label className="label">Hospital Name</label>
                                <div style={{ position: 'relative' }}>
                                    <Building size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: focusedField === 'hospitalName' ? 'var(--primary)' : '#94a3b8', transition: 'color 0.3s' }} />
                                    <input
                                        type="text"
                                        className="input"
                                        style={{ paddingLeft: '3rem' }}
                                        placeholder="e.g. Ruby Hall Clinic"
                                        value={formData.hospitalName || ''}
                                        onChange={e => setFormData({ ...formData, hospitalName: e.target.value })}
                                        onFocus={() => setFocusedField('hospitalName')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                                <label className="label">Branch Name <span className="text-muted font-normal text-xs">(optional – only if multi-branch)</span></label>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: focusedField === 'branchName' ? 'var(--primary)' : '#94a3b8', transition: 'color 0.3s' }} />
                                    <input
                                        type="text"
                                        className="input"
                                        style={{ paddingLeft: '3rem' }}
                                        placeholder="e.g. Sassoon Road"
                                        value={formData.branchName || ''}
                                        onChange={e => setFormData({ ...formData, branchName: e.target.value })}
                                        onFocus={() => setFocusedField('branchName')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                                <label className="label">Availability Timings</label>
                                <div style={{ position: 'relative' }}>
                                    <Clock size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: focusedField === 'timings' ? 'var(--primary)' : '#94a3b8', transition: 'color 0.3s' }} />
                                    <input
                                        type="text"
                                        className="input"
                                        style={{ paddingLeft: '3rem' }}
                                        placeholder="e.g. 10:00 AM – 2:00 PM, 5:00 PM – 8:00 PM"
                                        value={formData.timings || ''}
                                        onChange={e => setFormData({ ...formData, timings: e.target.value })}
                                        onFocus={() => setFocusedField('timings')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    />
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                            <label className="label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: focusedField === 'name' ? 'var(--primary)' : '#94a3b8', transition: 'color 0.3s' }} />
                                <input
                                    type="text"
                                    className="input"
                                    style={{ paddingLeft: '3rem' }}
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                />
                            </div>
                        </motion.div>
                    )}

                    <motion.button
                        id="login-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary hover-neon-cyan"
                        style={{ width: '100%', marginTop: '1rem', height: '48px', fontSize: '1rem' }}
                    >
                        {role === 'doctor' ? 'Access Dashboard' : 'Continue'} <ArrowRight size={18} />
                    </motion.button>
                </form>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mt-6">
                    <span className="text-sm text-muted">Don't have an account? <span className="text-primary font-bold cursor-pointer hover:underline">Sign Up</span></span>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
