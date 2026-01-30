import React, { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Search, Clock, ArrowRight, FileText, Settings, Phone, AlertTriangle, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import SettingsPanel from '../components/SettingsPanel';

const PatientDashboard = () => {
    const { hospitals, joinQueue, getDoctorQueue, patientHistory } = useQueue();
    const { user } = useAuth();

    // Tab State: 'book', 'active', 'history', 'settings'
    const [activeTab, setActiveTab] = useState('book');

    // Booking Flow State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [myTokenData, setMyTokenData] = useState(null);

    // Filtering Logic
    const filteredHospitals = hospitals.filter(h =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleJoinQueue = (doc) => {
        const ticket = joinQueue({ name: user.name }, selectedHospital.id, doc.id);
        setMyTokenData(ticket);
        setSelectedDoctor(doc);
        setActiveTab('active');
        setSelectedHospital(null); // Reset selection view
    };

    const handleEmergency = () => {
        const contact = selectedHospital ? selectedHospital.emergencyContact : hospitals[0].emergencyContact;
        alert(`Calling Emergency: ${contact}`);
    };

    return (
        <div className="min-h-screen bg-body flex flex-col md:flex-row">
            {/* Mobile Bottom Nav / Desktop Sidebar */}
            <nav className="fixed bottom-0 left-0 w-full md:w-72 glass md:h-screen border-t md:border-t-0 md:border-r border-gray-200 z-30 flex md:flex-col justify-around md:justify-start p-2 md:p-6 shadow-lg bg-white/95 backdrop-blur-md md:relative">
                <div className="hidden md:flex items-center gap-2 font-bold text-2xl text-primary neon-text-cyan mb-12 px-2">
                    MediQueue
                </div>

                <div className="flex md:flex-col w-full justify-between md:justify-start md:gap-2">
                    <NavItem icon={MapPin} label="Find & Book" active={activeTab === 'book'} onClick={() => setActiveTab('book')} />
                    <NavItem icon={Clock} label="Live Queue" active={activeTab === 'active'} onClick={() => setActiveTab('active')} />
                    <NavItem icon={FileText} label="My History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
                    <NavItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                </div>

                <div className="md:mt-auto pt-6 hidden md:block">
                    <button onClick={handleEmergency} className="btn w-full flex items-center gap-2 justify-center shadow-lg animate-pulse bg-danger text-white border-none py-3">
                        <AlertTriangle size={20} /> Emergency Help
                    </button>
                </div>
            </nav>

            {/* Mobile Emergency FAB */}
            <button onClick={handleEmergency} className="md:hidden fixed bottom-24 right-4 w-14 h-14 rounded-full bg-danger text-white shadow-xl flex items-center justify-center z-20 animate-pulse border-4 border-white">
                <AlertTriangle size={24} />
            </button>

            <main className="flex-1 p-4 md:p-10 overflow-y-auto w-full max-w-7xl mx-auto pb-28 md:pb-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">{
                            activeTab === 'book' ? 'Find & Book' :
                                activeTab === 'active' ? 'Live Status' :
                                    activeTab === 'history' ? 'Medical Records' : 'Settings'
                        }</h2>
                        {activeTab === 'book' && <div className="text-sm text-muted flex items-center gap-1"><MapPin size={14} /> Pune, Maharashtra</div>}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold border-2 border-white shadow-sm">
                        {user?.name.charAt(0)}
                    </div>
                </header>

                {/* --- TAB: BOOK --- */}
                {activeTab === 'book' && (
                    <div className="animate-fade-in">
                        {!selectedHospital ? (
                            <>
                                <div className="relative mb-8">
                                    <Search className="absolute left-4 top-3.5 text-muted" size={20} />
                                    <input
                                        type="text"
                                        className="input pl-12 h-12 text-lg"
                                        style={{ paddingLeft: '3.5rem' }}
                                        placeholder="Search hospitals near Pune..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-responsive gap-6">
                                    {filteredHospitals.map(h => (
                                        <div key={h.id} onClick={() => setSelectedHospital(h)} className="card hover:border-primary cursor-pointer transition p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="font-bold text-xl text-primary-dark">{h.name}</div>
                                                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium text-muted">{h.branch}</span>
                                            </div>
                                            <div className="text-muted text-sm flex items-center gap-2 mb-4">
                                                <MapPin size={16} /> {h.address}
                                            </div>
                                            <div className="flex justify-between items-center mt-auto border-t pt-4">
                                                <div className="text-sm font-bold text-main">
                                                    {h.doctors.length} Specialists
                                                </div>
                                                <ArrowRight size={18} className="text-primary" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="animate-fade-in">
                                <button onClick={() => setSelectedHospital(null)} className="mb-6 text-sm text-muted flex items-center gap-2 hover:text-primary transition font-medium">
                                    <ArrowRight className="rotate-180" size={16} /> Back to Search
                                </button>

                                <div className="card mb-8 bg-gradient-to-r from-blue-500 to-blue-600 border-none shadow-xl text-white p-8" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' }}>
                                    <h2 className="text-white mb-2 text-3xl">{selectedHospital.name}</h2>
                                    <div className="opacity-90 text-sm mb-6 flex items-center gap-2">
                                        <MapPin size={16} /> {selectedHospital.address}
                                    </div>
                                    <button onClick={() => alert(`Calling ${selectedHospital.emergencyContact}`)} className="btn bg-white text-danger btn-sm border-none shadow-sm font-bold py-2 px-4">
                                        <Phone size={16} /> Emergency: {selectedHospital.emergencyContact}
                                    </button>
                                </div>

                                <h3 className="mb-6 text-xl">Select Specialist</h3>
                                <div className="grid grid-responsive gap-6">
                                    {selectedHospital.doctors.map(doc => (
                                        <div key={doc.id} className="card hover:shadow-lg transition flex flex-col p-6 overflow-visible">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="font-bold text-lg mb-1">{doc.name}</div>
                                                    <div className="text-primary text-sm font-medium neon-text-cyan">{doc.specialty}</div>
                                                </div>
                                                <div className={`badge ${doc.status === 'Available' ? 'badge-success neon-border-teal' : 'badge-danger neon-border-purple'} text-[10px] px-3 py-1 shadow-sm`}>
                                                    ● {doc.status}
                                                </div>
                                            </div>
                                            <div className="text-sm text-muted mb-6 flex items-center gap-2 bg-gray-50 p-2 rounded">
                                                <Clock size={16} /> {doc.timings}
                                            </div>

                                            {doc.status === 'Unavailable' && (
                                                <div className="text-xs text-danger mb-4 flex items-center gap-1 font-bold animate-fade-in">
                                                    <AlertTriangle size={14} /> Doctor is currently unavailable. Please choose another doctor.
                                                </div>
                                            )}

                                            <button
                                                onClick={() => handleJoinQueue(doc)}
                                                disabled={doc.status !== 'Available'}
                                                className={`btn w-full mt-auto ${doc.status === 'Available' ? 'btn-primary shadow-md hover-neon-cyan' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
                                            >
                                                {doc.status === 'Available' ? 'Join Queue' : 'Unavailable'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* --- TAB: ACTIVE QUEUE --- */}
                {activeTab === 'active' && (
                    <div className="h-full flex items-center justify-center animate-fade-in py-10">
                        {myTokenData ? (
                            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card glass neon-border-cyan w-full max-w-md text-center p-8 shadow-xl">
                                <div className="text-xs text-muted uppercase font-bold tracking-widest mb-4">Live Token</div>
                                <h1 className="text-7xl text-primary neon-text-cyan neon-pulse-cyan font-bold mb-4 tracking-tighter" style={{ borderRadius: '2rem' }}>{myTokenData.token}</h1>
                                <div className="badge badge-primary neon-border-blue text-sm px-4 py-1 mb-8 shadow-sm">
                                    {myTokenData.status}
                                </div>

                                <div className="flex flex-col gap-4 mb-8">
                                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                        <span className="text-muted text-sm">Doctor</span>
                                        <span className="font-bold">{selectedDoctor?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-green-50 text-green-800 rounded-lg border border-green-100">
                                        <span className="text-sm font-medium">Est. Wait</span>
                                        <span className="font-bold">~15 mins</span>
                                    </div>
                                </div>
                                <button onClick={() => setMyTokenData(null)} className="btn btn-secondary w-full">Leave Queue</button>
                            </motion.div>
                        ) : (
                            <div className="text-center text-muted max-w-sm">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🎫</div>
                                <h3 className="text-main mb-2">No Active Queue</h3>
                                <p className="mb-8">You are not currently in line for any consultation.</p>
                                <button onClick={() => setActiveTab('book')} className="btn btn-primary shadow-lg w-full">Book First Appointment</button>
                            </div>
                        )}
                    </div>
                )}

                {/* --- TAB: HISTORY --- */}
                {activeTab === 'history' && (
                    <div className="animate-fade-in flex flex-col gap-6">
                        {patientHistory.map(record => (
                            <div key={record.id} className="card flex flex-col md:flex-row gap-6 items-start md:items-center p-6 hover:shadow-md transition">
                                <div className="flex-1">
                                    <div className="flex justify-between md:justify-start gap-4 mb-2">
                                        <div className="font-bold text-lg text-primary-dark">{record.hospital}</div>
                                        <div className="text-xs font-bold text-muted bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wide flex items-center">{record.date}</div>
                                    </div>
                                    <div className="text-main font-medium mb-3">{record.doctor}</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-3 rounded text-sm text-blue-900 border border-blue-100">
                                            <strong className="block text-xs uppercase text-blue-400 mb-1">Diagnosis</strong>
                                            {record.diagnosis}
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 border border-gray-200">
                                            <strong className="block text-xs uppercase text-gray-400 mb-1">Prescription</strong>
                                            {record.prescription}
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-secondary btn-sm gap-2 whitespace-nowrap self-start md:self-center">
                                    <Download size={16} /> Download
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- TAB: SETTINGS --- */}
                {activeTab === 'settings' && <SettingsPanel />}

            </main>
        </div>
    );
};

const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`flex flex-col md:flex-row items-center md:gap-4 p-2 md:px-6 md:py-4 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'text-primary md:bg-primary-light font-bold' : 'text-muted hover:text-primary hover:bg-gray-50'}`}
    >
        <Icon size={24} className={`md:w-5 md:h-5 transition-transform ${active ? 'scale-110' : ''}`} />
        <span className="text-[10px] md:text-sm font-medium mt-1 md:mt-0">{label}</span>
    </div>
);

export default PatientDashboard;
