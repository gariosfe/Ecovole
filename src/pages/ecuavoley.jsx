import { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import './ecuavoley.css';

export default function Ecuavoley() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);

  const [puntosA, setPuntosA] = useState(0);
  const [puntosB, setPuntosB] = useState(0);

  const [setsGanadosA, setSetsGanadosA] = useState(0);
  const [setsGanadosB, setSetsGanadosB] = useState(0);

  const [nombreA, setNombreA] = useState("Equipo A");
  const [nombreB, setNombreB] = useState("Equipo B");

  const [setTerminado, setSetTerminado] = useState(false);
  const puntosParaGanar = 15;

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
    return `${String(minutos).padStart(2,'0')}:${String(segundosRestantes).padStart(2,'0')}`;
  };

  // Verifica si set terminó y actualiza sets ganados
  useEffect(() => {
    if (!setTerminado) {
      const diferencia = Math.abs(puntosA - puntosB);
      if (
        (puntosA >= puntosParaGanar || puntosB >= puntosParaGanar) &&
        diferencia >= 2
      ) {
        setSetTerminado(true);
        if (puntosA > puntosB) setSetsGanadosA(prev => prev + 1);
        else setSetsGanadosB(prev => prev + 1);
      }
    }
  }, [puntosA, puntosB, setTerminado]);

  // Control para sumar puntos solo si el set no terminó
  const sumarPunto = (equipo) => {
    if (setTerminado) return;
    if (equipo === "A") setPuntosA(p => p + 1);
    else setPuntosB(p => p + 1);
  };

  const restarPunto = (equipo) => {
    if (setTerminado) return;
    if (equipo === "A") setPuntosA(p => Math.max(p - 1, 0));
    else setPuntosB(p => Math.max(p - 1, 0));
  };

  const reiniciarSet = () => {
    setPuntosA(0);
    setPuntosB(0);
    setSetTerminado(false);
    setSegundos(0);
    setActivo(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="ecuavoley-container">
        <h2 className="titulo-ecuavoley">🏐 Marcador de Ecuavoley</h2>

        {/* Cronómetro */}
        <div className="tiempo-box">
          <p className="text-xl mb-2">⏱ Tiempo de juego</p>
          <div className="reloj">{formatearTiempo(segundos)}</div>
          <div className="botones">
            <button style={{ backgroundColor: '#10b981' }} onClick={() => setActivo(true)}>Iniciar</button>
            <button style={{ backgroundColor: '#fbbf24' }} onClick={() => setActivo(false)}>Pausar</button>
            <button style={{ backgroundColor: '#ef4444' }} onClick={() => { setActivo(false); setSegundos(0); }}>Reiniciar</button>
          </div>
        </div>

        {/* Sets ganados */}
        <div className="sets-ganados">
          <p><strong>{nombreA}</strong> Sets ganados: {setsGanadosA}</p>
          <p><strong>{nombreB}</strong> Sets ganados: {setsGanadosB}</p>
        </div>

        {/* Equipos */}
        <div className="puntaje-section">
          <div className="equipo-card">
            <input
              type="text"
              value={nombreA}
              onChange={(e) => setNombreA(e.target.value)}
              className="equipo-input"
              disabled={setTerminado} // evita cambiar si el set terminó
            />
            <div className="puntos">{puntosA}</div>
            <div className="botones">
              <button onClick={() => restarPunto("A")} disabled={setTerminado}>- Punto</button>
              <button onClick={() => sumarPunto("A")} disabled={setTerminado}>+ Punto</button>
            </div>
          </div>

          <div className="equipo-card">
            <input
              type="text"
              value={nombreB}
              onChange={(e) => setNombreB(e.target.value)}
              className="equipo-input"
              disabled={setTerminado}
            />
            <div className="puntos">{puntosB}</div>
            <div className="botones">
              <button onClick={() => restarPunto("B")} disabled={setTerminado}>- Punto</button>
              <button onClick={() => sumarPunto("B")} disabled={setTerminado}>+ Punto</button>
            </div>
          </div>
        </div>

        {/* Mensaje si el set terminó */}
        {setTerminado && (
          <div className="mensaje-set-terminado">
            <p>
              ⚠️ Set terminado! Ganador: <strong>{puntosA > puntosB ? nombreA : nombreB}</strong>
            </p>
            <button
              onClick={reiniciarSet}
              style={{ marginTop: '1rem', padding: '0.7rem 1.5rem', borderRadius: '0.5rem', backgroundColor: '#10b981', fontWeight: 'bold', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Iniciar nuevo set
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
