import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import WorkspacePage from "./pages/WorkspacePage.jsx";
import LandingPage from './pages/LandingPage.jsx';

const App = () => {
  return (
   <div>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/workspace/:projectId" element={<WorkspacePage />} />
    </Routes>
   </div>
  )
}

export default App