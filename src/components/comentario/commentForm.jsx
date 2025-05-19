import React, { useState } from 'react';
import { FaUser, FaCommentDots, FaReply } from 'react-icons/fa';

export default function CommentForm({ onSubmit, padre = null, isReply = false }) {
  const [nombre, setNombre] = useState('');
  const [contenido, setContenido] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !contenido.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    onSubmit({
      nombre,
      contenido,
      padre 
    });

    setNombre('');
    setContenido('');
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 rounded-box shadow-md border mt-6 bg-base-100 ${
        isReply ? 'ml-6 border-dashed' : ''
      }`}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {isReply ? <FaReply /> : <FaCommentDots />} {isReply ? 'Responder comentario' : 'Agregar comentario'}
      </h3>

      {error && <p className="text-error text-sm mb-3">{error}</p>}

      <div className="mb-3">
        <label className="label text-sm flex gap-2 items-center">
          <FaUser className="text-base-content/70" />
          Tu nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Ej: Christian"
        />
      </div>

      <div className="mb-3">
        <label className="label text-sm flex gap-2 items-center">
          <FaCommentDots className="text-base-content/70" />
          Tu comentario
        </label>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="textarea textarea-bordered w-full"
          rows="3"
          placeholder="Escribe tu opinión o aportación..."
        ></textarea>
      </div>

      <div className="text-right">
        <button type="submit" className="btn btn-primary btn-sm">
          {isReply ? 'Responder' : 'Publicar comentario'}
        </button>
      </div>
    </form>
  );
}
