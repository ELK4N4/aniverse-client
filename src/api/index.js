import axios from 'axios';
import { getLocalStorage } from '../localStorage';
import { getSessionStorage } from '../sessionStorage';
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL})

API.interceptors.request.use((req) => {
  if(getLocalStorage('user')) {
    req.headers.authorization = `Bearer ${getLocalStorage('user').token}`;
  } else if(getSessionStorage('user')) {
    req.headers.authorization = `Bearer ${getSessionStorage('user').token}`;
  }
  return req;
});

export const fetchCurrentUser = () => API.get('/user');
export const updateCurrentUser = (updatedUser) => API.put('/user', updatedUser);
export const fetchMyFansubs = () => API.get('/user/my-fansubs');

export const fetchAdmins = (keyword, skip, limit) => API.get('/admins', { params: {search: keyword, skip, limit} });
export const fetchAdmin = (userId) => API.get('/admins/' + userId);
export const addAdmin = (username) => API.post('/admins/', username);
export const updateAdmin = (userId, updatedAdmin) => API.put('/admins/' + userId, updatedAdmin);
export const deleteAdmin = (userId) => API.delete('/admins/' + userId);

export const fetchBans = (keyword, skip, limit) => API.get('/bans', { params: {search: keyword, skip, limit} });
export const fetchBan = (userId) => API.get('/bans/' + userId);
export const addBan = (ban) => API.post('/bans/', ban);
export const updateBan = (userId, updatedBan) => API.put('/bans/' + userId, updatedBan);
export const deleteBan = (userId) => API.delete('/bans/' + userId);

export const fetchAnimes = (keyword, skip, limit) => API.get('/animes', { params: {search: keyword, skip, limit} });
export const fetchAnime = (animeId) => API.get('/animes/' + animeId);
export const addAnime = (newAnime) => API.post('/animes', newAnime);
export const updateAnime = (animeId, updatedAnime) => API.put('/animes/' + animeId, updatedAnime);
export const deleteAnime = (animeId) => API.delete('/animes/' + animeId);

export const fetchFansubMembers = (fansubId) => API.get(`/fansubs/${fansubId}/members`);
export const fetchFansubs = (keyword, skip, limit) => API.get('/fansubs', { params: {search: keyword, skip, limit, confirmed: true} });
export const fetchUnconfirmedFansubs = (keyword, skip, limit) => API.get('/fansubs', { params: {search: keyword, skip, limit, confirmed: false} });
export const fetchFansub = (fansubId) => API.get('/fansubs/' + fansubId);
export const deleteFansub = (fansubId) => API.delete('/fansubs/' + fansubId);
export const fetchFansubProjects = (fansubId) => API.get('/fansubs/' + fansubId + '/projects');
export const addFansub = (newFansub) => API.post('/fansubs', newFansub);
export const confirmFansub = (fansubId) => API.get(`/fansubs/${fansubId}/confirm`);
export const updateFansub = (fansubId, updatedFansub) => API.put('/fansubs/' + fansubId, updatedFansub);

export const followFansub = (fansubId) => API.post(`/fansubs/${fansubId}/followers/`);
export const unfollowFansub = (fansubId) => API.delete(`/fansubs/${fansubId}/followers/`);

export const fetchProject = (fansubId, projectId) => API.get('/fansubs/' + fansubId + '/projects/' + projectId);
export const addProject = (fansubId, newProject) => API.post(`/fansubs/${fansubId}/projects`, newProject);
export const deleteProject = (fansubId, projectId) => API.delete(`/fansubs/${fansubId}/projects/${projectId}`);
export const updateProjectStatus = (fansubId, projectId, updatedStatus) => API.put(`/fansubs/${fansubId}/projects/${projectId}/status`, updatedStatus);

export const fetchEpisodes = (animeId) => API.get(`/animes/${animeId}/episodes`);
export const fetchEpisode = (animeId, episodeId) => API.get(`/animes/${animeId}/episodes/${episodeId}`);
export const addEpisode = (fansubId, projectId, newEpisode) => API.post(`/fansubs/${fansubId}/projects/${projectId}/episodes`, newEpisode);
export const updateEpisode = (fansubId, projectId, episodeId, updatedEpisode) => API.put(`fansubs/${fansubId}/projects/${projectId}/episodes/${episodeId}`, updatedEpisode);
export const deleteEpisode = (fansubId, projectId, episodeId) => API.delete(`/fansubs/${fansubId}/projects/${projectId}/episodes/${episodeId}`);

export const fetchComments = (animeId, episodeId) => API.get(`/animes/${animeId}/episodes/${episodeId}/comments`);
export const addComment = (animeId, episodeId, comment) => API.post(`/animes/${animeId}/episodes/${episodeId}/comments`, comment);
export const removeComment = (animeId, episodeId, commentId) => API.delete(`/animes/${animeId}/episodes/${episodeId}/comments/${commentId}`);
export const updateComment = (animeId, episodeId, commentId, updatedComment) => API.put(`/animes/${animeId}/episodes/${episodeId}/comments/${commentId}`, updatedComment);
export const addRating = (animeId, score) => API.post(`/animes/${animeId}/rating`, {score: score});
export const updateRating = (animeId, ratingId, score) => API.put(`/animes/${animeId}/rating/${ratingId}`, {score});
export const deleteRating = (animeId, ratingId) => API.delete(`/animes/${animeId}/rating/${ratingId}`);
export const addAnimeTracking = (animeId, trackingData) => API.post(`/animes/${animeId}/tracking`, trackingData);
export const updateAnimeTracking = (animeId, trackingId, trackingData) => API.put(`/animes/${animeId}/tracking/${trackingId}`, trackingData);


export const addMember = (fansubId, username) => API.post(`/fansubs/${fansubId}/members/`, username);
export const removeMember = (fansubId, userId) => API.delete(`/fansubs/${fansubId}/members/${userId}`);
export const updateMember = (fansubId, userId, updatedMember) => API.put(`/fansubs/${fansubId}/members/${userId}`, updatedMember);

export const fetchUser = (userId) => API.get(`/users/${userId}/`);

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const verify = (token) => API.get('/auth/verify/' + token);
export const resendVerfiy = (email) => API.post('/auth/verify/resend/', {email});
export const forgotPassword = (email) => API.post('/auth/forgot-password/', email);
export const resetPassword = (token, password) => API.post('/auth/reset-password/' + token, password);

export const fetchNotifications = (skip, limit) => API.get('/user/notifications', { params: {skip, limit} });
export const checkNotification = (notificationId) => API.put('/user/notifications/' + notificationId);
export const deleteNotification = (notificationId) => API.delete('/user/notifications/' + notificationId);