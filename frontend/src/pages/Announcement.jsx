import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { FiBell, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router';

const FONT = "'Poppins', sans-serif";

// --- Sample Data for Specific Temples ---
const announcements = [
    {
        id: 1,
        title: 'Kartik Purnima Mahotsav at Somnath Temple',
        category: 'Special Event',
        date: 'October 12, 2025',
        content: 'Join us for the grand Kartik Purnima Mahotsav from November 1st to November 5th, 2025. There will be a special \'Maha Aarti\' every evening, followed by the spectacular light and sound show depicting the temple\'s history.'
    },
    {
        id: 2,
        title: 'Arrangements for Bhadarvi Poonam Fair at Ambaji',
        category: 'Special Event',
        date: 'October 9, 2025',
        content: 'The annual Bhadarvi Poonam Mela will be held from October 20th to October 26th. Special arrangements for \'padayatris\' (pilgrims on foot), including rest stops and medical aid, have been made. The temple will be open 24 hours during this period.'
    },
    {
        id: 3,
        title: 'Pavagadh Ropeway Maintenance for Navratri',
        category: 'Important Notice',
        date: 'October 5, 2025',
        content: 'In preparation for the Navratri festival rush, the Udan Khatola (ropeway) at Kalika Mata Temple, Pavagadh, will be closed for mandatory maintenance from October 15th to October 17th, 2025. Please plan your visit accordingly.'
    },
    {
        id: 4,
        title: 'Live Webcast of Janmashtami from Dwarkadhish Temple',
        category: 'General',
        date: 'October 1, 2025',
        content: 'Devotees worldwide can witness the glorious Janmashtami celebrations live from the Dwarkadhish Temple. The webcast will be available on the temple\'s official website and YouTube channel. Festivities will begin at 11:00 PM on October 28th.'
    },
    {
        id: 5,
        title: 'Sankashti Chaturthi – Special Moonrise Darshan at Dagdusheth',
        category: 'Special Event',
        date: 'February 5, 2026',
        content: 'Sankashti Chaturthi will be observed on Thursday, 5th February 2026 at Shrimant Dagdusheth Halwai Ganpati Temple, Pune. Chandroday (moonrise) time in Pune is 9:43 PM. Devotees observing the vrat are invited for special darshan after moonrise. Four daily aartis — Kakad, Madhyan, Dhoop, and Shej — will be performed. Temple open from 6:00 AM to 11:00 PM.'
    },
    {
        id: 6,
        title: 'Mahashivratri & ShivJayanti Celebrations at Dagdusheth',
        category: 'Special Event',
        date: 'February 15 & 19, 2026',
        content: 'Mahashivratri falls on Sunday, 15th February 2026, followed by Chhatrapati Shivaji Maharaj Jayanti on Thursday, 19th February 2026. The Dagdusheth Trust will organise special pujas, cultural programmes, and a shobha yatra (procession) for ShivJayanti. Vinayaki Chaturthi is also scheduled on Saturday, 21st February 2026 with special aarti arrangements.'
    },
    {
        id: 7,
        title: 'Dagdusheth Ganpati Temple – Darshan & Aarti Timings Notice',
        category: 'Important Notice',
        date: 'All Year 2026',
        content: 'Shrimant Dagdusheth Halwai Ganpati Temple is open daily from 6:00 AM to 11:00 PM. Four aartis are held daily: Kakad Aarti (early morning before sunrise), Madhyan Aarti (midday), Dhoop Aarti (evening at sunset), and Shej Aarti (night, before closing). Special aarti ceremonies are observed on Ganesh Chaturthi, Diwali, Gudi Padwa, Sankashti Chaturthi, and Maghi Ganesh Jayanti. No entry fee. Devotees are advised to dress modestly.'
    },
    {
        id: 8,
        title: 'Gudi Padwa Music Festival – Temple Foundation Day 2026',
        category: 'General',
        date: 'March 29 – April 6, 2026',
        content: 'The Dagdusheth Trust\'s annual Music Festival begins on Gudi Padwa — the founding day of the temple — and continues through Ram Navami. Classical and devotional performances are held each evening in the temple precincts. Gudi Padwa, Ganeshotsav and the period from Gudi Padwa to Ram Navami are the key festivals celebrated by the Dagdusheth Halwai Ganpati Trust, Pune, every year.'
    },
];

const getCategoryStyle = (category) => {
    switch (category) {
        case 'Special Event':    return 'bg-rose-100 text-rose-800';
        case 'Important Notice': return 'bg-amber-100 text-amber-800';
        case 'General':          return 'bg-sky-100 text-sky-800';
        default:                 return 'bg-slate-100 text-slate-800';
    }
};

const AnnouncementPage = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#fff7ed', fontFamily: FONT, display: 'flex', flexDirection: 'column' }}>

            {/* ── Main content ── */}
            <div style={{ flex: 1, padding: '48px 16px 64px' }}>
                <div style={{ maxWidth: 896, margin: '0 auto' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: 18,
                            background: 'linear-gradient(135deg,#f97316,#ea580c)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px',
                            boxShadow: '0 6px 20px rgba(249,115,22,0.30)',
                        }}>
                            <FiBell size={28} style={{ color: '#fff' }} />
                        </div>
                        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#1c1917', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
                            Temple Announcements
                        </h1>
                        <p style={{ fontSize: 16, color: '#78716c', margin: 0 }}>
                            Stay updated with the latest news and schedules.
                        </p>
                    </div>

                    {/* Announcements List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {announcements.map((announcement) => (
                            <Link
                                key={announcement.id}
                                to={`/announcement/${announcement.id}`}
                                style={{ textDecoration: 'none', display: 'block' }}
                                className="group"
                            >
                                <div style={{
                                    background: '#fff', borderRadius: 16,
                                    border: '1.5px solid #fde8c8',
                                    boxShadow: '0 2px 12px rgba(249,115,22,0.06)',
                                    overflow: 'hidden',
                                    transition: 'transform 0.22s, box-shadow 0.22s, border-color 0.22s',
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'scale(1.015)';
                                        e.currentTarget.style.boxShadow = '0 10px 32px rgba(249,115,22,0.14)';
                                        e.currentTarget.style.borderColor = '#f97316';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(249,115,22,0.06)';
                                        e.currentTarget.style.borderColor = '#fde8c8';
                                    }}
                                >
                                    {/* Left orange accent bar */}
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ width: 4, background: 'linear-gradient(180deg,#f97316,#ea580c)', flexShrink: 0 }} />
                                        <div style={{ padding: '24px 28px', flex: 1 }}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
                                                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getCategoryStyle(announcement.category)}`}
                                                    style={{ fontFamily: FONT, fontSize: 12 }}>
                                                    {announcement.category}
                                                </span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#a8a29e', fontFamily: FONT }}>
                                                    <FiCalendar size={13} />
                                                    {announcement.date}
                                                </div>
                                            </div>
                                            <h2 style={{
                                                fontSize: 20, fontWeight: 700, color: '#1c1917',
                                                margin: '0 0 10px', lineHeight: 1.3,
                                                fontFamily: FONT,
                                                transition: 'color 0.18s',
                                            }}
                                                className="group-hover:text-orange-500"
                                            >
                                                {announcement.title}
                                            </h2>
                                            <p style={{
                                                fontSize: 14, color: '#78716c', lineHeight: 1.7,
                                                margin: '0 0 14px', fontFamily: FONT,
                                                display: '-webkit-box', WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                            }}>
                                                {announcement.content}
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#f97316', fontSize: 13, fontWeight: 600, fontFamily: FONT }}>
                                                Read more <FiArrowRight size={13} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Footer — exact same as HomePage & AboutPage ── */}
            <footer style={{ background: '#0f172a', color: '#fff', fontFamily: FONT }}>
                <div style={{ height: 3, background: 'linear-gradient(90deg,#fdba74,#f97316,#ea580c,#f59e0b,#f97316,#fdba74)' }} />
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 32px 32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 32, marginBottom: 40 }}>
                        <div>
                            <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>
                                Mandir<span style={{ color: '#f97316' }}>Go</span>
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
                                Divine Peace.<br />Managed Intelligently.
                            </p>
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

        </div>
    );
};

export default AnnouncementPage;
