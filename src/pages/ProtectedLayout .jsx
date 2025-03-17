import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      alert("카카오 로그인을 다시 하세요");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {/* 보호된 영역 레이아웃 */}
      <Outlet />
    </>
  );
}

export default ProtectedLayout;
