import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";
import ProgressNav from "../components/ProgressNav.jsx";
import Background from "../components/Background.jsx";
import SearchBar from "../components/SearchBar.jsx";
import hobbyData from "../data/hobbyData.js";
import "../css/pages/Hobby.css";

function Hobby() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState); 
  const [pickHobby, setPickHobby] = useRecoilState(userState);

  const handleSubmit = () => {
    if (pickHobby.hobby.length < 1) {
      alert("관심사를 최소 1개 이상 선택해주세요.");
      return false;
    }
    setUser((prevUser) => ({
      ...prevUser,
      hobby: pickHobby.hobby,
    }));
    console.log(user);
    navigate("/userinfo");
  };

  const handleHobbyClick = (index) => {
    const isAlreadySelected = pickHobby.hobby.includes(index);
    const updatedHobbies = isAlreadySelected
      ? pickHobby.hobby.filter((hobby) => hobby !== index)
      : pickHobby.hobby.length < 5
      ? [...pickHobby.hobby, index]
      : pickHobby.hobby;

    setPickHobby((prevUser) => ({
      ...prevUser,
      hobby: updatedHobbies,
    }));
  };

  

  return (
    <div className="container">
      <Background/>
      <ProgressNav step={2}></ProgressNav>
      <div className="text-container">
        <div className="main-text">승원님의 관심사를 알려주세요.</div>
        <div className="sub-text">요즘 관심있는 것들을 3개 이상 선택해주세요. <br /> 최대 10개까지 선택할 수 있어요.</div>
      </div>
      <SearchBar/>
      <div className="hobby-container">
        {hobbyData.map((category, index) => (
            <div className="hobby-category" key={index}>
            <div className="hobby-category-title">{category.category}</div>
            <div className="hobby-list">
                {category.hobbies.map((hobby, index) => (
                <div key={index}
                className={`hobby-items ${
                  pickHobby.hobby.includes(hobby.name) ? "selected" : ""
                }`}
                onClick={() => handleHobbyClick(hobby.name)}>
                    <span className="hobby-emoji">{hobby.emoji} {hobby.name}</span>
                </div>
                ))}
            </div>
            </div>
        ))}
        </div>
        <button
            className={`submits-button ${
            pickHobby.hobby.length >= 1 ? "active" : "inactive"
            }`}
            onClick={pickHobby.hobby.length >= 1 ? handleSubmit : null}
            disabled={pickHobby.hobby.length < 1}
        >
            다음으로
        </button>
    </div>
  );
}

export default Hobby;