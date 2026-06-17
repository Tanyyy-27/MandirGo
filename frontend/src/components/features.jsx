import React from 'react';
import { FaInstagram } from 'react-icons/fa';

// CORRECTED: Added all necessary icons for the 8 features
import { FiUsers, FiCpu, FiMessageSquare, FiShield, FiTrendingUp, FiLogIn, FiGift, FiMapPin } from 'react-icons/fi';

const FeaturesSection = () => {
 return(
    <div className="pt-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">
                    A Complete Platform for Modern Temple Management
                </h2>
                <p className="text-slate-600 mt-4 max-w-3xl mx-auto">
                    MandirGo provides an integrated suite of tools designed to enhance safety, streamline operations, and elevate the devotee experience.
                </p>
            </div>

            {/* UPDATED: Changed grid to support 4 columns on large screens for a balanced 2x4 layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

                {/* Feature Card 1 */}
                <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-500 text-white p-3 rounded-full">
                            <FiUsers size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Smart E-Darshan System</h3>
                    </div>
                    <p className="text-slate-600">
                        Eliminate long queues with timed, pre-booked slots. Our system uses QR codes for fast entry and sends real-time alerts to manage devotee flow efficiently.
                    </p>
                </div>

                {/* Feature Card 2 */}
                <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-500 text-white p-3 rounded-full">
                            <FiCpu size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">AI Crowd Analytics</h3>
                    </div>
                    <p className="text-slate-600">
                        Leverage your existing CCTV network to monitor crowd density, predict bottlenecks, and detect safety anomalies before they escalate, all from one dashboard.
                    </p>
                </div>

                {/* Feature Card 3 */}
                <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-500 text-white p-3 rounded-full">
                            <FiMessageSquare size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">OnTime Communication</h3>
                    </div>
                    <p className="text-slate-600">
                        Instantly send announcements or emergency alerts to devotees and staff via SMS and in-app notifications. Coordinate volunteers and manage tasks in real-time.
                    </p>
                </div>

                {/* Feature Card 4 */}
                <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-500 text-white p-3 rounded-full">
                            <FiShield size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Enhanced Safety Protocols</h3>
                    </div>
                    <p className="text-slate-600">
                        Implement digital SOS features for immediate assistance and a "Lost & Found" hub to quickly reunite families, ensuring a safe environment for everyone.
                    </p>
                </div>

                {/* Feature Card 5 */}
                <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-500 text-white p-3 rounded-full">
                            <FiTrendingUp size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">forecast data Insights</h3>
                    </div>
                    <p className="text-slate-600">
                        Access detailed reports on footfall patterns and operational efficiency. Use predictive analytics to better plan for festivals and special events.
                    </p>
                </div>

                {/* Feature Card 6 */}
                <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-500 text-white p-3 rounded-full">
                            <FiLogIn size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Volunteer Management</h3>
                    </div>
                    <p className="text-slate-600">
                        Efficiently schedule, assign tasks, and communicate with your volunteer workforce through a dedicated portal, ensuring smooth on-ground operations.
                    </p>
                </div>
                
                {/* --- NEW Feature Card 7 --- */}
                <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-500 text-white p-3 rounded-full">
                            <FiGift size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Digital Donations & Seva</h3>
                    </div>
                    <p className="text-slate-600">
                        Enable devotees to make offerings and book special pujas from anywhere. Secure, transparent, and provides instant digital receipts for all transactions.
                    </p>
                </div>

                {/* --- NEW Feature Card 8 --- */}
                <div className="bg-amber-50 p-8 rounded-xl border border-amber-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-500 text-white p-3 rounded-full">
                            <FiMapPin size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Integrated Parking System</h3>
                    </div>
                    <p className="text-slate-600">
                        Guide devotees to available parking with a pre-booking system and real-time availability, connected to shuttle services for a seamless arrival experience.
                    </p>
                </div>

            </div>
        </div>
            {/* 8. Footer */}
            <footer className="bg-gray-800 text-white mt-12">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4">MandirGo</h3>
                            <p className="text-gray-400">Divine Peace. Managed Intelligently.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">About</h3>
                            <a href="#" className="block text-gray-400 hover:text-white">Our Mission</a>
                            <a href="#" className="block text-gray-400 hover:text-white">Careers</a>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Support</h3>
                            <a href="#" className="block text-gray-400 hover:text-white">Contact Us</a>
                            <a href="#" className="block text-gray-400 hover:text-white">FAQs</a>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Legal</h3>
                            <a href="#" className="block text-gray-400 hover:text-white">Privacy Policy</a>
                            <a href="#" className="block text-gray-400 hover:text-white">Terms of Service</a>
                        </div>
                         <div>
                            <h3 className="font-bold mb-4">Contact</h3>
                            <a href="mailto:contact@mandirgo.com" className="block text-gray-400 hover:text-white">contact@mandirgo.com</a>
                            <a href="https://www.instagram.com/mandirgo_official?igsh=MTRpeTB0NXZrMWo3dg==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white">
                                <FaInstagram size={14} /> mandirgo_official
                            </a>
                        </div>
                    </div>
                    <div className="text-center text-gray-500 border-t border-gray-700 mt-8 pt-6">
                        © 2025 MandirGo Technologies Pvt. Ltd. All rights reserved.
                    </div>
                </div>
            </footer>
    </div>
 )
}

export default FeaturesSection;