import { MdAssignmentLate } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { GrProjects } from "react-icons/gr";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
/**
 * ! Iconos
 */
import { isAdmin, isUser, hasNoToken } from "../utils/auth";
import React from "react";
import "../styles/navBar.css";
import AccesoDenegado from "./accesoDenegado";
const NavLinks = () => {
  return (
    <div className="navBar-content h-full">
      {isAdmin() ? (
        <>
          <Link
            to={"/logout"}
            className="sidebar-link px-4 py-2 text-2x2 text-yellow-400 pl-11 pr-11  rounded-tl-xl rounded-bl-xl  border-t border-l border-b border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
          >
            <IoLogIn />
          </Link>
          <Link
            to={"/dashboard"}
            className="sidebar-link px-4 py-2 text-2x2 text-yellow-400 pl-11 pr-11   border-t  border-b border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
          >
            <FaHome />
          </Link>
          <Link
            to={"/dashboard/UserList"}
            className="sidebar-link px-4 py-2 text-2x2  text-yellow-400 pl-11 pr-11   border-t border-b border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
          >
            <PiUserListBold />
          </Link>
          <Link
            to={"/dashboard/ProjectManagement"}
            className="sidebar-link px-4 py-2 text-2x2  text-yellow-400 pl-11 pr-11 border-r rounded-r-xl   border-t border-b border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
          >
            <GrProjects />
          </Link>
        </>
      ) : isUser() ? (
        <>
          <Link
            to={"/logout"}
            className="sidebar-link px-4 py-2 text-2x2 text-yellow-400 pl-11 pr-11  rounded-tl-xl rounded-bl-xl  border-t border-l border-b border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
          >
            <IoLogIn />
          </Link>
          <Link
            to={"/dashboard"}
            className="sidebar-link px-4 py-2 text-2x2 text-yellow-400 pl-11 pr-11   border-t  border-b border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
          >
            <FaHome />
          </Link>

          <Link
            to={"/dashboard/ProjectManagement"}
            className="sidebar-link px-4 py-2 text-2x2  text-yellow-400 pl-11 pr-11   border-t border-b border-r rounded-r-xl border-gray-200 hover:bg-gray-700 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 "
          >
            <GrProjects />
          </Link>
        </>
      ) : hasNoToken() ? (
        <>
          <AccesoDenegado></AccesoDenegado>
        </>
      ) : null}
    </div>
  );
};
export default NavLinks;
