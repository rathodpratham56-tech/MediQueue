import React, { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import { useAuth } from '../context/AuthContext';
import { Settings, Users, Clock, LogOut, MapPin, Edit2, FilePlus, Upload, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SettingsPanel from '../components/SettingsPanel';

const DoctorDashboard = () => {
    // 1. Get hospitals context (updated)
    const { getHospitalForDoctor, updateDoctorStatus, queue, nextPatient, currentServing, addReport } = useQueue();
    const { user, logout } = useAuth();

    // Derived state from the new structure
    const myHospital = getHospitalForDoctor();
    // In real app, we filter by user.id matching doctor.id. 
    // Here we hardcode to the first doctor of the first hospital for demo
    const myDoctorProfile = myHospital.doctors.find(d => d.name === user?.name) || myHospital.doctors[0];

    // Queue for this doctor
    // Note: queue items now track hospitalId too
    const myQueue = queue.filter(p => p.doctorId === myDoctorProfile.id && p.status === 'waiting');

    const [activeTab, setActiveTab] = useState('queue'); // 'queue', 'upload', 'settings'
    const [reportForm, setReportForm] = useState({ patientName: '', diagnosis: '', prescription: '' });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleUploadReport = (e) => {
        e.preventDefault();
        addReport({
            id: Date.now(),
            patientName: reportForm.patientName,
            hospital: myHospital.name,
            doctor: myDoctorProfile.name,
            date: new Date().toISOString().split('T')[0],
            diagnosis: reportForm.diagnosis,
            prescription: reportForm.prescription,
            reportUrl: '#'
        });
        alert('Report Uploaded Successfully');
        setReportForm({ patientName: '', diagnosis: '', prescription: '' });
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-body">
            {/* Mobile Header */}
            <div className="md:hidden bg-white p-4 flex justify-between items-center border-b sticky top-0 z-20">
                <div className="font-bold text-lg text-primary flex items-center gap-2"><Users size={20} /> DoctorPanel</div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed md:relative top-[61px] md:top-0 left-0 w-full md:w-64 glass border-r border-gray-200 p-6 flex flex-col h-[calc(100vh-61px)] md:h-screen z-10 transition-transform duration-300 ease-in-out
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="hidden md:flex text-xl font-bold text-primary neon-text-cyan mb-10 items-center gap-2">
                    <Users /> DoctorPanel
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <NavButton active={activeTab === 'queue'} onClick={() => { setActiveTab('queue'); setMobileMenuOpen(false) }} icon={Clock} label="Queue Manager" />
                    <NavButton active={activeTab === 'upload'} onClick={() => { setActiveTab('upload'); setMobileMenuOpen(false) }} icon={FilePlus} label="Upload Reports" />
                    <NavButton active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false) }} icon={Settings} label="Settings" />
                    <button onClick={logout} className="btn btn-secondary w-full justify-start border-none text-danger mt-10 md:mt-auto hover:bg-red-50">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <div className="container max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b pb-6 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
                            <p className="text-muted text-lg">
                                {user?.specialty} • {user?.hospitalName}
                                {user?.branchName && <span className="text-primary-dark"> ({user.branchName})</span>}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted mt-2">
                                <Clock size={16} className="text-primary" /> <strong>Available:</strong> {user?.timings}
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <div className={`badge ${myDoctorProfile.status === 'Available' ? 'badge-success neon-border-teal' : 'badge-danger neon-border-purple'} text-sm py-2 px-4 shadow-sm transition-all duration-300`}>
                                ● {myDoctorProfile.status}
                            </div>
                            <div className="flex items-center gap-3 glass p-2 rounded-xl border shadow-sm px-4">
                                <span className="text-xs font-bold text-muted uppercase tracking-wider">Availability</span>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={myDoctorProfile.status === 'Available'}
                                        onChange={(e) => {
                                            const newStatus = e.target.checked ? 'Available' : 'Unavailable';
                                            updateDoctorStatus(myHospital.id, myDoctorProfile.id, newStatus);
                                        }}
                                    />
                                    <span className="slider neon-pulse-cyan"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* --- TAB: QUEUE --- */}
                    {activeTab === 'queue' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                            {/* Controller */}
                            <div className="card glass neon-border-cyan lg:col-span-1 h-fit p-6">
                                <div className="text-muted text-xs uppercase font-bold tracking-widest mb-4">Now Serving</div>
                                <div className="neon-text-cyan neon-pulse-cyan" style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1, marginBottom: '1.5rem', textAlign: 'center', borderRadius: '1rem' }}>
                                    {currentServing[myDoctorProfile.id] || '--'}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button onClick={() => nextPatient(myHospital.id, myDoctorProfile.id)} className="btn btn-primary w-full shadow-lg py-3 text-lg">
                                        Call Next Patient
                                    </button>
                                    <button className="btn btn-secondary w-full">Recall Previous</button>
                                </div>
                            </div>

                            {/* List */}
                            <div className="card lg:col-span-2 glass p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="m-0">Waiting List <span className="text-muted font-normal ml-2">({myQueue.length})</span></h3>
                                    <button className="text-primary text-sm font-bold hover:underline">View All</button>
                                </div>

                                {myQueue.length === 0 ? (
                                    <div className="text-center py-12 text-muted bg-gray-50 rounded-lg border border-dashed">
                                        <p className="italic">No patients in queue currently.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        {myQueue.map((p, i) => (
                                            <div key={p.id} className="flex justify-between items-center p-4 glass border rounded-xl hover:shadow-md transition hover-neon-cyan">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-sm font-bold text-primary border border-primary">
                                                        {i + 1}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-lg">{p.name}</div>
                                                        <div className="text-xs text-muted">General Checkup</div>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-xl text-primary neon-text-cyan">{p.token}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- TAB: UPLOAD REPORTS --- */}
                    {activeTab === 'upload' && (
                        <div className="card max-w-2xl mx-auto animate-fade-in">
                            <h3 className="mb-8">Upload Patient Report</h3>
                            <form onSubmit={handleUploadReport} className="flex flex-col gap-6">
                                <div>
                                    <label className="label">Patient Name</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={reportForm.patientName}
                                        onChange={e => setReportForm({ ...reportForm, patientName: e.target.value })}
                                        required
                                        placeholder="Search or enter name..."
                                    />
                                </div>
                                <div>
                                    <label className="label">Diagnosis</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={reportForm.diagnosis}
                                        onChange={e => setReportForm({ ...reportForm, diagnosis: e.target.value })}
                                        required
                                        placeholder="e.g. Viral Fever"
                                    />
                                </div>
                                <div>
                                    <label className="label">Prescription / Clinical Notes</label>
                                    <textarea
                                        className="input min-h-[120px]"
                                        value={reportForm.prescription}
                                        onChange={e => setReportForm({ ...reportForm, prescription: e.target.value })}
                                        required
                                        placeholder="Enter detailed notes here..."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="label">Attach File (PDF/Image)</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center text-muted cursor-pointer hover:bg-gray-50 transition hover:border-primary">
                                        <Upload className="mx-auto mb-3 text-gray-400" size={32} />
                                        <p className="font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or PDF (max. 10MB)</p>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary py-3 text-lg mt-4 shadow-lg">Submit Report</button>
                            </form>
                        </div>
                    )}

                    {/* --- TAB: SETTINGS --- */}
                    {activeTab === 'settings' && <SettingsPanel />}
                </div>
            </main>
        </div>
    );
};

const NavButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`btn w-full justify-start border-none px-4 py-3 rounded-xl gap-3 text-base ${active ? 'bg-primary-light text-primary font-bold' : 'bg-transparent text-muted hover:bg-gray-50 hover:text-main'}`}
    >
        <Icon size={20} /> {label}
    </button>
);

export default DoctorDashboard;
