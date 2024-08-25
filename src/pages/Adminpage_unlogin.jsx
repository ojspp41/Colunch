import React, { useState } from 'react';
import '../css/pages/Adminpage.css';

function Adminpageunlogin() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ id: '', password: '' });

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
            const response = await fetch('/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle successful response
                console.log('Login successful');
                // Redirect to Adminpage_login or change state to show login page
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
                        name="id" 
                        placeholder="ID입력" 
                        className="login-input" 
                        value={formData.id} 
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
