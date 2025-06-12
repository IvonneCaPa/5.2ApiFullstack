import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Activities from './pages/Activities';
import Gallery from './pages/Gallery';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

// Componente para rutas públicas (solo para no autenticados)
const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <Layout showHeader={false}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }
  
  return !user ? children : <Navigate to="/dashboard" />;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Layout showHeader={false}>
                <Login />
              </Layout>
            </PublicRoute>
          } 
        />
        
        {/* Rutas protegidas */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/activities" 
          element={
            <ProtectedRoute>
              <Layout>
                <Activities />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/gallery" 
          element={
            <ProtectedRoute>
              <Layout>
                <Gallery />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        {/* Ruta por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;