import React from "react";
import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";
import { isAdmin, isUser, hasNoToken } from "../utils/auth";
import "../styles/dashboard.css";
import AccesoDenegado from "../components/accesoDenegado";
import ReportPage from "../components/reportPage";

function Dashboard() {
  return (
    <div className="container-dashboard">
      <div className="header-dashboard">
        <div className="ico-dashboard">
        </div>
        <div className="settings-dashboard">
          <IoSettings size={24} />
        </div>
      </div>
      <div className="nav-dashboard">
        <NavLinks />
      </div>
      <div className="main-dashboard-settings"></div>
      {isAdmin() ? (
        <div className="main-dashboard">
          <h2>Welcome Admin!</h2>
          <p>Here you can manage users, view reports, and configure settings.</p>
        </div>
      ) : isUser() ? (
        <div className="main-dashboard">
          <h2>Welcome User!</h2>
          <p>Here you can view your profile, manage your settings, and more.</p>
          {/* Aquí puedes añadir más componentes específicos para el usuario */}
        </div>
      ) : hasNoToken() ? (
        <AccesoDenegado />
      ) : null}
    </div>
  );
}

export default Dashboard;
