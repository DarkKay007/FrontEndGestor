import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";
import "../styles/dashboard.css";
import ProjectManagement from "../components/projectManager";
import { Link } from "react-router-dom";
import { GiReturnArrow } from "react-icons/gi";

function DashboardTask() {
  return (
    <>
      <div className="container-dashboard">
        <div className="header-dashboard">
          <div className="ico-dashboard"></div>
          <h1>Dashboard</h1>
          <div className="settings-dashboard">
            <h1>
              <IoSettings />
            </h1>
          </div>
        </div>
        <div className="nav-dashboard">
          <NavLinks></NavLinks>
        </div>
        <div className="main-dashboard-settings">
          <Link
            to={"/dashboard/ProjectManagement"}
            className="sidebar-link px-4 py-2 text-2x2  text-yellow-400 pl-11 pr-11  rounded-xl   border border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
          >
            <GiReturnArrow  />
          </Link>
        </div>
        <div className="main-dashboard">
          <ProjectManagement />
        </div>
      </div>
    </>
  );
}

export default DashboardTask;
