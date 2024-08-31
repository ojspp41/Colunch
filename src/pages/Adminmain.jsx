import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminNavbar from '../components/Adminnavbar';
import AdminmainPage from './Adminmain';
import ChargeRequestsPage from './ChargeRequestsPage';
import UserManagementPage from './UserManagementPage';
import TeamManagementPage from './TeamManagementPage';
import Adminpagelogin from './';

function Adminpage() {
    return (
        <div>
            <AdminNavbar />
            <Routes>
                
                <Route path="/charge-requests" element={<ChargeRequestsPage />} />
                <Route path="/user-management" element={<UserManagementPage />} />
                <Route path="/team-management" element={<TeamManagementPage />} />
            </Routes>
        </div>
    );
}

export default Adminpage;