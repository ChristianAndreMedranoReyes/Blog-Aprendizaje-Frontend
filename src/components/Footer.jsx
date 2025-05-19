export default function Footer() {
    return (
      <footer className="bg-white border-t mt-10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Blog de Aprendizaje. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    );
  }
  