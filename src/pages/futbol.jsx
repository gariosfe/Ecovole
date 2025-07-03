import { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import './futbol.css';

export default function Futbol() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);

  const [puntosA, setPuntosA] = useState(0);
  const [puntosB, setPuntosB] = useState(0);

  const [nombreA, setNombreA] = useState("Equipo A");
  const [nombreB, setNombreB] = useState("Equipo B");

  useEffect(() => {
    let intervalo = null;
    if (activo) {
      intervalo = setInterval(() => {
        setSegundos(prev => prev + 1);
      }, 1000);
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

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="futbol-container">
        <h2 className="text-4xl font-bold text-yellow-400 mb-8">🏆 Marcador Deportivo</h2>

        {/* Cronómetro */}
        <div className="tiempo-box">
          <p className="text-xl mb-2">⏱ Tiempo de juego</p>
          <div className="reloj">{formatearTiempo(segundos)}</div>
          <div className="botones">
            <button style={{ backgroundColor: '#22c55e' }} onClick={() => setActivo(true)}>Iniciar</button>
            <button style={{ backgroundColor: '#eab308' }} onClick={() => setActivo(false)}>Pausar</button>
            <button style={{ backgroundColor: '#ef4444' }} onClick={() => { setActivo(false); setSegundos(0); }}>Reiniciar</button>
          </div>
        </div>

        {/* Equipos */}
        <div className="puntaje-section">
          <div className="equipo-card">
            <input
              type="text"
              value={nombreA}
              onChange={(e) => setNombreA(e.target.value)}
              className="equipo-input"
            />
            <div className="puntos">{puntosA}</div>
            <div className="botones">
              <button onClick={() => setPuntosA(p => Math.max(p - 1, 0))}>- Gol</button>
              <button onClick={() => setPuntosA(p => p + 1)}>+ Gol</button>
            </div>
          </div>

          <div className="equipo-card">
            <input
              type="text"
              value={nombreB}
              onChange={(e) => setNombreB(e.target.value)}
              className="equipo-input"
            />
            <div className="puntos">{puntosB}</div>
            <div className="botones">
              <button onClick={() => setPuntosB(p => Math.max(p - 1, 0))}>- Gol</button>
              <button onClick={() => setPuntosB(p => p + 1)}>+ Gol</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
