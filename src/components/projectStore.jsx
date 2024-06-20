import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import useProjectStore from "../store/useProjectStore";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import AssignUsersModal from "../components/assignmentUser";

const ProjectComponent = () => {
  const { projects, fetchProjects, updateProject, deleteProject } =
    useProjectStore();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9; // Items per page
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignUsersModal, setShowAssignUsersModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  const handleOpenUpdateModal = (project) => {
    setSelectedProject(project);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedProject({});
    setShowUpdateModal(false);
  };

  const handleOpenDeleteModal = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedProject({});
    setShowDeleteModal(false);
  };

  const handleDeleteProject = () => {
    deleteProject(selectedProject._id);
    handleCloseDeleteModal();
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    updateProject(selectedProject._id, selectedProject);
    handleCloseUpdateModal();
  };

  const handleOpenAssignUsersModal = (project) => {
    setSelectedProject(project);
    setShowAssignUsersModal(true);
  };

  const handleCloseAssignUsersModal = () => {
    setSelectedProject({});
    setShowAssignUsersModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <ul className="projectList">
        {Array.isArray(currentProjects) &&
          currentProjects.map((project) => (
            <li key={project._id} className="projectListUl bg-yellow-400">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {project.Nombre}
                </h2>
                <p className="text-gray-900 font-semibold">{project.Descripcion}</p>
                <p className="text-gray-900 font-semibold">
                  Desde el {formatDate(project.FechaInicio)}
                </p>
                <p className="text-gray-900 font-semibold">
                  Hasta el {formatDate(project.FechaFin)}
                </p>
              </div>
              <div>
                <Button
                  className="w-24 hover:bg-gray-400"
                  color="light"
                  onClick={() => handleOpenUpdateModal(project)}
                >
                  Editar
                </Button>
                <Button
                  className="w-24 hover:bg-red-900"
                  color="failure"
                  onClick={() => handleOpenDeleteModal(project)}
                >
                  Eliminar
                </Button>
                <Link to={`/dashboard/project/${project._id}`}>
                  <Button className="w-24 bg-green-700 hover:bg-green-900">Tareas</Button>
                </Link>
                <Link to={`/dashboard/project/${project._id}/assign-users`}>
                  <Button className="w-24 bg-indigo-700 hover:bg-indigo-900">Usuarios</Button>
                </Link>

              </div>
            </li>
          ))}
      </ul>
      
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition duration-300 disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={`page-${index + 1}`}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1 ? "bg-yellow-700" : "bg-yellow-500"
            } text-white rounded hover:bg-yellow-700 transition duration-300`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition duration-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-4">
            <div className="bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Project
                </h3>
                <button
                  onClick={handleCloseUpdateModal}
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleUpdateProject} className="p-4 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={selectedProject.Nombre}
                    onChange={(e) =>
                      setSelectedProject({
                        ...selectedProject,
                        Nombre: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type project name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripción
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={selectedProject.Descripcion}
                    onChange={(e) =>
                      setSelectedProject({
                        ...selectedProject,
                        Descripcion: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type project description"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="start-date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fecha Inicio
                  </label>
                  <input
                    type="date"
                    name="start-date"
                    id="start-date"
                    value={selectedProject.FechaInicio}
                    onChange={(e) =>
                      setSelectedProject({
                        ...selectedProject,
                        FechaInicio: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="end-date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fecha Fin
                  </label>
                  <input
                    type="date"
                    name="end-date"
                    id="end-date"
                    value={selectedProject.FechaFin}
                    onChange={(e) =>
                      setSelectedProject({
                        ...selectedProject,
                        FechaFin: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                  Update Project
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <Modal
          show={showDeleteModal}
          size="md"
          onClose={handleCloseDeleteModal}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estás seguro que quieres eliminar este proyecto?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={handleDeleteProject}
                >
                  Sí, estoy seguro
                </Button>
                <Button
                  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                  onClick={handleCloseDeleteModal}
                >
                  No, cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {showAssignUsersModal && (
        <AssignUsersModal
          show={showAssignUsersModal}
          onClose={handleCloseAssignUsersModal}
          projectId={selectedProject._id}
        />
      )}
    </div>
  );
};

export default ProjectComponent;
