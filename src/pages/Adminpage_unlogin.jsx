import React, { useState } from 'react';
import '../css/pages/Adminpage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function Adminpageunlogin() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ accountId: '', password: '' });
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://backend.comatching.site:8080/admin/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);

            if (response.status === 200) {
                // Handle successful response
                console.log('Login successful');
                // 응답 헤더에서 토큰 추출
                const token = response.headers['authorization'];
                
                // 토큰이 존재하고 'Bearer '로 시작하면 7글자를 잘라내고 쿠키에 저장
                if (token && token.startsWith('Bearer ')) {
                    const tokenWithoutBearer = token.slice(7);
                    Cookies.set('Authorization', tokenWithoutBearer, { path: '/' });
                }
                // Redirect to Adminpage_login or change state to show login page
                navigate('/adminpage/charge-requests'); // 로그인 성공 시 Adminpagelogin 페이지로 이동
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src="/assets/admin_page_logo.svg" alt="Logo" className="logo" />
                <h2 className="partners-page">Partners Page</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="accountId" 
                        placeholder="ID입력" 
                        className="login-input" 
                        value={formData.accountId} 
                        onChange={handleChange} 
                    />
                    <div className="password-container">
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="password"
                            placeholder="비밀번호 입력" 
                            className="login-input" 
                            value={formData.password} 
                            onChange={handleChange} 
                        />
                    </div>
                    <label className="checkbox-container">
                        <input 
                            type="checkbox" 
                            id="show-password-checkbox" 
                            checked={passwordVisible} 
                            onChange={togglePasswordVisibility}
                        />
                        <span className="custom-checkbox"></span>
                        <span className="checkbox-label">
                            비밀번호 보기
                        </span>
                    </label>
                    <button type="submit" className="login-button">다음으로</button>
                </form>
                <div className="links-container">
                    <div className="link-row">
                        <a href="#signup" className="login-link">오퍼레이터 가입하기</a>
                        <a href="#find-id-password" className="login-link">| ID/비밀번호 찾기</a>
                    </div>
                    <a href="#contact" className="login-link login-link-contact">문의하기</a>
                </div>
            </div>
        </div>
    );
}

export default Adminpageunlogin;
