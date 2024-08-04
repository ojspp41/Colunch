import React, { useState } from 'react';
import Modal from 'react-modal';
import '../css/components/TermsAgreementModal.css';

Modal.setAppElement('#root');

const TermsAgreementModal = ({ isOpen, onRequestClose, handleSubmit, registerCheck, setRegisterCheck }) => {
    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setRegisterCheck(prevState => ({ ...prevState, [id]: checked }));
    };

    const handleSubmitClick = () => {
        if (!registerCheck.terms1 || !registerCheck.terms2 || !registerCheck.terms3) {
            alert('필수 항목을 모두 선택해주세요.');
            return;
        }
        handleSubmit(registerCheck);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Terms Agreement Modal"
            className="Modal"
            overlayClassName="Overlay"
        >
            <div className="modal-content">
                <div className="agreement-section">
                    <h3 className='agreement_title'>약관에 동의해주세요</h3>
                    <p className='agreement_sub'>여러분의 소중한 개인정보를 잘 지켜 드릴게요</p>
                    <ul className="agreement_desc">
                        <li>
                            <input type="checkbox" id="terms1" checked={registerCheck.terms1} onChange={handleCheckboxChange} />
                            <label htmlFor="terms1">이용약관 동의 </label>
                            <a href="/terms1" target="_blank" rel="noopener noreferrer" className="terms-link">
                                <img src="/assets/agreementtoggle.svg" alt="이용약관 확인" />
                            </a>
                        </li>
                        <li>
                            <input type="checkbox" id="terms2" checked={registerCheck.terms2} onChange={handleCheckboxChange} />
                            <label htmlFor="terms2">개인정보 수집 이용 동의 </label>
                            <a href="/terms2" target="_blank" rel="noopener noreferrer" className="terms-link">
                                <img src="/assets/agreementtoggle.svg" alt="개인정보 수집 이용 확인" />
                            </a>
                        </li>
                        <li>
                            <input type="checkbox" id="terms3" checked={registerCheck.terms3} onChange={handleCheckboxChange} />
                            <label htmlFor="terms3">만 14세 이상입니다 </label>
                        </li>
                        <li>
                            <input type="checkbox" id="terms4" checked={registerCheck.terms4} onChange={handleCheckboxChange} />
                            <label htmlFor="terms4">마케팅 정보 수신 동의 </label>
                        </li>
                    </ul>
                </div>
                <button className="agree-button" onClick={handleSubmitClick}>
                    모두 동의하고 가입하기
                </button>
            </div>
        </Modal>
    );
};

export default TermsAgreementModal;
