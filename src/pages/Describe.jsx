
import "../css/pages/Admin.css";
import Background from '../components/Background';
import HeaderNav from "../components/HeaderNav";
import '../css/pages/Descibe.css';

function Describe() {
    return (
        <div className="container">
        <Background />
        <HeaderNav />
        <div className="description-content">
            <div className="icon">
            <img src="" alt="" />
            </div>
            <div className="computer-message">
            반가워요! 저는 Comatching AI 입니다. 커플매칭을 진행하기 전에, 먼저 당신에 대해 알아야 해요.
            </div>
            <div className="computer-message">
            간단한 MBTI 검사부터 시작할게요. 😊
            </div>
            <div className="computer-message">
            Q1. 당신은 사용자와 어떻게 상호작용 하시나요?
            </div>
            <button className="response-button">
            사교적이고 활발한 편이에요.
            </button>
        </div>
        </div>
    );
}

export default Describe;