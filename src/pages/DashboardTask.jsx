import React from 'react';
import { useParams } from 'react-router-dom';
import NavLinks from "../components/nav-links";
import { IoSettings } from "react-icons/io5";
import "../styles/dashboard.css";
import ProjectManagement from "../components/projectManager";
import TaskForm from "../components/taskform";
import useTaskStore from "../store/taskStore";

function DashboardTask() {
  const { projectId } = useParams();
  const { addTask } = useTaskStore();

  return (
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
        <NavLinks />
      </div>
      <div className="main-dashboard-settings">
        <TaskForm projectId={projectId} addTask={addTask} />
      </div>
      <div className="main-dashboard">
        <ProjectManagement />
      </div>
    </div>
  );
}

export default DashboardTask;
