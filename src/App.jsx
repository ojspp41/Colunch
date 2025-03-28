// import React from "react";
import { RecoilRoot } from "recoil";
import Mainpage from "./pages/Mainpage.jsx";
import Matchresult from "./pages/Matchresult.jsx";
import Loading from "./pages/Loading.jsx";

import Redirection from "./pages/RedirectionPage.jsx";
import OpenExternalBrowser from "./OpenExternalBrowser.jsx";
import Userinfo from "./pages/User_info_page.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainpageUnLogin from "./pages/MainpageUnLogin.jsx";
import MainpageLogin from "./pages/MainpageLogin.jsx";
import "./App.css";
import "./axiosConfig.jsx";
import ProtectedLayout from "./pages/ProtectedLayout .jsx";
import ProfileBuilder from "./pages/ProfileBuilder.jsx";
import Hobby from "./pages/Hobby.jsx";

export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <OpenExternalBrowser />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/loading" element={<Loading />} />
            {/* 보호된 경로 그룹 */}
            <Route element={<ProtectedLayout />}>
              <Route path="/hobby" element={<Hobby />} />
              <Route path="/userinfo" element={<Userinfo />} />
              <Route path="/profile-builder" element={<ProfileBuilder />} />
              <Route path="/loading" element={<Loading />} />
              <Route path="/match-result" element={<Matchresult />} />
            </Route>
            <Route path="/redirection" element={<Redirection />} />
            
            
          </Routes>

        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}
