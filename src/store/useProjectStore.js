import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],
      assignedProjects: [],
      createdProjects: [],
      token: localStorage.getItem('token') || null,
      isLoggedIn: !!localStorage.getItem('token'),
      user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
      isAdmin: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).rol === 'Administrador' : false,

      fetchProjects: async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('https://backend-2ktb.onrender.com/api/projects', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          const projects = response.data;

          set((state) => {
            const user = state.user;

            if (user) {
              const isAdmin = user.rol === 'Administrador';

              if (isAdmin) {
                return {
                  projects,
                  assignedProjects: projects, // Administradores ven todos los proyectos asignados
                  createdProjects: projects.filter(project => project.createdBy === user.id),
                };
              } else {
                const assignedProjects = projects.filter(project => project.assignedTo?.includes(user.id));
                const createdProjects = projects.filter(project => project.createdBy === user.id);

                return {
                  projects,
                  assignedProjects,
                  createdProjects,
                };
              }
            }

            return {
              projects,
              assignedProjects: [],
              createdProjects: [],
            };
          });
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      },

      addProject: async (projectData) => {
        try {
          const response = await axios.post('https://backend-2ktb.onrender.com/api/projects', projectData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          set((state) => ({
            projects: [...state.projects, response.data],
            createdProjects: [...state.createdProjects, response.data],
          }));
        } catch (error) {
          console.error('Error adding project:', error);
        }
      },

      updateProject: async (id, projectData) => {
        try {
          await axios.put(`https://backend-2ktb.onrender.com/api/projects/${id}`, projectData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          set((state) => ({
            projects: state.projects.map((project) =>
              project._id === id ? { ...project, ...projectData } : project
            ),
            assignedProjects: state.assignedProjects.map((project) =>
              project._id === id ? { ...project, ...projectData } : project
            ),
            createdProjects: state.createdProjects.map((project) =>
              project._id === id ? { ...project, ...projectData } : project
            ),
          }));
        } catch (error) {
          console.error('Error updating project:', error);
        }
      },

      deleteProject: async (id) => {
        try {
          await axios.delete(`https://backend-2ktb.onrender.com/api/projects/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          set((state) => ({
            projects: state.projects.filter((project) => project._id !== id),
            assignedProjects: state.assignedProjects.filter((project) => project._id !== id),
            createdProjects: state.createdProjects.filter((project) => project._id !== id),
          }));
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      },

      loginUser: async (user, password) => {
        try {
          const response = await axios.post('https://backend-2ktb.onrender.com/api/login', { user, password });
          const newToken = response.data.token;
          localStorage.setItem('token', newToken);
          const decodedToken = jwtDecode(newToken);
          set({
            token: newToken,
            isLoggedIn: true,
            user: decodedToken,
            isAdmin: decodedToken.rol === 'Administrador',
          });
        } catch (error) {
          console.error('Error logging in:', error);
        }
      },

      logoutUser: () => {
        localStorage.removeItem('token');
        set({ token: null, isLoggedIn: false, user: null, isAdmin: false });
      },
    }),
    {
      name: 'project-storage',
    }
  )
);

export default useProjectStore;
