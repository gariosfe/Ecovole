import Header from '../components/header.jsx';

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Bienvenido a la página de inicio</h2>
        <p className="text-lg">Este es un sitio hecho con React + Tailwind CSS.</p>
      </main>
    </div>
  );
}
