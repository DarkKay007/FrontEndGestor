// useProjectStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],
      assignedProjects: [],
      createdProjects: [],
      projectDetails: [], // Agregamos projectDetails como un arreglo inicialmente vacío
      token: localStorage.getItem("token") || null,
      isLoggedIn: !!localStorage.getItem("token"),
      user: localStorage.getItem("token")
        ? jwtDecode(localStorage.getItem("token"))
        : null,
      isAdmin: localStorage.getItem("token")
        ? jwtDecode(localStorage.getItem("token")).rol === "Administrador"
        : false,
        fetchProjects: async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
              "https://backend-2ktb.onrender.com/api/projects",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
        
            const projects = response.data;
            const user = get().user;
        
            if (user) {
              const isAdmin = user.rol === "Administrador";
              const assignedProjects = isAdmin
                ? projects
                : projects.filter((project) =>
                    project.assignedTo?.includes(user.id)
                  );
              const createdProjects = projects.filter(
                (project) => project.createdBy === user.id
              );
        
              console.log("User:", user); // Debug: Check user information
              console.log("Projects:", projects); // Debug: Check fetched projects
              console.log("Assigned Projects:", assignedProjects); // Debug: Check assigned projects
              console.log("Created Projects:", createdProjects); // Debug: Check created projects
        
              set({
                projects,
                assignedProjects,
                createdProjects,
                projectDetails: projects, // Inicializar projectDetails con los proyectos obtenidos
              });
            }
          } catch (error) {
            console.error("Error fetching projects:", error);
          }
        },
        
      addProject: async (projectData) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.post(
            "https://backend-2ktb.onrender.com/api/projects",
            projectData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const newProject = response.data;
          set((state) => ({
            projects: [...state.projects, newProject],
            createdProjects: [...state.createdProjects, newProject],
          }));
        } catch (error) {
          console.error("Error adding project:", error);
        }
      },

      updateProject: async (id, projectData) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(
            `https://backend-2ktb.onrender.com/api/projects/${id}`,
            projectData,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          const updatedProject = response.data;
          set((state) => ({
            projects: state.projects.map((project) =>
              project._id === id ? updatedProject : project
            ),
            assignedProjects: state.assignedProjects.map((project) =>
              project._id === id ? updatedProject : project
            ),
            createdProjects: state.createdProjects.map((project) =>
              project._id === id ? updatedProject : project
            ),
          }));
        } catch (error) {
          if (error.response) {
            // El servidor respondió con un código de estado que no está en el rango de 2xx
            console.error('Error updating project:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
          } else if (error.request) {
            // La solicitud se hizo pero no se recibió ninguna respuesta
            console.error('Error updating project: No response received', error.request);
          } else {
            // Algo pasó al configurar la solicitud que provocó un error
            console.error('Error updating project:', error.message);
          }
        }
      },
      

      deleteProject: async (id) => {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(
            `https://backend-2ktb.onrender.com/api/projects/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          set((state) => ({
            projects: state.projects.filter((project) => project._id !== id),
            assignedProjects: state.assignedProjects.filter(
              (project) => project._id !== id
            ),
            createdProjects: state.createdProjects.filter(
              (project) => project._id !== id
            ),
          }));
        } catch (error) {
          console.error("Error deleting project:", error);
        }
      },

      // Resto de las funciones del store

      assignUsersToProject:  async (projectId, userIds, action) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.put(
            `https://backend-2ktb.onrender.com/api/projects/${projectId}/assign`,
            { userIds, action }, // Incluyendo `action` en el cuerpo de la solicitud
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          // Actualizar el estado local después de asignar usuarios
          set((state) => ({
            projects: state.projects.map((project) =>
              project._id === projectId
                ? { ...project, assignedTo: action === 'assign' ? [...project.assignedTo, ...userIds] : project.assignedTo.filter(userId => !userIds.includes(userId)) }
                : project
            ),
            assignedProjects: state.assignedProjects.map((project) =>
              project._id === projectId
                ? { ...project, assignedTo: action === 'assign' ? [...project.assignedTo, ...userIds] : project.assignedTo.filter(userId => !userIds.includes(userId)) }
                : project
            ),
            projectDetails: state.projectDetails.map((project) =>
              project._id === projectId
                ? { ...project, assignedTo: action === 'assign' ? [...project.assignedTo, ...userIds] : project.assignedTo.filter(userId => !userIds.includes(userId)) }
                : project
            ),
          }));
      
          console.log("Usuarios asignados correctamente al proyecto:", response.data);
        } catch (error) {
          console.error("Error asignando usuarios al proyecto:", error);
          // Aquí podrías agregar manejo de errores más específico si es necesario
        }
      },
      
    }),
    {
      name: "project-storage",
    }
  )
);

export default useProjectStore;
