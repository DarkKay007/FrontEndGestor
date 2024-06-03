import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTaskStore from '../store/taskStore';
import TaskForm from './taskform';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, Button } from 'flowbite-react';

const ProjectManagement = () => {
  const { projectId } = useParams();
  const { proyectos, fetchProjects, addTask, tasks, fetchTasks, updateTaskStatus } = useTaskStore();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

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

  const handleTaskFormToggle = () => {
    setShowTaskForm(!showTaskForm);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTaskStatusChange = (taskId, currentStatus) => {
    const newStatus = currentStatus === 'En Curso' ? 'Completada' : 'En Curso';
    updateTaskStatus(taskId, newStatus);
    setShowTaskDetails(false);
  };

  const tileContent = ({ date, view }) => {
    const tasksForDate = tasks.filter((task) => {
      const taskDate = new Date(task.Fecha);
      return taskDate.getDate() === date.getDate() && taskDate.getMonth() === date.getMonth() && taskDate.getFullYear() === date.getFullYear();
    });

    if (tasksForDate.length > 0) {
      return (
        <div>
          {tasksForDate.map((task) => (
            <div key={task._id}>{task.Nombre}</div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-full flex flex-col items-center">
      {selectedProject && (
        <div className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">{selectedProject.Nombre} Management</h2>
          <p className="text-gray-700 mb-4">{selectedProject.Descripcion}</p>
          <h4 className="text-xl font-bold mb-4">Tasks</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.filter((task) => task.ID_Proyecto === selectedProject._id).map((task) => (
              <div
                key={task._id}
                className="task-card bg-white p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                <h5 className="text-lg font-bold">{task.Nombre}</h5>
              </div>
            ))}
          </div>
          <Button color="blue" onClick={handleTaskFormToggle} className="mt-4">Add Task</Button>
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
        </div>
      )}

    
      {selectedTask && (
        <Modal show={showTaskDetails} onClose={() => setShowTaskDetails(false)}>
          <Modal.Header>{selectedTask.Nombre}</Modal.Header>
          <Modal.Body>
            <p><strong>Description:</strong> {selectedTask.Descripcion}</p>
            <p><strong>Start Date:</strong> {new Date(selectedTask.FechaInicio).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(selectedTask.FechaFin).toLocaleDateString()}</p>
            <div className="flex items-center mt-4">
              <label htmlFor="taskStatus" className="mr-2">Estado:</label>
              <button
                id="taskStatus"
                onClick={() => handleTaskStatusChange(selectedTask._id, selectedTask.Estado)}
                className={`p-2 rounded-lg ${selectedTask.Estado === 'Completada' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
              >
                {selectedTask.Estado}
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setShowTaskDetails(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ProjectManagement;
