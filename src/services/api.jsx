import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/gestordeopiniones', // cambia si tu backend usa otro puerto o ruta
});

// POSTS
export const getPosts = () => API.get('/posts');
export const getPostById = (id) => API.get(`/posts/${id}`);

// COMMENTS
export const addComment = (postId, comment) => API.post(`/posts/${postId}/comments`, comment);
