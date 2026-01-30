import React, { useState, useEffect } from 'react';
import { useQueue } from '../context/QueueContext';
import { useAuth } from '../context/AuthContext';
import {
    MapPin, Search, Clock, ArrowRight, FileText, Settings, Phone,
    AlertTriangle, Download, CheckCircle, Clock4, XCircle, Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SettingsPanel from '../components/SettingsPanel';

const PatientDashboard = () => {
    const { hospitals, joinQueue, queue, updatePatientStatus, patientHistory } = useQueue();
    const { user } = useAuth();

    // Tab State: 'book', 'active', 'history', 'settings'
    const [activeTab, setActiveTab] = useState('book');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [activeTokenData, setActiveTokenData] = useState(null);

    // Sync active token from context
    useEffect(() => {
        const myActive = queue.find(q => q.name === user.name && q.status !== 'serving');
        if (myActive) setActiveTokenData(myActive);
        else setActiveTokenData(null);
    }, [queue, user.name]);

    const handleJoinQueue = (doc) => {
        const ticket = joinQueue({
            name: user.name,
            mobile: user.mobile,
            whatsapp: user.whatsapp,
            email: user.email,
            age: user.age,
            gender: user.gender,
            symptoms: user.symptoms
        }, selectedHospital.id, doc.id);
        setActiveTokenData(ticket);
        setActiveTab('active');
        setSelectedHospital(null);
    };

    const handleResponse = (newStatus) => {
        if (activeTokenData) {
            updatePatientStatus(activeTokenData.id, newStatus);
            // Bot reaction
            const bot = document.getElementById('patient-bot');
            if (bot) bot.classList.add('animate-bounce');
            setTimeout(() => bot && bot.classList.remove('animate-bounce'), 1000);
        }
    };

    // Derived filtering logic
    const filteredHospitals = hospitals.filter(h =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.branch.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-body flex flex-col md:flex-row perspective-1000">

            {/* Robot Assistant Mascot */}
            <motion.div
                id="patient-bot"
                className="fixed bottom-24 right-6 z-50 hidden md:flex flex-col items-center gap-2 pointer-events-none"
                animate={{
                    y: [0, -10, 0],
                    rotate: activeTokenData?.alertSent ? [0, 5, -5, 0] : 0
                }}
                transition={{ repeat: Infinity, duration: 4 }}
            >
                <AnimatePresence>
                    {activeTokenData?.alertSent && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-cyan-400 text-white text-[10px] font-black px-3 py-2 rounded-2xl shadow-[0_0_15px_#22d3ee] mb-1"
                        >
                            YOU HAVE AN ALERT! 🔔
                        </motion.div>
                    )}
                </AnimatePresence>
                <img src="/medical_robot_character.png" className="w-24 h-24 object-contain drop-shadow-2xl" />
            </motion.div>

            {/* Desktop Sidebar */}
            <nav className="fixed bottom-0 left-0 w-full md:w-72 glass md:h-screen border-r border-white/10 z-40 flex md:flex-col justify-around md:justify-start p-4 shadow-2xl backdrop-blur-xl md:relative h-20 md:h-screen transition-all">
                <div className="hidden md:flex items-center gap-2 font-black text-2xl text-gradient-animate mb-12">
                    MediQueue
                </div>
                <div className="flex md:flex-col w-full gap-1">
                    <NavItem icon={MapPin} label="Find Hospitals" active={activeTab === 'book'} onClick={() => setActiveTab('book')} />
                    <NavItem icon={Clock} label="Live Status" active={activeTab === 'active'} onClick={() => setActiveTab('active')} />
                    <NavItem icon={FileText} label="Records" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
                    <NavItem icon={Settings} label="Account" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </div>
            </nav>

            <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full max-w-7xl mx-auto pb-28 md:pb-10 transform-3d">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-black">{
                            activeTab === 'book' ? 'Find & Book' :
                                activeTab === 'active' ? 'Token Status' :
                                    activeTab === 'history' ? 'My Records' : 'Settings'
                        }</h2>
                    </div>
                </header>

                {/* --- TAB: BOOK --- */}
                {activeTab === 'book' && (
                    <div className="animate-fade-in">
                        {!selectedHospital ? (
                            <>
                                <div className="relative mb-8 group">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition" size={20} />
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all text-lg shadow-inner"
                                        placeholder="Search Pune's best hospitals..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {filteredHospitals.map(h => (
                                        <motion.div
                                            key={h.id}
                                            whileHover={{ scale: 1.01, y: -5 }}
                                            onClick={() => setSelectedHospital(h)}
                                            className="card glass p-8 cursor-pointer transition-all border-white/5 hover:border-cyan-400/30 group relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="font-black text-2xl text-cyan-400">{h.name}</div>
                                                <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider">{h.branch}</span>
                                            </div>
                                            <div className="text-gray-400 text-sm flex items-center gap-2 mb-6">
                                                <MapPin size={16} /> {h.address}
                                            </div>
                                            <div className="flex justify-between items-center border-t border-white/5 pt-6">
                                                <span className="text-sm font-bold opacity-60">Ready to Consult</span>
                                                <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400"><ArrowRight size={20} /></div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="pop-3d-entrance">
                                <button onClick={() => setSelectedHospital(null)} className="mb-8 text-cyan-400 hover:text-cyan-300 flex items-center gap-2 font-bold transition">
                                    <ArrowRight className="rotate-180" size={18} /> Back to Search
                                </button>
                                <div className="card glass neon-border-cyan p-8 mb-10 overflow-hidden relative">
                                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div>
                                            <h2 className="text-4xl font-black mb-2">{selectedHospital.name}</h2>
                                            <p className="text-gray-400 flex items-center gap-2"><MapPin size={18} /> {selectedHospital.address}</p>
                                        </div>
                                        <button className="btn btn-primary bg-cyan-500 hover:bg-cyan-400 border-none px-8 py-3 rounded-2xl shadow-xl shadow-cyan-500/20">
                                            Emergency: {selectedHospital.emergencyContact}
                                        </button>
                                    </div>
                                </div>
                                <h3 className="mb-8 text-2xl font-bold">Available Specialists</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {selectedHospital.doctors.map(doc => (
                                        <div key={doc.id} className="card glass p-6 flex flex-col hover:shadow-2xl transition-all border-white/10">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400"><Stethoscope size={28} /></div>
                                                <div className={`badge ${doc.status === 'Available' ? 'badge-success neon-border-teal' : 'badge-danger neon-border-purple'} text-[10px] px-3 py-1`}>● {doc.status}</div>
                                            </div>
                                            <div className="font-bold text-xl mb-1">{doc.name}</div>
                                            <div className="text-cyan-400 text-sm font-black uppercase tracking-widest mb-4">{doc.specialty}</div>
                                            <div className="text-xs text-gray-400 flex items-center gap-2 mb-6 bg-white/5 p-2 rounded-lg"><Clock size={14} /> {doc.timings}</div>
                                            <button
                                                onClick={() => handleJoinQueue(doc)}
                                                disabled={doc.status !== 'Available'}
                                                className="btn btn-primary w-full py-3 rounded-xl hover-neon-cyan"
                                            >Join Queue</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* --- TAB: ACTIVE QUEUE --- */}
                {activeTab === 'active' && (
                    <div className="h-full flex flex-col items-center justify-center py-10 pop-3d-entrance">
                        {activeTokenData ? (
                            <div className="flex flex-col items-center gap-8 w-full max-w-lg">
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="card glass neon-border-cyan w-full text-center p-12 shadow-[0_40px_100px_rgba(34,211,238,0.15)] relative">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/20 px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest text-cyan-400">Your Ticket</div>
                                    <h1 className="text-8xl font-black neon-text-cyan neon-pulse-cyan my-6 tracking-tighter">{activeTokenData.token}</h1>
                                    <div className="flex flex-col gap-4 mb-2">
                                        <div className="flex justify-between items-center px-4 py-2 border-b border-white/5">
                                            <span className="text-gray-400 text-sm">Patient Status</span>
                                            <span className="font-bold capitalize">{activeTokenData.status}</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <AnimatePresence>
                                    {activeTokenData.alertSent && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className="card glass border-cyan-400 p-8 w-full shadow-2xl relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 left-0 w-1 bg-cyan-400 h-full"></div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="bg-cyan-400 p-3 rounded-full text-white shadow-lg animate-pulse"><Bell size={24} /></div>
                                                <div>
                                                    <h3 className="text-xl font-bold">Doctor says: "Please be ready!"</h3>
                                                    <p className="text-sm text-gray-400">The doctor is expecting you shortly.</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <ResponseBtn icon={<CheckCircle size={18} />} label="I'm Coming" color="green" onClick={() => handleResponse('confirmed')} />
                                                <ResponseBtn icon={<Clock4 size={18} />} label="Be Late" color="amber" onClick={() => handleResponse('delayed')} />
                                                <ResponseBtn icon={<XCircle size={18} />} label="Cancel" color="red" onClick={() => handleResponse('cancelled')} />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button onClick={() => handleResponse('cancelled')} className="text-red-400 font-bold hover:underline">Leave Queue</button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="text-8xl mb-8 float-slow">🎫</div>
                                <h3 className="text-2xl font-black mb-4">No Active Tokens</h3>
                                <button onClick={() => setActiveTab('book')} className="btn btn-primary px-10 py-4 rounded-2xl shadow-2xl shadow-cyan-500/30">Book Now</button>
                            </div>
                        )}
                    </div>
                )}

                {/* --- TAB: HISTORY --- */}
                {activeTab === 'history' && (
                    <div className="flex flex-col gap-6 animate-fade-in">
                        {patientHistory.map(record => (
                            <div key={record.id} className="card glass p-8 flex flex-col lg:flex-row gap-8 items-center border-white/10 hover:border-cyan-400/20 transition">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 flex-shrink-0"><FileText size={32} /></div>
                                <div className="flex-1 text-center lg:text-left">
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                                        <div className="font-black text-2xl text-gradient-animate leading-none">{record.hospital}</div>
                                        <span className="text-[10px] bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full font-bold self-center uppercase">{record.date}</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Diagnosis</span>
                                            <p className="font-bold">{record.diagnosis}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Prescription</span>
                                            <p className="font-bold">{record.prescription}</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-secondary px-6 rounded-xl border-white/20"><Download size={20} /></button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'settings' && <SettingsPanel />}
            </main>
        </div>
    );
};

const ResponseBtn = ({ icon, label, color, onClick }) => (
    <motion.button
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-xs transition-all border
            ${color === 'green' ? 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20' :
                color === 'amber' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'}`}
    >
        {icon} {label}
    </motion.button>
);

const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`flex flex-col md:flex-row items-center md:gap-4 p-3 md:px-6 md:py-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-cyan-400 text-white shadow-xl shadow-cyan-400/20' : 'text-gray-400 hover:bg-teal-400/5 hover:text-cyan-400'}`}
    >
        <Icon size={24} className="md:w-5 md:h-5" />
        <span className="text-[10px] md:text-sm font-black mt-1 md:mt-0">{label}</span>
    </div>
);

export default PatientDashboard;
沟通:
