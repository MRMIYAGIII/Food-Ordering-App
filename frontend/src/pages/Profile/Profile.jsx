// Profile.jsx
import React, { useState } from 'react';
import ProfileNavigation from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
import Address from './Address';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Favorites from './Favorites';
import Events from './Events';
import AdminDashboard from './AdminDashboard';

function Profile() {
    const [openSideBar, setOpenSideBar] = useState(false);

    return (
        <div className="lg:flex justify-between">
            <div className="sticky h-[80vh] lg:w-[20%]">
                <ProfileNavigation open={openSideBar} />
            </div>
            <div className="lg:w-[80%]">
                <Routes>
                    <Route path="/" element={<UserProfile />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/address" element={<Address />} />
                    {/* Update the Admin Dashboard route path */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Routes>
            </div>
        </div>
    );
}

export default Profile;