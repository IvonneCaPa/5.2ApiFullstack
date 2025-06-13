import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener el usuario actual
  const fetchCurrentUser = async () => {
    try {
      console.log('🔄 AuthContext: Obteniendo usuario actual...');
      const response = await authService.getCurrentUser();
      console.log('✅ AuthContext: Respuesta del usuario:', response);
      
      // Manejar diferentes estructuras de respuesta
      let userData = null;
      if (response.user) {
        userData = response.user;
      } else if (response.data) {
        userData = response.data;
      } else if (response.id) {
        userData = response;
      }
      
      if (userData) {
        setUser(userData);
        console.log('✅ AuthContext: Usuario establecido:', userData);
      } else {
        console.warn('⚠️ AuthContext: No se pudo extraer datos del usuario');
        setUser(null);
      }
    } catch (err) {
      console.error('❌ AuthContext: Error obteniendo usuario:', err);
      setUser(null);
      // Si el error es 401, limpiar el token
      if (err.response?.status === 401) {
        localStorage.removeItem('access_token');
      }
    }
  };

  // Verificar si hay token al cargar la aplicación
  useEffect(() => {
    const initAuth = async () => {
      console.log('🚀 AuthContext: Inicializando autenticación...');
      const token = localStorage.getItem('access_token');
      
      if (token) {
        console.log('🔑 AuthContext: Token encontrado, obteniendo usuario...');
        await fetchCurrentUser();
      } else {
        console.log('🔑 AuthContext: No hay token almacenado');
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  // Función de login
  const login = async (email, password) => {
    try {
      console.log('🔄 AuthContext: Iniciando login...');
      setError(null);
      
      const response = await authService.login(email, password);
      console.log('✅ AuthContext: Respuesta de login:', response);
      
      // Buscar el token en diferentes posibles ubicaciones
      let token = null;
      if (response.access_token) {
        token = response.access_token;
      } else if (response.token) {
        token = response.token;
      } else if (response.data?.access_token) {
        token = response.data.access_token;
      } else if (response.data?.token) {
        token = response.data.token;
      }
      
      if (token) {
        console.log('🔑 AuthContext: Token recibido, guardando...');
        localStorage.setItem('access_token', token);
        
        // Obtener datos del usuario después del login
        await fetchCurrentUser();
        
        return { success: true };
      } else {
        console.error('❌ AuthContext: No se encontró token en la respuesta');
        return { success: false, error: 'No se recibió token de acceso' };
      }
      
    } catch (err) {
      console.error('❌ AuthContext: Error en login:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Error desconocido';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Función de logout
  const logout = () => {
    console.log('🚪 AuthContext: Cerrando sesión...');
    authService.logout();
    setUser(null);
    setError(null);
  };

  // Función para refrescar el usuario
  const refreshUser = async () => {
    if (localStorage.getItem('access_token')) {
      await fetchCurrentUser();
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};