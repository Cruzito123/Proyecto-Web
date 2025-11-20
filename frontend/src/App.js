import React, { useState } from 'react';
// Importación correcta para React Router v6+
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importar componentes de pages public
import Home from './pages/public/Home.jsx'; 
import Menu from './pages/public/Menu.jsx'; 
import Contact from './pages/public/Contact.jsx'; 

import Reviews from './pages/public/Reviews.jsx'; 
import LoyaltyProgram from './pages/public/LoyaltyProgram.jsx';
import Events from './pages/public/Events.jsx';
//Cliente
import Cliente from './components/Cliente/cliente.jsx';
import Reservations from './components/Cliente/Reservations.jsx';
// Importar  vistas privates
import GestionPlatillos from './pages/private/GestionPlatillos'; 
import Mesero from './components/mesero/Mesero.jsx';
import PanelChef from './pages/private/Chef.jsx';
import AsignarMesa from './components/mesero/AsignarMesa.jsx';
import TomarOrden from './components/mesero/TomarOrden';
import VerReservaciones from './components/mesero/VerReservaciones';
import GestionEmpleados from './components/admin/GestionEmpleados.jsx';
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

  // Estado para las órdenes listas para entregar por el mesero
  const [ordenesListas, setOrdenesListas] = useState([]);

  // Estado para las reservaciones
  const [reservaciones, setReservaciones] = useState([
    { id: 1, nombre: "Carlos Santana", fecha: "2023-10-28", hora: "20:00", personas: 4, estado: "Confirmada" },
    { id: 2, nombre: "Ana Martínez", fecha: "2023-10-28", hora: "20:30", personas: 2, estado: "Confirmada" },
  ]);

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

  // 4. Función para que el Chef marque una orden como completada
  const handleCompletarOrden = (ordenId) => {
    const ordenCompletada = ordenesPendientes.find(o => o.id === ordenId);
    if (ordenCompletada) {
      // Añade la orden a la lista de "listas para entregar"
      setOrdenesListas(prevListas => [...prevListas, ordenCompletada]);
      // Elimina la orden de la lista de "pendientes" del chef
      setOrdenesPendientes(prevPendientes => prevPendientes.filter(o => o.id !== ordenId));
    }
  };

  // 5. Función para que el Mesero marque una orden como entregada
  const handleEntregarOrden = (ordenId) => {
    // Elimina la orden de la lista de "listas para entregar"
    setOrdenesListas(prevListas => prevListas.filter(o => o.id !== ordenId));
    alert(`Orden de la mesa ${ordenesListas.find(o => o.id === ordenId)?.mesa} entregada.`);
  };

  // 6. Función para que el Cliente cree una nueva reservación
  const handleNuevaReservacion = (nuevaReservacion) => {
    const reservacionConId = {
      ...nuevaReservacion,
      id: Date.now(), // ID único
      estado: 'Pendiente', // Estado inicial
    };
    setReservaciones(prevReservaciones => [...prevReservaciones, reservacionConId]);
    alert(`¡Gracias por tu reservación, ${nuevaReservacion.nombre}! Está pendiente de confirmación.`);
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
          <Route path='/cliente' element={<Cliente reservaciones={reservaciones} />} />
          <Route path="/gestion-empleados" element={<GestionEmpleados />} />
          {/* VISTA PRIVADA (Mesero) */}    
          <Route path="/mesero" element={<Mesero mesasActivas={mesasActivas} ordenesListas={ordenesListas} onEntregarOrden={handleEntregarOrden} />} />
          
          <Route path="/asignar-mesa" element={<AsignarMesa onMesaAsignada={handleAsignarMesa} mesasActivas={mesasActivas} />} />
          <Route path="/tomar-orden" element={<TomarOrden mesasActivas={mesasActivas} onNuevaOrden={handleNuevaOrden} />} />
          <Route path="/ver-reservaciones" element={<VerReservaciones reservaciones={reservaciones} />} />

          <Route path="/chef" element={<PanelChef ordenesPendientes={ordenesPendientes} onCompletarOrden={handleCompletarOrden} />} />

             {/* VISTAS PÚBLICAS (Cliente) */}
           <Route path="/resenas" element={<Reviews />} />
          
          <Route path="/menu" element={<Menu />} />

          <Route path="/reservar" element={<Reservations onReservationSubmit={handleNuevaReservacion} />} />

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