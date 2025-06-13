import React, { useState, useEffect } from 'react';
import { userService } from '../services';

const UserCrudTest = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [isEditing, setIsEditing] = useState(false);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  // Función para cargar usuarios
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.getAllUsers();
      setUsers(result.users || []);
      console.log('✅ Usuarios cargados:', result);
    } catch (err) {
      setError(err);
      console.error('❌ Error al cargar usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener un usuario por ID
  const handleGetUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.getUserById(id);
      setSelectedUser(result.data);
      console.log('✅ Usuario obtenido:', result);
    } catch (err) {
      setError(err);
      console.error('❌ Error al obtener usuario:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un usuario
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await userService.createUser(formData);
      console.log('✅ Usuario creado:', result);
      loadUsers();
      resetForm();
    } catch (err) {
      setError(err);
      console.error('❌ Error al crear usuario:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar un usuario
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser?._id && !selectedUser?.id) return;

    setLoading(true);
    setError(null);
    try {
      const userId = selectedUser.id || selectedUser._id;
      const result = await userService.updateUser(userId, formData);
      console.log('✅ Usuario actualizado:', result);
      loadUsers();
      resetForm();
    } catch (err) {
      setError(err);
      console.error('❌ Error al actualizar usuario:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un usuario
  const handleDeleteUser = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

    setLoading(true);
    setError(null);
    try {
      const result = await userService.deleteUser(id);
      console.log('✅ Usuario eliminado:', result);
      loadUsers();
      if (selectedUser?._id === id) {
        setSelectedUser(null);
      }
    } catch (err) {
      setError(err);
      console.error('❌ Error al eliminar usuario:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para preparar el formulario para edición
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '', // No prellenamos la contraseña por seguridad
      role: user.role
    });
    setIsEditing(true);
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
    setSelectedUser(null);
    setIsEditing(false);
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Gestión de Usuarios</h2>
      
      {/* Formulario de Usuario */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">
          {isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        </h3>
        <form onSubmit={isEditing ? handleUpdateUser : handleCreateUser} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEditing ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!isEditing}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isEditing ? 'Actualizar' : 'Crear'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Estado de carga y errores */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Cargando...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error:</p>
          <p>{error.message || JSON.stringify(error)}</p>
        </div>
      )}

      {/* Lista de usuarios */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold">Lista de Usuarios</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditClick({ ...user, _id: user.id || user._id })}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id || user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detalles del usuario seleccionado */}
      {selectedUser && !isEditing && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Detalles del Usuario</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">ID</p>
              <p className="mt-1">{selectedUser.id || selectedUser._id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Nombre</p>
              <p className="mt-1">{selectedUser.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1">{selectedUser.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Rol</p>
              <p className="mt-1">{selectedUser.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCrudTest; 