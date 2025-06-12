import api from './api';

export const activityService = {
  // Obtener todas las actividades
  getAllActivities: async (page = 1, limit = 10, filters = {}) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...filters
      });
      const response = await api.get(`/activities?${params}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener actividad por ID
  getActivityById: async (id) => {
    try {
      const response = await api.get(`/activities/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Crear nueva actividad
  createActivity: async (activityData) => {
    try {
      const response = await api.post('/activities', activityData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Actualizar actividad
  updateActivity: async (id, activityData) => {
    try {
      const response = await api.put(`/activities/${id}`, activityData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Eliminar actividad
  deleteActivity: async (id) => {
    try {
      const response = await api.delete(`/activities/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener actividades del usuario actual
  getUserActivities: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/user/activities?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
