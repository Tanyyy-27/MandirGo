import React, { useState, useEffect } from 'react';
import {
    FiCalendar, FiArrowRight, FiMapPin, FiNavigation, FiBriefcase,
    FiArrowLeft, FiClock, FiInfo, FiChevronRight, FiCompass, FiStar
} from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router';

const FONT = "'Poppins', sans-serif";

/* ══════════════════════════════════════════════
   TEMPLE EVENTS DATA
══════════════════════════════════════════════ */
const templeEventsData = {
    Dagdusheth: {
        name: 'Shrimant Dagdusheth Temple',
        location: 'Pune, Maharashtra',
        image: 'https://thetempleguru.com/wp-content/uploads/2024/12/Dagdusheth-Halwai-Ganpati-Temple-600x429.jpg',
        events: [
            {
                title: 'Sankashti Chaturthi & Mahashivratri',
                date: 'February 5 & 15, 2026',
                description: 'Sankashti Chaturthi is observed on February 5 with moonrise darshan at 9:43 PM (Pune time). Mahashivratri follows on February 15 with special pujas at the adjacent Siddheshwar Shiva temple, drawing large crowds through the night.',
            },
            {
                title: 'Gudi Padwa Music Festival',
                date: 'March 29 – April 6, 2026',
                description: "The Trust's annual Music Festival kicks off on Gudi Padwa — the founding day of the temple — and continues through Ram Navami. Classical and devotional performances are held each evening in the temple precincts.",
            },
        ],
    },
    Somnath: {
        name: 'Somnath Jyotirlinga',
        location: 'Somnath, Gujarat',
        image: 'https://www.trawell.in/admin/images/upload/894169759Somnath_Somnath_Temple_Main.jpg',
        events: [
            {
                title: 'Somnath Mahashivratri Mahotsav',
                date: 'February 14–15, 2026',
                description: 'A two-day grand celebration at the first Jyotirlinga. Special cultural programs begin at 6 PM on both days. The Somnath Trust has organised special Bilva Pooja sessions with continuous abhishek, and the temple remains open for 36 hours straight.',
            },
            {
                title: 'Shravan Maas Special Pujas',
                date: 'July 18 – August 16, 2026',
                description: 'The holy month of Shravan is the most auspicious period for Shiva worship at Somnath. Special Rudrabhishek and Panchopchar rituals are performed daily.',
            },
        ],
    },
    Dwarka: {
        name: 'Dwarkadhish Temple',
        location: 'Dwarka, Gujarat',
        image: 'https://i.pinimg.com/originals/e6/f3/a3/e6f3a3de9e134319002f1e395cf59c54.jpg',
        events: [
            {
                title: 'Holi Mela at Dwarkadhish',
                date: 'March 4, 2026',
                description: 'Holi is celebrated with immense joy at the Dwarkadhish Temple. Devotees from across Gujarat gather to play colours and receive prasad of Thandai. Temple darshan remains open from 6:00 AM to 9:30 PM.',
            },
            {
                title: 'Fuldol Utsav (Rang Panchami)',
                date: 'March 9, 2026',
                description: "The grand Fuldol celebration at Dwarka — Lord Krishna's idol is taken out in a procession showered with flowers and colours, drawing thousands of pilgrims to this Char Dham shrine.",
            },
        ],
    },
    Ambaji: {
        name: 'Ambaji Shakti Peeth',
        location: 'Banaskantha, Gujarat',
        image: 'https://www.gujarattourism.com/content/dam/gujrattourism/images/religious-sites/ambaji-temple/Ambaji-Temple-Banner.jpg',
        events: [
            {
                title: 'Mahashivratri Mela',
                date: 'February 15, 2026',
                description: 'A significant fair at this Shakti Peeth on Mahashivratri. Special aarti at 7:15 PM is followed by a community dinner. Extended darshan hours are observed throughout the night.',
            },
            {
                title: 'Chaitra Navratri Utsav',
                date: 'March 29 – April 7, 2026',
                description: 'Spring Navratri is celebrated with nine nights of special pujas, Garba and devotional programmes at this Shakti Peeth. The sacred Shree Yantra is adorned with special floral and jewelled decorations each day.',
            },
        ],
    },
    Pavagadh: {
        name: 'Mahakali Temple, Pavagadh',
        location: 'Pavagadh, Gujarat',
        image: 'https://goyahills.com/wp-content/uploads/2025/03/pavagadh-temple.jpg',
        events: [
            {
                title: 'Chaitra Navratri Mahotsav',
                date: 'March 29 – April 7, 2026',
                description: 'As a powerful Shakti Peeth, Pavagadh witnesses an immense gathering for Chaitra Navratri. The ropeway sees extended operations and the entire hilltop is illuminated with special festive lighting.',
            },
            {
                title: 'Chaitra Sud Ashtami Annual Fair',
                date: 'April 4, 2026',
                description: "The annual fair on the eighth day of the waxing moon in Chaitra — one of Pavagadh's most sacred dates. Thousands of devotees climb the 2,000 steps or take the ropeway for special darshan.",
            },
        ],
    },
};

/* ══════════════════════════════════════════════
   INTEMPLE ROUTE DATA
══════════════════════════════════════════════ */
const templeRouteData = {
    Dagdusheth: {
        tagline: 'One of the most visited Ganpati temples in India',
        timings: '6:00 AM – 11:00 PM Daily',
        darshanDuration: '15–30 minutes',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.246!2d73.8533!3d18.5161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0748902da5f%3A0x48a64ae4e1d6d9c0!2sDagdusheth%20Halwai%20Ganapati%20Temple!5e0!3m2!1sen!2sin!4v1700000000000',
        steps: [
            { id: 1, zone: 'Entry Gate', icon: '🚪', title: 'Main Entrance — Laxmi Road', desc: 'Enter from the main gate on Budhwar Peth / Laxmi Road. Footwear deposit counters are on both sides. Lockers available for bags and valuables.' },
            { id: 2, zone: 'Queue Lines', icon: '🧎', title: 'Darshan Queue Area', desc: 'Three separate queues — General, Ladies, and VIP. The air-conditioned corridor keeps wait comfortable. Weekday wait: 10–15 min; festival days: up to 2 hours.' },
            { id: 3, zone: 'Prasad Counter', icon: '🌸', title: 'Prasad & Flower Counter', desc: 'Purchase modak prasad, marigold / rose flowers, and coconut from temple trust counters within the queue corridor before reaching the sanctum.' },
            { id: 4, zone: 'Sanctum', icon: '🪔', title: 'Garbhagriha — Ganpati Darshan', desc: 'The richly decorated idol with gold ornaments, silver throne, and jewelled crown. Devotees get 2–3 minutes of close darshan. Photography is not permitted inside.' },
            { id: 5, zone: 'Aarti Hall', icon: '🔔', title: 'Aarti & Abhishek Hall', desc: 'Scheduled aartis at 7 AM, 12 PM, 7 PM and 10:30 PM. VIP abhishek can be booked at the temple office opposite the main gate.' },
            { id: 6, zone: 'Exit', icon: '✅', title: 'Exit — Budhwar Peth Lane', desc: 'Exit via the rear lane. The trust office is on the right just before the exit. Collect your footwear from the deposit counter at the exit gate.' },
        ],
        tips: [
            'Visit between 6–8 AM for minimal crowds and peaceful darshan',
            'Tuesdays and Chaturthi days are most crowded — plan extra time',
            'All religious items available from trust counters inside',
            'Free prasad distribution happens after every aarti',
        ],
        nearby: ['Shaniwar Wada (1 km)', 'Pataleshwar Caves (0.5 km)', 'Kasba Ganpati (1.2 km)'],
    },
    Somnath: {
        tagline: 'First among the 12 sacred Jyotirlingas of Lord Shiva',
        timings: '6:00 AM – 9:30 PM (Aarti: 7 AM, 12 PM, 7 PM)',
        darshanDuration: '20–40 minutes',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.5!2d70.4023!3d20.888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be2eda7fe7e39db%3A0x4a3f5ded47e5dddb!2sSomnath%20Temple!5e0!3m2!1sen!2sin!4v1700000000000',
        steps: [
            { id: 1, zone: 'Security Check', icon: '🛡️', title: 'Main Security Gate', desc: 'Strict security check at the main entrance. Cameras, leather items, and mobile phones are not permitted. Deposit them at the cloakroom near the main gate.' },
            { id: 2, zone: 'Outer Courtyard', icon: '🏛️', title: 'Outer Courtyard & Toran', desc: 'The 155-ft shikhara becomes visible here. The Nandi idol and the famous "Baan Stambh" arrow pillar indicating the uninterrupted ocean to the South Pole stand in this area.' },
            { id: 3, zone: 'Sabha Mandap', icon: '🙏', title: 'Sabha Mandap — Prayer Hall', desc: 'Large assembly hall with intricately carved stone pillars and ceiling panels. Shoes must be removed before entering. Aarti gatherings are held here.' },
            { id: 4, zone: 'Sanctum', icon: '🪔', title: 'Garbhagriha — Jyotirlinga Darshan', desc: 'The sacred Shivling is enshrined here. Devotees offer jal and bilva leaves. Queue moves steadily; 30–60 seconds at the jyotirlinga. Photography strictly prohibited.' },
            { id: 5, zone: 'Prithvi Path', icon: '🌊', title: 'Prithvi Path — Seaside Walkway', desc: 'Walk the paved seaside path along the Arabian Sea. The Triveni Sangam (confluence of rivers Hiran, Kapila, Saraswati) is accessible from here.' },
            { id: 6, zone: 'Exit', icon: '✅', title: 'Exit & Prasad Counter', desc: 'Exit via the south gate. Official prasad (vibhuti, kumkum, modak) distributed at the trust counter near the exit.' },
        ],
        tips: [
            'Evening Sound & Light show at 7:45 PM is a must — book tickets in advance',
            'Wear light cotton clothing — Gujarat coast can be warm and humid',
            'Mondays and Mahashivratri are extremely crowded — arrive 2 hours early',
            'Temple trust guesthouse is the closest and most convenient stay',
        ],
        nearby: ['Bhalka Tirth (6 km)', 'Prabhas Museum (0.3 km)', 'Triveni Ghat (0.5 km)'],
    },
    Dwarka: {
        tagline: 'One of the four sacred Char Dham pilgrimage sites of India',
        timings: '6:00 AM – 1:00 PM | 5:00 PM – 9:30 PM',
        darshanDuration: '30–60 minutes',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.5!2d68.9678!3d22.2376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39568e08b36d8a41%3A0x63534a5e3d5dc6a4!2sDwarkadhish%20Temple!5e0!3m2!1sen!2sin!4v1700000000000',
        steps: [
            { id: 1, zone: 'Moksha Dwar', icon: '🚪', title: 'Moksha Dwar — Main Entry Gate', desc: 'Northern entrance "Moksha Dwar" (Gate of Liberation). Security check here. Mobile phones and cameras must be deposited at the cloakroom.' },
            { id: 2, zone: 'Outer Courtyard', icon: '🏛️', title: 'Outer Courtyard — 72 Pillars', desc: '5-storey temple on 72 intricately carved pillars. The 78.3-metre shikhara with flag is visible from the sea. Pilgrims circumambulate the outer walls before entering.' },
            { id: 3, zone: 'Swarg Dwar', icon: '⛩️', title: 'Swarg Dwar — Inner Gate', desc: 'Southern "Swarg Dwar" (Gate of Heaven) leads to the main sanctum. A steep flight of 56 steps descends to Gomti Ghat from this exit.' },
            { id: 4, zone: 'Sanctum', icon: '🪔', title: 'Garbhagriha — Dwarkadhish Darshan', desc: 'The four-armed idol of Lord Vishnu adorned with crown, conch, chakra, and lotus. Deity is dressed differently each day. Photography not permitted inside.' },
            { id: 5, zone: 'Gomti Ghat', icon: '🌊', title: 'Gomti Ghat — Sacred River Bath', desc: 'The Gomti river meets the Arabian Sea here. Taking a dip is considered auspicious. Priests offer puja services on the ghat steps.' },
            { id: 6, zone: 'Exit', icon: '✅', title: 'Exit via Swarg Dwar', desc: 'Exit through Swarg Dwar (south gate). The Dwarka Archaeological Museum is a short walk. Official prasad at the trust counter near exit.' },
        ],
        tips: [
            'Temple closes 1–5 PM — plan darshan for morning or evening sessions',
            'Wear traditional attire — shorts and sleeveless not permitted inside',
            'Book Rajbhog darshan at the trust office for a more exclusive experience',
            'Evening aarti at 7:30 PM is the most atmospheric time to visit',
        ],
        nearby: ['Bet Dwarka (30 km by boat)', 'Nageshwar Jyotirlinga (16 km)', 'Rukmini Devi Temple (2 km)'],
    },
    Ambaji: {
        tagline: '51st Shakti Peeth — Heart of Maa Amba is enshrined here',
        timings: '7:00 AM – 12:00 PM | 4:00 PM – 9:00 PM',
        darshanDuration: '20–35 minutes',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.5!2d72.8502!3d24.3347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395d22b6b8000001%3A0x2d2b6b8000001!2sAmbaji%20Temple!5e0!3m2!1sen!2sin!4v1700000000000',
        steps: [
            { id: 1, zone: 'Entry Gate', icon: '🚪', title: 'Main Temple Gate', desc: 'Enter from the main bazaar street. All footwear removed at entrance. Free locker facilities at the gate for bags, phones, and valuables.' },
            { id: 2, zone: 'Sabha Mandap', icon: '🏛️', title: 'Sabha Mandap — Assembly Hall', desc: 'Large prayer hall with marble flooring and silver-clad walls. The Shree Yantra — the geometric form of Maa Amba — is displayed and worshipped here as the primary deity.' },
            { id: 3, zone: 'Sanctum', icon: '🪔', title: 'Garbhagriha — Shree Yantra Darshan', desc: 'Uniquely, Ambaji has no anthropomorphic idol — the sacred geometric Shree Yantra is worshipped. Devotees offer red flowers, kumkum, and coconut. Photography strictly prohibited.' },
            { id: 4, zone: 'Aarti Pavilion', icon: '🔔', title: 'Aarti Pavilion', desc: 'Aartis at sunrise, noon, and sunset. During Navratri, Garba follows in the courtyard. Arrive 30 minutes early for a good position.' },
            { id: 5, zone: 'Gabbar Hill', icon: '⛰️', title: 'Gabbar Hill — Sacred Hilltop', desc: 'Ropeway ride or 300-step trek to Gabbar Hill. Panoramic view of the Aravalli range. Hilltop shrine equally sacred. Ropeway: 8 AM – 7 PM.' },
            { id: 6, zone: 'Exit', icon: '✅', title: 'Exit & Prasad Counter', desc: 'Exit via rear gate. Trust counter distributes sindoor, kumkum, and modak. Donation receipts and special puja bookings at the trust office.' },
        ],
        tips: [
            'Fridays and Purnima days see very heavy crowds — start early',
            'Gabbar Hill ropeway closes at 7 PM — plan accordingly',
            'Wear red or orange clothing — mark of devotion and welcome here',
            'Navratri is the grandest time to visit this Shakti Peeth',
        ],
        nearby: ['Gabbar Hill (0.5 km)', 'Kumbharia Jain Temples (3 km)', 'Koteshwar Mahadev Temple (2 km)'],
    },
    Pavagadh: {
        tagline: 'Ancient Shakti Peeth perched atop the mystical Pavagadh Hill',
        timings: '6:00 AM – 8:00 PM (Ropeway: 8:00 AM – 6:00 PM)',
        darshanDuration: '45–90 minutes (including ropeway)',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.5!2d73.5255!3d22.4737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3960309f0a1e857b%3A0xda69f8a1c07b8123!2sMahakali%20Temple%20Pavagadh!5e0!3m2!1sen!2sin!4v1700000000000',
        steps: [
            { id: 1, zone: 'Base Point', icon: '🚌', title: 'Champaner Parking & Base Point', desc: 'All vehicles park at Champaner base. Two options to ascend: (1) Ropeway from Pavagadh town, or (2) Trek via ancient stone steps (~2,000 steps, 1.5–2 hour climb).' },
            { id: 2, zone: 'Ropeway', icon: '🚡', title: 'Ropeway Station — Pavagadh Town', desc: 'Cable car takes 5 minutes with sweeping views of the UNESCO Champaner-Pavagadh Archaeological Park. Tickets: ₹100 (one-way) / ₹180 (return). Operates 8 AM – 6 PM.' },
            { id: 3, zone: 'Mid-hill', icon: '⛩️', title: 'Satapan & Mid-hill Shrines', desc: 'After the ropeway, a 500-metre level walk passes Satapan area with smaller shrines and prasad shops. Palanquin services available for elderly devotees.' },
            { id: 4, zone: 'Sanctum', icon: '🪔', title: 'Garbhagriha — Maa Mahakali Darshan', desc: 'The three-faced idol of Maa Mahakali adorned in red saree, gold ornaments, and silver crown. Devotees offer coconut, red flowers, sindoor. Queue: 20–40 minutes on normal days.' },
            { id: 5, zone: 'Summit', icon: '🌄', title: 'Summit Viewpoint — Panoramic Vista', desc: '360-degree view of Champaner plains, Machi Fort ruins, and on clear days — the distant Narmada River valley. Small dharmashala and water station at the top.' },
            { id: 6, zone: 'Descent', icon: '✅', title: 'Descent — Steps or Ropeway', desc: 'Descend via the 2,000-step pathway or take the ropeway back. The Jami Masjid and Champaner archaeological site are excellent stops on the drive back.' },
        ],
        tips: [
            'Start ascent before 8 AM to avoid afternoon heat — the trek is sun-exposed',
            'Carry sufficient water — shops are sparse after the ropeway station',
            'Wear rubber-soled shoes — stone steps can be slippery in monsoon',
            'Ropeway closes at 6 PM — last darshan from 4 PM onwards recommended',
        ],
        nearby: ['Champaner Heritage Site (5 km)', 'Jami Masjid Champaner (5 km)', 'Machi Fort Ruins (Summit)'],
    },
};

const travelInfo = {
    Dagdusheth: { airport: 'Pune Airport (PNQ) — 10 km', railway: 'Pune Junction (PUNE) — 3 km' },
    Somnath:    { airport: 'Diu Airport (DIU) — 80 km',  railway: 'Veraval Junction (VRL) — 7 km' },
    Dwarka:     { airport: 'Jamnagar Airport (JGA) — 130 km', railway: 'Dwarka Station (DWK) — 2 km' },
    Ambaji:     { airport: 'Ahmedabad Airport (AMD) — 180 km', railway: 'Abu Road Station (ABR) — 20 km' },
    Pavagadh:   { airport: 'Vadodara Airport (BDQ) — 50 km', railway: 'Vadodara Station (BRC) — 50 km' },
};

/* ══════════════════════════════════════════════
   STEP CARD
══════════════════════════════════════════════ */
const StepCard = ({ step, index, total }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ display: 'flex', gap: 18, transition: 'transform 0.2s', transform: hovered ? 'translateX(5px)' : 'none' }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: hovered ? 'linear-gradient(135deg,#f97316,#ea580c)' : '#fff7ed',
                    border: `2px solid ${hovered ? '#ea580c' : '#fed7aa'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, flexShrink: 0, zIndex: 1,
                    boxShadow: hovered ? '0 6px 18px rgba(249,115,22,0.28)' : '0 2px 6px rgba(249,115,22,0.08)',
                    transition: 'all 0.2s',
                }}>{step.icon}</div>
                {index < total - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 28, background: 'linear-gradient(180deg,#fed7aa,#fde8c8)', margin: '3px 0' }} />
                )}
            </div>
            <div style={{
                flex: 1, background: hovered ? '#fff7ed' : '#fff',
                border: `1.5px solid ${hovered ? '#f97316' : '#fde8c8'}`,
                borderRadius: 14, padding: '16px 20px', marginBottom: 6,
                boxShadow: hovered ? '0 8px 24px rgba(249,115,22,0.10)' : '0 2px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.2s',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                    <span style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999, fontFamily: FONT }}>STOP {step.id}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#f97316', background: '#fff7ed', border: '1px solid #fed7aa', padding: '2px 8px', borderRadius: 999, fontFamily: FONT }}>{step.zone}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1c1917', margin: '0 0 5px', fontFamily: FONT }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: '#78716c', lineHeight: 1.7, margin: 0, fontFamily: FONT }}>{step.desc}</p>
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════
   INTEMPLE ROUTE VIEW
══════════════════════════════════════════════ */
const InTempleRouteView = ({ templeKey, onBack }) => {
    const temple = templeEventsData[templeKey];
    const route  = templeRouteData[templeKey];

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

    return (
        <div style={{ background: '#fafaf9', fontFamily: FONT }}>

            {/* Hero */}
            <section style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
                <img src={temple.image} alt={temple.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                    onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/1400x400/f97316/ffffff?text=${encodeURIComponent(temple.name)}`; }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(15,23,42,0.82) 100%)' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#fdba74,#f97316,#ea580c,#f59e0b)' }} />

                <button onClick={onBack} style={{
                    position: 'absolute', top: 24, left: 28,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                    border: '1.5px solid rgba(255,255,255,0.28)',
                    borderRadius: 999, padding: '8px 16px',
                    color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: FONT, cursor: 'pointer',
                }}>
                    <FiArrowLeft size={14} /> Back to Events
                </button>

                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 32px 36px' }}>
                    <div style={{ maxWidth: 1160, margin: '0 auto' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(249,115,22,0.88)', borderRadius: 999, padding: '4px 14px', marginBottom: 10 }}>
                            <FiCompass size={11} color="#fff" />
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: 1.8, textTransform: 'uppercase', fontFamily: FONT }}>InTemple Route Guide</span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(22px,3.5vw,42px)', fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.15, letterSpacing: '-0.4px', fontFamily: FONT }}>
                            {temple.name}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FiMapPin size={13} color="#fdba74" />
                                <span style={{ fontSize: 13, color: '#fdba74', fontWeight: 500, fontFamily: FONT }}>{temple.location}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FiClock size={13} color="#fdba74" />
                                <span style={{ fontSize: 13, color: '#fdba74', fontWeight: 500, fontFamily: FONT }}>{route.timings}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Bar */}
            <section style={{ background: '#0f172a', padding: '0 32px' }}>
                <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', overflowX: 'auto' }}>
                    {[
                        { icon: <FiClock size={15} />, label: 'Darshan Duration', value: route.darshanDuration },
                        { icon: <FiNavigation size={15} />, label: 'Route Stops', value: `${route.steps.length} Checkpoints` },
                        { icon: <FiStar size={15} />, label: 'Significance', value: route.tagline },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 28px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', flex: i === 2 ? 2 : 1, minWidth: 160 }}>
                            <div style={{ color: '#f97316', flexShrink: 0 }}>{item.icon}</div>
                            <div>
                                <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', fontFamily: FONT }}>{item.label}</div>
                                <div style={{ fontSize: 12.5, color: '#e2e8f0', fontWeight: 600, fontFamily: FONT, marginTop: 2 }}>{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main 2-column */}
            <section style={{ padding: '56px 32px' }}>
                <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48, alignItems: 'flex-start' }}>

                    {/* Steps */}
                    <div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: 2.5, textTransform: 'uppercase', display: 'block', marginBottom: 6, fontFamily: FONT }}>Step by Step</span>
                        <h2 style={{ fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 800, color: '#1c1917', margin: '0 0 6px', letterSpacing: '-0.3px', fontFamily: FONT }}>Complete Temple Route</h2>
                        <p style={{ fontSize: 13.5, color: '#78716c', marginBottom: 32, lineHeight: 1.7, fontFamily: FONT }}>
                            Follow this curated path to experience every sacred zone of {temple.name}.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {route.steps.map((step, i) => (
                                <StepCard key={step.id} step={step} index={i} total={route.steps.length} />
                            ))}
                        </div>
                    </div>

                    {/* Sticky Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 24 }}>

                        {/* Map */}
                        <div style={{ borderRadius: 18, overflow: 'hidden', boxShadow: '0 12px 40px rgba(249,115,22,0.10)', border: '2px solid #fde8c8' }}>
                            <div style={{ background: 'linear-gradient(135deg,#fff7ed,#fef3c7)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <FiMapPin size={14} color="#f97316" />
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#1c1917', fontFamily: FONT }}>Temple Location</span>
                            </div>
                            <iframe src={route.mapEmbed} width="100%" height="260"
                                style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade" title={`${temple.name} Map`} />
                        </div>

                        {/* Tips */}
                        <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #fde8c8', overflow: 'hidden', boxShadow: '0 4px 14px rgba(249,115,22,0.06)' }}>
                            <div style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <FiInfo size={14} color="#fff" />
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: FONT }}>Visitor Tips</span>
                            </div>
                            <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                                {route.tips.map((tip, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff7ed', border: '1.5px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                            <FiChevronRight size={10} color="#f97316" />
                                        </div>
                                        <span style={{ fontSize: 12.5, color: '#57534e', lineHeight: 1.6, fontFamily: FONT }}>{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nearby */}
                        <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #fde8c8', overflow: 'hidden', boxShadow: '0 4px 14px rgba(249,115,22,0.06)' }}>
                            <div style={{ background: '#fff7ed', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #fde8c8' }}>
                                <FiNavigation size={14} color="#f97316" />
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#1c1917', fontFamily: FONT }}>Nearby Attractions</span>
                            </div>
                            <div style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {route.nearby.map((place, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 10px', borderRadius: 9, background: i % 2 === 0 ? '#fafaf9' : '#fff' }}>
                                        <FiMapPin size={12} color="#f97316" style={{ flexShrink: 0 }} />
                                        <span style={{ fontSize: 12.5, color: '#44403c', fontWeight: 500, fontFamily: FONT }}>{place}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Book CTA */}
                        <Link to="/Booking" style={{ textDecoration: 'none' }}>
                            <button style={{
                                width: '100%', padding: '13px 0', borderRadius: 13, border: 'none',
                                background: 'linear-gradient(135deg,#f97316,#ea580c)',
                                color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT,
                                boxShadow: '0 6px 18px rgba(249,115,22,0.32)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                transition: 'transform 0.18s, box-shadow 0.18s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 26px rgba(249,115,22,0.42)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(249,115,22,0.32)'; }}
                            >
                                Book Darshan Now <FiArrowRight size={15} />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#0f172a', color: '#fff', fontFamily: FONT }}>
                <div style={{ height: 3, background: 'linear-gradient(90deg,#fdba74,#f97316,#ea580c,#f59e0b,#f97316,#fdba74)' }} />
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 32px 32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 32, marginBottom: 40 }}>
                        <div>
                            <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Mandir<span style={{ color: '#f97316' }}>Go</span></h3>
                            <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>Divine Peace.<br />Managed Intelligently.</p>
                        </div>
                        {[{ heading: 'About', links: ['Our Mission', 'Careers'] }, { heading: 'Support', links: ['Contact Us', 'FAQs'] }, { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service'] }].map(col => (
                            <div key={col.heading}>
                                <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: '#e2e8f0' }}>{col.heading}</h3>
                                {col.links.map(l => <span key={l} style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>{l}</span>)}
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

/* ══════════════════════════════════════════════
   TEMPLE SECTION CARD
══════════════════════════════════════════════ */
const TempleSection = ({ templeKey, temple, isEven, onRouteClick }) => {
    const info = travelInfo[templeKey];
    return (
        <section style={{ background: isEven ? '#fff' : '#fff7ed', padding: '80px 32px', borderBottom: '1px solid #fde8c8' }}>
            <div style={{ maxWidth: 1160, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isEven ? '1fr 1.6fr' : '1.6fr 1fr', gap: 56, alignItems: 'center' }}>

                    {isEven && (
                        <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 56px rgba(249,115,22,0.12), 0 4px 16px rgba(0,0,0,0.06)', position: 'relative', alignSelf: 'center', width: '100%' }}>
                            <img src={temple.image} alt={temple.name} style={{ width: '100%', height: 360, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                                onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/f59e0b/ffffff?text=${encodeURIComponent(temple.name)}`; }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#fdba74,#f97316,#ea580c,#f59e0b)' }} />
                        </div>
                    )}

                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff7ed', border: '1.5px solid #fed7aa', borderRadius: 999, padding: '4px 12px', marginBottom: 14 }}>
                            <FiMapPin size={11} style={{ color: '#f97316' }} />
                            <span style={{ fontSize: 12, fontWeight: 600, color: '#f97316', fontFamily: FONT }}>{temple.location}</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, color: '#1c1917', marginBottom: 6, letterSpacing: '-0.3px', lineHeight: 1.2, fontFamily: FONT }}>{temple.name}</h2>
                        <p style={{ fontSize: 14, color: '#78716c', marginBottom: 28, fontFamily: FONT }}>Explore the most awaited upcoming celebrations at {temple.name}.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                            {temple.events.map((event, i) => (
                                <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #fde8c8', padding: '16px 20px', borderLeft: '4px solid #f97316', boxShadow: '0 2px 10px rgba(249,115,22,0.06)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                                        <FiCalendar size={12} style={{ color: '#f97316', flexShrink: 0 }} />
                                        <span style={{ fontSize: 12, fontWeight: 700, color: '#f97316', fontFamily: FONT }}>{event.date}</span>
                                    </div>
                                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1c1917', marginBottom: 6, fontFamily: FONT }}>{event.title}</h3>
                                    <p style={{ fontSize: 13, color: '#78716c', lineHeight: 1.65, margin: 0, fontFamily: FONT }}>{event.description}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            <Link to="/Booking" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '12px 22px', borderRadius: 11,
                                    background: 'linear-gradient(135deg,#f97316,#ea580c)',
                                    color: '#fff', border: 'none', fontSize: 14, fontWeight: 700,
                                    cursor: 'pointer', fontFamily: FONT,
                                    boxShadow: '0 4px 16px rgba(249,115,22,0.30)',
                                    transition: 'transform 0.18s, box-shadow 0.18s',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.40)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(249,115,22,0.30)'; }}
                                >
                                    Book Darshan <FiArrowRight size={14} />
                                </button>
                            </Link>

                            <button
                                onClick={() => onRouteClick(templeKey)}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '12px 22px', borderRadius: 11,
                                    background: '#fff', color: '#f97316',
                                    border: '2px solid #f97316', fontSize: 14, fontWeight: 700,
                                    cursor: 'pointer', fontFamily: FONT,
                                    transition: 'background 0.18s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#fff7ed'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
                            >
                                <FiMapPin size={14} /> InTemple Route
                            </button>
                        </div>
                    </div>

                    {!isEven && (
                        <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 56px rgba(249,115,22,0.12), 0 4px 16px rgba(0,0,0,0.06)', position: 'relative', alignSelf: 'center', width: '100%' }}>
                            <img src={temple.image} alt={temple.name} style={{ width: '100%', height: 360, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                                onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/f59e0b/ffffff?text=${encodeURIComponent(temple.name)}`; }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#fdba74,#f97316,#ea580c,#f59e0b)' }} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const TempleEventsPage = () => {
    const [activeRoute, setActiveRoute] = useState(null);

    if (activeRoute) {
        return <InTempleRouteView templeKey={activeRoute} onBack={() => { setActiveRoute(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />;
    }

    return (
        <div style={{ background: '#fafaf9', fontFamily: FONT }}>

            {/* Hero */}
            <section style={{ background: 'linear-gradient(135deg,#fff7ed 0%,#fffbeb 60%,#fefce8 100%)', padding: '80px 32px', borderBottom: '1px solid #fed7aa', textAlign: 'center' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h1 style={{ fontSize: 'clamp(30px,5vw,56px)', fontWeight: 800, color: '#1c1917', lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: 18, marginTop: 0, fontFamily: FONT }}>
                        Spiritual Circuit<br /><span style={{ color: '#f97316' }}>of India</span>
                    </h1>
                    <p style={{ fontSize: 17, color: '#78716c', lineHeight: 1.75, maxWidth: 600, margin: '0 auto', fontFamily: FONT }}>
                        Discover upcoming festivals and plan your pilgrimage to the country's most revered temples.
                    </p>
                </div>
            </section>

            {/* Temple Sections */}
            {Object.entries(templeEventsData).map(([key, temple], index) => (
                <TempleSection key={key} templeKey={key} temple={temple} isEven={index % 2 === 0} onRouteClick={setActiveRoute} />
            ))}

            {/* Map & Travel */}
            <section style={{ background: '#0f172a', padding: '88px 32px' }}>
                <div style={{ maxWidth: 1160, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: 2.5, textTransform: 'uppercase', display: 'block', marginBottom: 12, fontFamily: FONT }}>Navigate</span>
                        <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: 14, fontFamily: FONT }}>Plan Your Pilgrimage Circuit</h2>
                        <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 640, margin: '0 auto', lineHeight: 1.7, fontFamily: FONT }}>
                            All five temples are well-connected by road. Use the interactive map below to explore the region.
                        </p>
                    </div>
                    <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.30)', marginBottom: 48, border: '2px solid rgba(249,115,22,0.20)' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3448.181818181818!2d70.4045!3d20.8903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sSomnath%2C%20Dwarka%2C%20Ambaji%2C%20Pavagadh%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1671234567890"
                            width="100%" height="450" style={{ border: 0, display: 'block' }}
                            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
                        {Object.entries(travelInfo).map(([key, info]) => (
                            <div key={key}
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(249,115,22,0.22)', borderRadius: 16, padding: '22px 18px', textAlign: 'center', transition: 'border-color 0.2s, background 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.55)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.22)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                            >
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fb923c', marginBottom: 16, fontFamily: FONT }}>{key}</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                        <FiNavigation size={13} style={{ color: '#94a3b8', flexShrink: 0, marginTop: 2 }} />
                                        <span style={{ fontSize: 11, color: '#94a3b8', textAlign: 'left', lineHeight: 1.5, fontFamily: FONT }}>{info.airport}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                        <FiBriefcase size={13} style={{ color: '#94a3b8', flexShrink: 0, marginTop: 2 }} />
                                        <span style={{ fontSize: 11, color: '#94a3b8', textAlign: 'left', lineHeight: 1.5, fontFamily: FONT }}>{info.railway}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveRoute(key)}
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 6,
                                        padding: '8px 14px', borderRadius: 9,
                                        background: 'linear-gradient(135deg,#f97316,#ea580c)',
                                        color: '#fff', border: 'none', fontSize: 12, fontWeight: 700,
                                        cursor: 'pointer', fontFamily: FONT,
                                        boxShadow: '0 3px 10px rgba(249,115,22,0.28)',
                                    }}
                                >
                                    InTemple Route <FiArrowRight size={11} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#0f172a', color: '#fff', fontFamily: FONT }}>
                <div style={{ height: 3, background: 'linear-gradient(90deg,#fdba74,#f97316,#ea580c,#f59e0b,#f97316,#fdba74)' }} />
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '52px 32px 32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 32, marginBottom: 40 }}>
                        <div>
                            <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Mandir<span style={{ color: '#f97316' }}>Go</span></h3>
                            <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>Divine Peace.<br />Managed Intelligently.</p>
                        </div>
                        {[{ heading: 'About', links: ['Our Mission', 'Careers'] }, { heading: 'Support', links: ['Contact Us', 'FAQs'] }, { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service'] }].map(col => (
                            <div key={col.heading}>
                                <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: '#e2e8f0' }}>{col.heading}</h3>
                                {col.links.map(l => <span key={l} style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>{l}</span>)}
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

export default TempleEventsPage;
