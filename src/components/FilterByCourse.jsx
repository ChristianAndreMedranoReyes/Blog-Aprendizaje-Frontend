import React from 'react';
import { FaFilter } from 'react-icons/fa';

export default function FilterByCourse({ selectedCourse, onChange }) {
  const cursos = ['Todos', 'Taller', 'Tecnologia', 'Practica Supervisada'];

  return (
    <div className="mb-6 text-center">
      <div className="inline-flex items-center gap-2 mb-4 text-white font-semibold justify-center">
        <FaFilter className="text-white" />
        <span className="text-lg">Filtrar por curso</span>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {cursos.map((curso) => (
          <button
            key={curso}
            onClick={() => onChange(curso)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition 
              ${
                selectedCourse === curso
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-black hover:bg-gray-200'
              }
            `}
          >
            {curso}
          </button>
        ))}
      </div>
    </div>
  );
}
