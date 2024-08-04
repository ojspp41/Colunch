// import React from "react";
import { RecoilRoot } from "recoil";
import Mainpage from "./pages/Mainpage.jsx";
import Register from "./pages/Register.jsx";
import Hobbyform from "./pages/Hobbyform.jsx";
import Match from "./pages/Match.jsx";
import Matchresult from "./pages/Matchresult.jsx";
import Checkresult from "./pages/Checkresult.jsx";
import Admin from "./pages/Admin.jsx";
import AdminSelect from "./pages/AdminSelect.jsx";
import Loading from "./pages/Loading.jsx";
import Guide from "./pages/Guide.jsx";
import CodeReader from "./pages/CodeReader.jsx";
import ProfileBuilder from "./pages/ProfileBuilder.jsx";
import QRGenerator from "./pages/QRGenerator.jsx";
import Redirection from "./pages/RedirectionPage.jsx";
import OpenExternalBrowser from "./OpenExternalBrowser.jsx";
import Userinfo from "./pages/User_info_page.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./axiosConfig.jsx";

export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <OpenExternalBrowser />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hobby" element={<Hobbyform />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/match-result" element={<Matchresult />} />
            <Route path="/match" element={<Match />} />
            <Route path="/check-result" element={<Checkresult />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-select" element={<AdminSelect />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/code-reader" element={<CodeReader />} />
            <Route path="/QR-generator" element={<QRGenerator />} />
            <Route path="/profile-builder" element={<ProfileBuilder />} />
            <Route path="/redirection" element={<Redirection />} />
            <Route path="/userinfo" element={<Userinfo/>} />
            
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}
