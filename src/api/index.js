import axios from 'axios';
import { getLocalStorage } from '../localStorage';

const API = axios.create({ baseURL: 'http://localhost:5000'})
API.interceptors.request.use((req) => {
  if(getLocalStorage('user')) {
    req.headers.authorization = `Bearer ${getLocalStorage('user').token}`;
  }
  return req;
});

export const fetchUser = () => API.get('/user');
export const fetchMyFansubs = () => API.get('/user/my-fansubs');

export const fetchAnimes = (keyword) => API.get('/animes', { params: {search: keyword} });
export const fetchAnime = (animeId) => API.get('/animes/' + animeId);
export const addAnime = (newAnime) => API.post('/animes', newAnime);

export const fetchFansubs = () => API.get('/fansubs');
export const fetchFansub = (fansubId) => API.get('/fansubs/' + fansubId);
export const fetchFansubProjects = (fansubId) => API.get('/fansubs/' + fansubId + '/projects');
export const addFansub = (newFansub) => API.post('/fansubs', newFansub);

export const fetchProject = (fansubId, projectId) => API.get('/fansubs/' + fansubId + '/projects/' + projectId);
export const addProject = (fansubId, newProject) => API.post(`fansubs/${fansubId}/projects`, newProject);
export const deleteProject = (fansubId, projectId) => API.delete(`fansubs/${fansubId}/projects/${projectId}`);

export const fetchEpisode = (fansubId, projectId, episodeId) => API.get(`fansubs/${fansubId}/projects/${projectId}/episodes/${episodeId}`);
export const addEpisode = (fansubId, projectId, newEpisode) => API.post(`fansubs/${fansubId}/projects/${projectId}/episodes`, newEpisode);
export const deleteEpisode = (fansubId, projectId, episodeId) => API.delete(`fansubs/${fansubId}/projects/${projectId}/episodes/${episodeId}`);


export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
