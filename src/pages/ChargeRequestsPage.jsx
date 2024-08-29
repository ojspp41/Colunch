import React from 'react';
import '../css/pages/ChargeRequests.css'
import AdminRequestList from '../components/AdminRequestList';
function ChargeRequestsPage() {
    return (
        <div className='admin-container'>
            
            {/* 충전 요청 관련 기능 구현 */}
            <AdminRequestList />
        </div>
    );
}

export default ChargeRequestsPage;
