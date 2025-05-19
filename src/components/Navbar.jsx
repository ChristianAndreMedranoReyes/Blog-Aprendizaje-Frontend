import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-4">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-700">
          Blog de Aprendizaje
        </Link>
        <div>
        </div>
      </div>
    </nav>
  );
}
