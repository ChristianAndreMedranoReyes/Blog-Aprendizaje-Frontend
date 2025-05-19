import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaBookOpen, FaUser } from 'react-icons/fa';

export default function PostCard({ post }) {
  return (
    <div className="card bg-primary text-primary-content shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      <div className="card-body">
        <h2 className="card-title">{post.titulo}</h2>

        {/* Curso */}
        <p className="flex items-center gap-2 text-sm">
          <FaBookOpen />
          {post.curso?.nombre || post.curso?.name || post.curso}
        </p>

        {/* Autor */}
        <p className="flex items-center gap-2 text-sm">
          <FaUser />
          {post.author?.name || "Sin autor"}
        </p>

        {/* Fecha */}
        <p className="flex items-center gap-2 text-sm">
          <FaCalendarAlt />
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Sin fecha"}
        </p>

        <div className="card-actions justify-end mt-4">
          <Link to={`/post/${post._id}`}>
            <button className="btn btn-accent btn-sm">Ver publicación</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
