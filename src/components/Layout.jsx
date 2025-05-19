import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🎥 Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/fondo2.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      {/* 🌌 Capa de gradiente oscuro para legibilidad */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 to-black/60 z-10" />

      {/* 📦 Contenido encima del gradiente */}
      <main className="relative z-20 min-h-screen text-white px-4 py-8 font-sans">
        {children}
      </main>
    </div>
  );
}
