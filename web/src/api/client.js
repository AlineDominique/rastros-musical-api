// web/src/api/client.js
import axios from 'axios';

// A URL base aponta para o backend
const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getGenres = async () => {
  const { data } = await api.get('/genres');
  return data;
};

export const getPropagation = async (genre, year) => {
  const { data } = await api.get('/propagation', {
    params: { genre, year }
  });
  return data;
};