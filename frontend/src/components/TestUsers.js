import React, { useState, useEffect } from 'react';
import { userService, authService } from '../services';

const TestUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userError, setUserError] = useState(null);

  // Test para obtener todos los usuarios
  const testGetUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔄 Obteniendo usuarios...');
      const result = await userService.getAllUsers();
      console.log('✅ Resultado completo:', result);
      
      // Verificar la estructura de la respuesta
      if (result && result.data) {
        setUsers(result.data);
        console.log('✅ Usuarios establecidos:', result.data);
      } else {
        setUsers(result || []);
        console.log('✅ Usuarios establecidos (formato alternativo):', result);
      }
    } catch (err) {
      setError(err);
      console.error('❌ Error al obtener usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  // Test para obtener el usuario actual
  const testGetCurrentUser = async () => {
    setUserLoading(true);
    setUserError(null);
    try {
      console.log('🔄 Obteniendo usuario actual...');
      const result = await authService.getCurrentUser();
      console.log('✅ Usuario actual recibido:', result);
      
      // Verificar la estructura de la respuesta
      if (result && result.user) {
        setCurrentUser(result.user);
        console.log('✅ Usuario actual establecido:', result.user);
      } else if (result && result.data) {
        setCurrentUser(result.data);
        console.log('✅ Usuario actual establecido (data):', result.data);
      } else {
        setCurrentUser(result);
        console.log('✅ Usuario actual establecido (directo):', result);
      }
    } catch (err) {
      setUserError(err);
      console.error('❌ Error al obtener usuario actual:', err);
    } finally {
      setUserLoading(false);
    }
  };

  // Test del token actual
  const testToken = () => {
    const token = localStorage.getItem('access_token');
    console.log('🔑 Token actual:', token ? 'Token presente' : 'No hay token');
    if (token) {
      console.log('🔑 Token:', token.substring(0, 50) + '...');
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🧪 Test User Service</h2>
      
      {/* Botones de prueba */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={testGetUsers} 
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded"
        >
          {loading ? 'Cargando...' : 'Obtener Usuarios'}
        </button>
        
        <button 
          onClick={testGetCurrentUser} 
          disabled={userLoading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded"
        >
          {userLoading ? 'Cargando...' : 'Obtener Usuario Actual'}
        </button>
        
        <button 
          onClick={testToken}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          Verificar Token
        </button>
      </div>

      {/* Mostrar usuario actual */}
      {currentUser && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded">
          <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Usuario Actual:</h3>
          <div className="text-sm">
            <p><strong>ID:</strong> {currentUser.id}</p>
            <p><strong>Nombre:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            {currentUser.role && <p><strong>Rol:</strong> {currentUser.role}</p>}
          </div>
        </div>
      )}

      {/* Error del usuario actual */}
      {userError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded">
          <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Error Usuario Actual:</h3>
          <pre className="text-xs text-red-700 overflow-auto">
            {JSON.stringify(userError, null, 2)}
          </pre>
        </div>
      )}

      {/* Estados de carga */}
      {loading && <p className="text-blue-600">🔄 Cargando usuarios...</p>}
      {userLoading && <p className="text-green-600">🔄 Cargando usuario actual...</p>}

      {/* Error de usuarios */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded">
          <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Error Usuarios:</h3>
          <pre className="text-xs text-red-700 overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      {/* Lista de usuarios */}
      {users.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">👥 Usuarios encontrados ({users.length}):</h3>
          <div className="bg-white border rounded p-4 max-h-96 overflow-auto">
            {users.map((user, index) => (
              <div key={user.id || index} className="border-b pb-2 mb-2 last:border-b-0">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {user.role && <p><strong>Rol:</strong> {user.role}</p>}
                {user.created_at && <p><strong>Creado:</strong> {new Date(user.created_at).toLocaleDateString()}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Datos raw para debugging */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-gray-600">🔍 Ver datos raw (debugging)</summary>
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          <p><strong>Usuarios raw:</strong></p>
          <pre className="overflow-auto max-h-32">{JSON.stringify(users, null, 2)}</pre>
          <p className="mt-2"><strong>Usuario actual raw:</strong></p>
          <pre className="overflow-auto max-h-32">{JSON.stringify(currentUser, null, 2)}</pre>
        </div>
      </details>
    </div>
  );
};

export default TestUsers;