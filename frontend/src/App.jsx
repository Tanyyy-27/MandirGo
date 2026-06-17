import AnnouncementDetail from './pages/AnnouncementDetail.jsx';
import React from 'react';
import Header from './components/Header';
import AboutPage from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import LoginPage2 from './pages/Login';
import HomePage from './pages/Homepage';
import FeaturesSection from './components/features';
import SignUpPage from './pages/SignUp';
import DarshanBookingPage from './pages/Booking.jsx';
import TempleEventsPageAlt from './pages/UpComingEvent.jsx';
import Map from './pages/Map.jsx';
import LiveCrowdStatusPage from './pages/LiveCrowdStatus.jsx';
import AnnouncementPage from './pages/Announcement.jsx';

const App = () => {
    return (
        <div>
            <main>
                <Header />
                <Outlet />
            </main>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/",                 element: <HomePage /> },
            { path: "/features",         element: <FeaturesSection /> },
            { path: "/About",            element: <AboutPage /> },
            { path: "/Login",            element: <LoginPage2 /> },
            { path: "/SignUp",           element: <SignUpPage /> },
            { path: "/Booking",          element: <DarshanBookingPage /> },
            { path: "/upcomingevent",    element: <TempleEventsPageAlt /> },
            { path: "/Map",              element: <Map /> },
            { path: "/livestatus",       element: <LiveCrowdStatusPage /> },
            { path: "/announcement",     element: <AnnouncementPage /> },
            { path: "/announcement/:id", element: <AnnouncementDetail /> },
        ]
    },
    {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
    },
]);

export { router };
export default App;
