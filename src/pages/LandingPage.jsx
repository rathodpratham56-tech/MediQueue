import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, User, Stethoscope, ChevronRight, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const TypewriterText = ({ text, className, style }) => {
    const letters = Array.from(text);
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.h1
            style={{ display: 'flex', flexWrap: 'wrap', ...style }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.h1>
    );
};

const Particles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-cyan-500/20"
                    style={{
                        width: Math.random() * 6 + 2,
                        height: Math.random() * 6 + 2,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: i % 2 === 0 ? 'var(--neon-cyan)' : 'var(--neon-purple)',
                        opacity: 0.3,
                        filter: 'blur(2px)'
                    }}
                    animate={{
                        y: [0, Math.random() * -100 - 50],
                        opacity: [0, 0.5, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                />
            ))}
        </div>
    );
};

const RobotAssistant = () => {
    return (
        <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 20, opacity: 1 }}
            transition={{ delay: 1, duration: 1, type: "spring" }}
            className="fixed bottom-10 left-0 z-50 flex items-end gap-2 pointer-events-none"
        >
            <div className="relative">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="w-32 h-32 flex items-center justify-center p-2 rounded-2xl glass neon-border-cyan shadow-2xl bg-white/10 backdrop-blur-md overflow-hidden"
                >
                    <img src="./medical_robot_character.png" alt="Robot Assistant" className="w-full h-full object-contain" />
                </motion.div>

                {/* Pointing Hand */}
                <motion.div
                    animate={{ x: [0, 10, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute -right-4 top-1/2 text-2xl"
                >
                    👉
                </motion.div>
            </div>

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2, type: "spring" }}
                className="bg-white text-black p-4 rounded-2xl rounded-bl-none shadow-xl border-2 border-cyan-400 font-bold relative mb-20 ml-2"
            >
                Hey! Login here 👋
                <div className="absolute -left-3 bottom-0 w-4 h-4 bg-white border-l-2 border-b-2 border-cyan-400 rotate-45" style={{ marginBottom: '-8px' }}></div>
            </motion.div>
        </motion.div>
    );
};

const TiltCard = ({ children, className, style }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                ...style
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
};

const Navbar = () => (
    <nav className="navbar fixed top-0 w-full z-40 transition-all duration-300 glass" style={{ height: '80px', borderBottom: '1px solid var(--border)' }}>
        <div className="container flex justify-between items-center h-full">
            <div className="flex items-center gap-sm text-primary neon-text-cyan" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                <Activity size={32} strokeWidth={2.5} className="animate-pulse" />
                <span className="text-gradient-animate" style={{ letterSpacing: '-0.5px' }}>MediQueue</span>
            </div>
            <div className="flex gap-lg hide-mobile items-center">
                <Link to="/login/doctor" className="font-medium text-muted hover:text-primary transition px-4 py-2 rounded-full hover:bg-gray-50 nav-link-neon">For Doctors</Link>
                <div style={{ width: 1, height: 24, background: 'var(--border)' }}></div>
                <Link to="/login/patient" className="btn btn-primary shadow-lg hover:shadow-xl transition-all hover-neon-cyan shake-on-hover animate-breathing">Book Appointment</Link>
            </div>
        </div>
    </nav>
);

const LandingPage = () => {
    return (
        <div className="bg-animated-gradient min-h-screen text-white" style={{ overflowX: 'hidden' }}>
            <Navbar />
            <Particles />
            <RobotAssistant />

            {/* Hero Section */}
            <section className="container" style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                <div className="grid grid-responsive gap-8 items-center" style={{ gap: '4rem' }}>
                    <div className="flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block px-4 py-2 glass text-cyan-400 rounded-full text-sm font-bold border border-cyan-500/30 w-fit shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                        >
                            🚀 Leading Future of Healthcare in Pune
                        </motion.div>

                        <TypewriterText
                            text="Smart Healthcare Queue Management"
                            className="text-white"
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}
                        />

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-gray-300" style={{ fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.8 }}
                        >
                            Experience the next generation of queuing. Real-time updates, AI-driven wait times, and a seamless hospital journey.
                        </motion.p>

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

                    <TiltCard
                        className="card relative flex items-center justify-center glass neon-border-cyan group"
                        style={{
                            minHeight: '520px',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            perspective: '1000px'
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
                                <div className="card text-left glass neon-border-cyan" style={{ padding: '2rem 3rem', display: 'inline-block', minWidth: '280px' }}>
                                    <div className="text-xs text-muted uppercase font-bold tracking-widest mb-3">Your Token</div>
                                    <div className="text-primary neon-text-cyan" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>A-12</div>
                                    <div className="w-full h-3 bg-gray-100 dark-bg-slate-800 rounded-full mt-6 overflow-hidden">
                                        <div className="h-full bg-primary neon-pulse-cyan w-2/3 rounded-full relative overflow-hidden">
                                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-white opacity-20" style={{ transform: 'skewX(-20deg) translateX(-50%)', animation: 'shimmer 2s infinite' }}></div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted mt-3 font-medium flex justify-between">
                                        <span>Wait time</span>
                                        <span className="text-primary font-bold neon-text-cyan">10 mins</span>
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
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 0],
                                    opacity: [0.1, 0.2, 0.1]
                                }}
                                transition={{ repeat: Infinity, duration: 20 }}
                                className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-cyan-500 rounded-full blur-[100px]"
                            ></motion.div>
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    rotate: [0, -90, 0],
                                    opacity: [0.1, 0.15, 0.1]
                                }}
                                transition={{ repeat: Infinity, duration: 25 }}
                                className="absolute bottom-[-50px] left-[-50px] w-96 h-96 bg-purple-500 rounded-full blur-[100px]"
                            ></motion.div>
                        </div>
                    </TiltCard>
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: '8rem 0', background: 'transparent' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl font-bold mb-6 text-white text-gradient-animate">Why Choose MediQueue?</h2>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">We bridge the gap between busy waiting rooms and comfortable patient experiences.</p>
                    </motion.div>

                    <div className="grid grid-responsive gap-8">
                        {/* Status Update Card */}
                        <TiltCard className="card p-10 glass neon-border-cyan border-none hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] bg-white/5 relative overflow-visible group">
                            {/* Small animated indicator */}
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute top-6 right-6 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]"
                            ></motion.div>

                            <div className="text-5xl mb-8 relative z-0">📲</div>
                            <h3 className="neon-text-cyan" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Real-Time Updates</h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">Track your live position from anywhere via our mobile-friendly dashboard.</p>

                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                        </TiltCard>

                        {[
                            { title: 'Multi-Specialty Support', desc: 'Seamlessly manage various departments and doctors under one roof.', icon: '🏥', color: 'purple' },
                            { title: 'Hospital Dashboard', desc: 'Complete control for clinic administration with analytics and reports.', icon: '📊', color: 'teal' }
                        ].map((item, i) => (
                            <TiltCard key={i} className={`card p-10 glass neon-border-${item.color} border-none bg-white/5`}>
                                <div className="text-5xl mb-8">{item.icon}</div>
                                <h3 className={`neon-text-${item.color}`} style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{item.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-16 glass border-t border-white/10 mt-20">
                <div className="container text-center text-gray-400">
                    <div className="flex items-center justify-center gap-3 mb-6 font-bold text-2xl text-gradient-animate">
                        <Activity size={28} /> MediQueue
                    </div>
                    <p className="text-lg">© 2026 MediQueue. All rights reserved. <br /> <span className="text-xs opacity-50">Crafted with ❤️ for Pune Hackathon</span></p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
