import React, { useState } from 'react';
// Importación correcta para React Router v6+
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar componentes de pages public
import Home from './pages/public/Home.jsx'; 
import Menu from './pages/public/Menu.jsx'; 
import Reservations from './pages/public/Reservations.jsx';
import Contact from './pages/public/Contact.jsx'; 

import Reviews from './pages/public/Reviews.jsx'; 
import LoyaltyProgram from './pages/public/LoyaltyProgram.jsx';
import Events from './pages/public/Events.jsx';


// Importar  vistas privates
import GestionPlatillos from './pages/private/GestionPlatillos'; 
import Mesero from './components/mesero/Mesero.jsx';
import PanelChef from './pages/private/Chef.jsx';

import AsignarMesa from './components/mesero/AsignarMesa.jsx';
import TomarOrden from './components/mesero/TomarOrden';
import VerReservaciones from './components/mesero/VerReservaciones';
// Asegúrate de crear estos archivos en las rutas indicadas:
// - frontend/src/pages/public/Home.jsx
// - frontend/src/pages/private/GestionPlatillos.jsx, etc.

function App() {
  // 1. Estado centralizado para las mesas activas
  const [mesasActivas, setMesasActivas] = useState([
    { id: 1, numero: 3, comensales: 4, estado: 'Comiendo' },
    { id: 2, numero: 8, comensales: 2, estado: 'Ordenando' },
  ]);

  // Estado para las órdenes pendientes para el chef
  const [ordenesPendientes, setOrdenesPendientes] = useState([]);

  // 2. Función para agregar una nueva mesa al estado
  const handleAsignarMesa = (nuevaMesa) => {
    const mesaConEstado = {
      ...nuevaMesa,
      id: Date.now(), // ID único basado en el tiempo
      estado: 'En servicio', // Estado inicial
    };
    setMesasActivas(prevMesas => [...prevMesas, mesaConEstado]);
  };

  // 3. Función para agregar una nueva orden para el chef
  const handleNuevaOrden = (nuevaOrden) => {
    const ordenConId = {
      ...nuevaOrden,
      id: Date.now(), // ID único
    };
    setOrdenesPendientes(prevOrdenes => [...prevOrdenes, ordenConId]);
    alert(`Orden para la mesa ${nuevaOrden.mesa} enviada a cocina.`);
  };
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


          <Route path="/mesero" element={<Mesero mesasActivas={mesasActivas} />} />
          
          <Route path="/asignar-mesa" element={<AsignarMesa onMesaAsignada={handleAsignarMesa} mesasActivas={mesasActivas} />} />
          <Route path="/tomar-orden" element={<TomarOrden mesasActivas={mesasActivas} onNuevaOrden={handleNuevaOrden} />} />
          <Route path="/ver-reservaciones" element={<VerReservaciones />} />

          <Route path="/chef" element={<PanelChef ordenesPendientes={ordenesPendientes} />} />

           <Route path="/resenas" element={<Reviews />} />
          
          <Route path="/menu" element={<Menu />} />

          <Route path="/reservar" element={<Reservations />} />

          <Route path="/lealtad" element={<LoyaltyProgram />} />

          <Route path="/contacto" element={<Contact />} />

          <Route path="/eventos" element={<Events />} />

          {/* Ruta 404 para URLs no encontradas */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;