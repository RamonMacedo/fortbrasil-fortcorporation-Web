import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_DEV,
});

api.interceptors.request.use(async (request) => {
  const token = localStorage.getItem('FortCorporation:token');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

export default api;
