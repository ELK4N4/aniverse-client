import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }
    return req;
});

export const fetchAnimes = () => API.get('/animes');
export const addAnime = (newAnime, history) => API.post('/animes', newAnime);

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
