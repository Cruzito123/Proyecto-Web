import React from 'react';
import './cliente.css'; // Crearemos este archivo CSS a continuación
import { useNavigate } from 'react-router-dom';

// Iconos de marcador de posición (puedes usar react-icons)
const IconoCalendario = () => '📅';
const IconoHistorial = () => '📜';
const IconoLealtad = () => '⭐';
const IconoAccion = () => '⚡';
const IconoReloj = () => '🕒';
const IconoUbicacion = () => '📍';
const IconoBolsa = () => '🛍️';
const IconoResena = () => '✍️';

function PanelCliente({ reservaciones = [] }) {
  const navigate = useNavigate();

  return (
    <div className="client-dashboard-frame">
      
      {/* 1. Encabezado de Bienvenida */}
      <header className="client-header">
        <h1>Bienvenido, martincruzarmas1</h1>
        <p>Panel de Cliente</p>
      </header>

      {/* 2. Layout Principal de 2 Columnas */}
      <main className="client-main-layout">

        {/* --- COLUMNA IZQUIERDA (PRINCIPAL) --- */}
        <section className="client-main-column">

          {/* Card: Mis Reservaciones */}
          <div className="client-content-card">
            <h3><IconoCalendario /> Mis Reservaciones</h3>
            
            <div className="reservations-list">
              {reservaciones.length > 0 ? reservaciones.map(res => (
                <div key={res.id} className="reservation-item">
                  <div className="reservation-info">
                    <span className="info-line"><IconoCalendario /> {res.fecha}</span>
                    <span className="info-line"><IconoReloj /> {res.hora} • {res.personas} personas</span>
                  </div>
                  <div className="reservation-actions">
                    <span className={`status-pill ${res.estado.toLowerCase()}`}>{res.estado}</span>
                    <button className="btn-modify">Modificar</button>
                  </div>
                </div>
              )) : (
                <p>No tienes reservaciones activas.</p>
              )}
            </div>
            
            <button className="btn-full-width-gold" onClick={() => navigate('/reservar')}>Nueva Reservación</button>
          </div>

          {/* Card: Historial de Pedidos */}
          <div className="client-content-card">
            <h3><IconoHistorial /> Historial de Pedidos</h3>
            
            <div className="order-history-list">
              {/* Item de Historial 1 */}
              <div className="order-history-item">
                <div className="order-info">
                  <strong>14/10/2025</strong>
                  <span>3 platillos • Uber Eats</span>
                </div>
                <div className="order-price">
                  <strong>$1250 MXN</strong>
                  <a href="#">Ver detalles</a>
                </div>
              </div>
              
              {/* Item de Historial 2 */}
              <div className="order-history-item">
                <div className="order-info">
                  <strong>9/10/2025</strong>
                  <span>2 platillos • Rappi</span>
                </div>
                <div className="order-price">
                  <strong>$890 MXN</strong>
                  <a href="#">Ver detalles</a>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* --- COLUMNA DERECHA (SIDEBAR) --- */}
        <aside className="client-sidebar-column">

          {/* Card: Programa de Lealtad */}
          <div className="client-content-card">
            <h3><IconoLealtad /> Programa de Lealtad</h3>
            
            <div className="loyalty-badge">
              <div className="loyalty-icon-circle">
                <IconoLealtad />
              </div>
              <h4>Nivel Oro</h4>
              <p>850 puntos</p>
            </div>
            
            <div className="loyalty-progress">
              <p>Progreso a Platino</p>
              <div className="progress-bar-container">
                {/* El width es el porcentaje de progreso (ej. 850 / 1000 = 85%) */}
                <div className="progress-bar-fill" style={{ width: '85%' }}></div>
              </div>
              <span>150 puntos para siguiente nivel</span>
            </div>
            
            <div className="loyalty-benefits">
              <p>Beneficios Actuales:</p>
              <ul className="benefits-list">
                <li><IconoLealtad /> 15% descuento en todos los platillos</li>
                <li><IconoLealtad /> Reservaciones prioritarias</li>
                <li><IconoLealtad /> Postre cortesía en cumpleaños</li>
              </ul>
            </div>
          </div>

          {/* Card: Acciones Rápidas */}
          <div className="client-content-card">
            <h3><IconoAccion /> Acciones Rápidas</h3>
            <div className="client-quick-actions">
              <button><IconoUbicacion /> Ver Ubicación</button>
              <button><IconoBolsa /> Ordenar a Domicilio</button>
              <button><IconoResena /> Dejar Reseña</button>
            </div>
          </div>

        </aside>

      </main>
    </div>
  );
}

export default PanelCliente;