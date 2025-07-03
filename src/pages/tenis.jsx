import { useState } from 'react';
import Header from '../components/header.jsx';
import './tenis.css';

const puntosMap = [0, 15, 30, 40];

export default function Tenis() {
  const [nombreA, setNombreA] = useState('Jugador A');
  const [nombreB, setNombreB] = useState('Jugador B');

  // Puntos dentro del game (0..4, donde 4 = ventaja)
  const [puntosA, setPuntosA] = useState(0);
  const [puntosB, setPuntosB] = useState(0);

  // Games ganados en el set actual
  const [gamesA, setGamesA] = useState(0);
  const [gamesB, setGamesB] = useState(0);

  // Sets ganados
  const [setsA, setSetsA] = useState(0);
  const [setsB, setSetsB] = useState(0);

  // Controla si el game actual terminó
  const [gameTerminado, setGameTerminado] = useState(false);
  // Controla si el partido terminó
  const [partidoTerminado, setPartidoTerminado] = useState(false);
  // Guarda el ganador final (A, B o null)
  const [ganadorFinal, setGanadorFinal] = useState(null);

  // Función para manejar cuando un jugador gana un punto
  function puntoPara(jugador) {
    if (gameTerminado || partidoTerminado) return;

    if (jugador === 'A') {
      if (puntosA < 3) {
        setPuntosA(puntosA + 1);
      } else if (puntosA === 3) {
        if (puntosB < 3) {
          ganarGame('A');
        } else if (puntosB === 3) {
          setPuntosA(4); // ventaja
        } else if (puntosB === 4) {
          setPuntosB(3); // vuelve a empate 40-40
        }
      } else if (puntosA === 4) {
        ganarGame('A');
      }
    } else {
      if (puntosB < 3) {
        setPuntosB(puntosB + 1);
      } else if (puntosB === 3) {
        if (puntosA < 3) {
          ganarGame('B');
        } else if (puntosA === 3) {
          setPuntosB(4); // ventaja
        } else if (puntosA === 4) {
          setPuntosA(3); // vuelve a empate 40-40
        }
      } else if (puntosB === 4) {
        ganarGame('B');
      }
    }
  }

  // Función que se llama al ganar un game
  function ganarGame(jugador) {
    setGameTerminado(true);

    if (jugador === 'A') {
      setGamesA(prev => {
        const nuevosGamesA = prev + 1;
        chequearSet(nuevosGamesA, gamesB, 'A');
        return nuevosGamesA;
      });
    } else {
      setGamesB(prev => {
        const nuevosGamesB = prev + 1;
        chequearSet(gamesA, nuevosGamesB, 'B');
        return nuevosGamesB;
      });
    }
  }

  // Verifica si alguien ganó el set (6 games con diferencia 2)
  function chequearSet(gamesJugador, gamesRival, jugador) {
    if (gamesJugador >= 6 && gamesJugador - gamesRival >= 2) {
      // jugador gana el set
      if (jugador === 'A') {
        setSetsA(prev => {
          const nuevosSetsA = prev + 1;
          chequearPartido(nuevosSetsA, setsB, 'A');
          return nuevosSetsA;
        });
      } else {
        setSetsB(prev => {
          const nuevosSetsB = prev + 1;
          chequearPartido(setsA, nuevosSetsB, 'B');
          return nuevosSetsB;
        });
      }
      // Reinicia games para nuevo set
      setGamesA(0);
      setGamesB(0);
    }
  }

  // Verifica si alguien ganó el partido (3 sets, por ejemplo)
  function chequearPartido(setsJugador, setsRival, jugador) {
    if (setsJugador >= 3) {
      setPartidoTerminado(true);
      setGanadorFinal(jugador);
    }
  }

  // Reiniciar puntos para el siguiente game
  function reiniciarGame() {
    setPuntosA(0);
    setPuntosB(0);
    setGameTerminado(false);
  }

  // Reiniciar todo para nuevo partido
  function reiniciarPartido() {
    setPuntosA(0);
    setPuntosB(0);
    setGamesA(0);
    setGamesB(0);
    setSetsA(0);
    setSetsB(0);
    setGameTerminado(false);
    setPartidoTerminado(false);
    setGanadorFinal(null);
  }

  // Mostrar puntaje de puntos en el game
  function mostrarPuntos(jugador) {
    if (puntosA >= 3 && puntosB >= 3) {
      if (puntosA === puntosB) return '40 - 40';
      if (puntosA === 4) return 'Ventaja';
      if (puntosB === 4) return '- Ventaja';
    }
    return jugador === 'A' ? puntosMap[puntosA] : puntosMap[puntosB];
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="tenis-container">
        <h2 className="titulo-tenis">🎾 Marcador de Tenis</h2>

        {/* Nombres jugadores */}
        <div className="jugadores">
          <input
            type="text"
            value={nombreA}
            onChange={e => setNombreA(e.target.value)}
            className="jugador-input"
            disabled={partidoTerminado}
          />
          <input
            type="text"
            value={nombreB}
            onChange={e => setNombreB(e.target.value)}
            className="jugador-input"
            disabled={partidoTerminado}
          />
        </div>

        {/* Sets ganados */}
        <div className="sets-ganados">
          <div>
            <strong>{nombreA}</strong> Sets: {setsA}
          </div>
          <div>
            <strong>{nombreB}</strong> Sets: {setsB}
          </div>
        </div>

        {/* Games ganados */}
        <div className="games-ganados">
          <div>
            <strong>{nombreA}</strong> Games: {gamesA}
          </div>
          <div>
            <strong>{nombreB}</strong> Games: {gamesB}
          </div>
        </div>

        {/* Puntos actual game */}
        <div className="puntos-game">
          <div className={`puntos-individual ${gameTerminado && puntosA > puntosB ? 'ganador' : ''}`}>
            {mostrarPuntos('A')}
          </div>
          <div className={`puntos-individual ${gameTerminado && puntosB > puntosA ? 'ganador' : ''}`}>
            {mostrarPuntos('B')}
          </div>
        </div>

        {/* Botones puntos */}
        <div className="botones-puntos">
          <button onClick={() => puntoPara('A')} disabled={gameTerminado || partidoTerminado}>
            + Punto {nombreA}
          </button>
          <button onClick={() => puntoPara('B')} disabled={gameTerminado || partidoTerminado}>
            + Punto {nombreB}
          </button>
        </div>

        {/* Botón reiniciar game */}
        {gameTerminado && !partidoTerminado && (
          <button className="reiniciar-game" onClick={reiniciarGame}>
            Nuevo Game
          </button>
        )}

        {/* Mensaje final */}
        {partidoTerminado && (
          <div className="mensaje-final">
            🎉 Partido terminado! Ganador: <strong>{ganadorFinal === 'A' ? nombreA : nombreB}</strong>
            <button className="reiniciar-partido" onClick={reiniciarPartido}>Reiniciar Partido</button>
          </div>
        )}
      </main>
    </div>
  );
}
