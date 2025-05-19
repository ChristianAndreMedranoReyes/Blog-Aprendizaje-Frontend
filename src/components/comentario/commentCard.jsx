import React, { useState } from 'react';
import CommentForm from '../../components/comentario/commentForm.jsx'; 

export default function ComentarioCard({ comentario, onReply }) {
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

  return (
    <div
      className={`rounded-box p-4 mb-3 border shadow-sm ${
        comentario.padre ? 'bg-base-200 ml-6 text-sm' : 'bg-base-100'
      }`}
    >
      <p className="mb-2">{comentario.contenido}</p>

      <div className="text-xs opacity-70 flex justify-between items-center">
        <span>
          {new Date(comentario.createdAt).toLocaleString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>

        <button
          className="link link-primary text-sm"
          onClick={() => setMostrarRespuesta(!mostrarRespuesta)}
        >
          {mostrarRespuesta ? 'Cancelar' : 'Responder'}
        </button>
      </div>

      {/* Formulario para responder */}
      {mostrarRespuesta && (
        <CommentForm
          onSubmit={(respuesta) => {
            onReply({ ...respuesta, padre: comentario._id });
            setMostrarRespuesta(false);
          }}
          isReply={true}
        />
      )}
    </div>
  );
}
