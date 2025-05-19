import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/blogaprendizaje/v1'
});

export const getPosts = () => API.get('/publicacion');

export const getPostById = (id) => API.get(`/publicacion/${id}`);

export const addComment = (postId, commentData) => {
  const payload = {
    comentario: commentData.contenido,
    nombre: commentData.nombre,
    publicacion: postId
  };

  console.log("📦 Enviando comentario:", payload); // <-- Aquí vemos el contenido exacto

  return API.post('/comentario', payload);
};

