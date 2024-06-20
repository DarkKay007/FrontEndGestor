import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useTaskStore from "../store/taskStore";
import { Button } from "flowbite-react";

const ProjectManagement = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { proyectos, fetchProjects, tasks, fetchTasks } = useTaskStore();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const project = proyectos.find((project) => project._id === projectId);
    setSelectedProject(project);
    if (project) {
      fetchTasks(projectId);
    }
  }, [proyectos, projectId, fetchTasks]);

  return (
    <main className="container mx-auto p-4 min-h-full text-gold flex flex-col items-center">
      {selectedProject && (
        <div className="bg-gray-900 text-gold-500 p-6 rounded-lg shadow-md w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">
              {selectedProject.Nombre} Management
            </h2>
            <Button
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate(-1)}
            >
              ← Back
            </Button>
          </div>
          <p className="text-gray-100 font-bold mb-4">
            {selectedProject.Descripcion}
          </p>
          <h4 className="text-2xl font-bold mb-4">Tasks</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter((task) => task.ID_Proyecto === selectedProject._id)
              .map((task) => (
                <Link key={task._id} to={`/dashboard/task/${task._id}`}>
                  <Button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full mb-2">
                    <h5 className="text-lg font-bold">{task.Nombre}</h5>
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectManagement;
