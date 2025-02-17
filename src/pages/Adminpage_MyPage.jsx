import React, { useState } from 'react';
import {AdminHeader} from '../components/Admin/AdminHeader';
import {AdminMyPageMain,AdminMyPageManage, AdminTeamManage} from '../components/Admin/AdminMyPageMain';
import { adminUserState } from '../Atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AdminNotAllowed from '../components/Admin/AdminNotAllowed';
const Adminpage_MyPage = () => {
    const [adminSelect, setAdminSelect] = useState("Main");
    const {isChecked} = useRecoilValue(adminUserState);
    if(!isChecked){
        return (
            <div>
                <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}></AdminHeader>
                <AdminNotAllowed/>
            </div>
        )
    }
    return (
            <div>
                <AdminHeader setAdminSelect={setAdminSelect} adminSelect={adminSelect}/>
                {adminSelect === 'Main' && <AdminMyPageMain />} 
                {adminSelect === '가입자관리' && <AdminMyPageManage />} 
                {adminSelect === '팀관리' && <AdminTeamManage />}
            </div>
    );
};

export default Adminpage_MyPage;