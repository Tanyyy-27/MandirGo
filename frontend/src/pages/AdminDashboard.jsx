import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
    FaShieldAlt, FaUsers, FaVideo, FaBell, FaCalendarCheck,
    FaSignOutAlt, FaExclamationTriangle, FaTimes, FaCheckCircle,
    FaMapMarkerAlt, FaUserInjured, FaPrayingHands, FaClock,
    FaSearch, FaDownload, FaEye, FaWifi,
} from 'react-icons/fa';
import { MdSensors } from 'react-icons/md';
import { createClient } from '@supabase/supabase-js';

/* ── Supabase ──────────────────────────────────────────────────── */
const SUPABASE_URL  = 'https://mqioxolqucnduypfpavx.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xaW94b2xxdWNuZHV5cGZwYXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NDM1MDQsImV4cCI6MjA4ODIxOTUwNH0.lFbQdEULmufcPE1Ic5xjUmPRadOIFPJiJk9K2KYug9Q';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── Mock Data (unchanged) ────────────────────────────────────────────────────
const GATES = ['Gate A','Gate B','Gate C','Gate D','Gate E'];

const INITIAL_ALERTS = [
    { id: 1, gate:'Gate B', time:'10:32 AM', severity:'critical', resolved:false, detail:'Elderly devotee fall detected near Gate B entrance. Camera 3.' },
    { id: 2, gate:'Gate D', time:'09:14 AM', severity:'critical', resolved:false, detail:'Possible slip detected at Gate D steps. Camera 7.' },
    { id: 3, gate:'Gate A', time:'08:55 AM', severity:'high',     resolved:true,  detail:'Fall alert at Gate A — devotee assisted, resolved.' },
];

// ─── Sub-components (all unchanged) ──────────────────────────────────────────
const CrowdBadge = ({ count }) => {
    if (count <= 25) return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">LOW</span>;
    if (count <= 50) return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">MEDIUM</span>;
    return <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">HIGH</span>;
};

const CrowdBar = ({ count }) => {
    const pct   = Math.min((count / 100) * 100, 100);
    const color = count <= 25 ? '#22c55e' : count <= 50 ? '#eab308' : '#ef4444';
    return (
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
        </div>
    );
};

const StatCard = ({ icon, label, value, sub, color }) => (
    <div className="relative rounded-2xl p-5 overflow-hidden flex flex-col gap-1 shadow-sm border border-gray-100 bg-white">
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-[0.07]" style={{ background: color }} />
        <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
            <span className="text-xl" style={{ color }}>{icon}</span>
        </div>
        <p className="text-3xl font-extrabold text-gray-800" style={{ fontFamily:'Georgia,serif' }}>{value}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
);

// ─── CCTV Canvas Feed (unchanged) ─────────────────────────────────────────────
const LiveFeed = ({ gate, count }) => {
    const ref   = useRef(null);
    const animR = useRef(null);
    const dotsR = useRef([]);

    useEffect(() => {
        dotsR.current = Array.from({ length: Math.max(1, count) }, () => ({
            x: 40 + Math.random() * 220, y: 40 + Math.random() * 120,
            vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.7,
            r: 4 + Math.random() * 3,
        }));
    }, [count]);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const draw = () => {
            ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(249,115,22,0.05)'; ctx.lineWidth = 1;
            for (let x = 0; x < W; x += 20) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
            for (let y = 0; y < H; y += 20) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
            const sy = (Date.now() / 7) % H;
            const g  = ctx.createLinearGradient(0, sy-8, 0, sy+8);
            g.addColorStop(0,'transparent'); g.addColorStop(0.5,'rgba(249,115,22,0.12)'); g.addColorStop(1,'transparent');
            ctx.fillStyle = g; ctx.fillRect(0, sy-8, W, 16);
            dotsR.current.forEach(d => {
                d.x += d.vx; d.y += d.vy;
                if (d.x < d.r || d.x > W-d.r) d.vx *= -1;
                if (d.y < d.r || d.y > H-d.r) d.vy *= -1;
                ctx.strokeStyle = 'rgba(74,222,128,0.85)'; ctx.lineWidth = 1.2;
                ctx.strokeRect(d.x-d.r, d.y-d.r*1.6, d.r*2, d.r*3.2);
                ctx.beginPath(); ctx.arc(d.x, d.y-d.r*0.5, d.r*0.65, 0, Math.PI*2);
                ctx.fillStyle = 'rgba(74,222,128,0.5)'; ctx.fill();
            });
            const bl = 12; ctx.strokeStyle = '#f97316'; ctx.lineWidth = 2;
            [[4,4,1,1],[W-4,4,-1,1],[4,H-4,1,-1],[W-4,H-4,-1,-1]].forEach(([cx,cy,sx,sy2]) => {
                ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+sx*bl,cy); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx,cy+sy2*bl); ctx.stroke();
            });
            ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(8,8,44,16);
            ctx.fillStyle='#ef4444'; ctx.beginPath(); ctx.arc(17,16,4,0,Math.PI*2); ctx.fill();
            ctx.fillStyle='#fff'; ctx.font='bold 9px monospace'; ctx.fillText('REC',24,20);
            ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(W-68,6,62,17);
            ctx.fillStyle='#fb923c'; ctx.font='bold 9px monospace'; ctx.fillText(gate, W-64,18);
            animR.current = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(animR.current);
    }, [gate]);

    return <canvas ref={ref} width={300} height={180} className="w-full h-full rounded-t-lg" />;
};

// ─── Real Bookings Tab (NEW — reads from Supabase) ────────────────────────────
const RealBookingsTab = ({ templeId }) => {
    const [bookings,     setBookings]     = useState([]);
    const [loading,      setLoading]      = useState(true);
    const [fetchError,   setFetchError]   = useState('');
    const [search,       setSearch]       = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter,   setDateFilter]   = useState('');

    // Load from Supabase; auto-refresh every 30s
    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true); setFetchError('');
            try {
                let query = supabase
                    .from('bookings')
                    .select(`
                        id, booking_ref, temple, temple_id,
                        booking_date, time_slot, darshan_type,
                        total_amount, payment_status, upi_ref, created_at,
                        devotees ( id, name, age, gender, ticket_type, ticket_price )
                    `)
                    .order('created_at', { ascending: false });

                if (templeId) query = query.eq('temple_id', templeId);

                const { data, error: err } = await query;
                if (err) throw err;
                if (!cancelled) setBookings(data || []);
            } catch(e) {
                if (!cancelled) setFetchError(e.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        const interval = setInterval(load, 30000);
        return () => { cancelled = true; clearInterval(interval); };
    }, [templeId]);

    // Client-side filter
    const filtered = bookings.filter(b => {
        const term = search.toLowerCase();
        const matchSearch =
            (b.booking_ref||'').toLowerCase().includes(term) ||
            (b.devotees||[]).some(d => d.name.toLowerCase().includes(term));
        const matchStatus =
            statusFilter === 'All' ||
            (b.payment_status||'') === statusFilter;
        const matchDate =
            !dateFilter || b.booking_date === dateFilter;
        return matchSearch && matchStatus && matchDate;
    });

    // CSV export
    const exportCSV = () => {
        const rows = [
            ['Booking Ref','Temple','Date','Time Slot','Darshan Type','Devotees','Amount','Payment Status','UPI Ref','Booked At'],
            ...filtered.map(b => [
                b.booking_ref, b.temple, b.booking_date, b.time_slot, b.darshan_type,
                (b.devotees||[]).map(d=>`${d.name}(${d.age}y,${d.gender})`).join(' | '),
                b.total_amount === 0 ? 'FREE' : `Rs.${b.total_amount}`,
                b.payment_status, b.upi_ref || '-',
                b.created_at ? new Date(b.created_at).toLocaleString('en-IN') : '-',
            ]),
        ];
        const csv  = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type:'text/csv' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href = url; a.download = `bookings-${Date.now()}.csv`; a.click();
        URL.revokeObjectURL(url);
    };

    const totalDevotees = filtered.reduce((s,b) => s + (b.devotees||[]).length, 0);
    const totalRevenue  = filtered.reduce((s,b) => s + (b.total_amount||0), 0);
    const paidCount     = filtered.filter(b => b.payment_status === 'paid').length;

    const statusBadge = (s) => {
        if (s==='paid')    return 'bg-green-100 text-green-700';
        if (s==='free')    return 'bg-blue-100 text-blue-700';
        if (s==='pending') return 'bg-yellow-100 text-yellow-700';
        return 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily:'Georgia,serif' }}>
                    Darshan Bookings
                    <span className="text-sm font-normal text-gray-400 ml-2">({filtered.length} records)</span>
                    {loading && <span className="text-xs text-orange-400 ml-3 animate-pulse">Refreshing…</span>}
                </h2>
                <div className="flex gap-2 flex-wrap items-center">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                        <input value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search name / booking ID…"
                            className="pl-8 pr-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-orange-400 w-52" />
                    </div>
                    <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-orange-400 bg-white" />
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-orange-400 bg-white">
                        {['All','paid','free','pending'].map(s => (
                            <option key={s} value={s}>{s==='All'?'All Statuses':s.charAt(0).toUpperCase()+s.slice(1)}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Error */}
            {fetchError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                    Failed to load bookings: {fetchError}
                </div>
            )}

            {/* Summary cards */}
            {!loading && !fetchError && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label:'Total Bookings',    value:filtered.length,                      color:'#f97316' },
                        { label:'Total Devotees',    value:totalDevotees,                        color:'#8b5cf6' },
                        { label:'Paid Bookings',     value:paidCount,                            color:'#22c55e' },
                        { label:'Revenue Collected', value:`Rs. ${totalRevenue.toLocaleString()}`, color:'#eab308' },
                    ].map(c => (
                        <div key={c.label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{c.label}</p>
                            <p className="text-xl font-extrabold" style={{ color:c.color, fontFamily:'Georgia,serif' }}>{c.value}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="px-5 py-16 text-center text-gray-400 text-sm">
                        <div className="animate-spin w-8 h-8 border-2 border-orange-300 border-t-orange-500 rounded-full mx-auto mb-3" />
                        Loading bookings from database…
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="px-5 py-16 text-center text-gray-400 text-sm">
                        {fetchError ? 'Could not load records.' : 'No bookings found' + (search||dateFilter||statusFilter!=='All' ? ' for the selected filters.' : ' yet.')}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-orange-50">
                                    {['Booking ID','Temple','Date','Slot','Darshan','Devotees','Amount','Status','Booked At'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-xs font-bold text-orange-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map(b => (
                                    <tr key={b.id} className="hover:bg-orange-50/40 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-orange-500 font-semibold whitespace-nowrap">{b.booking_ref}</td>
                                        <td className="px-4 py-3 text-gray-700 text-xs font-medium max-w-[140px] truncate" title={b.temple}>{b.temple}</td>
                                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{b.booking_date}</td>
                                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{b.time_slot}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100">{b.darshan_type}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="space-y-0.5">
                                                {(b.devotees||[]).map((d,i) => (
                                                    <div key={i} className="text-xs text-gray-700 whitespace-nowrap">
                                                        {d.name}
                                                        <span className="text-gray-400"> ({d.age}y, {d.gender})</span>
                                                        <span className={`ml-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${d.ticket_price===0?'bg-green-50 text-green-600':'bg-amber-50 text-amber-600'}`}>
                                                            {d.ticket_price===0?'FREE':`₹${d.ticket_price}`}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-bold whitespace-nowrap text-sm" style={{ color:b.total_amount===0?'#16a34a':'#f97316' }}>
                                            {b.total_amount===0?'FREE':`Rs. ${b.total_amount}`}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${statusBadge(b.payment_status)}`}>{b.payment_status}</span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                                            {b.created_at ? new Date(b.created_at).toLocaleString('en-IN',{dateStyle:'short',timeStyle:'short'}) : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-gray-50 flex-wrap gap-2">
                    <span>
                        Showing <strong>{filtered.length}</strong> booking{filtered.length!==1?'s':''} ·{' '}
                        <strong>{totalDevotees}</strong> devotee{totalDevotees!==1?'s':''} ·{' '}
                        <strong className="text-orange-500">Rs. {totalRevenue.toLocaleString()}</strong> collected
                    </span>
                    <button onClick={exportCSV}
                        className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-semibold">
                        <FaDownload size={11} /> Export CSV
                    </button>
                </div>
            </div>

            <p className="text-xs text-gray-400 text-right">Live data from Supabase · Auto-refreshes every 30 seconds</p>
        </div>
    );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
    const navigate   = useNavigate();
    const templeId   = sessionStorage.getItem('adminTempleId');
    const templeName = sessionStorage.getItem('adminTempleName') || 'Temple Admin';

    useEffect(() => { if (!templeId) navigate('/'); }, []);

    const [activeTab,  setActiveTab]  = useState('overview');
    const [alerts,     setAlerts]     = useState(INITIAL_ALERTS);
    const [showBanner, setShowBanner] = useState(true);
    const [visitors,   setVisitors]   = useState(342);
    const [time,       setTime]       = useState(new Date());
    const [alertFlash, setAlertFlash] = useState(false);
    const [gateCounts, setGateCounts] = useState({ 'Gate A':18, 'Gate B':37, 'Gate C':62, 'Gate D':11, 'Gate E':45 });
    const [realBookingCount, setRealBookingCount] = useState(null);

    // Real booking count for overview stat card
    useEffect(() => {
        const fetchCount = async () => {
            try {
                let q = supabase.from('bookings').select('id', { count:'exact', head:true });
                if (templeId) q = q.eq('temple_id', templeId);
                const { count } = await q;
                setRealBookingCount(count ?? 0);
            } catch { /* keep null */ }
        };
        fetchCount();
    }, [templeId]);

    useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

    useEffect(() => {
        const t = setInterval(() => {
            setVisitors(v => v + Math.floor(Math.random() * 3));
            setGateCounts(prev => {
                const next = { ...prev };
                GATES.forEach(g => { next[g] = Math.max(1, Math.min(100, prev[g] + Math.floor(Math.random()*5)-2)); });
                return next;
            });
        }, 3000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const t = setInterval(() => {
            const gate = GATES[Math.floor(Math.random() * GATES.length)];
            const newAlert = {
                id: Date.now(), gate,
                time: new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }),
                severity: 'critical', resolved: false,
                detail: `Automated fall detection triggered at ${gate}. Immediate attention required.`,
            };
            setAlerts(prev => [newAlert, ...prev]);
            setAlertFlash(true); setShowBanner(true);
            setTimeout(() => setAlertFlash(false), 4000);
        }, 45000);
        return () => clearInterval(t);
    }, []);

    const unresolved  = alerts.filter(a => !a.resolved);
    const resolveAlert = id => setAlerts(prev => prev.map(a => a.id===id ? { ...a, resolved:true } : a));
    const totalCrowd  = Object.values(gateCounts).reduce((a,b) => a+b, 0);

    const tabs = [
        { id:'overview',  label:'Overview',        icon:<FaEye /> },
        { id:'crowd',     label:'Live Crowd',       icon:<FaVideo /> },
        { id:'bookings',  label:'Darshan Bookings', icon:<FaCalendarCheck /> },
        { id:'alerts',    label:'Emergency Alerts', icon:<FaBell />, badge:unresolved.length },
    ];

    return (
        <div className="min-h-screen" style={{ background:'#f8f7f4', fontFamily:"'Segoe UI',sans-serif" }}>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-orange-100 shadow-sm">
                <div className="h-0.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300" />
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FaPrayingHands className="text-orange-500 text-xl" />
                        <span className="font-bold text-gray-800" style={{ fontFamily:'Georgia,serif' }}>MandirGo</span>
                        <span className="hidden sm:inline text-gray-300">|</span>
                        <div className="hidden sm:flex items-center gap-1.5">
                            <FaShieldAlt className="text-orange-400 text-xs" />
                            <span className="text-sm text-orange-600 font-semibold truncate max-w-[260px]">{templeName}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 font-mono bg-gray-50 px-3 py-1.5 rounded-lg">
                            <FaClock className="text-orange-400" />
                            {time.toLocaleTimeString('en-IN')}
                        </div>
                        <button onClick={() => setActiveTab('alerts')}
                            className={`relative p-2 rounded-lg transition-all ${alertFlash ? 'bg-red-50' : 'hover:bg-orange-50'}`}>
                            <FaBell className={unresolved.length ? 'text-red-500' : 'text-gray-400'} size={16} />
                            {unresolved.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                    {unresolved.length}
                                </span>
                            )}
                        </button>
                        <button onClick={() => { sessionStorage.clear(); navigate('/'); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-200">
                            <FaSignOutAlt size={11} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Emergency Banner */}
            {showBanner && unresolved.length > 0 && (
                <div className="bg-red-600 text-white px-6 py-2.5 flex items-center justify-between text-sm font-semibold">
                    <div className="flex items-center gap-2">
                        <FaUserInjured className="flex-shrink-0 animate-bounce" />
                        <span>🚨 EMERGENCY: {unresolved.length} unresolved fall detection alert{unresolved.length > 1 ? 's' : ''} — Immediate attention required!</span>
                    </div>
                    <button onClick={() => setShowBanner(false)} className="ml-4 opacity-80 hover:opacity-100"><FaTimes size={13} /></button>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

                {/* Tab Bar */}
                <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 shadow-sm mb-6 overflow-x-auto">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                                activeTab === tab.id ? 'bg-orange-500 text-white shadow' : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50'
                            }`}>
                            {tab.icon}{tab.label}
                            {tab.badge > 0 && (
                                <span className="w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{tab.badge}</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* ── OVERVIEW ── */}
                {activeTab === 'overview' && (
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard icon={<FaUsers />}             label="Today's Visitors"     value={visitors.toLocaleString()} sub="Live counter"    color="#f97316" />
                            <StatCard icon={<MdSensors />}            label="Live Crowd All Gates" value={totalCrowd}               sub="People detected" color="#8b5cf6" />
                            <StatCard icon={<FaCalendarCheck />}      label="Darshan Bookings"     value={realBookingCount ?? '…'}   sub="From database"   color="#22c55e" />
                            <StatCard icon={<FaExclamationTriangle/>} label="Active Alerts"        value={unresolved.length}         sub="Fall detections" color="#ef4444" />
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-800" style={{ fontFamily:'Georgia,serif' }}>Gate-wise Crowd Summary</h3>
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-green-500">
                                    <FaWifi size={10} className="animate-pulse" />LIVE
                                </span>
                            </div>
                            {GATES.map(g => (
                                <div key={g} className="px-5 py-3 flex items-center gap-4 border-b border-gray-50 last:border-0">
                                    <div className="w-16 text-sm font-semibold text-gray-700">{g}</div>
                                    <div className="flex-1"><CrowdBar count={gateCounts[g]} /></div>
                                    <div className="w-8 text-sm font-bold text-right text-gray-800">{gateCounts[g]}</div>
                                    <div className="w-20 flex justify-end"><CrowdBadge count={gateCounts[g]} /></div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-800" style={{ fontFamily:'Georgia,serif' }}>Recent Emergency Alerts</h3>
                            </div>
                            {alerts.slice(0, 4).map(a => (
                                <div key={a.id} className={`px-5 py-3 flex items-start gap-3 border-b border-gray-50 last:border-0 ${a.resolved?'opacity-50':''}`}>
                                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${a.resolved?'bg-green-400':'bg-red-500 animate-pulse'}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800">Fall Detected — <span className="text-orange-500">{a.gate}</span></p>
                                        <p className="text-xs text-gray-400 truncate">{a.detail}</p>
                                    </div>
                                    <span className="text-xs text-gray-400 flex-shrink-0">{a.time}</span>
                                    {!a.resolved && (
                                        <button onClick={() => resolveAlert(a.id)}
                                            className="text-xs px-2 py-1 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 font-semibold flex-shrink-0">
                                            Resolve
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── LIVE CROWD ── */}
                {activeTab === 'crowd' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily:'Georgia,serif' }}>Live CCTV Crowd Monitor</h2>
                            <span className="flex items-center gap-1.5 text-xs font-semibold text-green-500 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                                <FaWifi size={10} className="animate-pulse" />All Feeds Live
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {GATES.map(gate => (
                                <div key={gate} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                    <div className="relative bg-gray-900" style={{ aspectRatio:'16/9' }}>
                                        <LiveFeed gate={gate} count={gateCounts[gate]} />
                                    </div>
                                    <div className="px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-orange-400 text-xs" />
                                            <span className="text-sm font-bold text-gray-800">{gate}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-700">{gateCounts[gate]} detected</span>
                                            <CrowdBadge count={gateCounts[gate]} />
                                        </div>
                                    </div>
                                    <div className="px-4 pb-4">
                                        <CrowdBar count={gateCounts[gate]} />
                                        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                                            <span>0</span><span>Low ≤25 · Medium ≤50 · High &gt;50</span><span>100</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 shadow-sm p-5 flex flex-col justify-between">
                                <div>
                                    <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Total Temple Crowd</p>
                                    <p className="text-5xl font-black text-orange-500" style={{ fontFamily:'Georgia,serif' }}>{totalCrowd}</p>
                                    <p className="text-sm text-gray-500 mt-1">people across all gates</p>
                                </div>
                                <div className="mt-5 space-y-2">
                                    {GATES.map(g => (
                                        <div key={g} className="flex items-center gap-2 text-xs">
                                            <span className="w-12 text-gray-500 font-medium">{g}</span>
                                            <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                                                <div className="h-full rounded-full transition-all duration-700"
                                                    style={{ width:`${gateCounts[g]}%`, background:'#f97316' }} />
                                            </div>
                                            <span className="w-6 text-right font-bold text-gray-700">{gateCounts[g]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── BOOKINGS — real Supabase data ── */}
                {activeTab === 'bookings' && <RealBookingsTab templeId={templeId} />}

                {/* ── ALERTS ── */}
                {activeTab === 'alerts' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily:'Georgia,serif' }}>Emergency Alert Notifications</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">{unresolved.length} Active</span>
                                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">{alerts.filter(a=>a.resolved).length} Resolved</span>
                            </div>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 flex items-start gap-2">
                            <FaExclamationTriangle className="flex-shrink-0 mt-0.5 text-amber-500" />
                            <p>Fall detection alerts are generated automatically by the ML model analyzing CCTV feeds. All unresolved alerts are broadcast to temple authorities and medical response teams. Tap <strong>Resolve</strong> after attending to the devotee.</p>
                        </div>
                        <div className="space-y-3">
                            {alerts.map(a => (
                                <div key={a.id}
                                    className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                                        a.resolved ? 'border-gray-100 opacity-55' :
                                        a.severity==='critical' ? 'border-red-200' : 'border-orange-200'
                                    }`}>
                                    <div className={`h-1 ${a.resolved?'bg-green-400':a.severity==='critical'?'bg-red-500':'bg-orange-400'}`} />
                                    <div className="px-5 py-4 flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.resolved?'bg-green-50':'bg-red-50'}`}>
                                            {a.resolved
                                                ? <FaCheckCircle className="text-green-500 text-lg" />
                                                : <FaUserInjured className={`text-lg ${a.severity==='critical'?'text-red-500 animate-pulse':'text-orange-500'}`} />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-bold text-gray-800">Fall Detected</span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                                    a.resolved?'bg-green-100 text-green-700':
                                                    a.severity==='critical'?'bg-red-100 text-red-700':'bg-orange-100 text-orange-700'
                                                }`}>{a.resolved?'Resolved':a.severity.toUpperCase()}</span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="flex items-center gap-1 text-orange-600 font-semibold text-sm">
                                                    <FaMapMarkerAlt size={11}/>{a.gate}
                                                </span>
                                                <span className="flex items-center gap-1 text-gray-400 text-xs">
                                                    <FaClock size={9}/>{a.time}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1.5">{a.detail}</p>
                                        </div>
                                        {!a.resolved && (
                                            <button onClick={() => resolveAlert(a.id)}
                                                className="flex-shrink-0 px-4 py-2 rounded-xl bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors flex items-center gap-1.5">
                                                <FaCheckCircle size={11}/>Resolve
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
