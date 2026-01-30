import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Moon, Sun, Globe, Lock, User, LogOut, ChevronRight, HelpCircle, Check } from 'lucide-react';

const SettingsPanel = () => {
    const { user, settings, updateSettings, logout } = useAuth();

    // Simple state for language dropdown toggle if we wanted a custom one, 
    // but native select is more accessible and robust for this demo.

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'mr', name: 'Marathi' }
    ];

    return (
        <div className="animate-fade-in max-w-2xl mx-auto py-4">
            <h2 className="mb-8 text-2xl font-bold">Account Settings</h2>

            {/* Profile Section */}
            <div className="card glass neon-border-cyan mb-8">
                <div className="flex items-center gap-6 p-6">
                    <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary text-3xl font-bold border-4 border-white shadow-sm">
                        {user?.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-xl mb-1">{user?.name}</div>
                        <div className="text-muted text-sm mb-3">{user?.name === 'Guest Patient' ? 'Patient Account' : 'Medical Professional'}</div>
                        <button className="btn btn-secondary btn-sm">Edit Profile</button>
                    </div>
                </div>
            </div>

            {/* Application Settings */}
            <h3 className="text-sm text-muted mb-4 uppercase tracking-wider font-bold pl-2">Preferences</h3>
            <div className="card glass neon-border-blue mb-8 p-0 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Bell size={20} /></div>
                        <div>
                            <div className="font-medium">Notifications</div>
                            <div className="text-xs text-muted">Receive queue updates</div>
                        </div>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.notifications}
                            onChange={e => updateSettings({ notifications: e.target.checked })}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            {settings.darkMode ? <Moon size={20} /> : <Sun size={20} />}
                        </div>
                        <div>
                            <div className="font-medium">Dark Mode</div>
                            <div className="text-xs text-muted">Easier on the eyes</div>
                        </div>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.darkMode}
                            onChange={e => updateSettings({ darkMode: e.target.checked })}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Globe size={20} /></div>
                        <div>
                            <div className="font-medium">Language</div>
                            <div className="text-xs text-muted">Select prefered language</div>
                        </div>
                    </div>
                    {/* Language Select */}
                    <select
                        className="input w-auto text-sm py-1 px-3 border-none bg-transparent font-bold text-primary cursor-pointer outline-none focus:ring-0"
                        value={settings.language}
                        onChange={(e) => updateSettings({ language: e.target.value })}
                        style={{ textAlign: 'right' }}
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.name}>{lang.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Security & Support */}
            <h3 className="text-sm text-muted mb-4 uppercase tracking-wider font-bold pl-2">Security & Support</h3>
            <div className="card glass p-0 overflow-hidden mb-8">
                <div className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Lock size={20} /></div>
                        <div>
                            <div className="font-medium">Privacy Settings</div>
                            <div className="text-xs text-muted">Manage data sharing</div>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-muted" />
                </div>
                <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 text-gray-600 rounded-lg"><HelpCircle size={20} /></div>
                        <div>
                            <div className="font-medium">Help & Support</div>
                            <div className="text-xs text-muted">FAQs and Contact</div>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-muted" />
                </div>
            </div>

            <button onClick={logout} className="btn w-full justify-center border text-danger hover:bg-red-50 py-3 gap-2">
                <LogOut size={18} /> Log Out
            </button>
        </div>
    );
};

export default SettingsPanel;
