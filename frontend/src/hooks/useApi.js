import { useState, useEffect } from 'react';

export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Ejemplo de uso del hook useApi
export const useUsers = (page = 1, limit = 10) => {
  return useApi(() => userService.getAllUsers(page, limit), [page, limit]);
};

export const useActivities = (page = 1, limit = 10, filters = {}) => {
  return useApi(() => activityService.getAllActivities(page, limit, filters), [page, limit, JSON.stringify(filters)]);
};

export const useGalleries = (page = 1, limit = 10) => {
  return useApi(() => galleryService.getAllGalleries(page, limit), [page, limit]);
};