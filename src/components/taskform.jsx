import React, { useState, useEffect } from "react";
import useTaskStore from "../store/taskStore";

const TaskForm = ({ addTask, projectId }) => {
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    FechaInicio: "",
    FechaFin: "",
    Estado: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ ...formData, ID_Proyecto: projectId });
    setFormData({
      Nombre: "",
      Descripcion: "",
      FechaInicio: "",
      FechaFin: "",
      Estado: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Nombre">Nombre:</label>
        <input
          type="text"
          id="Nombre"
          name="Nombre"
          value={formData.Nombre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Descripcion">Descripción:</label>
        <input
          type="text"
          id="Descripcion"
          name="Descripcion"
          value={formData.Descripcion}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="FechaInicio">Fecha Inicio:</label>
        <input
          type="date"
          id="FechaInicio"
          name="FechaInicio"
          value={formData.FechaInicio}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="FechaFin">Fecha Fin:</label>
        <input
          type="date"
          id="FechaFin"
          name="FechaFin"
          value={formData.FechaFin}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Estado">Estado:</label>
        <input
          type="text"
          id="Estado"
          name="Estado"
          value={formData.Estado}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
