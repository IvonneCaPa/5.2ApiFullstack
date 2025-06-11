import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/oauth/token', {
      grant_type: 'password',
      client_id: 'tu_client_id', // De Laravel Passport
      client_secret: 'tu_client_secret',
      username: email,
      password: password,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/user');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
  },
};