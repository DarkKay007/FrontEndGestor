import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTaskStore from "../store/taskStore";
import { Modal, Button, TextInput, Label } from "flowbite-react";

const TaskManagement = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, fetchTasks, updateTask, deleteTask, fetchProjects } =
    useTaskStore();
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({
    Nombre: "",
    Descripcion: "",
    Estado: "En Curso",
    proyectoId: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, [fetchTasks, fetchProjects]);

  useEffect(() => {
    if (taskId) {
      const task = tasks.find((task) => task._id === taskId);
      setSelectedTask(task);
      if (task) {
        setTaskForm({
          Nombre: task.Nombre,
          Descripcion: task.Descripcion,
          Estado: task.Estado,
          proyectoId: task.proyectoId,
        });
      }
    }
  }, [tasks, taskId]);

  const handleTaskEstadoChange = () => {
    if (selectedTask) {
      const newEstado =
        selectedTask.Estado === "En Curso" ? "Completada" : "En Curso";
      updateTask(selectedTask._id, { Estado: newEstado });
      setShowTaskForm(false);
    }
  };

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskFormSubmit = async (e) => {
    e.preventDefault();
    if (taskForm._id) {
      await updateTask(taskForm._id, taskForm);
    } else {
      await updateTask(selectedTask._id, taskForm);
    }
    setShowTaskForm(false);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    navigate(-1)
  };

  return (
    <div className="container mx-auto p-4 min-h-screen text-gold flex flex-col items-center justify-center">
      {selectedTask && (
     <div className="bg-gray-900 text-gold-500 p-6 rounded-lg shadow-md w-screen max-w-2xl relative">
     <Button
       className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 mt-2 mr-2"
       onClick={() => navigate(-1)}
       >
       ← Back
     </Button>
     <h2 className="text-3xl font-bold mb-4">{selectedTask.Nombre}</h2>
     <h2 className="text-2xl font-bold mb-4">Descripcion:</h2>
     <p className="text-gray-100 font-bold mb-4">
       {selectedTask.Descripcion}
     </p>
     <p className="text-gray-100 font-bold mb-4">
       Desde el: {selectedTask.FechaInicio}
     </p>
     <p className="text-gray-100 font-bold mb-4">
       Hasta el: {selectedTask.FechaFin}
     </p>
   
     <Button
       className={`bg-${
         selectedTask.Estado === "En Curso" ? "yellow-400" : "green-600"
       }
        hover:bg-${
          selectedTask.Estado === "En Curso" ? "yellow-500" : "green-700"
        }
        text-white font-bold py-2 px-4 rounded w-full mb-2`}
       onClick={() => handleTaskEstadoChange()}
     >
       {selectedTask.Estado === "En Curso"
         ? "Marca para completar"
         : selectedTask.Estado}
     </Button>
     <Button
       className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2"
       onClick={() => setShowTaskForm(true)}
     >
       Edit Task
     </Button>
     <Button
       className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full"
       onClick={() => handleDeleteTask(selectedTask._id)}
       
     >
       Delete Task
     </Button>
   </div>
      )}

      <Modal show={showTaskForm} onClose={() => setShowTaskForm(false)}>
        <Modal.Header>Edit Task</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleTaskFormSubmit}>
            <div className="mb-4">
              <Label htmlFor="Nombre" value="Task Name" />
              <TextInput
                id="Nombre"
                name="Nombre"
                value={taskForm.Nombre}
                onChange={handleTaskFormChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="Descripcion" value="Task Description" />
              <TextInput
                id="Descripcion"
                name="Descripcion"
                value={taskForm.Descripcion}
                onChange={handleTaskFormChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-gold text-black hover:bg-gold-dark w-full"
            >
              Save Task
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskManagement;
