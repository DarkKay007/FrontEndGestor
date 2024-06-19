import React, { useState } from "react";
import { Card, Dropdown, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import useUserStore from "../store/userStore";
import { jsPDF } from "jspdf";

export function ProfileCard({ user }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [newRole, setNewRole] = useState(user.rol);
  const [comment, setComment] = useState("");
  const { deleteUser, updateUser } = useUserStore();

  const handleDelete = () => {
    deleteUser(user._id);
    setOpenDeleteModal(false);
  };

  const handleRoleChange = () => {
    updateUser(user._id, { ...user, rol: newRole });
    setOpenRoleModal(false);
  };

  const handleGeneratePDF = () => {
    const pdf = new jsPDF();

    // Add background color
    pdf.setFillColor(240, 248, 255); // Light blue background
    pdf.rect(
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height,
      "F"
    );

    // Add avatar
    const avatarUrl = `https://unavatar.io/github/${user.user}`;
    const img = new Image();
    img.src = avatarUrl;
    img.onload = () => {
      pdf.setFillColor(255, 255, 255); // White background for avatar section
      pdf.roundedRect(10, 10, 190, 40, 5, 5, "F");
      pdf.addImage(img, "PNG", 15, 15, 30, 30);

      // Add header
      pdf.setFontSize(18);
      pdf.setTextColor(33, 37, 41); // Dark text color
      pdf.text(`User Profile`, 50, 25);

      // Add user info box
      pdf.setFillColor(255, 255, 255); 
      pdf.roundedRect(10, 60, 190, 80, 5, 5, "F");

      pdf.setFontSize(12);
      pdf.setTextColor(33, 37, 41);
      pdf.text(`ID: ${user._id}`, 15, 75);
      pdf.text(`Nombre: ${user.name}`, 15, 85);
      pdf.text(`Usuario: ${user.user}`, 15, 95);
      pdf.text(`Email: ${user.email}`, 15, 105);
      pdf.text(`Rol: ${user.rol}`, 15, 115);
      pdf.text(
        `Fecha de Creación: ${new Date(user.date_create).toLocaleDateString()}`,
        15,
        125
      );

      // Add comment if provided
      if (comment) {
        pdf.setFontSize(12);
        pdf.setTextColor(33, 37, 41);
        pdf.text(`Comentario: ${comment}`, 15, 160);
      }

      // Add footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150); // Light grey text color
      pdf.text(
        `Generated on: ${new Date().toLocaleDateString()}`,
        10,
        pdf.internal.pageSize.height - 10
      );

      // Save PDF
      pdf.save(`user_profile_${user.user}.pdf`);
    };
  };

  return (
    <>
      <Card className="w-80 h-74 bg-yellow-400 rounded-xl hover:bg-yellow-200">
        <div className="flex text-gray-900 justify-end p-2">
          <Dropdown inline label={<span className="material-icons"></span>}>
            <Dropdown.Item
              className="text-gray-100 bg-green-600 hover:bg-green-900"
              onClick={() => setOpenRoleModal(true)}
            >
              Cambiar Rol
            </Dropdown.Item>
            <Dropdown.Item
              className="text-gray-100 bg-red-600 hover:bg-red-900"
              onClick={() => setOpenDeleteModal(true)}
            >
              Eliminar
            </Dropdown.Item>
            <Dropdown.Item
              className="text-gray-100 bg-indigo-600 hover:bg-indigo-900"
              onClick={() => setOpenCommentModal(true)}
            >
              Generar PDF
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            alt={user.name}
            src={`https://unavatar.io/github/${user.user}`}
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <span className="text-sm text-gray-900 dark:text-gray-400">
            {user.email}
          </span>
          <span className="text-sm text-gray-900 dark:text-gray-400">
            {user.rol}
          </span>
        </div>
      </Card>

      <Modal
        show={openDeleteModal}
        size="md"
        onClose={() => setOpenDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estás seguro que quieres eliminar este usuario?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleDelete}
              >
                Sí, estoy seguro
              </Button>
              <Button
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                onClick={() => setOpenDeleteModal(false)}
              >
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openRoleModal}
        size="md"
        onClose={() => setOpenRoleModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-900 dark:text-gray-900">
              Cambiar Rol de Usuario
            </h3>
            <div className="flex flex-col items-center gap-4">
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="form-select mt-1 block w-full py-2 px-3 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              >
                <option value="Usuario">Usuario</option>
                <option value="Administrador">Administrador</option>
              </select>
              <Button
                onClick={handleRoleChange}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Cambiar Rol
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openCommentModal}
        size="md"
        onClose={() => setOpenCommentModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-900 dark:text-gray-900">
              Añadir Comentario
            </h3>
            <div className="flex flex-col items-center gap-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-textarea mt-1 block w-full py-2 px-3 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="Escribe tu comentario aquí"
              />
              <Button
                onClick={() => {
                  setOpenCommentModal(false);
                  handleGeneratePDF();
                }}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Generar PDF
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
