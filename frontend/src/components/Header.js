import React, { useState } from 'react';
import { Menu, X, User, Camera, Users, LogOut, Settings, Bell } from 'lucide-react';

// Header Component
const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                ONG <span className="text-yellow-300">Creart</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium">
              Dashboard
            </a>
            <a href="/activities" className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium flex items-center space-x-1">
              <Users size={18} />
              <span>Actividades</span>
            </a>
            <a href="/galleries" className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium flex items-center space-x-1">
              <Camera size={18} />
              <span>Galerías</span>
            </a>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-yellow-300 transition-colors duration-200 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center text-white">
                3
              </span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User size={18} className="text-orange-600" />
                </div>
                <span className="font-medium">{user?.name || 'Usuario'}</span>
              </button>

              {/* Dropdown Profile Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                  <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors duration-200 flex items-center space-x-2">
                    <User size={16} />
                    <span>Mi Perfil</span>
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors duration-200 flex items-center space-x-2">
                    <Settings size={16} />
                    <span>Configuración</span>
                  </a>
                  <hr className="my-2" />
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-yellow-300 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-md rounded-lg mt-2 mb-4 border border-white/20">
            <div className="px-4 py-3 space-y-3">
              <a href="/dashboard" className="block text-white hover:text-yellow-300 transition-colors duration-200 font-medium">
                Dashboard
              </a>
              <a href="/activities" className="block text-white hover:text-yellow-300 transition-colors duration-200 font-medium flex items-center space-x-2">
                <Users size={18} />
                <span>Actividades</span>
              </a>
              <a href="/galleries" className="block text-white hover:text-yellow-300 transition-colors duration-200 font-medium flex items-center space-x-2">
                <Camera size={18} />
                <span>Galerías</span>
              </a>
              <hr className="border-white/20" />
              <div className="flex items-center space-x-2 text-white">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User size={18} className="text-orange-600" />
                </div>
                <span className="font-medium">{user?.name || 'Usuario'}</span>
              </div>
              <a href="/profile" className="block text-white hover:text-yellow-300 transition-colors duration-200 pl-4">
                Mi Perfil
              </a>
              <a href="/settings" className="block text-white hover:text-yellow-300 transition-colors duration-200 pl-4">
                Configuración
              </a>
              <button
                onClick={onLogout}
                className="block text-red-300 hover:text-red-100 transition-colors duration-200 pl-4 font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};