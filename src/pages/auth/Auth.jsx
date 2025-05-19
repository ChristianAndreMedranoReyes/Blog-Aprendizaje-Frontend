import React from 'react';

import { useEffect, useState } from 'react';
import { getPosts } from '../../services/postService.jsx';
import PostCard from '../../components/publicacion/PostCard.jsx';
import FilterByCourse from '../../components/FilterByCourse.jsx';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('Todos');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        setPosts(Array.isArray(res.data.publicaciones) ? res.data.publicaciones : []);
      } catch (err) {
        console.error('Error al cargar publicaciones:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = selectedCourse === 'Todos'
    ? posts
    : posts.filter(post => {
        const cursoNombre = post.curso?.name || post.curso?.nombre || post.curso;
        return cursoNombre === selectedCourse;
      });

  return (
  <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4 flex justify-center items-center gap-2">
            <span>📚</span> Blog de Aprendizaje
          </h1>
          <p className="text-base-content text-lg">
            Explora artículos, comparte ideas y aprende en comunidad.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-base-200 rounded-box px-6 py-4 shadow-md">
            <h3 className="text-md font-semibold text-base-content mb-2 flex items-center gap-2">
              <span className="text-xl">⚙️</span> Filtrar por curso
            </h3>
            <FilterByCourse
              selectedCourse={selectedCourse}
              onChange={setSelectedCourse}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center mt-10">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-base-content opacity-50">
            No hay publicaciones disponibles.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
