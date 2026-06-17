// NOTE: This file is not imported anywhere in App.jsx / the active router.
// It appears to be an earlier draft of the events/routes page and is kept
// here for reference only. Its import of 'react-router-dom' and './AdminDashboard'
// will not resolve as-is — wire it up or remove it as needed.
import React from 'react';
// Added new icons for the map/routes section
import { FiCalendar, FiClock, FiArrowRight, FiMapPin, FiNavigation, FiBriefcase } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// --- Event Data ---
// --- Event Data (with corrected image URLs) ---
const templeEventsData = {
    Somnath: {
        name: "Somnath Jyotirlinga",
        image: "https://images.unsplash.com/photo-1621941071039-50e5b2caf82f?q=80&w=2070",
        events: [
            { title: 'Sharad Purnima Mahotsav', date: 'October 15, 2025', description: 'Experience the divine beauty of Lord Somnath adorned with a special Sringar under the radiant full moon.' },
            { title: 'Diwali & Annakut', date: 'October 28, 2025', description: 'The temple will be illuminated with thousands of diyas, followed by a grand Annakut offering.' },
        ]
    },
    Dwarka: {
        name: "Dwarkadhish Temple",
        // CORRECTED: Replaced the temporary Google link with a stable Unsplash URL
        image: "https://images.unsplash.com/photo-1601141929015-32538135e8ac?q=80&w=1974",
        events: [
            { title: 'Diwali & Annakut Utsav', date: 'October 28, 2025', description: 'Celebrate the festival of lights with a grand Annakut offering of 56 bhog varieties to Lord Krishna.' },
            { title: 'Tulsi Vivah', date: 'November 8, 2025', description: 'Witness the divine marriage ceremony of Goddess Tulsi and Lord Krishna with beautiful processions.' },
        ]
    },
    Ambaji: {
        name: "Ambaji Shakti Peeth",
        // CORRECTED: Added a valid image URL instead of an empty string
        image: "https://images.unsplash.com/photo-1588640195692-7145e66299f2?q=80&w=1974",
        events: [
            { title: 'Navaratri Maha Aarti', date: 'Happening Now (Ends Oct 8)', description: 'The grandest celebration is underway! Experience nine nights of vibrant Garba and a massive fair (mela).' },
            { title: 'Sharad Purnima Festival', date: 'October 15, 2025', description: 'On the night of the full moon, special pujas are offered to the Goddess in a beautifully decorated temple.' },
        ]
    },
    Pavagadh: {
        name: "Mahakali Temple, Pavagadh",
        image: "https://images.unsplash.com/photo-1658494922627-95775c1a79d7?q=80&w=1936",
        events: [
            { title: 'Navaratri Mahotsav', date: 'Happening Now (Ends Oct 8)', description: 'As a powerful Shakti Peeth, Pavagadh witnesses an immense gathering of pilgrims for Navaratri darshan.' },
            { title: 'Posh Purnima Mela', date: 'January 14, 2026', description: 'A significant fair is held on the full moon day of Posh, attracting thousands of pilgrims.' },
        ]
    }
};

// ... the rest of your component code remains the same

// --- NEW: Travel Information Data ---
const travelInfo = {
    Somnath: {
        airport: "Diu Airport (DIU) - 80 km",
        railway: "Veraval Junction (VRL) - 7 km",
        gmaps: "https://www.google.com/maps/dir/?api=1&destination=Somnath+Temple"
    },
    Dwarka: {
        airport: "Jamnagar Airport (JGA) - 130 km",
        railway: "Dwarka Station (DWK) - 2 km",
        gmaps: "https://www.google.com/maps/dir/?api=1&destination=Dwarkadhish+Temple,+Dwarka"
    },
    Ambaji: {
        airport: "Ahmedabad Airport (AMD) - 180 km",
        railway: "Abu Road Station (ABR) - 20 km",
        gmaps: "https://www.google.com/maps/dir/?api=1&destination=Ambaji+Temple"
    },
    Pavagadh: {
        airport: "Vadodara Airport (BDQ) - 50 km",
        railway: "Vadodara Station (BRC) - 50 km",
        gmaps: "https://www.google.com/maps/dir/?api=1&destination=Mahakali+Temple,+Pavagadh"
    }
};


const TempleEventsPageAlt = () => {
    return (
        <div className="bg-white">
            {/* 1. Hero Section */}
            <section className="relative bg-amber-600 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold">Spiritual Circuit of Gujarat</h1>
                    <p className="mt-4 text-lg text-amber-100">Discover upcoming festivals and plan your pilgrimage to the state's most revered temples.</p>
                </div>
            </section>

            <main>
                {/* Loop through each temple for events */}
                {Object.entries(templeEventsData).map(([key, temple], index) => (
                    <div key={key} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                        <div className="container mx-auto px-6 py-20">
                            {/* Temple Header */}
                            <div className="lg:flex lg:items-center lg:gap-8 mb-12">
                                <img src={temple.image} alt={temple.name} className="w-full lg:w-1/3 h-64 object-cover rounded-2xl shadow-xl mb-6 lg:mb-0"/>
                                <div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">{temple.name}</h2>
                                    <p className="mt-2 text-slate-600 text-lg">
                                        Explore the most awaited upcoming celebrations at {temple.name}.
                                    </p>
                                    <Link to="/darshan-booking" className="mt-4 bg-amber-500 text-white font-bold px-6 py-3 rounded-lg inline-flex items-center hover:bg-amber-600 transition-colors">
                                        Book Darshan <FiArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Events Grid for the Temple */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {temple.events.map(event => (
                                    <div key={event.title} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                                        <h3 className="text-2xl font-bold text-slate-800">{event.title}</h3>
                                        <div className="flex items-center text-slate-500 my-3">
                                            <FiCalendar className="mr-2 text-amber-500" /> 
                                            <span className={event.date.includes('Now') ? 'font-bold text-green-600' : ''}>{event.date}</span>
                                        </div>
                                        <p className="text-slate-600">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- NEW: Map and Routes Section --- */}
                <section className="bg-slate-800 text-white py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold">Plan Your Pilgrimage Circuit</h2>
                            <p className="mt-4 text-slate-300 max-w-3xl mx-auto">
                                All four temples are well-connected by road. Use the interactive map below to explore the region and find detailed travel information for each sacred site.
                            </p>
                        </div>
                        
                        {/* Interactive Map Embed */}
                        <div className="mb-12 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-600">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m76!1m12!1m3!1d3004036.953835623!2d69.7560863071295!3d22.25725227708304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m61!3e0!4m5!1s0x395e26e5a4387691%3A0x28b70668931a238!2sSomnath%20Temple%2C%20Somnath%2C%20Prabhas%20Patan%2C%20Gujarat!3m2!1d20.8879555!2d70.4011835!4m5!1s0x39569c2b9a7a2815%3A0x58252277a9099953!2sDwarkadhish%20Temple%2C%20Dwarka%2C%20Gujarat!3m2!1d22.2384668!2d68.9676508!4m5!1s0x395d28e7aaaaaaab%3A0x6e344a433f819a3!2sAmbaji%20Temple%2C%20Ambaji%2C%20Gujarat!3m2!1d24.3312356!2d72.8524419!4m5!1s0x3960309450000001%3A0x47a6a43f7734138e!2sShree%20Mahakali%20Mataji%20Temple%2C%20Pavagadh%2C%20Pavagadh%2C%20Gujarat!3m2!1d22.4578168!2d73.5133346!4m30!1i0!2i0!3i1!4i1!5i0!6i0!7i0!8i0!9i0!10i0!11i0!12i0!13i0!14i0!15i0!16i0!17i0!18i0!19i0!20i0!21i0!22i0!23i0!24i0!25i0!26i0!27i0!28i0!29i0!5e0!3m2!1sen!2sin!4v1667654321098!5m2!1sen!2sin"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Route Cards Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {Object.entries(travelInfo).map(([key, info]) => (
                                <div key={key} className="bg-slate-700 p-6 rounded-xl text-center">
                                    <h3 className="text-2xl font-bold text-amber-400 mb-4">{key}</h3>
                                    <div className="space-y-3 text-slate-300">
                                        <p className="flex items-center justify-center gap-2"><FiNavigation size={18}/> {info.airport}</p>
                                        <p className="flex items-center justify-center gap-2"><FiBriefcase size={18}/> {info.railway}</p>
                                    </div>
                                    <a href={info.gmaps} target="_blank" rel="noopener noreferrer" 
                                       className="mt-6 bg-amber-500 text-white font-bold px-6 py-2 rounded-lg inline-flex items-center hover:bg-amber-600 transition-colors">
                                        Get Directions <FiArrowRight className="ml-2"/>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

import AdminDashboard from './AdminDashboard';
// In your routes:
<Route path="/admin/dashboard" element={<AdminDashboard />} />

export default TempleEventsPageAlt;