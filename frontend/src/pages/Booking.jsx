import React, { useState, useRef, useEffect } from 'react';
import { FiCalendar, FiClock, FiUsers, FiArrowRight, FiCheckCircle,
         FiDownload, FiCreditCard, FiLoader, FiMapPin,
         FiAlertCircle, FiGift, FiChevronDown, FiInfo } from 'react-icons/fi';
import { QRCodeSVG } from 'qrcode.react';
import { createClient } from '@supabase/supabase-js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/* ── Google Font ─────────────────────────────────────────────── */
if (!document.querySelector('link[data-poppins]')) {
  const l = document.createElement('link');
  l.rel  = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap';
  l.setAttribute('data-poppins', '1');
  document.head.appendChild(l);
}

/* ── Razorpay Script Loader ───────────────────────────────────── */
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

/* ── Supabase ─────────────────────────────────────────────────── */
const SUPABASE_URL  = 'https://mqioxolqucnduypfpavx.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xaW94b2xxdWNuZHV5cGZwYXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NDM1MDQsImV4cCI6MjA4ODIxOTUwNH0.lFbQdEULmufcPE1Ic5xjUmPRadOIFPJiJk9K2KYug9Q';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

/* ── Constants ────────────────────────────────────────────────── */
const RAZORPAY_KEY = 'rzp_test_SX13TiqeyX7Dtn';

/* ── Temples ─────────────────────────────────────────────────── */
const TEMPLES = [
  { id:'dagdusheth', name:'Shrimant Dagdusheth Halwai Temple', loc:'Pune, Maharashtra',    trust:'Shrimant Dagdusheth Halwai Ganpati Trust', ticketPrice:100, specialType:'vip',     specialOptions:[{ id:'vip', label:'VIP Darshan', price:100, desc:'Priority entry, dedicated queue, front row darshan' }] },
  { id:'somnath',    name:'Somnath Mahadev Temple',            loc:'Somnath, Gujarat',     trust:'Shree Somnath Trust',                    ticketPrice:51,  specialType:'vip',     specialOptions:[{ id:'vip', label:'VIP Darshan', price:500, desc:'Priority entry, dedicated queue, special darshan area' }] },
  { id:'dwarka',     name:'Shree Dwarkadhish Temple',          loc:'Dwarka, Gujarat',      trust:'Shree Dwarkadhish Temple Trust',         ticketPrice:51,  specialType:'vip',     specialOptions:[{ id:'vip', label:'VIP Darshan', price:100, desc:'Priority entry, dedicated queue, front row darshan' }] },
  { id:'ambaji',     name:'Ambaji Shakti Peeth Temple',        loc:'Banaskantha, Gujarat', trust:'Shree Ambaji Temple Trust',              ticketPrice:51,  specialType:null,      specialOptions:[] },
  { id:'pavagadh',   name:'Mahakali Temple Pavagadh',          loc:'Pavagadh, Gujarat',    trust:'Mahakali Temple Trust',                  ticketPrice:51,  specialType:'ropeway', specialOptions:[{ id:'ropeway_one', label:'Ropeway (One Way)', price:150, desc:'One-way ropeway ticket to the hilltop temple' },{ id:'ropeway_return', label:'Ropeway (Return)', price:250, desc:'Return ropeway — up and back down the hill' }] },
];

const TIME_SLOTS = [
  { time:'07:00 AM – 08:00 AM', label:'Morning Aarti',    aarti:true  },
  { time:'08:30 AM – 10:00 AM', label:'Pratah Darshan',   aarti:false },
  { time:'10:00 AM – 12:00 PM', label:'Morning Darshan',  aarti:false },
  { time:'12:00 PM – 01:00 PM', label:'Madhyana Darshan', aarti:false },
  { time:'04:00 PM – 05:30 PM', label:'Sandhya Darshan',  aarti:false },
  { time:'06:00 PM – 07:00 PM', label:'Evening Darshan',  aarti:false },
  { time:'07:00 PM – 08:00 PM', label:'Evening Aarti',    aarti:true  },
  { time:'08:00 PM – 09:00 PM', label:'Ratri Darshan',    aarti:false },
];

/* ── Helpers ─────────────────────────────────────────────────── */
const genRef   = () => `SDGH-${Date.now()}`;
const fmtDate  = (d) => new Date(d).toLocaleDateString('en-IN',{ weekday:'long', year:'numeric', month:'long', day:'numeric' });
const fmtShort = (d) => new Date(d).toLocaleDateString('en-IN',{ weekday:'short', year:'numeric', month:'short', day:'numeric' });
const today    = ()  => new Date().toISOString().split('T')[0];

/* ── Design tokens ───────────────────────────────────────────── */
const F = "'Poppins', sans-serif";
const C = {
  orange:'#f97316', orangeDk:'#ea580c', amber:'#f59e0b',
  text:'#1c1917', muted:'#78716c', light:'#fff7ed', lightMid:'#fef3c7',
  border:'#fed7aa', borderSoft:'#fde8c8', white:'#ffffff',
  green:'#16a34a', greenBg:'#f0fdf4', greenBd:'#bbf7d0',
  red:'#dc2626',   redBg:'#fef2f2',   redBd:'#fecaca',
  blue:'#2563eb',  blueBg:'#eff6ff',  blueBd:'#bfdbfe',
  navy:'#0f172a',
};

const slotStatusStyle = (s) => {
  if (s==='full')         return { dot:'#ef4444', badge:{bg:'#fef2f2',color:'#dc2626',border:'#fecaca'}, label:'Full' };
  if (s==='filling_fast') return { dot:'#f59e0b', badge:{bg:'#fffbeb',color:'#b45309',border:'#fde68a'}, label:'Filling Fast' };
  return                         { dot:'#16a34a', badge:{bg:'#f0fdf4',color:'#15803d',border:'#bbf7d0'}, label:'Available' };
};

const NOTE_NORMAL  = 'Note: For the comfort and safety of devotees, Senior Citizens, Pregnant Women, and Persons with Disabilities are given First Priority in the darshan queue. If you fall under any of these categories, please inform the temple trustees or volunteers at the entrance for assistance.';
const NOTE_VIP     = 'Note: VIP Darshan tickets are free for Senior Citizens, Pregnant Women, and Persons with Disabilities. If you belong to any of these categories, you do not need to book a ticket. Kindly inform the temple trustees or volunteers at the entrance to receive your ticket and assistance.';
const NOTE_ROPEWAY = 'Note: The ropeway service is available for all devotees. Senior Citizens, Pregnant Women, and Persons with Disabilities are given boarding priority and dedicated assistance. Please inform the ropeway staff at the boarding point for a safe and comfortable journey to the temple.';

/* ═══════════════════════════════════════════════════════════════
   UI Atoms
═══════════════════════════════════════════════════════════════ */
function StepBar({ step }) {
  const steps = ['Date & Slot','Devotees','Payment','E-Ticket'];
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', marginBottom:40, fontFamily:F }}>
      {steps.map((s,i) => (
        <React.Fragment key={i}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <div style={{
              width:42, height:42, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:14, fontWeight:700, border:'2.5px solid',
              borderColor: step>i+1?C.orange:step===i+1?C.orange:C.borderSoft,
              background:  step>i+1?C.orange:step===i+1?C.white:'#fffbf5',
              color:       step>i+1?C.white:step===i+1?C.orange:C.muted,
              boxShadow:   step===i+1?'0 0 0 5px rgba(249,115,22,0.12)':'none', transition:'all .3s',
            }}>{step>i+1?'✓':i+1}</div>
            <span style={{ marginTop:7, fontSize:11, fontWeight:600, color:step>=i+1?C.orange:C.muted, letterSpacing:0.4, whiteSpace:'nowrap' }}>{s}</span>
          </div>
          {i<steps.length-1 && (
            <div style={{ flex:1, height:2, maxWidth:56, marginBottom:24, marginLeft:6, marginRight:6, borderRadius:2,
              background:step>i+1?`linear-gradient(90deg,${C.orange},${C.amber})`:C.borderSoft, transition:'background .3s' }}/>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const SLabel = ({ icon:Icon, text }) => (
  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
    <div style={{ width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,${C.orange},${C.orangeDk})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(249,115,22,0.25)' }}>
      <Icon size={16} style={{ color:C.white }}/>
    </div>
    <span style={{ fontSize:17, fontWeight:700, color:C.text, fontFamily:F }}>{text}</span>
  </div>
);

const Btn = ({ children, onClick, disabled, variant='primary', style:sx={} }) => {
  const base = { width:'100%', padding:'14px 20px', borderRadius:12, border:'none', fontSize:15, fontWeight:700, cursor:disabled?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all .2s', opacity:disabled?.55:1, fontFamily:F };
  const v = {
    primary:   { ...base, background:`linear-gradient(135deg,${C.orange},${C.orangeDk})`, color:C.white, boxShadow:'0 6px 20px rgba(249,115,22,0.32)' },
    secondary: { ...base, background:C.white, color:C.muted, border:`2px solid ${C.borderSoft}` },
    green:     { ...base, background:`linear-gradient(135deg,${C.green},#15803d)`, color:C.white, boxShadow:'0 6px 20px rgba(22,163,74,0.28)' },
    dark:      { ...base, background:C.navy, color:C.white },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...v[variant], ...sx }}>{children}</button>;
};

const Input = ({ style:sx={}, ...p }) => (
  <input {...p} style={{ width:'100%', boxSizing:'border-box', padding:'12px 16px', borderRadius:10, border:`1.5px solid ${C.borderSoft}`, fontSize:14, color:C.text, background:C.white, outline:'none', fontFamily:F, transition:'border-color .18s', ...sx }}
    onFocus={e=>e.target.style.borderColor=C.orange}
    onBlur={e=>e.target.style.borderColor=C.borderSoft}
  />
);

const NoteBox = ({ text }) => (
  <div style={{ display:'flex', alignItems:'flex-start', gap:10, background:'#fff5f5', border:'1.5px solid #fecdd3', borderRadius:12, padding:'12px 16px', marginBottom:18 }}>
    <FiInfo size={14} style={{ color:'#f87171', flexShrink:0, marginTop:2 }}/>
    <span style={{ fontSize:12.5, color:'#9f1239', lineHeight:1.65, fontFamily:F, fontWeight:500, opacity:0.85 }}>{text}</span>
  </div>
);

const OptionCard = ({ id, label, price, desc, selected, onSelect, tag }) => {
  const active = selected===id;
  return (
    <label style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'14px 16px', borderRadius:12, border:`2px solid ${active?C.orange:C.borderSoft}`, background:active?C.light:C.white, cursor:'pointer', transition:'all .18s', boxShadow:active?'0 4px 16px rgba(249,115,22,0.14)':'none' }}>
      <input type="radio" name="darshanOption" value={id} checked={active} onChange={()=>onSelect(id)} style={{ marginTop:3, accentColor:C.orange, width:16, height:16, flexShrink:0 }}/>
      <div style={{ flex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3, flexWrap:'wrap' }}>
          <span style={{ fontSize:14, fontWeight:700, color:C.text, fontFamily:F }}>{label}</span>
          <span style={{ fontSize:12, fontWeight:700, padding:'2px 10px', borderRadius:999, background:price?C.orange:C.greenBg, color:price?C.white:C.green, border:price?'none':`1px solid ${C.greenBd}`, fontFamily:F }}>
            {price?`Rs. ${price}`:'FREE'}
          </span>
          {tag && <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:999, background:C.blueBg, color:C.blue, border:`1px solid ${C.blueBd}`, fontFamily:F }}>{tag}</span>}
        </div>
        <span style={{ fontSize:13, color:C.muted, fontFamily:F }}>{desc}</span>
      </div>
    </label>
  );
};

const SCard = ({ children, style:sx={} }) => (
  <div style={{ background:C.white, borderRadius:16, border:`1.5px solid ${C.borderSoft}`, padding:'20px 22px', marginBottom:14, boxShadow:'0 2px 10px rgba(249,115,22,0.05)', ...sx }}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   Main Page
═══════════════════════════════════════════════════════════════ */
export default function DarshanBookingPage() {
  const [step,         setStep]        = useState(1);
  const [templeId,     setTempleId]    = useState('');
  const [date,         setDate]        = useState('');
  const [slot,         setSlot]        = useState('');
  const [optionSel,    setOptionSel]   = useState('normal');
  const [devotees,     setDevotees]    = useState([{ name:'', age:'', gender:'male' }]);
  const [booking,      setBooking]     = useState(null);
  const [payStatus,    setPayStatus]   = useState('idle');  // idle | processing | done
  const [saving,       setSaving]      = useState(false);
  const [error,        setError]       = useState('');
  const [slotStatus,   setSlotStatus]  = useState({});
  const [loadingSlots, setLoadingSlots]= useState(false);
  const ticketRef = useRef(null);

  const temple = TEMPLES.find(t=>t.id===templeId)||null;

  useEffect(() => { loadRazorpay(); }, []);

  const handleTempleChange = (id) => { setTempleId(id); setOptionSel('normal'); setError(''); setSlot(''); setSlotStatus({}); };

  useEffect(() => {
    if (!templeId||!date) { setSlotStatus({}); return; }
    let cancelled=false;
    const run = async () => {
      setLoadingSlots(true);
      try {
        const { data, error:err } = await supabase.from('slot_availability').select('time_slot,status').eq('temple_id',templeId).eq('slot_date',date);
        if (err) throw err;
        if (cancelled) return;
        const map={};
        (data||[]).forEach(r=>{ map[r.time_slot]=r.status; });
        setSlotStatus(map);
      } catch { if (!cancelled) setSlotStatus({}); }
      finally  { if (!cancelled) setLoadingSlots(false); }
    };
    run();
    return ()=>{ cancelled=true; };
  },[templeId,date]);

  const selectedSpecial = temple?.specialOptions?.find(o=>o.id===optionSel)||null;
  const specialAddOn    = selectedSpecial?.price||0;
  const ticketInfos     = devotees.map(()=>optionSel==='normal'?{price:0}:{price:specialAddOn});
  const totalAmount     = ticketInfos.reduce((s,t)=>s+t.price,0);
  const allFree         = totalAmount===0;
  const darshanLabel    = optionSel==='normal'?'Normal Darshan':(selectedSpecial?.label||'Normal Darshan');
  const perPersonLabel  = () => optionSel==='normal'?'FREE / Normal Darshan':`Rs. ${specialAddOn} (${selectedSpecial?.label}) / person`;

  const noteForStep2 = () => {
    if (optionSel==='normal')            return NOTE_NORMAL;
    if (temple?.specialType==='ropeway') return NOTE_ROPEWAY;
    if (temple?.specialType==='vip')     return NOTE_VIP;
    return null;
  };

  const goStep2 = () => {
    if (!templeId) return setError('Please select a temple.');
    if (!date)     return setError('Please select a date.');
    if (!slot)     return setError('Please choose a time slot.');
    if (slotStatus[slot]==='full') return setError('This slot is full. Please choose a different time slot.');
    setError(''); setStep(2);
  };
  const goStep3 = () => {
    if (devotees.some(d=>!d.name.trim()||!d.age)) return setError('Please fill all devotee details.');
    setError(''); setStep(3);
  };

  const saveBooking = async (paymentStatus, payRef='') => {
    setSaving(true); setError('');
    const ref = genRef();
    try {
      const { data:bk, error:bkErr } = await supabase.from('bookings').insert({
        booking_ref:ref, temple_id:templeId, temple:temple?.name||templeId,
        booking_date:date, time_slot:slot, total_amount:totalAmount,
        payment_status:paymentStatus, upi_ref:payRef||null, darshan_type:darshanLabel,
      }).select().single();
      if (bkErr) throw bkErr;
      const devRows = devotees.map((d,i)=>({ booking_id:bk.id, name:d.name, age:parseInt(d.age), gender:d.gender, ticket_type:ticketInfos[i].price===0?'Free':'General', ticket_price:ticketInfos[i].price }));
      const { error:dvErr } = await supabase.from('devotees').insert(devRows);
      if (dvErr) throw dvErr;
      setBooking({...bk, devotees:devRows}); setStep(4);
    } catch(e) { setError('Save failed: '+e.message); }
    finally    { setSaving(false); }
  };

  /* ── Unified Razorpay handler — all 4 methods in one modal ── */
  const openRazorpay = async () => {
    setError('');
    const loaded = await loadRazorpay();
    if (!loaded) { setError('Could not load payment gateway. Please check your internet connection.'); return; }
    setPayStatus('processing');
    const options = {
      key: RAZORPAY_KEY,
      amount: totalAmount * 100,
      currency: 'INR',
      name: temple?.trust||'Temple Trust',
      description: `${darshanLabel} — ${temple?.name}`,
      prefill: { name:devotees[0]?.name||'', contact:'9999999999', email:'devotee@mandirgo.in' },
      notes: { temple:temple?.name, date, slot, devotees:devotees.length, darshan_type:darshanLabel },
      theme: { color:'#f97316' },
      /* All four payment methods enabled — Razorpay modal shows UPI, Card, Net Banking, Wallets */
      method: { upi:true, card:true, netbanking:true, wallet:true, emi:false },
      modal: { ondismiss:()=>setPayStatus('idle'), confirm_close:true },
      handler: async (response) => {
        setPayStatus('done');
        await saveBooking('paid', response.razorpay_payment_id);
      },
    };
    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (r) => { setPayStatus('idle'); setError(`Payment failed: ${r.error.description||'Please try again.'}`); });
      rzp.open();
    } catch(e) { setPayStatus('idle'); setError('Could not open payment gateway. Please try again.'); }
  };

  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    try {
      const canvas = await html2canvas(ticketRef.current,{scale:3,useCORS:true,backgroundColor:'#ffffff',scrollX:0,scrollY:0});
      const pdf = new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
      const pdfW=pdf.internal.pageSize.getWidth();
      pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,10,pdfW,(canvas.height/3)*(pdfW/(canvas.width/3)));
      pdf.save(`${booking?.booking_ref||'ticket'}.pdf`);
    } catch { window.print(); }
  };

  const resetAll = () => {
    setStep(1);setTempleId('');setDate('');setSlot('');setOptionSel('normal');
    setDevotees([{name:'',age:'',gender:'male'}]);setBooking(null);
    setPayStatus('idle');setError('');setSlotStatus({});
  };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(150deg,#fff7ed 0%,#fffbeb 55%,#fefce8 100%)', fontFamily:F }}>

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#fff7ed 0%,#fffbeb 60%,#fefce8 100%)', borderBottom:`1px solid ${C.border}`, padding:'52px 32px 44px', textAlign:'center' }}>
        <h1 style={{ margin:'0 0 10px', fontSize:'clamp(28px,4vw,46px)', fontWeight:800, color:C.text, letterSpacing:'-0.5px', lineHeight:1.1 }}>
          Book Your <span style={{ color:C.orange }}>Darshan</span>
        </h1>
        <p style={{ margin:0, fontSize:15, color:C.muted, maxWidth:480, marginLeft:'auto', marginRight:'auto', lineHeight:1.7 }}>
          Follow the steps below to complete your booking and receive your e-ticket instantly.
        </p>
      </div>

      <div style={{ maxWidth:660, margin:'0 auto', padding:'32px 16px 80px' }}>
        <div style={{ background:C.white, borderRadius:24, border:`1.5px solid ${C.border}`, boxShadow:'0 24px 64px rgba(249,115,22,0.09), 0 4px 20px rgba(0,0,0,0.04)', overflow:'hidden' }}>
          <div style={{ height:4, background:`linear-gradient(90deg,${C.orange},${C.amber},#eab308,${C.amber},${C.orange})` }}/>

          <div style={{ padding:'36px 32px' }}>
            <StepBar step={step}/>

            {error && (
              <div style={{ display:'flex', alignItems:'center', gap:10, background:'#fef2f2', border:'1.5px solid #fecaca', borderRadius:12, padding:'12px 16px', fontSize:14, color:C.red, marginBottom:24, fontFamily:F }}>
                <FiAlertCircle size={15}/> {error}
              </div>
            )}

            {/* ══ STEP 1 ══ */}
            {step===1 && (
              <div>
                <SCard>
                  <label style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:1.5, display:'flex', alignItems:'center', gap:6, marginBottom:12 }}>
                    <div style={{ width:22, height:22, borderRadius:6, background:C.light, display:'flex', alignItems:'center', justifyContent:'center' }}><FiMapPin size={12} style={{ color:C.orange }}/></div>
                    Select Temple
                  </label>
                  <div style={{ position:'relative' }}>
                    <select value={templeId} onChange={e=>handleTempleChange(e.target.value)}
                      style={{ width:'100%', boxSizing:'border-box', padding:'12px 40px 12px 16px', borderRadius:10, border:`1.5px solid ${templeId?C.orange:C.borderSoft}`, fontSize:14, color:templeId?C.text:C.muted, background:C.white, outline:'none', appearance:'none', WebkitAppearance:'none', fontFamily:F, cursor:'pointer' }}>
                      <option value="" disabled>— Please choose a temple —</option>
                      {TEMPLES.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                    <FiChevronDown size={15} style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)', color:C.muted, pointerEvents:'none' }}/>
                  </div>
                  {temple && (
                    <div style={{ marginTop:10, padding:'10px 14px', borderRadius:10, background:C.light, border:`1.5px solid ${C.border}`, display:'flex', alignItems:'center', gap:9 }}>
                      <FiMapPin size={13} style={{ color:C.orange, flexShrink:0 }}/>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{temple.name}</div>
                        <div style={{ fontSize:12, color:C.muted, marginTop:1 }}>{temple.loc}</div>
                      </div>
                    </div>
                  )}
                </SCard>

                {temple && (
                  <SCard>
                    <label style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:1.5, display:'flex', alignItems:'center', gap:6, marginBottom:14 }}>
                      <div style={{ width:22, height:22, borderRadius:6, background:C.light, display:'flex', alignItems:'center', justifyContent:'center' }}><FiGift size={12} style={{ color:C.orange }}/></div>
                      {temple.specialType==='ropeway'?'Darshan & Ropeway':'Darshan Type'}
                    </label>
                    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                      <OptionCard id="normal" label="Normal Darshan" price={0} desc="Free for all devotees — standard queue entry" selected={optionSel} onSelect={setOptionSel}/>
                      {temple.specialType==='vip' && temple.specialOptions.map(opt=>(
                        <OptionCard key={opt.id} id={opt.id} label={opt.label} price={opt.price} desc={opt.desc} selected={optionSel} onSelect={setOptionSel} tag="PREMIUM"/>
                      ))}
                      {temple.specialType===null && (
                        <div style={{ padding:'12px 14px', borderRadius:10, background:'#fefce8', border:'1.5px solid #fde68a' }}>
                          <span style={{ fontSize:13, color:'#92400e', fontWeight:600 }}>VIP Darshan is not available at this temple.</span>
                        </div>
                      )}
                      {temple.specialType==='ropeway' && (<>
                        <div style={{ padding:'10px 14px', borderRadius:10, background:C.blueBg, border:`1.5px solid ${C.blueBd}`, fontSize:13, color:C.blue, fontWeight:600 }}>
                          Ropeway options available — add to your darshan booking
                        </div>
                        {temple.specialOptions.map(opt=>(
                          <OptionCard key={opt.id} id={opt.id} label={opt.label} price={opt.price} desc={opt.desc} selected={optionSel} onSelect={setOptionSel} tag="ROPEWAY"/>
                        ))}
                      </>)}
                    </div>
                  </SCard>
                )}

                <SCard>
                  <label style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:1.5, display:'flex', alignItems:'center', gap:6, marginBottom:12 }}>
                    <div style={{ width:22, height:22, borderRadius:6, background:C.light, display:'flex', alignItems:'center', justifyContent:'center' }}><FiCalendar size={12} style={{ color:C.orange }}/></div>
                    Select Date
                  </label>
                  <Input type="date" value={date} min={today()} onChange={e=>{setDate(e.target.value);setSlot('');}}/>
                </SCard>

                <SCard>
                  <label style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:1.5, display:'flex', alignItems:'center', gap:6, marginBottom:templeId&&date?10:14 }}>
                    <div style={{ width:22, height:22, borderRadius:6, background:C.light, display:'flex', alignItems:'center', justifyContent:'center' }}><FiClock size={12} style={{ color:C.orange }}/></div>
                    Choose Time Slot
                  </label>
                  {templeId&&date && (
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12, flexWrap:'wrap' }}>
                      {[['available','#16a34a','Available'],['filling_fast','#f59e0b','Filling Fast'],['full','#ef4444','Full']].map(([k,col,lbl])=>(
                        <div key={k} style={{ display:'flex', alignItems:'center', gap:5 }}>
                          <div style={{ width:7, height:7, borderRadius:'50%', background:col }}/>
                          <span style={{ fontSize:11, color:C.muted }}>{lbl}</span>
                        </div>
                      ))}
                      {loadingSlots && <span style={{ fontSize:11, color:C.muted, display:'flex', alignItems:'center', gap:4 }}><FiLoader size={11}/> Loading…</span>}
                    </div>
                  )}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    {TIME_SLOTS.map(s=>{
                      const active=slot===s.time;
                      const rawSt=(templeId&&date)?(slotStatus[s.time]||'available'):null;
                      const isFull=rawSt==='full';
                      const ss=rawSt?slotStatusStyle(rawSt):null;
                      return (
                        <button key={s.time} onClick={()=>{if(!isFull)setSlot(s.time);}} disabled={isFull}
                          style={{ padding:'12px 12px', borderRadius:12, textAlign:'left', cursor:isFull?'not-allowed':'pointer',
                            border:`2px solid ${active?C.orange:isFull?'#fecaca':C.borderSoft}`,
                            background:active?C.light:isFull?'#fef2f2':C.white,
                            boxShadow:active?'0 4px 16px rgba(249,115,22,0.18)':'none',
                            transition:'all .18s', opacity:isFull?.65:1 }}>
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:s.aarti||ss?4:0 }}>
                            {s.aarti
                              ? <span style={{ fontSize:10, fontWeight:700, padding:'1px 7px', borderRadius:999, background:active?C.orange:'#fef3c7', color:active?C.white:'#b45309' }}>Aarti Time</span>
                              : <span/>}
                            {ss && (
                              <span style={{ fontSize:9, fontWeight:700, padding:'2px 6px', borderRadius:999, background:ss.badge.bg, color:ss.badge.color, border:`1px solid ${ss.badge.border}`, display:'flex', alignItems:'center', gap:3, whiteSpace:'nowrap' }}>
                                <span style={{ width:5, height:5, borderRadius:'50%', background:ss.dot, display:'inline-block' }}/>{ss.label}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize:12, fontWeight:700, color:isFull?C.muted:C.text }}>{s.time}</div>
                          <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{s.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </SCard>

                <Btn onClick={goStep2}>Continue <FiArrowRight size={16}/></Btn>
              </div>
            )}

            {/* ══ STEP 2 ══ */}
            {step===2 && (
              <div>
                <div style={{ marginBottom:22, padding:'14px 18px', background:`linear-gradient(135deg,${C.light},#fffbeb)`, border:`1.5px solid ${C.border}`, borderRadius:14, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{temple?.name}</div>
                    <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{date} · {slot}</div>
                  </div>
                  <span style={{ fontSize:12, fontWeight:700, padding:'5px 14px', borderRadius:999, background:`linear-gradient(135deg,${C.orange},${C.orangeDk})`, color:C.white, boxShadow:'0 3px 10px rgba(249,115,22,0.28)' }}>{darshanLabel}</span>
                </div>

                <SLabel icon={FiUsers} text="Enter Devotee Details"/>

                {devotees.map((d,i)=>{
                  const ti=ticketInfos[i];
                  return (
                    <SCard key={i} style={{ border:`2px solid ${ti.price===0?C.greenBd:C.borderSoft}`, background:ti.price===0?C.greenBg:C.white }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                        <span style={{ fontSize:13, fontWeight:600, color:C.muted }}>Devotee {i+1}</span>
                        <span style={{ fontSize:12, fontWeight:700, padding:'3px 12px', borderRadius:999, background:ti.price===0?'#dcfce7':C.lightMid, color:ti.price===0?C.green:C.orange }}>
                          {ti.price===0?'FREE':`Rs. ${ti.price}`}
                        </span>
                      </div>
                      <Input type="text" placeholder={`Devotee ${i+1} Name`} value={d.name}
                        onChange={e=>{const a=[...devotees];a[i]={...a[i],name:e.target.value};setDevotees(a);}} style={{ marginBottom:10 }}/>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                        <Input type="number" placeholder="Age" min={0} max={120} value={d.age}
                          onChange={e=>{const a=[...devotees];a[i]={...a[i],age:e.target.value};setDevotees(a);}}/>
                        <select value={d.gender} onChange={e=>{const a=[...devotees];a[i]={...a[i],gender:e.target.value};setDevotees(a);}}
                          style={{ padding:'12px 16px', borderRadius:10, border:`1.5px solid ${C.borderSoft}`, fontSize:14, color:C.text, background:C.white, outline:'none', fontFamily:F }}>
                          <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
                        </select>
                      </div>
                      {devotees.length>1 && (
                        <button onClick={()=>setDevotees(devotees.filter((_,j)=>j!==i))}
                          style={{ marginTop:10, fontSize:13, color:C.red, background:'none', border:'none', cursor:'pointer', fontWeight:600, padding:0, fontFamily:F }}>
                          Remove devotee
                        </button>
                      )}
                    </SCard>
                  );
                })}

                <button onClick={()=>setDevotees([...devotees,{name:'',age:'',gender:'male'}])}
                  style={{ width:'100%', padding:'13px', borderRadius:12, border:`2px dashed ${C.border}`, background:'transparent', fontSize:14, color:C.orange, fontWeight:700, cursor:'pointer', marginBottom:16, fontFamily:F }}>
                  + Add Another Devotee
                </button>

                <div style={{ background:`linear-gradient(135deg,${C.light},#fffbeb)`, border:`1.5px solid ${C.border}`, borderRadius:14, padding:'14px 18px', marginBottom:16 }}>
                  <div style={{ fontSize:13, color:C.muted, marginBottom:6 }}>Rate: {perPersonLabel()}</div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:15, fontWeight:700, color:C.text }}>Total Amount</span>
                    <span style={{ fontSize:28, fontWeight:800, color:allFree?C.green:C.orange }}>{allFree?'FREE':`Rs. ${totalAmount}`}</span>
                  </div>
                </div>

                {noteForStep2()&&<NoteBox text={noteForStep2()}/>}

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:12 }}>
                  <Btn variant="secondary" onClick={()=>setStep(1)}>Back</Btn>
                  <Btn onClick={goStep3}>Continue <FiArrowRight size={16}/></Btn>
                </div>
              </div>
            )}

            {/* ══ STEP 3 — PAYMENT ══ */}
            {step===3 && (
              <div>
                <SLabel icon={FiCreditCard} text="Complete Your Payment"/>

                {/* Booking Summary */}
                <SCard style={{ background:C.light, border:`1.5px solid ${C.border}` }}>
                  <div style={{ fontSize:11, fontWeight:700, color:C.orange, letterSpacing:1.5, textTransform:'uppercase', marginBottom:14 }}>Booking Summary</div>
                  {[['Temple',temple?.name||''],['Date',fmtDate(date)],['Time Slot',slot],['Darshan Type',darshanLabel],['Devotees',devotees.length+' person(s)'],['Rate',perPersonLabel()]].map(([k,v])=>(
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'7px 0', borderBottom:`1px dashed ${C.border}`, gap:12 }}>
                      <span style={{ fontSize:13, color:C.muted, flexShrink:0 }}>{k}</span>
                      <span style={{ fontSize:13, fontWeight:600, color:C.text, textAlign:'right' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:14 }}>
                    <span style={{ fontSize:16, fontWeight:700, color:C.text }}>Total</span>
                    <span style={{ fontSize:26, fontWeight:800, color:allFree?C.green:C.orange }}>{allFree?'FREE':`Rs. ${totalAmount}`}</span>
                  </div>
                </SCard>

                {/* FREE path */}
                {allFree ? (
                  <div>
                    <div style={{ background:C.greenBg, border:`1.5px solid ${C.greenBd}`, borderRadius:16, padding:'28px', textAlign:'center', marginBottom:20 }}>
                      <div style={{ width:52, height:52, borderRadius:'50%', background:'#dcfce7', border:`2px solid ${C.greenBd}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
                        <FiCheckCircle size={26} style={{ color:C.green }}/>
                      </div>
                      <div style={{ fontSize:17, fontWeight:700, color:'#166534', marginBottom:6 }}>No Payment Required</div>
                      <div style={{ fontSize:13, color:'#166534' }}>Normal Darshan is free for all devotees.</div>
                    </div>
                    <Btn variant="green" onClick={()=>saveBooking('free')} disabled={saving}>
                      {saving?<><FiLoader size={15}/> Saving…</>:<><FiCheckCircle size={15}/> Confirm Free Booking</>}
                    </Btn>
                  </div>
                ) : (
                  <div>
                    {/* ── Accepted methods strip ── */}
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:20 }}>
                      {[
                        { emoji:'📱', label:'UPI',         sub:'GPay · PhonePe · BHIM' },
                        { emoji:'💳', label:'Card',        sub:'Debit & Credit'         },
                        { emoji:'🏦', label:'Net Banking', sub:'All major banks'         },
                        { emoji:'👛', label:'Wallets',     sub:'Paytm & more'           },
                      ].map(({ emoji, label, sub }) => (
                        <div key={label} style={{ textAlign:'center', padding:'12px 6px', borderRadius:12, background:C.light, border:`1.5px solid ${C.border}` }}>
                          <div style={{ fontSize:20, marginBottom:3 }}>{emoji}</div>
                          <div style={{ fontSize:10, fontWeight:700, color:C.text, fontFamily:F }}>{label}</div>
                          <div style={{ fontSize:9, color:C.muted, marginTop:2, lineHeight:1.4, fontFamily:F }}>{sub}</div>
                        </div>
                      ))}
                    </div>

                    {/* ── Amount display ── */}
                    <div style={{ background:C.light, border:`1.5px solid ${C.border}`, borderRadius:14, padding:'20px', textAlign:'center', marginBottom:20 }}>
                      <div style={{ fontSize:12, color:C.muted, marginBottom:4, fontFamily:F }}>Total amount to pay</div>
                      <div style={{ fontSize:40, fontWeight:800, color:C.orange, lineHeight:1, fontFamily:F }}>₹{totalAmount}</div>
                      <div style={{ fontSize:12, color:C.muted, marginTop:6, fontFamily:F }}>{temple?.trust||'Temple Trust'}</div>
                    </div>

                    {/* ── Processing state ── */}
                    {payStatus==='processing' && (
                      <div style={{ textAlign:'center', padding:'8px 0 14px' }}>
                        <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:C.light, border:`1.5px solid ${C.border}`, borderRadius:12, padding:'12px 24px' }}>
                          <FiLoader size={17} style={{ color:C.orange, animation:'spin 1s linear infinite' }}/>
                          <span style={{ fontSize:13, fontWeight:600, color:C.orange, fontFamily:F }}>Opening Razorpay…</span>
                        </div>
                        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                      </div>
                    )}

                    {/* ── Single unified CTA ── */}
                    <Btn onClick={openRazorpay} disabled={saving||payStatus==='processing'}>
                      🔒 Pay ₹{totalAmount} Securely <FiArrowRight size={15}/>
                    </Btn>

                    {/* ── Trust badge ── */}
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:12 }}>
                      <div style={{ width:20, height:20, borderRadius:6, background:'#072654', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <span style={{ fontSize:11, color:'#fff', fontWeight:900 }}>R</span>
                      </div>
                      <span style={{ fontSize:11, color:C.muted, fontFamily:F }}>
                        Secured by Razorpay · UPI · Cards · Net Banking · Wallets · 256-bit SSL
                      </span>
                    </div>
                  </div>
                )}

                <div style={{ marginTop:16 }}>
                  <Btn variant="secondary" onClick={()=>{ setStep(2); setPayStatus('idle'); setError(''); }}>Back</Btn>
                </div>
              </div>
            )}

            {/* ══ STEP 4 ══ */}
            {step===4 && booking && (
              <div>
                <div style={{ textAlign:'center', marginBottom:28 }}>
                  <div style={{ width:64, height:64, borderRadius:'50%', background:C.greenBg, border:`2px solid ${C.greenBd}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px', boxShadow:'0 6px 20px rgba(22,163,74,0.18)' }}>
                    <FiCheckCircle size={30} style={{ color:C.green }}/>
                  </div>
                  <h2 style={{ margin:'0 0 6px', fontSize:22, fontWeight:800, color:C.text }}>Booking Confirmed!</h2>
                  <p style={{ margin:0, fontSize:14, color:C.muted }}>Your Darshan is confirmed. Please show the QR code at the entry gate.</p>
                </div>

                <div ref={ticketRef} style={{ background:C.white, border:`2px solid ${C.border}`, borderRadius:20, overflow:'hidden', boxShadow:'0 12px 36px rgba(249,115,22,0.14)', fontFamily:F }}>
                  <div style={{ background:`linear-gradient(135deg,${C.orange},${C.orangeDk})`, padding:'22px 26px' }}>
                    <div style={{ fontSize:10, letterSpacing:2.5, color:'rgba(255,255,255,0.70)', fontWeight:600, marginBottom:5, textTransform:'uppercase' }}>Official E-Ticket</div>
                    <div style={{ fontSize:18, fontWeight:800, color:C.white, lineHeight:1.2, marginBottom:3 }}>{temple?.name}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.75)' }}>{temple?.loc}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.55)', marginTop:3 }}>Issued by {temple?.trust}</div>
                  </div>

                  <div style={{ display:'flex', padding:'20px 24px' }}>
                    <div style={{ flex:1, minWidth:0, paddingRight:20, borderRight:`1.5px dashed ${C.borderSoft}` }}>
                      <div style={{ fontSize:10, fontWeight:700, color:C.orange, letterSpacing:1.5, textTransform:'uppercase', marginBottom:4 }}>Booking ID</div>
                      <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:16, letterSpacing:0.5 }}>{booking.booking_ref}</div>
                      {[['Date',fmtShort(booking.booking_date)],['Slot',booking.time_slot],['Darshan Type',darshanLabel],['Amount',booking.total_amount===0?'FREE':`Rs. ${booking.total_amount}`],['Payment','Verified ✓']].map(([k,v])=>(
                        <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px dashed ${C.borderSoft}`, gap:8 }}>
                          <span style={{ fontSize:12, color:C.muted }}>{k}</span>
                          <span style={{ fontSize:12, fontWeight:700, color:k==='Amount'?(booking.total_amount===0?C.green:C.orange):k==='Payment'?C.green:C.text, textAlign:'right' }}>{v}</span>
                        </div>
                      ))}
                      <div style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:1.5, textTransform:'uppercase', margin:'14px 0 8px' }}>Devotees</div>
                      {devotees.map((d,i)=>(
                        <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'5px 0', borderBottom:`1px dotted ${C.borderSoft}` }}>
                          <span style={{ fontSize:12, color:C.text, fontWeight:600 }}>{d.name} <span style={{ color:C.muted, fontWeight:400 }}>({d.age}y)</span></span>
                          <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:999, background:ticketInfos[i].price===0?'#dcfce7':C.lightMid, color:ticketInfos[i].price===0?C.green:C.orange, flexShrink:0, marginLeft:6 }}>
                            {ticketInfos[i].price===0?'FREE':`Rs. ${ticketInfos[i].price}`}
                          </span>
                        </div>
                      ))}
                      <div style={{ fontSize:11, color:C.muted, marginTop:14, lineHeight:1.7 }}>Carry valid photo ID. Dress code applies.</div>
                    </div>

                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', paddingLeft:20, flexShrink:0 }}>
                      <div style={{ padding:10, background:C.white, border:`1.5px solid ${C.borderSoft}`, borderRadius:14, boxShadow:'0 2px 12px rgba(0,0,0,0.07)' }}>
                        <QRCodeSVG value={JSON.stringify({id:booking.booking_ref,temple:temple?.name,date:booking.booking_date,slot:booking.time_slot,darshan:darshanLabel,pax:devotees.length,amount:booking.total_amount})} size={96} includeMargin={false}/>
                      </div>
                      <div style={{ fontSize:10, color:C.muted, marginTop:6, textAlign:'center', lineHeight:1.5 }}>Scan at<br/>temple gate</div>
                    </div>
                  </div>

                  <div style={{ background:C.light, padding:'10px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:`1.5px dashed ${C.border}` }}>
                    <span style={{ fontSize:11, fontWeight:600, color:C.orange }}>{temple?.trust}</span>
                    <span style={{ fontSize:10, color:C.muted }}>Jai Shri !</span>
                  </div>
                  <div style={{ height:4, background:`linear-gradient(90deg,${C.orange},${C.amber},#eab308,${C.amber},${C.orange})` }}/>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:20 }}>
                  <Btn variant="dark" onClick={downloadTicket}><FiDownload size={15}/> Download Ticket</Btn>
                  <Btn onClick={resetAll}>Book Another Darshan</Btn>
                </div>
              </div>
            )}
          </div>
        </div>

        <p style={{ textAlign:'center', fontSize:12, color:C.muted, marginTop:24, fontFamily:F }}>
          &copy; {temple?.trust||'Temple Trust'} · All rights reserved
        </p>
      </div>
    </div>
  );
}
