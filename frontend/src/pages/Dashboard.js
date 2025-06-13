import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserCrudTest from '../components/UserCrudTest';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <UserCrudTest />      
      <div className="dashboard-content">
        <p className="welcome-message">
          Bienvenido, {user.name || 'Usuario'}
        </p>
        <div>
          <h2>Información del Usuario</h2>
          <p>Email: {user.email}</p>
          {user.role && <p>Rol: {user.role}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
