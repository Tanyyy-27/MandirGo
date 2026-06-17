import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaLock, FaChevronDown, FaEye, FaEyeSlash, FaShieldAlt, FaTimes } from 'react-icons/fa';

// ─── Temple Credentials (exported so Dashboard can import) ───────────────────
export const TEMPLE_CREDENTIALS = {
    1: { name: 'Somnath Jyotirlinga Mahadev Temple',           deity: 'Lord Shiva',       authCode: 'SJMT@2024#SHIV', password: 'Somnath@Shiv108'  },
    2: { name: 'Shree Dwarkadhishji Mandir',                   deity: 'Lord Krishna',     authCode: 'SDM@2024#KRSH',  password: 'Dwarka@Krish786'  },
    3: { name: 'Ambaji Mata Devasthan',                        deity: 'Goddess Ambaji',   authCode: 'AMD@2024#AMBA',  password: 'Ambaji@Mata999'   },
    4: { name: 'Mahakali Mata Temple',                         deity: 'Goddess Mahakali', authCode: 'MMT@2024#KALI',  password: 'Mahakali@Devi51'  },
    5: { name: 'Shrimant Dagadusheth Halwai Ganapati Temple',  deity: 'Lord Ganesha',     authCode: 'SDGH@2024#GANA', password: 'Dagadu@Ganesh21'  },
};

const temples = Object.entries(TEMPLE_CREDENTIALS).map(([id, v]) => ({ id: Number(id), name: v.name, deity: v.deity }));

const AdminLoginModal = ({ onClose }) => {
    const navigate = useNavigate();
    const [selectedTempleId, setSelectedTempleId] = useState('');
    const [dropdownOpen, setDropdownOpen]         = useState(false);
    const [authCode, setAuthCode]                 = useState('');
    const [password, setPassword]                 = useState('');
    const [showPwd, setShowPwd]                   = useState(false);
    const [loading, setLoading]                   = useState(false);
    const [error, setError]                       = useState('');
    const [shake, setShake]                       = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    useEffect(() => {
        const h = (e) => { if (!e.target.closest('#tdropdown')) setDropdownOpen(false); };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);

    const triggerError = (msg) => {
        setError(msg); setShake(true);
        setTimeout(() => setShake(false), 600);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!selectedTempleId) return triggerError('Please select a temple first.');
        if (!authCode.trim())  return triggerError('Please enter the Authentication Code.');
        if (!password.trim())  return triggerError('Please enter the Password.');

        const creds = TEMPLE_CREDENTIALS[selectedTempleId];
        if (authCode !== creds.authCode || password !== creds.password)
            return triggerError('Invalid credentials. Please check and try again.');

        setLoading(true);
        setTimeout(() => {
            sessionStorage.setItem('adminTempleId',   String(selectedTempleId));
            sessionStorage.setItem('adminTempleName', creds.name);
            setLoading(false);
            onClose();                          // close modal FIRST
            navigate('/admin/dashboard');       // THEN navigate
        }, 900);
    };

    const chosen = temples.find((t) => t.id === selectedTempleId);

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white ${shake ? 'admin-shake' : ''}`}
                style={{ animation: 'adminModalIn .3s cubic-bezier(.22,.68,0,1.2)' }}
            >
                {/* Banner */}
                <div className="relative h-32 flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg,#f97316 0%,#ea580c 55%,#c2410c 100%)' }}>
                    <div className="absolute inset-0 opacity-[0.07]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='28' fill='none' stroke='white' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='18' fill='none' stroke='white' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='white' stroke-width='1'/%3E%3Cline x1='30' y1='2' x2='30' y2='58' stroke='white' stroke-width='.5'/%3E%3Cline x1='2' y1='30' x2='58' y2='30' stroke='white' stroke-width='.5'/%3E%3Cline x1='10' y1='10' x2='50' y2='50' stroke='white' stroke-width='.5'/%3E%3Cline x1='50' y1='10' x2='10' y2='50' stroke='white' stroke-width='.5'/%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px',
                    }} />
                    <div className="relative flex items-center gap-3">
                        <FaShieldAlt className="text-white text-3xl" />
                        <div>
                            <p className="text-white text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>Trustee Admin Portal</p>
                            <p className="text-orange-200 text-xs tracking-[0.2em] uppercase">Authorized Personnel Only</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4">
                    {error && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 bg-red-50 border border-red-200">
                            <FaTimes size={11} className="flex-shrink-0" />{error}
                        </div>
                    )}

                    {/* Temple Dropdown */}
                    <div id="tdropdown" className="relative">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1.5">Select Temple</label>
                        <button type="button" onClick={() => setDropdownOpen((o) => !o)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-left bg-gray-50"
                            style={{ borderColor: dropdownOpen ? '#f97316' : '#e5e7eb' }}>
                            <span className={`text-sm ${chosen ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                                {chosen ? chosen.name : 'Choose your temple…'}
                            </span>
                            <FaChevronDown size={11} className="text-orange-400 flex-shrink-0 ml-2 transition-transform duration-200"
                                style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none' }} />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 right-0 top-full mt-1 z-[9999] rounded-xl border border-orange-100 shadow-2xl overflow-hidden bg-white">
                                {temples.map((t) => (
                                    <button key={t.id} type="button"
                                        onClick={() => { setSelectedTempleId(t.id); setDropdownOpen(false); setError(''); }}
                                        className="w-full text-left px-4 py-3 flex flex-col border-b border-orange-50 last:border-0 hover:bg-orange-50 transition-colors"
                                        style={{ background: selectedTempleId === t.id ? '#fff7ed' : '' }}>
                                        <span className="text-sm font-medium text-gray-800">{t.name}</span>
                                        <span className="text-xs text-orange-400 mt-0.5">{t.deity}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Auth Code */}
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1.5">Authentication Code</label>
                        <div className="relative">
                            <FaShieldAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-300 text-xs" />
                            <input type="text" value={authCode}
                                onChange={(e) => { setAuthCode(e.target.value); setError(''); }}
                                placeholder="e.g. SJMT@2024#SHIV"
                                className="w-full pl-9 pr-4 py-3 rounded-xl border-2 text-sm text-gray-800 outline-none bg-gray-50 transition-all"
                                style={{ borderColor: authCode ? '#f97316' : '#e5e7eb' }}
                                onFocus={(e) => (e.target.style.borderColor = '#f97316')}
                                onBlur={(e)  => (e.target.style.borderColor = authCode ? '#f97316' : '#e5e7eb')} />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1.5">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-300 text-xs" />
                            <input type={showPwd ? 'text' : 'password'} value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                placeholder="Enter your secure password"
                                className="w-full pl-9 pr-10 py-3 rounded-xl border-2 text-sm text-gray-800 outline-none bg-gray-50 transition-all"
                                style={{ borderColor: password ? '#f97316' : '#e5e7eb' }}
                                onFocus={(e) => (e.target.style.borderColor = '#f97316')}
                                onBlur={(e)  => (e.target.style.borderColor = password ? '#f97316' : '#e5e7eb')} />
                            <button type="button" onClick={() => setShowPwd((v) => !v)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors" tabIndex={-1}>
                                {showPwd ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 mt-1 transition-all"
                        style={{
                            background: loading ? '#fdba74' : 'linear-gradient(135deg,#f97316 0%,#ea580c 100%)',
                            boxShadow: loading ? 'none' : '0 4px 18px rgba(249,115,22,.35)',
                        }}>
                        {loading ? (
                            <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>Verifying…</>
                        ) : 'Sign In to Admin Panel'}
                    </button>
                    <p className="text-center text-xs text-gray-400 -mt-1">Contact your temple trust committee for access issues.</p>
                </form>

                <button onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:bg-white/20 transition-all text-xl">×</button>
            </div>

            <style>{`
                @keyframes adminModalIn { from{opacity:0;transform:scale(.93) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }
                @keyframes adminShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
                .admin-shake { animation: adminShake .5s ease; }
            `}</style>
        </div>
    );
};

export default AdminLoginModal;
