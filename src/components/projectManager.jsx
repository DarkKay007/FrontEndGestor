import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTaskStore from '../store/taskStore';
import TaskForm from './taskform';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, Button } from 'flowbite-react';

const ProjectManagement = () => {
  const { projectId } = useParams();
  const { proyectos, fetchProjects, addTask, tasks, fetchTasks, updateTaskStatus, updateProject } = useTaskStore();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for update modal

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const project = proyectos.find(project => project._id === projectId);
    setSelectedProject(project);
    if (project) {
      fetchTasks(projectId);
    }
  }, [proyectos, projectId, fetchTasks]);

  const handleTaskFormToggle = () => {
    setShowTaskForm(prev => !prev);
  };

  const handleTaskClick = task => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleTaskStatusChange = (taskId, currentStatus) => {
    const newStatus = currentStatus === 'En Curso' ? 'Completada' : 'En Curso';
    updateTaskStatus(taskId, newStatus);
    setShowTaskDetails(false);
  };

  const handleOpenUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateProject = () => {
    // Call updateProject function from useTaskStore or relevant hook
    updateProject(selectedProject);
    setShowUpdateModal(false);
  };

  return (
    <div className="min-h-full flex flex-col items-center">
      {selectedProject && (
        <div className="w-full max-w-4xl bg-yellow-400 p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            {selectedProject.Nombre} Management
          </h2>
          <p className="text-gray-700 mb-4">{selectedProject.Descripcion}</p>
          <h4 className="text-xl font-bold mb-4">Tasks</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter(task => task.ID_Proyecto === selectedProject._id)
              .map(task => (
                <div
                  key={task._id}
                  className="task-card bg-white p-4 rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleTaskClick(task)}
                >
                  <h5 className="text-lg font-bold">{task.Nombre}</h5>
                </div>
              ))}
          </div>
          <Button color="blue" onClick={handleTaskFormToggle} className="mt-4">
            Add Task
          </Button>
          <Button color="green" onClick={handleOpenUpdateModal} className="mt-4 ml-2">
            Update Project
          </Button>
          <Modal show={showTaskForm} onClose={handleTaskFormToggle}>
            <Modal.Header>Add Task</Modal.Header>
            <Modal.Body>
              <TaskForm addTask={addTask} projectId={selectedProject._id} />
            </Modal.Body>
            <Modal.Footer>
              <Button color="gray" onClick={handleTaskFormToggle}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Update Project Modal */}
          {showUpdateModal && (
            <Modal show={showUpdateModal} onClose={handleCloseUpdateModal}>
              <Modal.Header className="bg-gray-900 text-yellow-500">Update Project</Modal.Header>
              <Modal.Body className="bg-gray-800">
                <div className="space-y-4">
                  <label className="text-white">Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={selectedProject?.Nombre}
                    onChange={(e) => setSelectedProject({ ...selectedProject, Nombre: e.target.value })}
                    className="bg-gray-700 text-white px-3 py-2 rounded-md"
                  />
                  <label className="text-white">Descripcion</label>
                  <input
                    type="text"
                    placeholder="Descripcion"
                    value={selectedProject?.Descripcion}
                    onChange={(e) => setSelectedProject({ ...selectedProject, Descripcion: e.target.value })}
                    className="bg-gray-700 text-white px-3 py-2 rounded-md"
                  />
                  <label className="text-white">Fecha Inicio</label>
                  <input
                    type="date"
                    placeholder="yyyy-MM-dd"
                    value={selectedProject?.FechaInicio}
                    onChange={(e) => setSelectedProject({ ...selectedProject, FechaInicio: e.target.value })}
                    className="bg-gray-700 text-white px-3 py-2 rounded-md"
                  />
                  <label className="text-white">Fecha Fin</label>
                  <input
                    type="date"
                    placeholder="yyyy-MM-dd"
                    value={selectedProject?.FechaFin}
                    onChange={(e) => setSelectedProject({ ...selectedProject, FechaFin: e.target.value })}
                    className="bg-gray-700 text-white px-3 py-2 rounded-md"
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
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
