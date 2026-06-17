import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaInstagram } from 'react-icons/fa';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SIMULATE = true;
const WS_URL   = 'ws://localhost:8000/ws/counts';
const F        = "'Outfit', 'Poppins', 'Segoe UI', sans-serif";

// ─── TEMPLE DEFINITIONS ───────────────────────────────────────────────────────
//
// Profile legend (% of maxCap shown as crowd level):
//   0          = closed (temple shut, no devotees)
//   1–39       = Low
//   40–64      = Moderate
//   65–84      = High
//   85–100     = Very High / Critical
//
// All temples: CLOSED 10 PM – 6 AM  →  hours 22,23,0,1,2,3,4,5 = 0
// Open window: 6 AM – 10 PM         →  hours 6..21
//
// Hour index:   0  1  2  3  4  5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23
//               ── closed ──────── ── open ──────────────────────────────────── closed ──
//
// DAGDUSHETH:  7-9 Very High | 9-13 Moderate | 13-17 Low-Moderate | 17-19 High | 19-22 Very High
// SOMNATH:     7-9 Very High | 9-13 High     | 13-17 Moderate     | 17-19 High | 19-22 Very High
// AMBAJI:      7-9 High      | 9-13 Very High| 13-17 Moderate     | 17-19 High | 19-22 Moderate-High
// MAHAKALI:    7-9 Very High | 9-13 Very High| 13-17 High         | 17-19 High | 19-22 Moderate
// DWARKADHISH: 7-9 Very High | 9-13 High     | 13-17 Moderate     | 17-19 High | 19-22 Very High

const TEMPLES = {
  somnath: {
    name: 'Somnath Mahadev Temple',
    //         0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23
    profile: [  0,  0,  0,  0,  0,  0, 30, 92, 95, 72, 68, 70, 66, 55, 52, 50, 55, 70, 74, 92, 94, 88,  0,  0 ],
    // base counts reflect a mid-day moderate period (hour ~14)
    base:    { 'main-gate':200,'queue':165,'darshan-mandap':295,'prasad': 80,'exit-gate':120,'parking':140 },
    maxCaps: { 'main-gate':420,'queue':300,'darshan-mandap':560,'prasad':165,'exit-gate':320,'parking':240 },
    mood: 'high',
  },

  dwarkadhish: {
    name: 'Shree Dwarkadhish Temple',
    //         0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23
    profile: [  0,  0,  0,  0,  0,  0, 28, 90, 93, 58, 55, 52, 50, 42, 38, 36, 44, 68, 72, 91, 95, 86,  0,  0 ],
    base:    { 'main-gate':155,'queue':120,'darshan-mandap':260,'prasad': 72,'exit-gate':105,'parking':125 },
    maxCaps: { 'main-gate':380,'queue':265,'darshan-mandap':520,'prasad':155,'exit-gate':290,'parking':210 },
    mood: 'high',
  },

  ambaji: {
    name: 'Ambaji Shakti Peeth Temple',
    //         0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23
    profile: [  0,  0,  0,  0,  0,  0, 22, 72, 74, 88, 90, 86, 84, 48, 44, 40, 46, 68, 70, 76, 78, 70,  0,  0 ],
    base:    { 'main-gate':155,'queue':115,'darshan-mandap':240,'prasad': 68,'exit-gate': 98,'parking':110 },
    maxCaps: { 'main-gate':320,'queue':215,'darshan-mandap':410,'prasad':125,'exit-gate':235,'parking':185 },
    mood: 'high',
  },

  mahakali: {
    name: 'Mahakali Temple Pavagadh',
    //         0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23
    profile: [  0,  0,  0,  0,  0,  0, 26, 93, 96, 91, 88, 86, 84, 70, 67, 66, 68, 72, 74, 55, 52, 48,  0,  0 ],
    base:    { 'main-gate':310,'queue':240,'darshan-mandap':460,'prasad':130,'exit-gate':200,'parking':205 },
    maxCaps: { 'main-gate':440,'queue':310,'darshan-mandap':580,'prasad':175,'exit-gate':340,'parking':255 },
    mood: 'critical',
  },

  dagdusheth: {
    name: 'Shrimant Dagdusheth Halwai Temple',
    //         0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23
    profile: [  0,  0,  0,  0,  0,  0, 20, 88, 92, 55, 50, 48, 44, 28, 24, 22, 30, 68, 72, 90, 94, 84,  0,  0 ],
    base:    { 'main-gate':100,'queue': 75,'darshan-mandap':165,'prasad': 48,'exit-gate': 72,'parking': 85 },
    maxCaps: { 'main-gate':260,'queue':175,'darshan-mandap':330,'prasad':105,'exit-gate':190,'parking':155 },
    mood: 'medium',
  },
};

// Route order: Main Gate → Queue Lane → Darshan Mandap → Prasad Counter → Exit Gate → Parking Area
const ZONE_META = [
  { id:'main-gate',      label:'Main Gate',       sub:'Entry Point',       icon:'⛩' },
  { id:'queue',          label:'Queue Lane',       sub:'Waiting Area',      icon:'🚶' },
  { id:'darshan-mandap', label:'Darshan Mandap',   sub:'Sanctum Sanctorum', icon:'🛕' },
  { id:'prasad',         label:'Prasad Counter',   sub:'Distribution',      icon:'🍛' },
  { id:'exit-gate',      label:'Exit Gate',        sub:'Departure Point',   icon:'🚪' },
  { id:'parking',        label:'Parking Area',     sub:'Vehicle Bay',       icon:'🅿' },
];

// ─── ANNOUNCEMENT POOLS (rotate every 7 min) ─────────────────────────────────
const ANN_POOL = [
  [
    { type:'warning', icon:'⚠', text:'Queue temporarily paused for special Aarti. Expected to resume in 15 minutes. Devotees near Main Gate requested to maintain distance.' },
    { type:'info',    icon:'ℹ', text:'Entry via Exit Gate is unrestricted. Token system active. Please carry your booking token for priority darshan.' },
    { type:'alert',   icon:'🔔', text:'Please keep your belongings safe. Beware of pickpockets in crowded areas. Temple security is actively patrolling.' },
  ],
  [
    { type:'warning', icon:'⚠', text:'Darshan Mandap operating at reduced capacity for 20 min due to special puja. Devotees requested to wait in Queue Lane.' },
    { type:'info',    icon:'ℹ', text:'Prasad Counter will close for restocking at 6:30 PM. Free prasad distribution resumes at 7:00 PM sharp.' },
    { type:'alert',   icon:'🔔', text:'Lost and found counter is near Parking Area gate 2. Please hand any lost items to temple security immediately.' },
  ],
  [
    { type:'warning', icon:'⚠', text:'Heavy crowd expected at Darshan Mandap between 6 PM and 8 PM. Devotees advised to arrive before 5:30 PM for comfortable darshan.' },
    { type:'info',    icon:'ℹ', text:'Wheelchair accessible entry is available at Exit Gate side entrance. Temple volunteers available for assistance at all times.' },
    { type:'alert',   icon:'🔔', text:'Mobile phones must be switched to silent mode inside Darshan Mandap. Photography strictly prohibited in the inner sanctum.' },
  ],
  [
    { type:'warning', icon:'⚠', text:'Parking Area section B is currently full. Devotees requested to use section C or roadside parking near Main Gate.' },
    { type:'info',    icon:'ℹ', text:'Special Abhishek puja scheduled at 8:00 PM tonight. Limited tokens available at booking counter near Queue Lane.' },
    { type:'alert',   icon:'🔔', text:'All entry passes are mandatory after 6 PM. Ensure your QR code is ready before approaching Main Gate security.' },
  ],
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const getLevel = (pct) => {
  if (pct <= 0)    return { key:'closed',   label:'Closed',   color:'#475569', dim:'rgba(71,85,105,0.12)',  glow:'rgba(71,85,105,0.20)'  };
  if (pct >= 0.85) return { key:'critical', label:'Critical', color:'#f43f5e', dim:'rgba(244,63,94,0.12)',  glow:'rgba(244,63,94,0.35)'  };
  if (pct >= 0.65) return { key:'high',     label:'High',     color:'#f97316', dim:'rgba(249,115,22,0.12)', glow:'rgba(249,115,22,0.35)' };
  if (pct >= 0.40) return { key:'moderate', label:'Moderate', color:'#f59e0b', dim:'rgba(245,158,11,0.12)', glow:'rgba(245,158,11,0.30)' };
  return               { key:'low',     label:'Low',      color:'#10b981', dim:'rgba(16,185,129,0.12)',  glow:'rgba(16,185,129,0.30)' };
};

const driftVal = (v, max, base) => {
  // Temple closed — hard zero, no drift at all
  if (base <= 0) return 0;
  const pull  = (base - v) * 0.09;
  const noise = (Math.random() - 0.48) * 14;
  const spike = Math.random() < 0.04 ? (Math.random() * 50 - 8) : 0;
  return Math.max(1, Math.min(max, Math.round(v + pull + noise + spike)));
};

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useAnimNum(target) {
  const [val, setVal] = useState(target);
  const ref = useRef(target);
  useEffect(() => {
    if (target === ref.current) return;
    const d = target - ref.current; let s = 0;
    const iv = setInterval(() => {
      s++;
      setVal(Math.round(ref.current + (d * s) / 16));
      if (s >= 16) { clearInterval(iv); ref.current = target; }
    }, 30);
    return () => clearInterval(iv);
  }, [target]);
  return val;
}

function CountDisplay({ value, color, size = 36 }) {
  const v = useAnimNum(value);
  return (
    <span style={{ fontSize: size, fontWeight: 800, lineHeight: 1, color,
      textShadow: `0 0 18px ${color}55`, fontVariantNumeric: 'tabular-nums' }}>
      {v}
    </span>
  );
}

// ─── SPARKLINE ────────────────────────────────────────────────────────────────
function Spark({ data, color, h = 40 }) {
  if (!data || data.length < 2) return <div style={{ height: h }} />;
  const vmax = Math.max(...data, 1);
  const vmin = Math.min(...data, 0);
  const range = vmax - vmin || 1;
  const W = 200; const pad = 3;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = h - pad - ((v - vmin) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const area = `M ${pts[0]} ` + pts.slice(1).map(p => `L ${p}`).join(' ') + ` L ${W},${h} L 0,${h} Z`;
  const lx = W;
  const ly = h - pad - ((data[data.length - 1] - vmin) / range) * (h - pad * 2);
  const uid = color.replace(/[^a-f0-9]/gi, '').slice(0, 6);
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none"
      style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.20" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg${uid})`} />
      <polyline points={pts.join(' ')} fill="none" stroke={color}
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r={2.5} fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

// ─── ARC GAUGE ────────────────────────────────────────────────────────────────
function ArcGauge({ pct, color, size = 80 }) {
  const r = size * 0.38; const cx = size / 2; const cy = size / 2;
  const a0 = -225; const sw = 270;
  const rad = d => (d * Math.PI) / 180;
  const pt  = (deg, rr) => ({ x: cx + rr * Math.cos(rad(deg)), y: cy + rr * Math.sin(rad(deg)) });
  const s = pt(a0, r); const eAll = pt(a0 + sw, r); const eVal = pt(a0 + sw * Math.min(pct, 1), r);
  const la = sw > 180 ? 1 : 0; const laV = sw * Math.min(pct, 1) > 180 ? 1 : 0;
  const sw2 = size * 0.085;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <path d={`M${s.x},${s.y} A${r},${r} 0 ${la},1 ${eAll.x},${eAll.y}`}
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={sw2} strokeLinecap="round" />
      {pct > 0.01 && (
        <path d={`M${s.x},${s.y} A${r},${r} 0 ${laV},1 ${eVal.x},${eVal.y}`}
          fill="none" stroke={color} strokeWidth={sw2} strokeLinecap="round"
          style={{ transition: 'all 1s ease', filter: `drop-shadow(0 0 ${size * 0.07}px ${color}99)` }} />
      )}
      <text x={cx} y={cy + 2} textAnchor="middle" dominantBaseline="central"
        fill={color} style={{ fontSize: size * 0.2, fontWeight: 700, fontFamily: F,
          filter: `drop-shadow(0 0 ${size * 0.08}px ${color}88)` }}>
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function LiveCrowdStatusPage() {
  const [templeKey,    setTempleKey]    = useState('somnath');
  const [dropOpen,     setDropOpen]     = useState(false);
  const [counts,       setCounts]       = useState({});
  const [prev,         setPrev]         = useState({});
  const [wsStatus,     setWsStatus]     = useState(SIMULATE ? 'open' : 'connecting');
  const [lastUpd,      setLastUpd]      = useState(new Date());
  const [nowTime,      setNowTime]      = useState(new Date());
  const [ticks,        setTicks]        = useState(0);
  const [refreshing,   setRefreshing]   = useState(false);
  const [announcIdx,   setAnnouncIdx]   = useState(0);
  const [announcFade,  setAnnouncFade]  = useState(true);
  const [selectedHour, setSelectedHour] = useState(null);

  const histRef = useRef({});
  const simCur  = useRef({});
  const wsRef   = useRef(null);

  const temple = TEMPLES[templeKey];

  // ── Init sim on temple change ────────────────────────────────────────────
  const initSim = useCallback((key) => {
    const t     = TEMPLES[key];
    // Seed counts from CURRENT IST hour — closed hours (profile=0) start at 0 immediately
    const h     = new Date().getHours();
    const ratio = t.profile[h] / 100;
    const initial = {};
    ZONE_META.forEach(z => {
      const jitter = ratio <= 0 ? 0 : 0.80 + (z.id.length % 5) * 0.04;
      const v = Math.round((t.maxCaps[z.id] || 0) * ratio * jitter);
      simCur.current[z.id]  = v;
      histRef.current[z.id] = [];
      initial[z.id] = v;
    });
    setCounts(initial);
    setPrev({});
  }, []);

  useEffect(() => { initSim(templeKey); }, [templeKey, initSim]);

  // ── IST clock ────────────────────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => setNowTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  // ── Simulation tick ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!SIMULATE) return;
    const iv = setInterval(() => {
      const t = TEMPLES[templeKey];
      const h = new Date().getHours();
      const base = t.profile[h] / 100;
      const next = {};
      ZONE_META.forEach(z => {
        simCur.current[z.id] = driftVal(simCur.current[z.id], t.maxCaps[z.id], base * t.maxCaps[z.id]);
        next[z.id] = simCur.current[z.id];
        histRef.current[z.id] = [...(histRef.current[z.id] || []).slice(-39), simCur.current[z.id]];
      });
      setPrev(c => ({ ...c }));
      setCounts(next);
      setLastUpd(new Date());
      setTicks(t2 => t2 + 1);
    }, 2000);
    return () => clearInterval(iv);
  }, [templeKey]);

  // ── WS path ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (SIMULATE) return;
    const connect = () => {
      setWsStatus('connecting');
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;
      ws.onopen    = () => setWsStatus('open');
      ws.onclose   = () => { setWsStatus('closed'); setTimeout(connect, 3000); };
      ws.onerror   = () => ws.close();
      ws.onmessage = e => {
        const data = JSON.parse(e.data);
        setPrev(c => ({ ...c }));
        setCounts(data);
        setLastUpd(new Date());
        ZONE_META.forEach(z => {
          histRef.current[z.id] = [...(histRef.current[z.id] || []).slice(-39), data[z.id] || 0];
        });
        setTicks(t => t + 1);
      };
    };
    connect();
    return () => wsRef.current?.close();
  }, [templeKey]);

  // ── Announcements rotate every 7 min ─────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setAnnouncFade(false);
      setTimeout(() => { setAnnouncIdx(i => (i + 1) % ANN_POOL.length); setAnnouncFade(true); }, 500);
    }, 7 * 60 * 1000);
    return () => clearInterval(iv);
  }, []);

  // ── LIVE button refresh ───────────────────────────────────────────────────
  const handleLiveRefresh = () => {
    setRefreshing(true);
    initSim(templeKey);
    setTimeout(() => setRefreshing(false), 1400);
  };

  // ── Derived ───────────────────────────────────────────────────────────────
  const t         = temple;
  const total     = ZONE_META.reduce((s, z) => s + (counts[z.id] || 0), 0);
  const totalMax  = ZONE_META.reduce((s, z) => s + (t.maxCaps[z.id] || 0), 0);
  const ovPct     = total / totalMax;
  const ovLv      = getLevel(ovPct);
  const totDelta  = total - ZONE_META.reduce((s, z) => s + (prev[z.id] || 0), 0);
  const avgWait   = Math.max(1, Math.round(total / 140));
  const curHour   = nowTime.getHours();
  const activeHr  = selectedHour !== null ? selectedHour : curHour;
  const animTotal = useAnimNum(total);
  const announcements = ANN_POOL[announcIdx];
  const sorted    = [...ZONE_META].sort((a, b) =>
    (counts[b.id] || 0) / (t.maxCaps[b.id] || 1) - (counts[a.id] || 0) / (t.maxCaps[a.id] || 1)
  );
  const statusColor = { open:'#10b981', connecting:'#f59e0b', closed:'#f43f5e' }[wsStatus];
  const statusLabel = wsStatus === 'open'
    ? (SIMULATE ? '● Simulated Live' : '● YOLO Active')
    : wsStatus === 'connecting' ? '◌ Connecting…' : '◌ Reconnecting…';

  const istStr = nowTime.toLocaleTimeString('en-IN', {
    timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true,
  });
  const istDate = nowTime.toLocaleDateString('en-IN', {
    timeZone:'Asia/Kolkata', weekday:'short', day:'2-digit', month:'short', year:'numeric',
  });

  // Selected-hour display counts (heatmap interaction)
  const getHourCount = (zoneId) => {
    if (selectedHour === null) return counts[zoneId] || 0;
    const ratio = t.profile[selectedHour] / 100;
    // stable pseudo-random based on hour+zone
    const seed = (selectedHour * 13 + zoneId.length * 7) % 100;
    const jitter = 0.75 + (seed % 30) / 100;
    return Math.round((t.maxCaps[zoneId] || 0) * ratio * jitter);
  };

  const card = {
    background: 'rgba(10,18,36,0.95)',
    border: '1px solid rgba(245,158,11,0.10)',
    borderRadius: 20,
    boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
  };

  return (
    <div style={{ minHeight:'100vh', fontFamily:F, color:'#e2e8f0', background:'#060d1f',
      backgroundImage:`
        radial-gradient(ellipse 900px 500px at 20% 0%,rgba(251,146,60,0.07) 0%,transparent 70%),
        radial-gradient(ellipse 600px 400px at 85% 100%,rgba(245,158,11,0.05) 0%,transparent 70%),
        repeating-linear-gradient(0deg,rgba(255,255,255,0.012) 0px,rgba(255,255,255,0.012) 1px,transparent 1px,transparent 40px),
        repeating-linear-gradient(90deg,rgba(255,255,255,0.012) 0px,rgba(255,255,255,0.012) 1px,transparent 1px,transparent 40px)
      `,
      opacity: refreshing ? 0.35 : 1,
      transition: 'opacity 0.25s ease',
    }}>

      {/* ══ STICKY NAV ════════════════════════════════════════════════════════ */}
      <nav style={{ position:'sticky', top:0, zIndex:100,
        background:'rgba(6,13,31,0.95)', backdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(245,158,11,0.10)',
        padding:'0 28px', height:62,
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:14, flexShrink:0 }}>
          <div style={{ fontSize:22, fontWeight:800, letterSpacing:-0.5,
            background:'linear-gradient(90deg,#fbbf24,#f97316)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            MandirGo
          </div>
          <div style={{ width:1, height:20, background:'rgba(255,255,255,0.10)' }} />
          <span style={{ fontSize:11, color:'#475569', letterSpacing:1.5, textTransform:'uppercase' }}>
            Smart Crowd Intelligence
          </span>
        </div>

        {/* Temple selector */}
        <div style={{ position:'relative', flex:1, maxWidth:500, display:'flex', alignItems:'center', gap:14 }}>
          {/* selected name */}
          <div style={{ fontSize:13, fontWeight:700, color:'#fcd34d',
            letterSpacing:0.2, whiteSpace:'nowrap', overflow:'hidden',
            textOverflow:'ellipsis', maxWidth:230 }}>
            {temple.name}
          </div>
          {/* trigger */}
          <button onClick={() => setDropOpen(o => !o)} style={{
            display:'flex', alignItems:'center', gap:7,
            background:'rgba(245,158,11,0.10)', border:'1px solid rgba(245,158,11,0.22)',
            borderRadius:8, padding:'6px 12px',
            fontSize:11, fontWeight:700, color:'#f59e0b', cursor:'pointer',
            letterSpacing:0.5, fontFamily:F, flexShrink:0, transition:'background 0.2s',
          }}>
            🛕 Change Temple {dropOpen ? '▲' : '▼'}
          </button>

          {/* dropdown */}
          {dropOpen && (
            <div style={{ position:'absolute', top:'calc(100% + 10px)', left:0, zIndex:200,
              background:'rgba(8,16,36,0.98)', backdropFilter:'blur(20px)',
              border:'1px solid rgba(245,158,11,0.20)', borderRadius:14,
              minWidth:340, overflow:'hidden',
              boxShadow:'0 20px 60px rgba(0,0,0,0.7)' }}>
              {Object.entries(TEMPLES).map(([key, tmpl]) => (
                <button key={key} onClick={() => { setTempleKey(key); setDropOpen(false); setSelectedHour(null); }}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:12,
                    padding:'12px 18px',
                    background: key===templeKey ? 'rgba(245,158,11,0.12)' : 'transparent',
                    border:'none', borderBottom:'1px solid rgba(255,255,255,0.04)',
                    cursor:'pointer', fontFamily:F, textAlign:'left', transition:'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = key===templeKey ? 'rgba(245,158,11,0.12)' : 'transparent'}>
                  <span style={{ fontSize:18 }}>🛕</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600,
                      color: key===templeKey ? '#fcd34d' : '#cbd5e1' }}>{tmpl.name}</div>
                    <div style={{ fontSize:10, color:'#475569', marginTop:2 }}>
                      {(() => {
                        const h = new Date().getHours();
                        const p = tmpl.profile[h];
                        if (p <= 0)    return '⚫ Temple closed now';
                        if (p >= 85)   return '🔴 Very high crowd now';
                        if (p >= 65)   return '🟠 High crowd now';
                        if (p >= 40)   return '🟡 Moderate crowd now';
                        return '🟢 Low crowd now';
                      })()}
                    </div>
                  </div>
                  {key===templeKey && <span style={{ marginLeft:'auto', color:'#f59e0b', fontSize:14 }}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clock + Status + LIVE */}
        <div style={{ display:'flex', alignItems:'center', gap:16, flexShrink:0 }}>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:14, fontWeight:700, color:'#fcd34d', letterSpacing:0.5,
              fontVariantNumeric:'tabular-nums' }}>{istStr}</div>
            <div style={{ fontSize:9, color:'#334155', letterSpacing:0.5 }}>{istDate}</div>
          </div>
          <div style={{ width:1, height:28, background:'rgba(255,255,255,0.07)' }} />
          <span style={{ fontSize:12, color:statusColor, fontWeight:600 }}>{statusLabel}</span>
          <button onClick={handleLiveRefresh} style={{
            padding:'5px 14px', borderRadius:6,
            background: refreshing ? 'rgba(239,68,68,0.30)' : 'rgba(239,68,68,0.15)',
            border:'1px solid rgba(239,68,68,0.45)',
            fontSize:11, fontWeight:800, color:'#ef4444',
            letterSpacing:1.2, cursor:'pointer', fontFamily:F,
            animation:'livePulse 2s ease-in-out infinite',
            transition:'all 0.2s',
          }}>
            {refreshing ? '↺ REFRESHING' : '● LIVE'}
          </button>
        </div>
      </nav>

      {/* close dropdown overlay */}
      {dropOpen && <div style={{ position:'fixed', inset:0, zIndex:99 }} onClick={() => setDropOpen(false)} />}

      <div style={{ maxWidth:1340, margin:'0 auto', padding:'30px 24px 80px' }}>

        {/* ══ CLOSED BANNER — shows only during closed hours ══════════════════ */}
        {total === 0 && (
          <div style={{ marginBottom:20,
            background:'rgba(71,85,105,0.15)',
            border:'1px solid rgba(71,85,105,0.35)',
            borderLeft:'4px solid #475569',
            borderRadius:'0 14px 14px 0',
            padding:'14px 20px',
            display:'flex', alignItems:'center', gap:14 }}>
            <span style={{ fontSize:20 }}>🌙</span>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:'#94a3b8' }}>
                Temple is currently closed
              </div>
              <div style={{ fontSize:11, color:'#475569', marginTop:2 }}>
                {temple.name} operates from <strong style={{ color:'#f59e0b' }}>6:00 AM</strong> to <strong style={{ color:'#f59e0b' }}>10:00 PM</strong>. All zones will show live data when temple opens.
              </div>
            </div>
          </div>
        )}

        {/* ══ HERO METRICS ════════════════════════════════════════════════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:16, marginBottom:24 }}>

          {/* Big total card */}
          <div style={{ background:'rgba(15,23,42,0.95)', border:`1px solid ${ovLv.color}30`,
            borderRadius:20, padding:'28px 30px',
            boxShadow:`0 0 40px ${ovLv.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
            position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-60, right:-60, width:200, height:200,
              borderRadius:'50%', pointerEvents:'none',
              background:`radial-gradient(circle,${ovLv.color}15 0%,transparent 70%)` }} />
            <div style={{ position:'absolute', top:0, left:0, bottom:0, width:3,
              borderRadius:'20px 0 0 20px',
              background:`linear-gradient(to bottom,${ovLv.color},${ovLv.color}33)` }} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
              <div>
                <div style={{ fontSize:10, color:'#475569', letterSpacing:2.2,
                  textTransform:'uppercase', marginBottom:6 }}>Total Devotees On-Site</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
                  <span style={{ fontSize:54, fontWeight:800, lineHeight:1, color:ovLv.color,
                    textShadow:`0 0 36px ${ovLv.glow}`, letterSpacing:-2,
                    fontVariantNumeric:'tabular-nums' }}>
                    {animTotal.toLocaleString()}
                  </span>
                  {totDelta !== 0 && (
                    <span style={{ fontSize:14, fontWeight:700,
                      color: totDelta > 0 ? '#f43f5e' : '#10b981' }}>
                      {totDelta > 0 ? '↑' : '↓'}{Math.abs(totDelta)}
                    </span>
                  )}
                </div>
              </div>
              <ArcGauge pct={ovPct} color={ovLv.color} size={90} />
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {[
                { l:'Capacity', v: total === 0 ? '0%' : `${Math.round(ovPct*100)}%`, u: total === 0 ? 'Temple Closed' : `of ${totalMax.toLocaleString()}`, c: total === 0 ? '#475569' : '#94a3b8' },
                { l:'Status',   v: total === 0 ? 'Closed' : ovLv.label, u:'', c: total === 0 ? '#475569' : ovLv.color },
                { l:'Est. Wait',v: total === 0 ? '—' : `${avgWait} min`, u:'', c: total === 0 ? '#334155' : '#fcd34d' },
              ].map(({ l,v,u,c },i) => (
                <React.Fragment key={l}>
                  {i > 0 && <div style={{ width:1, background:'rgba(255,255,255,0.06)', alignSelf:'stretch' }} />}
                  <div>
                    <div style={{ fontSize:10, color:'#334155', marginBottom:3 }}>{l}</div>
                    <div style={{ fontSize:17, fontWeight:700, color:c }}>
                      {v}{u && <span style={{ fontSize:11, color:'#334155', marginLeft:4 }}>{u}</span>}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          {[
            { label:'Active Zones', val: total === 0 ? 0 : ZONE_META.filter(z=>(counts[z.id]||0)>0).length, unit:`/ ${ZONE_META.length}`, color: total === 0 ? '#475569' : '#38bdf8', icon:'⬡' },
            { label:'Alert Zones',
              val: total === 0 ? 0 : ZONE_META.filter(z=>{ const lv=getLevel((counts[z.id]||0)/(t.maxCaps[z.id]||1)); return lv.key==='critical'||lv.key==='high'; }).length,
              unit:'zones', color: total === 0 ? '#475569' : '#f43f5e', icon:'⚠' },
            { label:'Peak Hour Tonight', val:'7:00', unit:'PM', color:'#f59e0b', icon:'◑' },
          ].map(({ label,val,unit,color,icon }) => (
            <div key={label} style={{ ...card, padding:'24px 24px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
                background:`linear-gradient(90deg,${color}88,${color}22,transparent)` }} />
              <div style={{ fontSize:10, color:'#475569', letterSpacing:2,
                textTransform:'uppercase', marginBottom:14 }}>{label}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:8 }}>
                <span style={{ fontSize:40, fontWeight:800, lineHeight:1, color,
                  textShadow:`0 0 24px ${color}66`, letterSpacing:-1 }}>{val}</span>
                <span style={{ fontSize:13, color:'#475569', fontWeight:500 }}>{unit}</span>
              </div>
              <div style={{ fontSize:24, opacity:0.13, position:'absolute', bottom:14, right:18, lineHeight:1 }}>{icon}</div>
            </div>
          ))}
        </div>

        {/* ══ ROUTE FLOW ══════════════════════════════════════════════════════ */}
        <div style={{ ...card, padding:'22px 26px', marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
            <span style={{ fontSize:13, fontWeight:700, letterSpacing:-0.2 }}>Devotee Route Flow</span>
            <span style={{ fontSize:10, color:'#334155', marginLeft:4 }}>Live occupancy along pilgrimage path</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:0, overflowX:'auto', paddingBottom:4 }}>
            {ZONE_META.map((z, idx) => {
              const c  = counts[z.id] || 0;
              const lv = getLevel(c / (t.maxCaps[z.id] || 1));
              return (
                <React.Fragment key={z.id}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
                    gap:6, minWidth:110, flexShrink:0 }}>
                    <div style={{ width:48, height:48, borderRadius:12,
                      background:lv.dim, border:`1px solid ${lv.color}44`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:20, boxShadow:`0 0 14px ${lv.glow}` }}>{z.icon}</div>
                    <div style={{ fontSize:11, fontWeight:700, color:'#94a3b8',
                      textAlign:'center', lineHeight:1.3 }}>{z.label}</div>
                    <div style={{ fontSize:14, fontWeight:800, color:lv.color }}>{c}</div>
                    <div style={{ fontSize:9, padding:'2px 7px', borderRadius:6,
                      background:lv.dim, color:lv.color, fontWeight:700, letterSpacing:0.4 }}>
                      {lv.label}
                    </div>
                  </div>
                  {idx < ZONE_META.length - 1 && (
                    <div style={{ display:'flex', alignItems:'center', gap:2, padding:'0 4px', flexShrink:0 }}>
                      <div style={{ width:20, height:2, borderRadius:1, background:'rgba(255,255,255,0.12)' }} />
                      <span style={{ color:'#334155', fontSize:14 }}>▶</span>
                      <div style={{ width:20, height:2, borderRadius:1, background:'rgba(255,255,255,0.12)' }} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ══ ZONE CARDS 3×2 ══════════════════════════════════════════════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
          {ZONE_META.map(zone => {
            const c      = counts[zone.id] || 0;
            const pct    = c / (t.maxCaps[zone.id] || 1);
            const lv     = getLevel(pct);
            const hist   = histRef.current[zone.id] || [];
            const d      = c - (prev[zone.id] || c);
            const isCrit = lv.key === 'critical';
            return (
              <div key={zone.id} style={{ background:'rgba(10,18,36,0.95)',
                border:`1px solid ${lv.color}28`, borderRadius:18, padding:'20px 20px',
                position:'relative', overflow:'hidden',
                boxShadow: isCrit ? `0 0 28px ${lv.glow}, inset 0 0 28px ${lv.color}06` : '0 4px 20px rgba(0,0,0,0.3)',
                animation: isCrit ? 'critPulse 2s ease-in-out infinite' : 'none',
              }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
                  borderRadius:'18px 18px 0 0',
                  background:`linear-gradient(90deg,${lv.color},${lv.color}44,transparent)` }} />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:32, height:32, borderRadius:8, fontSize:16,
                      background:`${lv.color}18`, display:'flex', alignItems:'center',
                      justifyContent:'center', flexShrink:0 }}>{zone.icon}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:'#cbd5e1', lineHeight:1.2 }}>{zone.label}</div>
                      <div style={{ fontSize:10, color:'#475569', marginTop:2 }}>{zone.sub}</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
                    <span style={{ fontSize:9, fontWeight:700, padding:'3px 8px', borderRadius:8,
                      background:lv.dim, color:lv.color, border:`1px solid ${lv.color}30`,
                      letterSpacing:0.5, textTransform:'uppercase',
                      animation: isCrit ? 'blink 1s infinite' : 'none' }}>{lv.label}</span>
                    <ArcGauge pct={pct} color={lv.color} size={64} />
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:12 }}>
                  <div>
                    <CountDisplay value={c} color={lv.color} size={36} />
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:3 }}>
                      {d > 0  && <span style={{ fontSize:11, color:'#f43f5e', fontWeight:700 }}>+{d} ↑</span>}
                      {d < 0  && <span style={{ fontSize:11, color:'#10b981', fontWeight:700 }}>{d} ↓</span>}
                      {d === 0 && <span style={{ fontSize:11, color:'#334155' }}>— steady</span>}
                      <span style={{ fontSize:10, color:'#334155' }}>· cap {t.maxCaps[zone.id]}</span>
                    </div>
                  </div>
                  {hist.length >= 2 && (
                    <div style={{ width:72, flexShrink:0 }}>
                      <Spark data={hist.slice(-15)} color={lv.color} h={32} />
                    </div>
                  )}
                </div>
                <div style={{ height:4, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:2, width:`${Math.min(pct*100,100)}%`,
                    background:`linear-gradient(90deg,${lv.color},${lv.color}66)`,
                    boxShadow:`0 0 8px ${lv.color}55`, transition:'width 0.8s ease' }} />
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                  <span style={{ fontSize:9, color:'#1e293b' }}>{c} present</span>
                  <span style={{ fontSize:9, color:'#1e293b' }}>{t.maxCaps[zone.id]} max</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══ DISTRIBUTION + HEATMAP ══════════════════════════════════════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:16, marginBottom:24 }}>

          {/* Bar chart */}
          <div style={{ ...card, padding:'26px 26px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}>
              <div>
                <div style={{ fontSize:15, fontWeight:700, letterSpacing:-0.3 }}>Zone Distribution</div>
                <div style={{ fontSize:11, color:'#475569', marginTop:2 }}>Real-time occupancy across all zones</div>
              </div>
              <div style={{ display:'flex', gap:12 }}>
                {[['Low','#10b981'],['Moderate','#f59e0b'],['High','#f97316'],['Critical','#f43f5e']].map(([l,c])=>(
                  <div key={l} style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <div style={{ width:7, height:7, borderRadius:2, background:c }} />
                    <span style={{ fontSize:10, color:'#475569' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:'flex', gap:14, alignItems:'flex-end', height:160 }}>
              {ZONE_META.map(zone => {
                const val  = counts[zone.id] || 0;
                const pct  = val / (t.maxCaps[zone.id] || 1);
                const lv   = getLevel(pct);
                const maxV = Math.max(...ZONE_META.map(z => counts[z.id] || 0), 1);
                const bh   = Math.max((val / maxV) * 130, 4);
                return (
                  <div key={zone.id} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                    <span style={{ fontSize:12, fontWeight:800, color:lv.color,
                      textShadow:`0 0 8px ${lv.color}66` }}>{val}</span>
                    <div style={{ width:'100%', display:'flex', alignItems:'flex-end', height:130 }}>
                      <div style={{ width:'100%', borderRadius:'5px 5px 0 0', height:bh,
                        background:`linear-gradient(to top,${lv.color},${lv.color}44)`,
                        boxShadow:`0 0 14px ${lv.color}22`,
                        transition:'height 0.9s cubic-bezier(0.4,0,0.2,1)',
                        position:'relative', overflow:'hidden' }}>
                        <div style={{ position:'absolute', top:0, left:0, right:0, height:'30%',
                          background:'linear-gradient(to bottom,rgba(255,255,255,0.08),transparent)' }} />
                      </div>
                    </div>
                    <span style={{ fontSize:9, color:'#475569', textAlign:'center', lineHeight:1.3 }}>
                      {zone.label.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Heatmap with clickable hour blocks */}
          <div style={{ ...card, padding:'26px 26px' }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:15, fontWeight:700, letterSpacing:-0.3 }}>Today's Crowd Profile</div>
              <div style={{ fontSize:11, color:'#475569', marginTop:3, display:'flex', alignItems:'center', gap:6 }}>
                {selectedHour !== null
                  ? <><span>Showing&nbsp;</span><strong style={{ color:'#fcd34d' }}>{selectedHour}:00 {selectedHour < 12 ? 'AM' : 'PM'}</strong></>
                  : <span>Click any hour block to explore data</span>
                }
                {selectedHour !== null && (
                  <button onClick={() => setSelectedHour(null)} style={{
                    background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.25)',
                    borderRadius:5, padding:'2px 8px', fontSize:10, fontWeight:700,
                    color:'#f59e0b', cursor:'pointer', fontFamily:F,
                  }}>× Reset</button>
                )}
              </div>
            </div>

            {/* 24-cell hour grid */}
            <div style={{ display:'flex', gap:3, marginBottom:5 }}>
              {t.profile.map((p100, h) => {
                const pct  = p100 / 100;
                const lv   = getLevel(pct);
                const isCur = h === curHour;
                const isSel = h === selectedHour;
                return (
                  <div key={h}
                    title={`${h}:00 — ${Math.round(pct*100)}% capacity`}
                    onClick={() => setSelectedHour(h === selectedHour ? null : h)}
                    style={{ flex:1, height:32, borderRadius:4, cursor:'pointer',
                      background: isSel ? lv.dim : pct < 0.05 ? 'rgba(255,255,255,0.03)' : `${lv.color}18`,
                      border: isSel ? `2px solid ${lv.color}` : isCur ? `1px solid ${lv.color}66` : '1px solid rgba(255,255,255,0.05)',
                      boxShadow: isSel ? `0 0 12px ${lv.glow}` : isCur ? `0 0 5px ${lv.glow}` : 'none',
                      transform: isSel ? 'scaleY(1.18)' : 'scaleY(1)',
                      transition:'all 0.18s',
                    }}>
                    {isSel && (
                      <div style={{ width:'100%', height:'100%', borderRadius:3,
                        background:`linear-gradient(135deg,${lv.color}30,transparent)` }} />
                    )}
                  </div>
                );
              })}
            </div>
            {/* hour labels every 4h */}
            <div style={{ display:'flex', gap:3, marginBottom:16 }}>
              {t.profile.map((_,h) => (
                <div key={h} style={{ flex:1, textAlign:'center',
                  fontSize:8, color: h===curHour ? '#f59e0b' : h===selectedHour ? '#fcd34d' : '#1e293b',
                  fontWeight: (h===curHour || h===selectedHour) ? 700 : 400 }}>
                  {h%4===0 ? `${h}h` : ''}
                </div>
              ))}
            </div>

            {/* Selected/current hour detail */}
            <div style={{ background: selectedHour!==null ? 'rgba(245,158,11,0.06)' : 'rgba(255,255,255,0.02)',
              border:`1px solid ${selectedHour!==null ? 'rgba(245,158,11,0.20)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius:12, padding:'14px 16px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                <div>
                  <div style={{ fontSize:10, color:'#475569', letterSpacing:1.5, textTransform:'uppercase', marginBottom:3 }}>
                    {selectedHour!==null ? 'Selected Hour' : 'Current Hour'}
                  </div>
                  <div style={{ fontSize:22, fontWeight:800, color:'#fcd34d', lineHeight:1 }}>
                    {activeHr}:00
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:10, color:'#475569', marginBottom:3 }}>Intensity</div>
                  <div style={{ fontSize:22, fontWeight:800,
                    color: getLevel(t.profile[activeHr]/100).color }}>
                    {t.profile[activeHr]}%
                  </div>
                </div>
              </div>
              {/* mini zone counts for selected hour */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 }}>
                {ZONE_META.map(z => {
                  const c2  = getHourCount(z.id);
                  const lv2 = getLevel(c2 / (t.maxCaps[z.id] || 1));
                  return (
                    <div key={z.id} style={{ background:`${lv2.color}10`,
                      border:`1px solid ${lv2.color}20`, borderRadius:8, padding:'6px 8px' }}>
                      <div style={{ fontSize:9, color:'#475569', marginBottom:2 }}>{z.label}</div>
                      <div style={{ fontSize:14, fontWeight:800, color:lv2.color }}>{c2}</div>
                      <div style={{ height:2, background:'rgba(255,255,255,0.05)',
                        borderRadius:1, overflow:'hidden', marginTop:4 }}>
                        <div style={{ height:'100%', borderRadius:1,
                          width:`${Math.min((c2/(t.maxCaps[z.id]||1))*100,100)}%`,
                          background:lv2.color, transition:'width 0.5s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ══ LIVE STATUS + ZONE RANKING ══════════════════════════════════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'1.3fr 0.7fr', gap:16, marginBottom:24 }}>

          {/* ── LIVE STATUS (renamed from Live Trend) ── */}
          <div style={{ ...card, padding:'26px 26px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:22 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'#10b981',
                  boxShadow:'0 0 8px #10b981', animation:'blink 2s infinite' }} />
                <span style={{ fontSize:15, fontWeight:700, letterSpacing:-0.3 }}>Live Status</span>
              </div>
              <div style={{ fontSize:10, color:'#334155', marginLeft:4 }}>
                Last 40 readings · 2s interval
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
              {ZONE_META.map((zone, routeIdx) => {
                const hist   = histRef.current[zone.id] || [];
                const c      = counts[zone.id] || 0;
                const lv     = getLevel(c / (t.maxCaps[zone.id] || 1));
                const prev2  = hist.slice(-4)[0] || c;
                const trend2 = c - prev2;
                return (
                  <div key={zone.id} style={{
                    background:'rgba(255,255,255,0.025)',
                    border:`1px solid ${lv.color}22`,
                    borderRadius:16, padding:'16px 14px',
                    position:'relative', overflow:'hidden',
                    transition:'border-color 0.4s',
                  }}>
                    {/* left colour stripe */}
                    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3,
                      borderRadius:'16px 0 0 16px',
                      background:`linear-gradient(to bottom,${lv.color},${lv.color}33)` }} />
                    {/* subtle bg glow */}
                    <div style={{ position:'absolute', top:-20, right:-20, width:80, height:80,
                      borderRadius:'50%', pointerEvents:'none',
                      background:`radial-gradient(circle,${lv.color}0d 0%,transparent 70%)` }} />

                    <div style={{ marginLeft:8 }}>
                      {/* zone header */}
                      <div style={{ display:'flex', justifyContent:'space-between',
                        alignItems:'flex-start', marginBottom:10 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                          <span style={{ fontSize:15 }}>{zone.icon}</span>
                          <div>
                            <div style={{ fontSize:11, fontWeight:700, color:'#94a3b8', lineHeight:1.2 }}>
                              {zone.label}
                            </div>
                            <div style={{ fontSize:9, color:'#334155', marginTop:1 }}>
                              Step {routeIdx + 1}
                            </div>
                          </div>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                          <div style={{ width:6, height:6, borderRadius:'50%', background:lv.color,
                            boxShadow:`0 0 5px ${lv.color}`,
                            animation: lv.key==='critical' ? 'blink 1s infinite' : 'none' }} />
                          <span style={{ fontSize:9, color:lv.color, fontWeight:700 }}>{lv.label}</span>
                        </div>
                      </div>

                      {/* count + trend */}
                      <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:10 }}>
                        <span style={{ fontSize:28, fontWeight:800, color:lv.color, lineHeight:1,
                          textShadow:`0 0 14px ${lv.color}55` }}>{c}</span>
                        <span style={{ fontSize:11, fontWeight:700,
                          color: trend2>0 ? '#f43f5e' : trend2<0 ? '#10b981' : '#334155' }}>
                          {trend2>0 ? `↑+${trend2}` : trend2<0 ? `↓${trend2}` : '—'}
                        </span>
                      </div>

                      {/* sparkline */}
                      <Spark data={hist.slice(-20)} color={lv.color} h={36} />

                      {/* capacity bar */}
                      <div style={{ height:3, background:'rgba(255,255,255,0.05)', borderRadius:2,
                        overflow:'hidden', marginTop:10 }}>
                        <div style={{ height:'100%', borderRadius:2, transition:'width 0.9s ease',
                          width:`${Math.min((c/(t.maxCaps[zone.id]||1))*100,100)}%`,
                          background:lv.color, boxShadow:`0 0 6px ${lv.color}55` }} />
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                        <span style={{ fontSize:8, color:'#1e293b' }}>{c}</span>
                        <span style={{ fontSize:8, color:'#1e293b' }}>{t.maxCaps[zone.id]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── ZONE RANKING (redesigned) ── */}
          <div style={{ ...card, padding:'26px 26px' }}>
            <div style={{ marginBottom:22 }}>
              <div style={{ fontSize:15, fontWeight:700, letterSpacing:-0.3 }}>Zone Ranking</div>
              <div style={{ fontSize:11, color:'#475569', marginTop:2 }}>Congestion intensity ↓</div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {sorted.map((zone, idx) => {
                const c   = counts[zone.id] || 0;
                const pct = c / (t.maxCaps[zone.id] || 1);
                const lv  = getLevel(pct);
                const medals = ['🥇','🥈','🥉'];
                const isTop = idx === 0;
                return (
                  <div key={zone.id} style={{
                    background: isTop
                      ? `linear-gradient(135deg,${lv.color}12,${lv.color}06)`
                      : 'rgba(255,255,255,0.02)',
                    border:`1px solid ${lv.color}${isTop?'35':'15'}`,
                    borderRadius:14, padding:'13px 14px',
                    position:'relative', overflow:'hidden',
                  }}>
                    {isTop && (
                      <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
                        background:`linear-gradient(90deg,${lv.color},${lv.color}44,transparent)` }} />
                    )}
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      {/* rank badge */}
                      <div style={{ width:28, height:28, borderRadius:8, flexShrink:0,
                        background: idx<3 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
                        border:'1px solid rgba(255,255,255,0.06)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize: idx<3 ? 14 : 11, fontWeight:700,
                        color: idx===0 ? '#fcd34d' : idx===1 ? '#94a3b8' : idx===2 ? '#cd7f32' : '#334155' }}>
                        {idx < 3 ? medals[idx] : `#${idx+1}`}
                      </div>
                      {/* zone info */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', justifyContent:'space-between',
                          alignItems:'center', marginBottom:6 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                            <span style={{ fontSize:12 }}>{zone.icon}</span>
                            <span style={{ fontSize:12, fontWeight:700,
                              color: isTop ? '#fcd34d' : '#94a3b8',
                              overflow:'hidden', textOverflow:'ellipsis',
                              whiteSpace:'nowrap', maxWidth:90 }}>
                              {zone.label}
                            </span>
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
                            <span style={{ fontSize:13, fontWeight:800, color:lv.color }}>
                              {Math.round(pct*100)}%
                            </span>
                            <span style={{ fontSize:9, padding:'2px 6px', borderRadius:5,
                              background:lv.dim, color:lv.color, fontWeight:700,
                              letterSpacing:0.3, textTransform:'uppercase' }}>
                              {lv.label}
                            </span>
                          </div>
                        </div>
                        <div style={{ position:'relative', height:5,
                          background:'rgba(255,255,255,0.05)', borderRadius:3, overflow:'hidden' }}>
                          <div style={{ position:'absolute', height:'100%', borderRadius:3,
                            width:`${Math.min(pct*100,100)}%`,
                            background:`linear-gradient(90deg,${lv.color},${lv.color}66)`,
                            transition:'width 0.9s ease',
                            boxShadow: isTop ? `0 0 8px ${lv.color}66` : 'none' }} />
                        </div>
                        <div style={{ fontSize:9, color:'#334155', marginTop:3 }}>
                          {c} / {t.maxCaps[zone.id]} capacity
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══ ENTRY FLOW RATE ═════════════════════════════════════════════════ */}
        <div style={{ ...card, padding:'26px 26px', marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:22 }}>
            <div style={{ fontSize:15, fontWeight:700, letterSpacing:-0.3 }}>Entry Flow Rate</div>
            <div style={{ fontSize:11, color:'#334155', marginLeft:4 }}>Estimated people / minute per gate</div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16 }}>
            {ZONE_META.filter(z => z.id==='main-gate'||z.id==='queue'||z.id==='exit-gate').map(zone => {
              const c   = counts[zone.id] || 0;
              const pct = c / (t.maxCaps[zone.id] || 1);
              const lv  = getLevel(pct);
              const rate = Math.max(1, Math.round(c / 12));
              return (
                <div key={zone.id} style={{ background:'rgba(255,255,255,0.02)',
                  border:`1px solid ${lv.color}18`, borderRadius:14, padding:'18px 18px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:'#94a3b8' }}>{zone.label}</div>
                      <div style={{ fontSize:10, color:'#334155' }}>{zone.sub}</div>
                    </div>
                    <div style={{ width:36, height:36, borderRadius:'50%', background:`${lv.color}15`,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:15 }}>{zone.icon}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:5, marginBottom:10 }}>
                    <span style={{ fontSize:30, fontWeight:800, color:lv.color, lineHeight:1 }}>{rate}</span>
                    <span style={{ fontSize:11, color:'#475569' }}>ppl/min</span>
                  </div>
                  <div style={{ display:'flex', gap:2, height:18, alignItems:'flex-end' }}>
                    {Array.from({ length:16 },(_,i) => {
                      const bh = 20 + Math.abs(Math.sin(ticks * 0.3 + i * 0.7 + zone.id.length)) * 80;
                      return (
                        <div key={i} style={{ flex:1, borderRadius:'2px 2px 0 0',
                          background:`${lv.color}${Math.round(40+bh*0.4).toString(16).padStart(2,'0')}`,
                          height:`${bh}%`, transition:'height 0.4s ease' }} />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ LIVE ANNOUNCEMENTS ══════════════════════════════════════════════ */}
        <div style={{ ...card, padding:'26px 26px', marginBottom:44 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:7 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'#f59e0b',
                animation:'blink 2s infinite', boxShadow:'0 0 6px #f59e0b' }} />
              <span style={{ fontSize:15, fontWeight:700, letterSpacing:-0.3 }}>Live Announcements</span>
            </div>
            <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:10, color:'#334155' }}>Updates every 7 min</span>
              <span style={{ fontSize:11, color:'#475569', letterSpacing:0.5 }}>
                {nowTime.toLocaleTimeString('en-IN',{
                  timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', hour12:true,
                })}
              </span>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10,
            opacity: announcFade ? 1 : 0, transition:'opacity 0.5s ease' }}>
            {announcements.map(({ type,icon,text }, i) => {
              const c = { warning:'#f59e0b', info:'#38bdf8', alert:'#f97316' }[type];
              return (
                <div key={i} style={{ background:`${c}08`, border:`1px solid ${c}20`,
                  borderLeft:`3px solid ${c}`, borderRadius:'0 12px 12px 0',
                  padding:'13px 16px', display:'flex', gap:12, alignItems:'flex-start' }}>
                  <span style={{ fontSize:14, flexShrink:0, marginTop:1 }}>{icon}</span>
                  <span style={{ fontSize:13, color:'#94a3b8', lineHeight:1.65 }}>{text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer style={{ background:'#030812',
        borderTop:'1px solid rgba(245,158,11,0.07)', padding:'44px 24px 28px' }}>
        <div style={{ maxWidth:1340, margin:'0 auto' }}>
          <div style={{ height:2, borderRadius:1, marginBottom:36,
            background:'linear-gradient(90deg,transparent,#f59e0b44,#f97316aa,#f59e0b44,transparent)' }} />
          <div style={{ display:'grid', gridTemplateColumns:'1.5fr repeat(4,1fr)', gap:32, marginBottom:36 }}>
            <div>
              <div style={{ fontSize:22, fontWeight:800, letterSpacing:-0.5, marginBottom:8,
                background:'linear-gradient(90deg,#fbbf24,#f97316)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>MandirGo</div>
              <div style={{ fontSize:13, color:'#1e293b', lineHeight:1.7, maxWidth:200 }}>
                Divine peace.<br/>Managed intelligently.<br/>
                <span style={{ color:'#334155', fontSize:11 }}>YOLOv8 · Real-time crowd AI</span>
              </div>
            </div>
            {[
              { title:'Platform', links:['Dashboard','Live Status'] },
              { title:'About',    links:['Our Mission','Careers'] },
              { title:'Support',  links:['Contact Us','FAQs'] },
            ].map(({ title,links }) => (
              <div key={title}>
                <div style={{ color:'#475569', fontWeight:700, marginBottom:12, fontSize:10,
                  letterSpacing:2, textTransform:'uppercase' }}>{title}</div>
                {links.map(l => (
                  <div key={l} style={{ color:'#1e293b', fontSize:12, marginBottom:7, cursor:'default', transition:'color 0.2s' }}
                    onMouseEnter={e=>e.target.style.color='#475569'}
                    onMouseLeave={e=>e.target.style.color='#1e293b'}>{l}</div>
                ))}
              </div>
            ))}
            <div>
              <div style={{ color:'#475569', fontWeight:700, marginBottom:12, fontSize:10,
                letterSpacing:2, textTransform:'uppercase' }}>Contact</div>
              <div style={{ color:'#1e293b', fontSize:12, marginBottom:10 }}>contact@mandirgo.com</div>
              <a href="https://www.instagram.com/mandirgo_official?igsh=MTRpeTB0NXZrMWo3dg=="
                target="_blank" rel="noopener noreferrer"
                style={{ color:'#1e293b', fontSize:12, textDecoration:'none', display:'inline-flex', alignItems:'center', gap:6, transition:'color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#475569'}
                onMouseLeave={e=>e.currentTarget.style.color='#1e293b'}>
                <FaInstagram size={13} /> mandirgo_official
              </a>
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.03)', paddingTop:20,
            display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
            <span style={{ color:'#1e293b', fontSize:12 }}>
              © 2026 MandirGo Technologies Pvt. Ltd. All rights reserved.
            </span>
            <span style={{ color:'#1e293b', fontSize:11 }}>Powered by YOLOv8 · FastAPI · React</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes livePulse  { 0%,100%{box-shadow:0 0 6px rgba(239,68,68,0.4)} 50%{box-shadow:0 0 16px rgba(239,68,68,0.7)} }
        @keyframes critPulse  { 0%,100%{box-shadow:0 0 20px rgba(244,63,94,0.2)} 50%{box-shadow:0 0 36px rgba(244,63,94,0.45)} }
      `}</style>
    </div>
  );
}
