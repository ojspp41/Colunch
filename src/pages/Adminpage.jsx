import React, { useEffect, useState } from 'react';
import Adminpageunlogin from './Adminpage_unlogin';
import Adminpagelogin from './Adminpage_login';
import axios from 'axios';

function Adminpage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            try {
            const response = await axios.get("/admin/token/check", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setIsLoggedIn(true);
            }
            } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
        };
        checkLoginStatus();
    }, []);

    return <div>{isLoggedIn ? <Adminpagelogin /> : <Adminpageunlogin />}</div>;
}

export default Adminpage;
