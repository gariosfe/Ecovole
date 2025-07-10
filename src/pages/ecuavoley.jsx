import { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import './ecuavoley.css';

export default function Ecuavoley() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);

  const [nombreA, setNombreA] = useState("Equipo A");
  const [nombreB, setNombreB] = useState("Equipo B");

  useEffect(() => {
    let intervalo = null;
    if (activo) {
      intervalo = setInterval(() => setSegundos(prev => prev + 1), 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  const formatearTiempo = (seg) => {
    const minutos = Math.floor(seg / 60);
    const segundosRestantes = seg % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  };

  const reiniciarTiempo = () => {
    setActivo(false);
    setSegundos(0);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="ecuavoley-container">
        <h2 className="titulo-ecuavoley">🏐 Cronómetro de Ecuavoley</h2>

        {/* Cronómetro */}
        <div className="tiempo-box">
          <p className="text-xl mb-2">⏱ Tiempo de juego</p>
          <div className="reloj">{formatearTiempo(segundos)}</div>
          <div className="botones">
            <button style={{ backgroundColor: '#10b981' }} onClick={() => setActivo(true)}>Iniciar</button>
            <button style={{ backgroundColor: '#fbbf24' }} onClick={() => setActivo(false)}>Pausar</button>
            <button style={{ backgroundColor: '#ef4444' }} onClick={reiniciarTiempo}>Reiniciar</button>
          </div>
        </div>

        {/* Edición de nombres de equipos */}
        <div className="puntaje-section">
          <div className="equipo-card">
            <input
              type="text"
              value={nombreA}
              onChange={(e) => setNombreA(e.target.value)}
              className="equipo-input"
            />
          </div>

          <div className="equipo-card">
            <input
              type="text"
              value={nombreB}
              onChange={(e) => setNombreB(e.target.value)}
              className="equipo-input"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
