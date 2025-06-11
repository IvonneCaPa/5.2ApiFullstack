import api from './services/api';

// Función para probar la conexión básica
export const testConnection = async () => {
  try {
    console.log('🔄 Probando conexión con la API...');
    
    // Intentar una petición GET simple
    // CAMBIAR '/health' por una ruta que exista en tu API Laravel
    const response = await api.get('/activities'); // o '/users', '/test', etc.
    
    console.log('✅ API conectada correctamente!');
    console.log('📊 Datos recibidos:', response.data);
    console.log('📡 Status:', response.status);
    
    return { success: true, data: response.data };
    
  } catch (error) {
    console.error('❌ Error de conexión con la API:');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('🔴 La API no está corriendo. ¿Laravel está encendido?');
    } else if (error.response) {
      console.error('📡 Status:', error.response.status);
      console.error('📝 Mensaje:', error.response.data);
    } else {
      console.error('🔥 Error desconocido:', error.message);
    }
    
    return { success: false, error: error.message };
  }
};

// Función para probar una petición autenticada (opcional)
export const testAuthenticatedRequest = async () => {
  try {
    console.log('🔐 Probando petición autenticada...');
    
    // Esta petición debería requerir autenticación
    const response = await api.get('/user');
    
    console.log('✅ Petición autenticada exitosa!');
    console.log('👤 Usuario:', response.data);
    
    return { success: true, data: response.data };
    
  } catch (error) {
    console.error('❌ Error en petición autenticada:', error.response?.status);
    return { success: false, error: error.message };
  }
};