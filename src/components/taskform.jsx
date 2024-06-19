import React, { useState } from 'react';
import useTaskStore from '../store/taskStore';

const TaskForm = ({ projectId }) => {
  const { addTask } = useTaskStore();
  const [newTask, setNewTask] = useState({ Nombre: '', Descripcion: '', FechaInicio: '', FechaFin: '', Estado: 'En Curso' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState(null);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    if (newTask.FechaInicio < today || newTask.FechaFin < today) {
      setError('Las fechas no pueden ser anteriores a la fecha actual.');
      return;
    }
    try {
      await addTask({ ...newTask, ID_Proyecto: projectId });
      setNewTask({ Nombre: '', Descripcion: '', FechaInicio: '', FechaFin: '', Estado: 'En Curso' });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Error adding task');
    }
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
      <button onClick={handleOpenAddModal} className="bg-yellow-500 text-black relative w-full max-w-md p-4 rounded hover:bg-yellow-600 transition">
        Add New Task
      </button>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-4">
            <div className="bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Agregar una nueva tarea
                </h3>
                <button onClick={handleCloseAddModal} type="button" className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddTask} className="p-4 space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newTask.Nombre}
                    onChange={(e) => setNewTask({...newTask, Nombre: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type task name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={newTask.Descripcion}
                    onChange={(e) => setNewTask({...newTask, Descripcion: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type task description"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Inicio</label>
                  <input
                    type="date"
                    name="start-date"
                    id="start-date"
                    value={newTask.FechaInicio}
                    onChange={(e) => setNewTask({...newTask, FechaInicio: e.target.value })}
                    className="bg-gray-50 border border-gray-300text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
                    value={newTask.FechaFin}
                    onChange={(e) => setNewTask({...newTask, FechaFin: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                    min={today}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-800">
                  Agregar nueva tarea
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskForm;
