import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate
import useProjectStore from '../store/useProjectStore';
import useUserStore from '../store/userStore';
import Select from 'react-select';
import { Button } from 'flowbite-react';

const AssignUsersPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projectDetails, assignUsersToProject } = useProjectStore();
  const { userList, fetchUserList } = useUserStore();
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserList();
    const usersAssigned =
      projectDetails.find((project) => project._id === projectId)?.assignedTo || [];
    setAssignedUsers(usersAssigned);
  }, [projectId, fetchUserList, projectDetails]);

  const handleAssignUsers = async () => {
    try {
      await assignUsersToProject(projectId, selectedUsers, 'assign');
      setAssignedUsers([...assignedUsers, ...selectedUsers]);
      handleCloseModal();
    } catch (error) {
      console.error('Error asignando usuarios al proyecto:', error);
      setError('Error asignando usuarios');
    }
  };
  
  const handleUnassignUsers = async (userId) => {
    try {
      await assignUsersToProject(projectId, [userId], 'unassign');
      setAssignedUsers(assignedUsers.filter((id) => id !== userId));
    } catch (error) {
      console.error('Error desasignando usuarios:', error);
      setError('Error desasignando usuarios');
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
  };

  const handleUserSelection = (selectedOptions) => {
    setSelectedUsers(selectedOptions.map(option => option.value));
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = userList.filter((user) =>
    user.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackClick = () => {
    history.goBack(); // Usar history para navegar hacia atrás
  };

  return (
    <main className="container mx-auto p-4 min-h-full text-gold flex flex-col items-center">
      <div className="bg-gray-900 text-gold-500 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Gestión de Usuarios Asignados</h2>
          <Button
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate(-1)}
            >
              ← Back
            </Button>
        </div>
        <h4 className="text-2xl font-bold mb-4">Usuarios Asignados</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignedUsers.map((userId) => {
            const user = userList.find((user) => user._id === userId);
            return (
              <div
                key={userId}
                className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
              >
                <h1 className="text-lg font-semibold text-white">{user?.user}</h1>
                <div>
                  <button
                    onClick={() => handleUnassignUsers(userId)}
                    className="bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <button
            onClick={handleOpenModal}
            className="bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5"
          >
            Asignar Usuarios
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-4">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Asignar Usuarios
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
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
              <div className="p-4 space-y-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  placeholder="Buscar usuario"
                  className="w-full p-2 pl-10 text-sm text-gray-700"
                />
                <Select
                  isMulti
                  value={filteredUsers.filter(user => selectedUsers.includes(user._id)).map(user => ({ value: user._id, label: user.user }))}
                  onChange={handleUserSelection}
                  options={filteredUsers.map((user) => ({
                    value: user._id,
                    label: user.user,
                  }))}
                  className="w-full p-2 pl-10 text-sm text-gray-700"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-end">
                  <button
                    onClick={handleAssignUsers}
                    className="bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5"
                  >
                    Asignar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AssignUsersPage;
