import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Smartphone, Clock, ShieldCheck, Activity, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => (
    <nav style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--primary)' }}>
            <Activity size={32} />
            <span>MediQueue</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500 }}>Features</a>
            <a href="#pricing" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500 }}>Pricing</a>
            <Link to="/clinic" className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem' }}>Login</Link>
            <Link to="/clinic" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Get Started</Link>
        </div>
    </nav>
);

const Hero = () => (
    <section style={{ padding: '4rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="container">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>
                Stop Making Your Patients <span className="text-gradient">Wait in the Dark.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px' }}>
                Transform your waiting room into a smart, digital experience. Real-time updates, reduced crowding, and peace of mind.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/clinic" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                    Get a Free Demo <ChevronRight size={20} />
                </Link>
                <Link to="/patient" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                    Simulate Patient <Smartphone size={20} />
                </Link>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <ShieldCheck size={16} color="var(--success)" /> Trusted by 500+ Clinics Nationwide
            </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="card" style={{ background: 'linear-gradient(135deg, white 0%, #f0f9ff 100%)', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #e0f2fe' }}>
            {/* Abstract Visual Representation of Calm vs Chaos */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>😌</div>
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Relaxed & Informed</h3>
                <p style={{ color: 'var(--text-muted)' }}>"Dr. Smith will see you in 15 mins"</p>
                <div style={{ marginTop: '2rem', padding: '1rem', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-lg)', display: 'inline-block' }}>
                    <div style={{ fontSize: '0.875rem', color: '#888' }}>Your Token</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>A-104</div>
                    <div style={{ height: '4px', width: '100%', background: '#e2e8f0', borderRadius: '2px', marginTop: '0.5rem' }}>
                        <div style={{ height: '100%', width: '70%', background: 'var(--success)', borderRadius: '2px' }}></div>
                    </div>
                </div>
            </div>
        </motion.div>
    </section>
);

const Feature = ({ icon: Icon, title, desc }) => (
    <div className="card" style={{ textAlign: 'left' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.5rem' }}>
            <Icon size={24} />
        </div>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
    </div>
);

const Features = () => (
    <section id="features" style={{ padding: '6rem 0', background: 'var(--surface)' }}>
        <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The "Waiting Room Anxiety" is Real</h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                    Crowded rooms and uncertain wait times drive patients away. MediQueue solves this with transparency.
                </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <Feature icon={Smartphone} title="Real-Time Transparency" desc="Patients see their exact position in line on their phone. No app install required." />
                <Feature icon={Clock} title="Smart ETA Engine" desc="Dynamic calculation of wait times based on actual consultation durations." />
                <Feature icon={Users} title="Crowd Control" desc="Keep your lobby empty. Patients arrive just in time when notified." />
            </div>
        </div>
    </section>
);

const SocialProof = () => (
    <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
            <blockquote style={{ fontSize: '1.75rem', fontWeight: 500, fontStyle: 'italic', maxWidth: '800px', margin: '0 auto 2rem auto', color: 'var(--text-main)' }}>
                "Since implementing MediQueue, our lobby is 60% less crowded, and our patient satisfaction scores have skyrocketed."
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ddd' }}></div>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 'bold' }}>Dr. Aris V.</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>City Health Clinic</div>
                </div>
            </div>
        </div>
    </section>
);

const PricingCard = ({ title, price, features, highlighted = false }) => (
    <div className="card" style={{
        border: highlighted ? '2px solid var(--primary)' : '1px solid #e2e8f0',
        transform: highlighted ? 'scale(1.05)' : 'none',
        zIndex: highlighted ? 1 : 0,
        display: 'flex', flexDirection: 'column'
    }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: highlighted ? 'var(--primary)' : 'inherit' }}>{title}</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>{price}</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
            {features.map((f, i) => (
                <li key={i} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                    <ShieldCheck size={18} color="var(--success)" /> {f}
                </li>
            ))}
        </ul>
        <button className={highlighted ? "btn btn-primary" : "btn btn-secondary"} style={{ width: '100%' }}>
            Choose {title}
        </button>
    </div>
);

const Pricing = () => (
    <section id="pricing" style={{ padding: '6rem 0', background: '#f8fafc' }}>
        <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Transparent Pricing</h2>
                <p style={{ color: 'var(--text-muted)' }}>Choose the plan that fits your clinic size.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                <PricingCard
                    title="Starter"
                    price="$29/mo"
                    features={['Single Doctor', 'Basic Queue', 'Digital Token URL']}
                />
                <PricingCard
                    title="Professional"
                    price="$79/mo"
                    features={['Multi-Specialty', 'SMS/WhatsApp Alerts', 'Basic Analytics', 'Priority Support']}
                    highlighted={true}
                />
                <PricingCard
                    title="Enterprise"
                    price="Custom"
                    features={['Unlimited Doctors', 'API Access', 'Custom Branding', 'On-premise Deployment']}
                />
            </div>
        </div>
    </section>
);

const LandingPage = () => {
    return (
        <div className="animate-fade-in">
            <Navbar />
            <Hero />
            <Features />
            <SocialProof />
            <Pricing />
            <footer style={{ padding: '4rem 0', textAlign: 'center', background: '#1e293b', color: 'white' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '2rem' }}>Ready to eliminate the "Wait"?</h2>
                    <Link to="/clinic" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>Start Your 14-Day Free Trial</Link>
                    <div style={{ marginTop: '3rem', fontSize: '0.875rem', opacity: 0.6 }}>© 2026 MediQueue Inc. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
