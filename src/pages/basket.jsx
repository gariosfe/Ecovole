import { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import './basket.css';

export default function Basket() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);

  const [puntosA, setPuntosA] = useState(0);
  const [puntosB, setPuntosB] = useState(0);

  const [nombreA, setNombreA] = useState("Local");
  const [nombreB, setNombreB] = useState("Visitante");

  useEffect(() => {
    let intervalo = null;
    if (activo) {
      intervalo = setInterval(() => setSegundos((prev) => prev + 1), 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  const formatearTiempo = (seg) => {
    const min = Math.floor(seg / 60);
    const sec = seg % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="basket-container">
        <h2 className="titulo-basket">🏀 Marcador de Baloncesto</h2>

        {/* CRONÓMETRO */}
        <div className="tiempo-box">
          <p className="text-xl mb-2">⏱ Tiempo</p>
          <div className="reloj">{formatearTiempo(segundos)}</div>
          <div className="botones">
            <button style={{ backgroundColor: '#22c55e' }} onClick={() => setActivo(true)}>Iniciar</button>
            <button style={{ backgroundColor: '#eab308' }} onClick={() => setActivo(false)}>Pausar</button>
            <button style={{ backgroundColor: '#ef4444' }} onClick={() => { setActivo(false); setSegundos(0); }}>Reiniciar</button>
          </div>
        </div>

        {/* EQUIPOS */}
        <div className="puntaje-section">
          {/* Equipo A */}
          <div className="equipo-card basket">
            <input
              className="equipo-input"
              value={nombreA}
              onChange={(e) => setNombreA(e.target.value)}
            />
            <div className="puntos">{puntosA}</div>
            <div className="botones">
              <button onClick={() => setPuntosA((p) => Math.max(p - 1, 0))}>-1</button>
              <button onClick={() => setPuntosA((p) => p + 1)}>+1</button>
              <button onClick={() => setPuntosA((p) => p + 2)}>+2</button>
              <button onClick={() => setPuntosA((p) => p + 3)}>+3</button>
            </div>
          </div>

          {/* Equipo B */}
          <div className="equipo-card basket">
            <input
              className="equipo-input"
              value={nombreB}
              onChange={(e) => setNombreB(e.target.value)}
            />
            <div className="puntos">{puntosB}</div>
            <div className="botones">
              <button onClick={() => setPuntosB((p) => Math.max(p - 1, 0))}>-1</button>
              <button onClick={() => setPuntosB((p) => p + 1)}>+1</button>
              <button onClick={() => setPuntosB((p) => p + 2)}>+2</button>
              <button onClick={() => setPuntosB((p) => p + 3)}>+3</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
