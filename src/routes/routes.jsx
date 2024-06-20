// src/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/pageLogin';
import Dashboard from '../pages/dashboard';
import DashboardUsers from '../pages/dashboardUsers';
import DashboardProject from '../pages/dashboardProjects';
import DashboardTask from '../pages/DashboardTask';
import Page404 from '../pages/404';
import DashboardAssignment from '../pages/dashboardAssignment';
import Profile from '../pages/profile';
import TaskManagement from '../components/taskManagement ';
import AssignUsersPage from '../components/assignmentUser';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/UserList" element={<DashboardUsers />} />
      <Route path="/dashboard/ProjectManagement" element={<DashboardProject />} />

      <Route path="/dashboard/Assignment" element={<DashboardAssignment />} />
      <Route path="/dashboard/project/:projectId" element={<DashboardTask/>}/>
      <Route path="/dashboard/task/:taskId" element={<TaskManagement />} />
      <Route path="/dashboard/project/:projectId/assign-users" element={<AssignUsersPage />} />

      <Route path="/logout" element={<Profile/>} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
