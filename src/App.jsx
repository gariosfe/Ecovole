import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Futbol from './pages/futbol.jsx'
import Basket from './pages/basket'
import Ecuavoley from './pages/ecuavoley';
import Tenis from './pages/tenis.jsx'

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/futbol" element={<Futbol />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/ecuavoley" element={<Ecuavoley />} />
          <Route path="/tenis" element={<Tenis />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
