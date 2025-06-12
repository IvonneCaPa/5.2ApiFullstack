import api from './api';

export const photoService = {
  // Subir foto a una galería
  uploadPhoto: async (galleryId, photoData) => {
    try {
      const formData = new FormData();
      formData.append('photo', photoData.file);
      formData.append('title', photoData.title || '');
      formData.append('description', photoData.description || '');
      
      const response = await api.post(`/galleries/${galleryId}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener foto por ID
  getPhotoById: async (id) => {
    try {
      const response = await api.get(`/photos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Actualizar foto
  updatePhoto: async (id, photoData) => {
    try {
      const response = await api.put(`/photos/${id}`, photoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Eliminar foto
  deletePhoto: async (id) => {
    try {
      const response = await api.delete(`/photos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Subir múltiples fotos
  uploadMultiplePhotos: async (galleryId, photosArray) => {
    try {
      const uploadPromises = photosArray.map(photo => 
        photoService.uploadPhoto(galleryId, photo)
      );
      const results = await Promise.allSettled(uploadPromises);
      return results;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};