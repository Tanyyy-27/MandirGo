import React, { useState } from 'react';
import { FaPrayingHands, FaRegLightbulb, FaBullseye, FaInstagram } from 'react-icons/fa';
import { FiUsers, FiHeart, FiCpu, FiShield, FiClock, FiMapPin, FiCheckSquare, FiX, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router';

const FONT = "'Poppins', sans-serif";

/* ── Core Principles detail data ── */
const PRINCIPLES = [
  {
    icon: <FiHeart size={22} />,
    title: 'Respect for Tradition',
    desc: 'Our technology complements and supports sacred rituals, never disrupts them.',
    detail: {
      headline: 'Technology That Bows to Tradition',
      body: `At MandirGo, we deeply understand that temples are not just buildings — they are living, breathing centres of faith, culture, and centuries-old ritual. Every architectural detail, every aarti timing, every prasad distribution practice has been refined over generations.\n\nOur philosophy is simple: technology must serve the devotee's spiritual experience, never override it. We never impose digital workflows that conflict with the rhythm of a temple's existing practices. Instead, we study each temple's unique customs and design solutions that fit seamlessly into what already works.\n\nWhether it's ensuring our booking system respects the exact timing of a Mahaarti, or making sure our crowd management tools never obstruct a spontaneous act of devotion — we are committed to preserving the sanctity that makes these places special.`,
      points: ['Built around each temple\'s unique customs', 'Non-intrusive digital overlays', 'Ritual timing respected in all slot logic', 'Heritage-first design process'],
    },
  },
  {
    icon: <FiUsers size={22} />,
    title: 'Human-Centric Design',
    desc: 'We build for everyone — from temple staff to the most elderly devotee.',
    detail: {
      headline: 'Built for Every Devotee, Without Exception',
      body: `The average temple devotee is not a tech-savvy urban professional. They could be a 75-year-old grandmother from a small town visiting Shirdi for the first time, or a family of six from a rural district navigating a major pilgrimage during Navratri.\n\nMandirGo is designed for all of them. Our interfaces are tested with real users across age groups and literacy levels. We use large fonts, simple icons, and minimal steps — because a booking should take 30 seconds, not 3 minutes of confusion.\n\nFor temple staff and volunteers, our admin tools are equally intuitive. A security guard shouldn't need a training manual to check who is booked for a slot. We believe that good design is invisible — it just works, for everyone.`,
      points: ['Accessible UI for all age groups', 'Multi-language support (8+ languages)', 'Minimal steps, maximum clarity', 'Field-tested with real devotees'],
    },
  },
  {
    icon: <FiCpu size={22} />,
    title: 'Innovation for Good',
    desc: 'We believe in using cutting-edge technology to solve real-world human challenges.',
    detail: {
      headline: 'Cutting-Edge Technology with a Purpose',
      body: `Temple stampedes, lost children, elderly devotees collapsing in heat — these are not abstract problems. They happen every year at India's most visited shrines. MandirGo believes that the same AI and data technologies driving billion-dollar industries can and should be applied to solve these deeply human challenges.\n\nWe use computer vision for real-time crowd density monitoring. We use predictive analytics to forecast footfall 30 days ahead. We use QR-code infrastructure for frictionless entry. And we use push notification systems to keep thousands of people informed simultaneously.\n\nNone of this is technology for technology's sake. Every feature we build starts with a real problem we witnessed at a temple gate — and ends only when we've seen it solve that problem in the field.`,
      points: ['AI-powered crowd density detection', 'Predictive footfall analytics', 'Real-time QR gate management', 'Problem-first engineering process'],
    },
  },
  {
    icon: <FiShield size={22} />,
    title: 'Partners in MandirGo',
    desc: 'We work collaboratively with temple trusts to create solutions that last.',
    detail: {
      headline: 'True Partnership, Not Just a Vendor',
      body: `Many technology companies treat temples as just another client — deliver the software, collect the fee, and move on. MandirGo operates completely differently. We see ourselves as long-term partners in the sacred responsibility of managing these institutions.\n\nBefore we write a single line of code for a temple, our team spends time on-ground — talking to priests, volunteers, trust administrators, and most importantly, devotees. We understand the politics, the seasonal patterns, the infrastructure constraints, and the trust's long-term vision.\n\nAfter deployment, we stay engaged. We monitor system performance during peak festivals, respond to incidents within hours, and continuously iterate based on real-world feedback. A temple's success during Ganeshotsav or Mahashivratri is our success too.`,
      points: ['On-ground discovery before every project', 'Dedicated post-deployment support', '24/7 monitoring during major festivals', 'Long-term trust, not one-time delivery'],
    },
  },
];

/* ── Principle Detail Modal ── */
const PrincipleModal = ({ principle, onClose }) => {
  if (!principle) return null;
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(5px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', borderRadius: 20,
          maxWidth: 520, width: '100%',
          maxHeight: '80vh', overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
          fontFamily: FONT,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg,#0f172a,#1e293b)',
          padding: '22px 26px',
          borderRadius: '20px 20px 0 0',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 13,
              background: 'linear-gradient(135deg,#f97316,#ea580c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', boxShadow: '0 4px 14px rgba(249,115,22,0.35)', flexShrink: 0,
            }}>
              {principle.icon}
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>{principle.title}</h2>
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: 20, right: 20,
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FiX size={16} style={{ color: '#fff' }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '22px 26px 28px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1c1917', marginBottom: 12, lineHeight: 1.3 }}>
            {principle.detail.headline}
          </h3>
          {principle.detail.body.split('\n\n').map((para, i) => (
            <p key={i} style={{ color: '#57534e', fontSize: 13.5, lineHeight: 1.75, marginBottom: 12 }}>{para}</p>
          ))}

          {/* Key points */}
          <div style={{ background: '#fff7ed', borderRadius: 14, padding: '18px 20px', border: '1.5px solid #fed7aa', marginTop: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Key Points</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {principle.detail.points.map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <FiChevronRight size={13} style={{ color: '#f97316', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: '#44403c', lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Mission / Vision expandable card — controlled from parent ── */
const MissionVisionCard = ({ icon, iconBg, title, text, expanded, onToggle }) => {
  const [hovered, setHovered] = useState(false);

  const shortText = text.slice(0, 120) + '...';
  const longText = text + `\n\nWe measure our success not in lines of code or features shipped, but in the stories of devotees who experienced their darshan peacefully — the elderly woman who didn't have to stand for hours, the family that didn't lose a child in a crowd, the priest who could focus on the ritual because the management was handled. That is the promise we make, and the standard we hold ourselves to.`;

  return (
    <div
      style={{
        background: expanded ? 'rgba(255,255,255,0.08)' : hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${expanded || hovered ? 'rgba(249,115,22,0.50)' : 'rgba(249,115,22,0.22)'}`,
        borderRadius: 20, padding: '36px 32px',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
        boxShadow: expanded ? '0 12px 40px rgba(249,115,22,0.20)' : hovered ? '0 8px 32px rgba(249,115,22,0.12)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 13,
          background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(249,115,22,0.30)', flexShrink: 0,
          transition: 'transform 0.2s',
          transform: hovered || expanded ? 'scale(1.08)' : 'scale(1)',
        }}>
          {icon}
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: 0 }}>{title}</h3>
        <div style={{
          marginLeft: 'auto',
          width: 28, height: 28, borderRadius: '50%',
          background: 'rgba(249,115,22,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'transform 0.25s',
          transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
        }}>
          <FiChevronRight size={15} style={{ color: '#f97316' }} />
        </div>
      </div>

      <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.8, margin: 0 }}>
        {expanded ? longText.split('\n\n').map((para, i) => (
          <span key={i} style={{ display: 'block', marginBottom: i < longText.split('\n\n').length - 1 ? 14 : 0 }}>{para}</span>
        )) : shortText}
      </p>

      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 5, color: '#f97316', fontSize: 13, fontWeight: 600 }}>
        {expanded ? 'Show less' : 'Read more'} <FiArrowRight size={12} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </div>
    </div>
  );
};

/* ══ Main Page ══ */
const AboutPage = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null); // 'mission' | 'vision' | null

  return (
    <div style={{ background: '#fafaf9', fontFamily: FONT, color: '#44403c' }}>

      {/* ── 1. Hero Section ── */}
      <section style={{
        background: 'linear-gradient(135deg, #fff7ed 0%, #fffbeb 60%, #fefce8 100%)',
        padding: '80px 32px',
        borderBottom: '1px solid #fed7aa',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(34px, 5.5vw, 62px)',
            fontWeight: 800, color: '#1c1917',
            lineHeight: 1.1, letterSpacing: '-0.5px',
            marginBottom: 22, marginTop: 0,
          }}>
            Bridging Devotion with<br />
            <span style={{ color: '#f97316' }}>Smart Innovation</span>
          </h1>
          <p style={{
            fontSize: 17, color: '#78716c', lineHeight: 1.75,
            maxWidth: 680, margin: '0 auto',
          }}>
            We are a team of technologists, devotees, and heritage enthusiasts dedicated to making every spiritual journey in India safe, serene, and seamless.
          </p>
        </div>
      </section>

      {/* ── 2. Our Story Section ── */}
      <section style={{ padding: '88px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 60px rgba(249,115,22,0.12), 0 4px 16px rgba(0,0,0,0.06)', position: 'relative' }}>
            <img
              src="https://c9admin.cottage9.com/uploads/5839/somnath-temple.jpg"
              alt="A serene temple corridor"
              style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(90deg,#fdba74,#f97316,#ea580c,#f59e0b)' }} />
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: 2.5, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>Our Story</span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#1c1917', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.3px' }}>
              Our Journey: From a Crowded Lane to a Clear Vision
            </h2>
            <p style={{ fontSize: 15, color: '#78716c', lineHeight: 1.8, marginBottom: 0 }}>
              The idea for MandirGo emerged during a visit to a revered temple on a festive Sunday afternoon, where we witnessed the beauty of faith alongside the realities of overcrowding. Elderly devotees stood in long queues, families anxiously stayed close to one another, and temple staff worked tirelessly to manage the overwhelming flow of people. Inspired by these real-world challenges, MandirGo was founded by Tanmay Yenpure with a vision to make pilgrimage experiences safer, smarter, and more accessible through technology.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Mission & Vision ── */}
      <section style={{ background: '#0f172a', padding: '88px 32px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <MissionVisionCard
              icon={<FaBullseye style={{ color: '#fff', fontSize: 20 }} />}
              iconBg="linear-gradient(135deg,#f97316,#ea580c)"
              title="Our Mission"
              text="To empower temple administrations across India with intelligent, intuitive technology that manages crowds effectively, ensures the safety of every devotee, and preserves the sacred atmosphere of our holy places."
              expanded={expandedCard === 'mission'}
              onToggle={() => setExpandedCard(expandedCard === 'mission' ? null : 'mission')}
            />
            <MissionVisionCard
              icon={<FaRegLightbulb style={{ color: '#fff', fontSize: 20 }} />}
              iconBg="linear-gradient(135deg,#f59e0b,#d97706)"
              title="Our Vision"
              text="A future where every devotee can experience a peaceful and profound connection with the divine, free from the stress of overcrowding, making India's sacred sites global benchmarks in smart, respectful management."
              expanded={expandedCard === 'vision'}
              onToggle={() => setExpandedCard(expandedCard === 'vision' ? null : 'vision')}
            />
          </div>
        </div>
      </section>

      {/* ── 4. Core Principles ── */}
      <section style={{ padding: '88px 32px', background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: 2.5, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>What Drives Us</span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.3px', marginBottom: 44 }}>Our Core Principles</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                onClick={() => setSelectedPrinciple(p)}
                className="bg-amber-50 p-8 rounded-xl border border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ fontFamily: FONT, cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{
                    background: '#f59e0b', color: '#fff',
                    padding: 10, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {p.icon}
                  </div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', margin: 0, lineHeight: 1.3 }}>{p.title}</h4>
                </div>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.65, margin: '0 0 14px 0', flex: 1 }}>{p.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f97316', fontSize: 12, fontWeight: 600 }}>
                  Learn more <FiArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Plan Your Visit ── */}
      <section style={{ padding: '88px 32px', background: '#fff7ed' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: 2.5, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>For Devotees</span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.3px', marginBottom: 14 }}>Plan Your Visit</h2>
            <p style={{ color: '#78716c', fontSize: 15, maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
              An example of how MandirGo helps provide clear information to devotees. (Example: Shrimant Dagdusheth Halwai Ganpati Temple, Pune)
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {/* Timings */}
            <div style={{ background: '#fff', borderRadius: 18, padding: '32px 28px', border: '1.5px solid #fde8c8', boxShadow: '0 4px 20px rgba(249,115,22,0.07)', transition: 'transform 0.22s, box-shadow 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(249,115,22,0.13)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(249,115,22,0.07)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 12px rgba(249,115,22,0.25)', flexShrink: 0 }}>
                  <FiClock size={20} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1c1917', margin: 0 }}>Temple Timings</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[['General Darshan','6:00 AM – 11:00 PM (Daily)'],['Suprabhatam Aarti','7:30 AM – 7:45 AM'],['Naivedyam Aarti','1:30 PM – 2:00 PM'],['Madhyana Aarti','3:00 PM – 3:15 PM'],['Mahamangal Aarti','8:00 PM – 9:00 PM'],['Shejarti (Night)','10:30 PM – 10:45 PM']].map(([label, time]) => (
                  <li key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px dashed #fde8c8', gap: 8 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: '#44403c' }}>{label}</span>
                    <span style={{ fontSize: 13, color: '#78716c', textAlign: 'right', flexShrink: 0 }}>{time}</span>
                  </li>
                ))}
                <li style={{ paddingTop: 10, fontSize: 12, color: '#a8a29e', fontStyle: 'italic' }}>*Open 24/7 during Ganeshotsav. Entry is free.</li>
              </ul>
            </div>

            {/* How to Reach */}
            <div style={{ background: '#fff', borderRadius: 18, padding: '32px 28px', border: '1.5px solid #fde8c8', boxShadow: '0 4px 20px rgba(249,115,22,0.07)', transition: 'transform 0.22s, box-shadow 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(249,115,22,0.13)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(249,115,22,0.07)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 12px rgba(249,115,22,0.25)', flexShrink: 0 }}>
                  <FiMapPin size={20} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1c1917', margin: 0 }}>How to Reach</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[['Address','Ganpati Bhavan, 250 Budhwar Peth, Pune – 411002.'],['By Air','Pune International Airport (PNQ), approx. 10–12 km away.'],['By Train','Pune Junction Railway Station, approx. 3–4 km away.'],['By Bus','Pune Bus Stand is just 800 m from the temple.'],['By Road','Near Shaniwar Wada in central Pune; autos and cabs easily available.']].map(([label, info]) => (
                  <li key={label} style={{ padding: '8px 0', borderBottom: '1px dashed #fde8c8' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: '#44403c' }}>{label}: </span>
                    <span style={{ fontSize: 13, color: '#78716c' }}>{info}</span>
                  </li>
                ))}
                <li style={{ paddingTop: 10, fontSize: 12, color: '#a8a29e', fontStyle: 'italic' }}>*Expect heavy traffic during peak hours and festival days.</li>
              </ul>
            </div>

            {/* Facilities */}
            <div style={{ background: '#fff', borderRadius: 18, padding: '32px 28px', border: '1.5px solid #fde8c8', boxShadow: '0 4px 20px rgba(249,115,22,0.07)', transition: 'transform 0.22s, box-shadow 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(249,115,22,0.13)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(249,115,22,0.07)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 12px rgba(249,115,22,0.25)', flexShrink: 0 }}>
                  <FiCheckSquare size={20} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1c1917', margin: 0 }}>Available Facilities</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Cloakroom & Locker Facility','Wheelchair Accessibility','Prasad & Refreshment Stalls','First-Aid & Medical Center','Paid Vehicle Parking'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px dashed #fde8c8', fontSize: 14, color: '#44403c' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: '#f0fdf4', border: '1.5px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FiCheckSquare size={12} style={{ color: '#16a34a' }} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#0f172a', color: '#fff', fontFamily: FONT }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg,#fdba74,#f97316,#ea580c,#f59e0b,#f97316,#fdba74)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 32px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 32, marginBottom: 40 }}>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Mandir<span style={{ color: '#f97316' }}>Go</span></h3>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>Divine Peace.<br />Managed Intelligently.</p>
            </div>
            {[
              { heading: 'About',   links: ['Our Mission', 'Careers'] },
              { heading: 'Support', links: ['Contact Us', 'FAQs'] },
              { heading: 'Legal',   links: ['Privacy Policy', 'Terms of Service'] },
            ].map(col => (
              <div key={col.heading}>
                <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: '#e2e8f0' }}>{col.heading}</h3>
                {col.links.map(l => (
                  <span key={l} style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>{l}</span>
                ))}
              </div>
            ))}
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: '#e2e8f0' }}>Contact</h3>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>contact@mandirgo.com</p>
              <a
                href="https://www.instagram.com/mandirgo_official?igsh=MTRpeTB0NXZrMWo3dg=="
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <FaInstagram size={14} /> mandirgo_official
              </a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: 24, textAlign: 'center', color: '#64748b', fontSize: 12 }}>
            © 2026 MandirGo Technologies Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Principle Modal */}
      {selectedPrinciple && <PrincipleModal principle={selectedPrinciple} onClose={() => setSelectedPrinciple(null)} />}

    </div>
  );
};

export default AboutPage;
