import React, { useState, useEffect } from "react";
import useProfileStore from "../store/profileStore";
import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";
import { isAdmin, isUser, hasNoToken, isTokenExpired } from "../utils/auth";
import AccesoDenegado from "../components/accesoDenegado";
import TokenExpirado from "../components/tokenExpirado";
import LoadingSpinner from "../components/loadingSpinner";
import "../styles/dashboard.css";

function Dashboard() {
  const { user, isLoading, fetchUser } = useProfileStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  if (isLoading) return <LoadingSpinner />;
  if (!user) return <p>User not found</p>;

  return (
    <div className="container-dashboard">
      <div className="header-dashboard">
        <div className="ico-dashboard"></div>
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
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">
              Bienvenido <span className="text-yellow-500">{user.rol}</span>:{" "}
              {user.user}!
            </h1>
          </div>
        </div>
      ) : isUser() ? (
        <div className="main-dashboard">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">
              Bienvenido <span className="text-yellow-500">{user.rol}</span>:{" "}
              {user.user}!
            </h1>
          </div>
        </div>
      ) : hasNoToken() ? (
        <AccesoDenegado />
      ) : isTokenExpired() ? (
        <TokenExpirado />
      ) : null}
    </div>
  );
}

export default Dashboard;
