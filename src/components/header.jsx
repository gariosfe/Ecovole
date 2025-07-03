import { Link } from 'react-router-dom'
import './header.css'
import { useState } from 'react'

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src="src/assets/logo-uide.webp" alt="Logo" className="logo-img" />
          <span className="logo-text">Ecoscore</span>
        </div>

        <nav className="nav-links">
          <Link to="/home">Inicio</Link>

          <div className="menu-hamburguesa">
            <button
              className="hamburguesa-btn"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              ☰ Contador
            </button>
            {menuAbierto && (
              <div className="dropdown-menu">
                <Link to="/futbol">Futbol</Link>
                <Link to="/basket">Basket</Link>
                <Link to="/ecuavoley">Ecuavoley</Link>
                <Link to="/tenis">Tennis</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
