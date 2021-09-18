import axios from 'axios';
import { getLocalStorage } from '../localStorage';

// const API = axios.create({ baseURL: 'http://localhost:5000'})
const API = axios.create({ baseURL: 'https://anime-prime.herokuapp.com/'})

API.interceptors.request.use((req) => {
  if(getLocalStorage('user')) {
    req.headers.authorization = `Bearer ${getLocalStorage('user').token}`;
  }
  return req;
});

export const fetchCurrentUser = () => API.get('/user');
export const fetchMyFansubs = () => API.get('/user/my-fansubs');

export const fetchAnimes = (keyword) => API.get('/animes', { params: {search: keyword} });
export const fetchAnime = (animeId) => API.get('/animes/' + animeId);
export const addAnime = (newAnime) => API.post('/animes', newAnime);
export const updateAnime = (animeId, updatedAnime) => API.put('/animes/' + animeId, updatedAnime);
export const deleteAnime = (animeId) => API.delete('/animes/' + animeId);

export const fetchFansubMembers = (fansubId) => API.get(`fansubs/${fansubId}/members`);

export const fetchFansubs = (keyword) => API.get('/fansubs', { params: {search: keyword} });
export const fetchFansub = (fansubId) => API.get('/fansubs/' + fansubId);
export const deleteFansub = (fansubId) => API.delete('/fansubs/' + fansubId);
export const fetchFansubProjects = (fansubId) => API.get('/fansubs/' + fansubId + '/projects');
export const addFansub = (newFansub) => API.post('/fansubs', newFansub);
export const updateFansub = (fansubId, updatedFansub) => API.put('/fansubs/' + fansubId, updatedFansub);

export const followFansub = (fansubId) => API.post(`fansubs/${fansubId}/followers/`);
export const unfollowFansub = (fansubId) => API.delete(`fansubs/${fansubId}/followers/`);

export const fetchProject = (fansubId, projectId) => API.get('/fansubs/' + fansubId + '/projects/' + projectId);
export const addProject = (fansubId, newProject) => API.post(`fansubs/${fansubId}/projects`, newProject);
export const deleteProject = (fansubId, projectId) => API.delete(`fansubs/${fansubId}/projects/${projectId}`);

export const fetchEpisodes = (animeId) => API.get(`/animes/${animeId}/episodes`);
export const fetchEpisode = (animeId, episodeId) => API.get(`/animes/${animeId}/episodes/${episodeId}`);
export const addEpisode = (fansubId, projectId, newEpisode) => API.post(`fansubs/${fansubId}/projects/${projectId}/episodes`, newEpisode);
export const updateEpisode = (fansubId, projectId, episodeId, updatedEpisode) => API.put(`fansubs/${fansubId}/projects/${projectId}/episodes/${episodeId}`, updatedEpisode);
export const deleteEpisode = (fansubId, projectId, episodeId) => API.delete(`fansubs/${fansubId}/projects/${projectId}/episodes/${episodeId}`);

export const fetchComments = (animeId, episodeId) => API.get(`/animes/${animeId}/episodes/${episodeId}/comments`);
export const addComment = (animeId, episodeId, comment) => API.post(`/animes/${animeId}/episodes/${episodeId}/comments`, comment);
export const removeComment = (animeId, episodeId, commentId) => API.delete(`/animes/${animeId}/episodes/${episodeId}/comments/${commentId}`);
export const updateComment = (animeId, episodeId, commentId, updatedComment) => API.put(`/animes/${animeId}/episodes/${episodeId}/comments/${commentId}`, updatedComment);


export const addMember = (fansubId, username) => API.post(`fansubs/${fansubId}/members/${username}`);
export const removeMember = (fansubId, userId) => API.delete(`fansubs/${fansubId}/members/${userId}`);
export const updateMember = (fansubId, userId, updatedMember) => API.put(`fansubs/${fansubId}/members/${userId}`, updatedMember);

export const fetchUser = (userId) => API.get(`user/${userId}/`);

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
