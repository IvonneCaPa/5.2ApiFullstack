import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Información de la empresa */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Mi Aplicación</h3>
              <p className="text-gray-300 text-sm">
                Sistema de gestión de usuarios, actividades y galerías con 
                autenticación segura OAuth2.
              </p>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/dashboard" className="text-gray-300 hover:text-white text-sm transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/users" className="text-gray-300 hover:text-white text-sm transition-colors">
                    Usuarios
                  </a>
                </li>
                <li>
                  <a href="/activities" className="text-gray-300 hover:text-white text-sm transition-colors">
                    Actividades
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="text-gray-300 hover:text-white text-sm transition-colors">
                    Galería
                  </a>
                </li>
              </ul>
            </div>

            {/* Información de contacto */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📧 info@miaplicacion.com</p>
                <p>📞 +34 123 456 789</p>
                <p>📍 Barcelona, España</p>
              </div>
            </div>
          </div>
        </div>

        {/* Línea separadora y copyright */}
        <div className="border-t border-gray-700 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} Mi Aplicación. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;