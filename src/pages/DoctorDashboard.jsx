import React, { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import { useAuth } from '../context/AuthContext';
import {
    Settings, Users, Clock, LogOut, MapPin, Edit2, FilePlus, Upload,
    Menu, X, Phone, MessageSquare, Mail, Bell, CheckCircle, AlertCircle,
    Send, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SettingsPanel from '../components/SettingsPanel';

const DoctorDashboard = () => {
    const { getHospitalForDoctor, updateDoctorStatus, queue, nextPatient, currentServing, addReport, sendAlertToPatient } = useQueue();
    const { user, logout } = useAuth();

    const myHospital = getHospitalForDoctor();
    const myDoctorProfile = myHospital.doctors.find(d => d.name === user?.name) || myHospital.doctors[0];
    const myQueue = queue.filter(p => p.doctorId === myDoctorProfile.id && p.status !== 'serving');

    const [activeTab, setActiveTab] = useState('queue');
    const [reportForm, setReportForm] = useState({ patientName: '', diagnosis: '', prescription: '' });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notificationToast, setNotificationToast] = useState(null);

    const handleSendAlert = (patient, type) => {
        const message = `Your appointment number is ${patient.token}. Please be ready.`;
        sendAlertToPatient(patient.id, type, message);

        setNotificationToast({
            title: `${type} Sent!`,
            message: `Alert successfully sent to ${patient.name}`,
            type: 'success'
        });

        // Robot reaction simulation: Success animation
        const bot = document.getElementById('doctor-bot');
        if (bot) bot.classList.add('animate-bounce');
        setTimeout(() => bot && bot.classList.remove('animate-bounce'), 1000);

        setTimeout(() => setNotificationToast(null), 3000);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-body">

            {/* Robot Assistant Mascot */}
            <motion.div
                id="doctor-bot"
                className="fixed bottom-6 left-6 z-50 hidden xl:flex flex-col items-center gap-2 pointer-events-none"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
            >
                <div className="bg-white/90 backdrop-blur glass border border-cyan-400 p-2 rounded-xl text-[10px] font-bold text-cyan-500 mb-1">
                    System Ready 🤖
                </div>
                <img src="/medical_robot_character.png" className="w-20 h-20 object-contain drop-shadow-lg" />
            </motion.div>

            {/* Notification Toast */}
            <AnimatePresence>
                {notificationToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 20, x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed top-4 left-1/2 z-[100] glass neon-border-cyan p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px]"
                    >
                        <div className="bg-cyan-500 text-white p-2 rounded-full"><CheckCircle size={20} /></div>
                        <div>
                            <div className="font-bold text-sm text-main">{notificationToast.title}</div>
                            <div className="text-xs text-muted">{notificationToast.message}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar (Existing Structure, Enhanced Design) */}
            <aside className={`
                fixed md:relative top-0 left-0 w-full md:w-64 glass border-r border-white/10 p-6 flex flex-col h-screen z-40 transition-transform duration-300 ease-in-out
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="text-xl font-bold neon-text-cyan mb-10 flex items-center gap-2">
                    <Users /> DoctorPanel
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <NavButton active={activeTab === 'queue'} onClick={() => setActiveTab('queue')} icon={Clock} label="Queue Manager" />
                    <NavButton active={activeTab === 'upload'} onClick={() => setActiveTab('upload')} icon={FilePlus} label="Reports" />
                    <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={Settings} label="Settings" />
                    <button onClick={logout} className="btn btn-secondary w-full justify-start border-none text-danger mt-auto hover:bg-red-50/10">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <div className="container max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 border-b border-white/10 pb-6 gap-4">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}</h1>
                            <p className="text-muted text-lg flex items-center gap-2">
                                <Stethoscope size={20} className="text-cyan-400" /> {user?.specialty} • {user?.hospitalName}
                            </p>
                        </motion.div>
                        <div className="flex flex-col items-end gap-3">
                            <div className={`badge ${myDoctorProfile.status === 'Available' ? 'badge-success neon-border-teal' : 'badge-danger neon-border-purple'} text-sm py-2 px-6 shadow-sm`}>
                                ● {myDoctorProfile.status}
                            </div>
                        </div>
                    </div>

                    {/* --- TAB: QUEUE --- */}
                    {activeTab === 'queue' && (
                        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                            {/* Stats Card */}
                            <div className="xl:col-span-1 flex flex-col gap-6">
                                <div className="card glass neon-border-cyan p-8 flex flex-col items-center">
                                    <span className="text-xs uppercase font-bold tracking-widest text-muted mb-4">Now Serving</span>
                                    <div className="text-primary neon-text-cyan neon-pulse-cyan text-6xl font-black mb-6">
                                        {currentServing[myDoctorProfile.id] || '--'}
                                    </div>
                                    <button
                                        onClick={() => nextPatient(myHospital.id, myDoctorProfile.id)}
                                        className="btn btn-primary w-full py-4 text-lg shadow-[0_0_20px_rgba(14,165,233,0.3)] hover-neon-cyan"
                                    >
                                        Next Patient
                                    </button>
                                </div>
                                <div className="card glass p-4 flex justify-between items-center border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted font-bold">Waiting</div>
                                            <div className="text-lg font-bold">{myQueue.length} Patients</div>
                                        </div>
                                    </div>
                                    <Info size={16} className="text-muted cursor-pointer" />
                                </div>
                            </div>

                            {/* Main Queue List */}
                            <div className="xl:col-span-3">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">Live Patient Queue</h3>
                                    <div className="flex gap-2">
                                        <button className="bg-white/5 hover:bg-white/10 p-2 rounded-lg transition"><Bell size={18} /></button>
                                        <button className="bg-white/5 hover:bg-white/10 p-2 rounded-lg transition"><Settings size={18} /></button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <AnimatePresence>
                                        {myQueue.map((p, i) => (
                                            <motion.div
                                                key={p.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="card glass flex flex-col md:flex-row md:items-center justify-between p-6 hover:shadow-[0_0_25px_rgba(34,211,238,0.1)] transition-all border-white/10"
                                            >
                                                <div className="flex items-start gap-5 mb-4 md:mb-0">
                                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                        {p.token}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-lg flex items-center gap-3">
                                                            {p.name}
                                                            {p.status === 'confirmed' && <span className="text-[10px] bg-green-400/20 text-green-400 px-2 py-0.5 rounded-full border border-green-400/30">Confirmed</span>}
                                                            {p.status === 'delayed' && <span className="text-[10px] bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-400/30">Late</span>}
                                                        </div>
                                                        <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                                                            <span className="flex items-center gap-1"><Phone size={12} /> {p.mobile}</span>
                                                            <span className="flex items-center gap-1"><Mail size={12} /> {p.email}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    <AlertButton icon={<Bell size={16} />} label="SMS" onClick={() => handleSendAlert(p, 'SMS')} color="blue" />
                                                    <AlertButton icon={<MessageSquare size={16} />} label="WhatsApp" onClick={() => handleSendAlert(p, 'WhatsApp')} color="green" />
                                                    <AlertButton icon={<Mail size={16} />} label="Email" onClick={() => handleSendAlert(p, 'Email')} color="purple" />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {myQueue.length === 0 && (
                                        <div className="text-center py-20 glass rounded-3xl border-dashed border-white/10 text-muted">
                                            <p className="text-lg italic">The waiting list is empty. Take a coffee break! ☕</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reports Tab (Simplified for brevity) */}
                    {activeTab === 'upload' && (
                        <div className="card max-w-2xl mx-auto glass p-8 animate-fade-in border-white/10">
                            <h3 className="text-2xl font-bold mb-8">Upload Clinical Report</h3>
                            {/* ... (Existing Form Logic) */}
                        </div>
                    )}

                    {activeTab === 'settings' && <SettingsPanel />}
                </div>
            </main>
        </div>
    );
};

const AlertButton = ({ icon, label, onClick, color }) => (
    <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-${color}-500/10 text-${color}-400 border border-${color}-400/20 text-xs font-bold hover:bg-${color}-500/20 transition-all`}
        style={{
            backgroundColor: color === 'blue' ? 'rgba(59,130,246,0.1)' : color === 'green' ? 'rgba(34,197,94,0.1)' : 'rgba(168,85,247,0.1)',
            color: color === 'blue' ? '#3b82f6' : color === 'green' ? '#22c55e' : '#a855f7',
            borderColor: color === 'blue' ? 'rgba(59,130,246,0.2)' : color === 'green' ? 'rgba(34,197,94,0.2)' : 'rgba(168,85,247,0.2)'
        }}
    >
        {icon} {label}
    </motion.button>
);

const NavButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`btn w-full justify-start border-none px-4 py-3 rounded-xl gap-3 text-base ${active ? 'bg-cyan-400 text-white font-bold shadow-lg shadow-cyan-400/30' : 'bg-transparent text-gray-400 hover:bg-white/5 hover:text-white'}`}
    >
        <Icon size={20} /> {label}
    </button>
);

export default DoctorDashboard;
