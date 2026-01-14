import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, User, Stethoscope, ChevronRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => (
    <nav className="navbar fixed top-0 w-full z-30 transition-all duration-300" style={{ height: '80px', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container flex justify-between items-center h-full">
            <div className="flex items-center gap-sm text-primary" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                <Activity size={32} strokeWidth={2.5} />
                <span style={{ letterSpacing: '-0.5px' }}>MediQueue</span>
            </div>
            <div className="flex gap-lg hide-mobile items-center">
                <Link to="/login/doctor" className="font-medium text-muted hover:text-primary transition px-4 py-2 rounded-full hover:bg-gray-50">For Doctors</Link>
                <div style={{ width: 1, height: 24, background: 'var(--border)' }}></div>
                <Link to="/login/patient" className="btn btn-primary shadow-lg hover:shadow-xl transition-all">Book Appointment</Link>
            </div>
        </div>
    </nav>
);

const LandingPage = () => {
    return (
        <div className="animate-fade-in" style={{ overflowX: 'hidden' }}>
            <Navbar />

            {/* Hero Section */}
            <section className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="grid grid-responsive gap-8 items-center" style={{ gap: '4rem' }}>
                    <div className="flex flex-col gap-6">
                        <div className="inline-block px-4 py-2 bg-blue-50 text-primary rounded-full text-sm font-bold border border-blue-100 w-fit">
                            🚀 #1 Queue Management System in Pune
                        </div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-main)' }}
                        >
                            Smart Healthcare <br />
                            <span className="text-primary" style={{ position: 'relative', display: 'inline-block' }}>
                                Queue Management
                                <svg style={{ position: 'absolute', bottom: -5, left: 0, width: '100%', height: 12, fill: 'var(--primary-light)', zIndex: -1, opacity: 0.5 }} viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" /></svg>
                            </span>
                        </motion.h1>
                        <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.8 }}>
                            Reduce waiting times and improve patient experience with our intelligent real-time queuing system. Join 500+ clinics today.
                        </p>

                        <div className="flex gap-6 flex-col sm:flex-row mt-4">
                            <Link to="/login/patient" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 20px 40px -15px rgba(14, 165, 233, 0.5)' }}>
                                <User size={20} /> I am a Patient
                            </Link>
                            <Link to="/login/doctor" className="btn btn-secondary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
                                <Stethoscope size={20} /> I am a Doctor
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center gap-6 text-sm text-muted pt-6 border-t border-dashed">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5 text-warning"><span className="font-bold text-main text-lg mr-1">4.9/5</span> ★★★★★</div>
                            </div>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>Trusted by <strong>10,000+</strong> users</span>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="card relative flex items-center justify-center bg-card"
                        style={{
                            minHeight: '520px',
                            borderRadius: '32px',
                            border: '1px solid var(--border)',
                            boxShadow: 'var(--shadow-xl)',
                            overflow: 'hidden'
                        }}
                    >


                        <div className="text-center relative z-10 w-full px-8">
                            <div className="flex items-center justify-center gap-6 mb-6">
                                <div style={{ fontSize: '6rem', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))', lineHeight: 1 }}>⏱️</div>

                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-3 border border-gray-100 text-left"
                                >
                                    <div className="bg-green-100 text-green-600 p-2 rounded-full"><CheckCircle size={20} /></div>
                                    <div>
                                        <div className="font-bold text-sm text-black">Real-time</div>
                                        <div className="text-xs text-secondary">Status Updates</div>
                                    </div>
                                </motion.div>
                            </div>

                            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Live Tracking</h3>
                            <p className="text-muted mb-8 text-lg">Save 45 minutes on average</p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                                <div className="card text-left" style={{ padding: '2rem 3rem', background: 'var(--bg-card)', display: 'inline-block', minWidth: '280px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <div className="text-xs text-muted uppercase font-bold tracking-widest mb-3">Your Token</div>
                                    <div className="text-primary" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>A-12</div>
                                    <div className="w-full h-3 bg-gray-100 rounded-full mt-6 overflow-hidden">
                                        <div className="h-full bg-primary w-2/3 rounded-full relative overflow-hidden">
                                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-white opacity-20" style={{ transform: 'skewX(-20deg) translateX(-50%)', animation: 'shimmer 2s infinite' }}></div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted mt-3 font-medium flex justify-between">
                                        <span>Wait time</span>
                                        <span className="text-primary font-bold">10 mins</span>
                                    </div>
                                </div>

                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="w-52 bg-white/60 backdrop-blur-sm border border-white/50 p-5 rounded-2xl shadow-xl text-left hidden md:block"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Update</span>
                                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Active</span>
                                    </div>
                                    <div className="text-xl font-bold text-primary flex items-center gap-2">
                                        Q-104
                                        <span className="text-xs font-normal text-muted">→ Q-105</span>
                                    </div>
                                    <div className="mt-3 text-[10px] text-muted font-medium italic">
                                        Refreshing position...
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Background blobs */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary-light rounded-full blur-3xl opacity-30"></div>
                            <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-success rounded-full blur-3xl opacity-20"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: '8rem 0', background: 'var(--bg-card)' }}>
                <div className="container">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-6 text-main">Why Choose MediQueue?</h2>
                        <p className="text-muted text-xl max-w-2xl mx-auto leading-relaxed">We bridge the gap between busy waiting rooms and comfortable patient experiences.</p>
                    </div>

                    <div className="grid grid-responsive gap-8">
                        {/* Status Update Card */}
                        <div className="card p-10 hover:transform hover:-translate-y-2 transition-all duration-300 border-none shadow-lg hover:shadow-2xl bg-body relative overflow-visible group">
                            {/* Small animated indicator */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute top-6 right-6 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"
                            ></motion.div>

                            <div className="text-5xl mb-8 relative z-0">📲</div>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-main)', position: 'relative', zIndex: 0 }}>Real-Time Updates</h3>
                            <p className="text-muted text-lg leading-relaxed mb-6 relative z-0">Track your live position from anywhere via our mobile-friendly dashboard.</p>

                            {/* Decorative Blur */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                        </div>

                        {[
                            { title: 'Multi-Specialty Support', desc: 'Seamlessly manage various departments and doctors under one roof.', icon: '🏥' },
                            { title: 'Hospital Dashboard', desc: 'Complete control for clinic administration with analytics and reports.', icon: '📊' }
                        ].map((item, i) => (
                            <div key={i} className="card p-10 hover:transform hover:-translate-y-2 transition-all duration-300 border-none shadow-lg hover:shadow-2xl bg-body">
                                <div className="text-5xl mb-8">{item.icon}</div>
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-main)' }}>{item.title}</h3>
                                <p className="text-muted text-lg leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-16 bg-gray-50 border-t">
                <div className="container text-center text-muted">
                    <div className="flex items-center justify-center gap-3 mb-6 font-bold text-2xl text-primary">
                        <Activity size={28} /> MediQueue
                    </div>
                    <p className="text-lg">© 2026 MediQueue. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
