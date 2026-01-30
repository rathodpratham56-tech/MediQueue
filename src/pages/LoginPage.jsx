import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
    User, Lock, Activity, ChevronLeft, Stethoscope, ArrowRight,
    Building, Clock, MapPin, Phone, MessageSquare, Mail,
    Plus, Minus, Hash, Smile
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = ({ role }) => {
    const { loginDoctor, loginPatient } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', specialty: '',
        mobile: '', whatsapp: '', email: '',
        age: '', gender: '', symptoms: ''
    });
    const [focusedField, setFocusedField] = useState(null);
    const [showMoreDetails, setShowMoreDetails] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
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

    // Character behavior based on focus
    const robotState = focusedField ? 'looking' : 'waving';

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-body)', position: 'relative', overflow: 'hidden' }}>

            {/* Background Decor */}
            <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: 'var(--neon-cyan)', opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }}></div>
            <div style={{ position: 'absolute', bottom: -100, right: -100, width: 300, height: 300, background: 'var(--neon-purple)', opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }}></div>

            {/* Interactive Bot Character */}
            <motion.div
                className="fixed left-4 md:left-20 bottom-10 z-20 pointer-events-none hidden lg:block"
                animate={{
                    y: [0, -10, 0],
                    rotateY: focusedField ? 30 : 0
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
                <div className="relative">
                    <img
                        src="/medical_robot_character.png"
                        alt="Bot"
                        className="w-48 h-48 object-contain"
                        style={{ filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.4))' }}
                    />
                    <AnimatePresence>
                        {focusedField && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0, x: 20 }}
                                animate={{ scale: 1, opacity: 1, x: 50 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-2 rounded-2xl border-2 border-cyan-400 whitespace-nowrap"
                            >
                                Typing {focusedField}... 📝
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, translateZ: -200 }}
                animate={{ opacity: 1, scale: 1, translateZ: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="card glass neon-border-cyan pop-3d-entrance"
                style={{ width: '100%', maxWidth: '480px', padding: '2.5rem', position: 'relative', zIndex: 10, transformStyle: "preserve-3d" }}
            >
                <div className="mb-6 flex items-center text-muted hover:text-cyan-400 transition cursor-pointer" onClick={() => navigate('/')}>
                    <ChevronLeft size={16} /> <span className="text-sm font-medium">Back to Home</span>
                </div>

                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white/5 border-2 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]`}
                    >
                        {role === 'doctor' ? <Stethoscope size={32} /> : <User size={32} />}
                    </motion.div>

                    <h2 className="text-2xl font-bold mb-1">
                        {role === 'doctor' ? 'Doctor Portal' : 'Patient Access'}
                    </h2>
                    <p className="text-muted text-sm">
                        {role === 'doctor' ? 'Manage your queue & patients' : 'Join queue & track status'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Role-based Fields */}
                    {role === 'doctor' ? (
                        <div className="flex flex-col gap-4">
                            <InputField
                                label="Full Name"
                                icon={<User size={18} />}
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={v => setFormData({ ...formData, name: v })}
                                onFocus={() => setFocusedField('Name')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />
                            <InputField
                                label="Specialization"
                                icon={<Activity size={18} />}
                                placeholder="e.g. Cardiology"
                                value={formData.specialty}
                                onChange={v => setFormData({ ...formData, specialty: v })}
                                onFocus={() => setFocusedField('Specialty')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />
                            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mt-2 border-b border-cyan-400/20 pb-1">Hospital Details</div>
                            <InputField
                                label="Hospital Name"
                                icon={<Building size={18} />}
                                placeholder="e.g. Ruby Hall Clinic"
                                value={formData.hospitalName}
                                onChange={v => setFormData({ ...formData, hospitalName: v })}
                                onFocus={() => setFocusedField('Hospital')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <InputField
                                label="Full Name"
                                icon={<User size={18} />}
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={v => setFormData({ ...formData, name: v })}
                                onFocus={() => setFocusedField('Name')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowMoreDetails(!showMoreDetails)}
                                className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition w-fit"
                            >
                                {showMoreDetails ? <Minus size={14} /> : <Plus size={14} />}
                                {showMoreDetails ? "Less Details" : "Add More Details"}
                            </button>

                            <AnimatePresence>
                                {showMoreDetails && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden flex flex-col gap-4"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField
                                                label="Mobile" icon={<Phone size={16} />} placeholder="+91..."
                                                value={formData.mobile} onChange={v => setFormData({ ...formData, mobile: v })}
                                                onFocus={() => setFocusedField('Mobile')} onBlur={() => setFocusedField(null)}
                                            />
                                            <InputField
                                                label="WhatsApp" icon={<MessageSquare size={16} />} placeholder="+91..."
                                                value={formData.whatsapp} onChange={v => setFormData({ ...formData, whatsapp: v })}
                                                onFocus={() => setFocusedField('WhatsApp')} onBlur={() => setFocusedField(null)}
                                            />
                                        </div>
                                        <InputField
                                            label="Email" icon={<Mail size={16} />} placeholder="your@email.com"
                                            value={formData.email} onChange={v => setFormData({ ...formData, email: v })}
                                            onFocus={() => setFocusedField('Email')} onBlur={() => setFocusedField(null)}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField
                                                label="Age" icon={<Hash size={16} />} placeholder="Years"
                                                value={formData.age} onChange={v => setFormData({ ...formData, age: v })}
                                                onFocus={() => setFocusedField('Age')} onBlur={() => setFocusedField(null)}
                                            />
                                            <InputField
                                                label="Gender" icon={<Smile size={16} />} placeholder="Male/Female"
                                                value={formData.gender} onChange={v => setFormData({ ...formData, gender: v })}
                                                onFocus={() => setFocusedField('Gender')} onBlur={() => setFocusedField(null)}
                                            />
                                        </div>
                                        <InputField
                                            label="Symptoms (Optional)" icon={<Activity size={16} />} placeholder="Describe..."
                                            value={formData.symptoms} onChange={v => setFormData({ ...formData, symptoms: v })}
                                            onFocus={() => setFocusedField('Symptoms')} onBlur={() => setFocusedField(null)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    <motion.button
                        id="login-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary hover-neon-cyan mt-4"
                        style={{ width: '100%', height: '52px', fontSize: '1.1rem', background: role === 'doctor' ? 'var(--neon-cyan)' : 'var(--neon-purple)', color: 'white', border: 'none' }}
                        onClick={() => {
                            // bot reaction on click
                            const bot = document.querySelector('img[alt="Bot"]');
                            if (bot) {
                                bot.classList.add('animate-pulse');
                                setTimeout(() => bot.classList.remove('animate-pulse'), 1000);
                            }
                        }}
                    >
                        {role === 'doctor' ? 'Access Dashboard' : 'Continue'} <ArrowRight size={18} className="ml-2" />
                    </motion.button>
                </form>

                <div className="text-center mt-6">
                    <span className="text-sm text-gray-400">
                        Don't have an account? <span className="text-cyan-400 font-bold cursor-pointer hover:underline">Sign Up</span>
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

const InputField = ({ label, icon, placeholder, value, onChange, onFocus, onBlur, required }) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-gray-400 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                {icon}
            </div>
            <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all text-sm"
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                required={required}
            />
        </div>
    </div>
);

export default LoginPage;
