import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import BusinessLeads from "./pages/BusinessLeads/BusinessLeads";
import LeadVerification from "./pages/LeadVerification/LeadVerification";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className={collapsed ? "main collapsed-main" : "main"}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business-leads" element={<BusinessLeads />} />
          <Route path="/lead-verification" element={<LeadVerification />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;