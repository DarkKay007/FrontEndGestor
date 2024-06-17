import React, { useEffect, useState } from 'react';
import { Button, Modal, TextInput, Label } from 'flowbite-react';
import useProjectStore from '../store/useProjectStore';
import { Link } from 'react-router-dom';

const ProjectComponent = () => {
  const { projects, fetchProjects, updateProject, deleteProject } = useProjectStore();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3; // Items per page
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
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
  const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  const handleOpenUpdateModal = (project) => {
    setSelectedProject(project);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedProject(null);
    setShowUpdateModal(false);
  };

  const handleOpenDeleteModal = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedProject(null);
    setShowDeleteModal(false);
  };

  const handleDeleteProject = () => {
    deleteProject(selectedProject._id);
    handleCloseDeleteModal();
  };

  const handleUpdateProject = () => {
    updateProject(selectedProject._id, selectedProject);
    handleCloseUpdateModal();
  };

  return (
    <div className="container mx-auto p-4">
      <ul className="projectList">
        {Array.isArray(currentProjects) &&
          currentProjects.map((project) => (
            <li key={project._id} className="projectListUl bg-yellow-400">
              <div>
                <h2 className="text-lg font-semibold text-white">{project.Nombre}</h2>
                <p className="text-gray-900">{project.Descripcion}</p>
                <p className="text-gray-900">Desde el {formatDate(project.FechaInicio)}</p>
                <p className="text-gray-900">Hasta el {formatDate(project.FechaFin)}</p>
              </div>
              <div>
                <Button className="w-24" color="light" onClick={() => handleOpenUpdateModal(project)}>
                  Editar
                </Button>
                <Button className="w-24" color="failure" onClick={() => handleOpenDeleteModal(project)}>
                  Eliminar
                </Button>
                <Link to={`/dashboard/project/${project._id}`}>
                  <Button className="w-24 bg-green-700" >
                    Tareas
                  </Button>
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
              currentPage === index + 1 ? 'bg-yellow-700' : 'bg-yellow-500'
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
        <Modal show={showUpdateModal} onClose={handleCloseUpdateModal}>
          <Modal.Header className="bg-gray-900 text-yellow-500">Update Project</Modal.Header>
          <Modal.Body className="bg-gray-800">
            <div className="space-y-4">
              <Label className="text-white">Nombre</Label>
              <TextInput
                placeholder="Nombre"
                value={selectedProject?.Nombre}
                onChange={(e) => setSelectedProject({ ...selectedProject, Nombre: e.target.value })}
                color="dark"
              />
              <Label className="text-white">Descripcion</Label>
              <TextInput
                placeholder="Descripcion"
                value={selectedProject?.Descripcion}
                onChange={(e) => setSelectedProject({ ...selectedProject, Descripcion: e.target.value })}
                color="dark"
              />
              <Label className="text-white">Fecha Inicio</Label>
              <TextInput
                type="date"
                placeholder="yyyy-MM-dd"
                value={selectedProject?.FechaInicio}
                onChange={(e) => setSelectedProject({ ...selectedProject, FechaInicio: e.target.value })}
                color="dark"
              />
              <Label className="text-white">Fecha Fin</Label>
              <TextInput
                type="date"
                placeholder="yyyy-MM-dd"
                value={selectedProject?.FechaFin}
                onChange={(e) => setSelectedProject({ ...selectedProject, FechaFin: e.target.value })}
                color="dark"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-900">
            <Button onClick={handleUpdateProject} className="bg-yellow-500 text-black">
              Update
            </Button>
            <Button onClick={handleCloseUpdateModal} color="gray">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal show={showDeleteModal} onClose={handleCloseDeleteModal}>
          <Modal.Header className="bg-gray-900 text-yellow-500">Delete Project</Modal.Header>
          <Modal.Body className="bg-gray-800 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure?</h3>
            <Button onClick={handleDeleteProject} className="bg-red-600 hover:bg-red-800 text-white">
              Yes, I'm sure
            </Button>
            <Button onClick={handleCloseDeleteModal} color="gray" className="ml-3">
              No, cancel
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ProjectComponent;
