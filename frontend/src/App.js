import React from 'react';
// Importación correcta para React Router v6+
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus componentes de Página Públicos
import Home from './pages/public/Home.jsx'; 
//import Menu from './pages/public/Menu.jsx'; 
//import Reservations from './pages/public/Reservations.jsx';
//import Contact from './pages/public/Contact.jsx'; 

// Importa tus vistas privadas
import GestionPlatillos from './pages/private/GestionPlatillos'; 
// Asegúrate de crear estos archivos en las rutas indicadas:
// - frontend/src/pages/public/Home.jsx
// - frontend/src/pages/private/GestionPlatillos.jsx, etc.

function App() {
  return (
    // <Router> (que es BrowserRouter) envuelve toda la aplicación
    <Router>
      <div className="App">
        {/* <Routes> define el conjunto de rutas */}
        <Routes>
          
          {/* VISTAS PÚBLICAS (Cliente) */}
          <Route path="/" element={<Home />} />
          

          {/* VISTA PRIVADA (Admin) */}
          <Route path="/gestion-platillos" element={<GestionPlatillos />} />
          
          {/* Ruta 404 para URLs no encontradas */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;