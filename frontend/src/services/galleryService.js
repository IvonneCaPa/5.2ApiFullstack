import api from './api';

export const galleryService = {
  // Obtener todas las galerías
  getAllGalleries: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/galleries?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener galería por ID
  getGalleryById: async (id) => {
    try {
      const response = await api.get(`/galleries/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Crear nueva galería
  createGallery: async (galleryData) => {
    try {
      const response = await api.post('/galleries', galleryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Actualizar galería
  updateGallery: async (id, galleryData) => {
    try {
      const response = await api.put(`/galleries/${id}`, galleryData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Eliminar galería
  deleteGallery: async (id) => {
    try {
      const response = await api.delete(`/galleries/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener fotos de una galería
  getGalleryPhotos: async (galleryId, page = 1, limit = 20) => {
    try {
      const response = await api.get(`/galleries/${galleryId}/photos?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};