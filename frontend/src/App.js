import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

const TestAuth = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Cargando autenticación...</div>;
  
  return (
    <div>
      <h2>Estado de autenticación:</h2>
      <p>Usuario: {user ? `Conectado como ${user.name}` : 'No conectado'}</p>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <TestAuth />
    </AuthProvider>
  );
}

export default App;