import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById, addComment } from '../../services/postService.jsx';
import CommentForm from '../../components/comentario/commentForm.jsx';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [respondiendoA, setRespondiendoA] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data.publicacion);
      } catch (err) {
        console.error('Error al cargar publicación:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async (data) => {
    try {
      const res = await addComment(id, {
        ...data,
        padre: respondiendoA || null
      });

      const nuevo = {
        ...res.data.comentario,
        nombre: data.nombre,
        createdAt: new Date(),
        padre: respondiendoA || null
      };

      setPost((prev) => ({
        ...prev,
        comentarios: [...(prev.comentarios || []), nuevo]
      }));

      setRespondiendoA(null);
    } catch (err) {
      console.error('Error al agregar comentario:', err);
    }
  };

  const buildTree = (comentarios) => {
    const map = {};
    const roots = [];

    comentarios.forEach((c) => {
      c.hijos = [];
      map[c._id] = c;
    });

    comentarios.forEach((c) => {
      if (c.padre && map[c.padre]) {
        map[c.padre].hijos.push(c);
      } else {
        roots.push(c);
      }
    });

    return roots;
  };

  const renderComentario = (c, nivel = 0) => {
    const fecha = c.createdAt
      ? new Date(c.createdAt).toLocaleString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : 'Sin fecha';

    const margin = Math.min(nivel * 20, 160);

    return (
      <div key={c._id} style={{ marginLeft: `${margin}px` }} className="bg-base-200 rounded-xl p-4 mb-3">
        <div className="flex justify-between">
          <strong className="text-sm">{c.nombre}</strong>
          <span className="text-xs text-gray-400">{fecha}</span>
        </div>
        <p className="text-sm text-white mt-1">{c.comentario}</p>

        <div className="flex gap-3 mt-2 text-sm">
          <button
            className="text-purple-400 hover:underline"
            onClick={() =>
              setRespondiendoA(respondiendoA === c._id ? null : c._id)
            }
          >
            {respondiendoA === c._id ? 'Cancelar' : 'Responder'}
          </button>
        </div>

        {respondiendoA === c._id && (
          <div className="mt-3">
            <CommentForm onSubmit={handleAddComment} />
          </div>
        )}

        {c.hijos && c.hijos.length > 0 && (
          <div className="mt-3">
            {c.hijos.map((hijo) => renderComentario(hijo, nivel + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <p className="text-center">Cargando publicación...</p>;
  if (!post) return <p className="text-center">Publicación no encontrada</p>;

  const arbolComentarios = buildTree(post.comentarios || []);

  return (
    <div className="px-4 py-6 mx-auto max-w-3xl">
      <Link
        to="/"
        className="inline-block text-sm text-blue-400 hover:underline mb-4"
      >
        ← Volver al inicio
      </Link>

      <h1 className="text-2xl font-bold mb-2">{post.titulo}</h1>
      <p className="text-sm text-gray-600 mb-4">
        Curso: {post.curso?.name || 'Sin curso'} | Publicado el{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-100 mb-6">{post.descripcion}</p>

      <h2 className="text-xl font-semibold mb-4">Comentarios</h2>

      {arbolComentarios.length > 0 ? (
        arbolComentarios.map((c) => renderComentario(c))
      ) : (
        <p className="text-sm text-gray-500 mb-4">No hay comentarios aún.</p>
      )}

      {!respondiendoA && <CommentForm onSubmit={handleAddComment} />}
    </div>
  );
}
