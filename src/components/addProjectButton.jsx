import React, { useState } from 'react';
import useProjectStore from '../store/useProjectStore';
import {getUserIdFromToken} from '../utils/auth';

const AddProjectButton = () => {
  const { addProject } = useProjectStore();
  const [newProject, setNewProject] = useState({ Nombre: '', Descripcion: '', FechaInicio: '', FechaFin: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState(null);

  const handleAddProject = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    if (newProject.FechaInicio < today || newProject.FechaFin < today) {
      setError('Las fechas no pueden ser anteriores a la fecha actual.');
      return;
    }
    const userId = getUserIdFromToken();
    if (!userId) {
      setError('No se pudo obtener el ID del usuario.');
      return;
    }
    const projectToAdd = { ...newProject, Creador: userId, Asignados: [userId] };

    setError(null);
    addProject(projectToAdd);
    setNewProject({ Nombre: '', Descripcion: '', FechaInicio: '', FechaFin: '' });
    setShowAddModal(false);
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setError(null);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <button onClick={handleOpenAddModal} className="mb-4 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition">
        Add New Project
      </button>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-4">
            <div className="bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Agregar un nuevo proyecto
                </h3>
                <button onClick={handleCloseAddModal} type="button" className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddProject} className="p-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newProject.Nombre}
                    onChange={(e) => setNewProject({ ...newProject, Nombre: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type project name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={newProject.Descripcion}
                    onChange={(e) => setNewProject({ ...newProject, Descripcion: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type project description"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Inicio</label>
                  <input
                    type="date"
                    name="start-date"
                    id="start-date"
                    value={newProject.FechaInicio}
                    onChange={(e) => setNewProject({ ...newProject, FechaInicio: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                    min={today}
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Fin</label>
                  <input
                    type="date"
                    name="end-date"
                    id="end-date"
                    value={newProject.FechaFin}
                    onChange={(e) => setNewProject({ ...newProject, FechaFin: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                    min={today}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                  Add Project
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProjectButton;
