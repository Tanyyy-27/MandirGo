import { useState, useEffect } from 'react';
import { FaPrayingHands, FaShieldAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router';
import AdminLoginModal from './AdminLogin';

const navLinks = [
    { to: '/',             label: 'Home' },
    { to: '/livestatus',   label: 'Live Crowd Status' },
    { to: '/Map',          label: 'Map & Directions' },
    { to: '/announcement', label: 'Announcements' },
    { to: '/Booking',      label: 'Darshan Booking' },
    { to: '/About',        label: 'About Us' },
];

const Header = () => {
    const [adminOpen, setAdminOpen] = useState(false);
    const [scrolled,  setScrolled]  = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (location.pathname.startsWith('/admin')) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                .mg-nav-link {
                    position: relative;
                    font-family: 'Poppins', sans-serif;
                    font-size: 13.5px;
                    font-weight: 500;
                    color: #44403c;
                    text-decoration: none;
                    padding: 7px 13px;
                    border-radius: 8px;
                    transition: color 0.18s, background 0.18s;
                    white-space: nowrap;
                }
                .mg-nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background: #f97316;
                    border-radius: 2px;
                    transition: width 0.22s ease;
                }
                .mg-nav-link:hover {
                    color: #f97316;
                    background: #fff7ed;
                }
                .mg-nav-link:hover::after { width: 55%; }
                .mg-nav-link.active {
                    color: #f97316;
                    background: #fff7ed;
                    font-weight: 600;
                }
                .mg-nav-link.active::after { width: 55%; }

                .mg-admin-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 18px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                    border: none;
                    cursor: pointer;
                    background: linear-gradient(135deg, #f97316, #ea580c);
                    color: #fff;
                    box-shadow: 0 4px 14px rgba(249,115,22,0.28);
                    transition: transform 0.18s, box-shadow 0.18s;
                    white-space: nowrap;
                }
                .mg-admin-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 7px 20px rgba(249,115,22,0.38);
                }
                .mg-logo-icon {
                    width: 38px; height: 38px; border-radius: 11px;
                    background: linear-gradient(135deg,#f97316,#ea580c);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 4px 14px rgba(249,115,22,0.32);
                    flex-shrink: 0;
                    transition: transform 0.22s ease, box-shadow 0.22s ease;
                }
                .mg-logo-wrap:hover .mg-logo-icon {
                    transform: scale(1.13);
                    box-shadow: 0 7px 22px rgba(249,115,22,0.42);
                }
            `}</style>

            <nav style={{
                position: 'sticky', top: 0, zIndex: 50,
                background: scrolled ? 'rgba(255,255,255,0.98)' : '#ffffff',
                transition: 'box-shadow 0.3s, background 0.3s',
                boxShadow: scrolled
                    ? '0 2px 20px rgba(249,115,22,0.10), 0 1px 6px rgba(0,0,0,0.06)'
                    : '0 1px 0 #fde8c8',
                fontFamily: "'Poppins', sans-serif",
            }}>
                {/* Top gradient accent bar */}
                <div style={{ height: 3, background: 'linear-gradient(90deg,#fdba74,#f97316,#ea580c,#f59e0b,#f97316,#fdba74)' }} />

                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 64,
                        gap: 12,
                    }}>

                        {/* ── Logo ── */}
                        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }} className="mg-logo-wrap">
                            <div className="mg-logo-icon">
                                <FaPrayingHands style={{ color: '#fff', fontSize: 18 }} />
                            </div>
                            <span style={{
                                fontSize: 22, fontWeight: 800,
                                letterSpacing: '-0.5px', color: '#1c1917',
                                fontFamily: "'Poppins', sans-serif",
                                lineHeight: 1,
                            }}>
                                Mandir<span style={{ color: '#f97316' }}>Go</span>
                            </span>
                        </Link>

                        {/* ── All Nav Links — always visible, wrapping if needed ── */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 2,
                            justifyContent: 'center',
                            flex: 1,
                            padding: '0 8px',
                        }}>
                            {navLinks.map(({ to, label }) => {
                                const isActive = location.pathname === to;
                                return (
                                    <Link
                                        key={to} to={to}
                                        className={`mg-nav-link${isActive ? ' active' : ''}`}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* ── Admin Button ── */}
                        <div style={{ flexShrink: 0 }}>
                            <button onClick={() => setAdminOpen(true)} className="mg-admin-btn">
                                <FaShieldAlt size={12} />
                                Admin
                            </button>
                        </div>

                    </div>
                </div>
            </nav>

            {adminOpen && <AdminLoginModal onClose={() => setAdminOpen(false)} />}
        </>
    );
};

export default Header;
