import React, { useState, useEffect } from 'react';
import './cliente.css';
import { useNavigate } from 'react-router-dom';

// Iconos de marcador de posición
const IconoCalendario = () => '📅';
const IconoHistorial = () => '📜';
const IconoLealtad = () => '⭐';
const IconoAccion = () => '⚡';
const IconoReloj = () => '🕒';
const IconoUbicacion = () => '📍';
const IconoBolsa = () => '🛍️';
const IconoResena = () => '✍️';

function PanelCliente() {
  const navigate = useNavigate();
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar reservaciones desde la API
  useEffect(() => {
    const cargarReservaciones = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/reservaciones/');
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Reservaciones cargadas:', data);
        setReservaciones(data);
        
      } catch (err) {
        console.error('Error cargando reservaciones:', err);
        setError('No se pudieron cargar las reservaciones');
      } finally {
        setLoading(false);
      }
    };

    cargarReservaciones();
  }, []);

  // Función para formatear la fecha (opcional)
  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Función para formatear la hora (opcional)
  const formatearHora = (horaString) => {
    const hora = new Date(`2000-01-01T${horaString}`);
    return hora.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

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
              {loading ? (
                <p>Cargando reservaciones...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : reservaciones.length > 0 ? (
                reservaciones.map(reserva => (
                  <div key={reserva.id} className="reservation-item">
                    <div className="reservation-info">
                      <span className="info-line">
                        <IconoCalendario /> {formatearFecha(reserva.fecha)}
                      </span>
                      <span className="info-line">
                        <IconoReloj /> {formatearHora(reserva.hora)} • {reserva.num_personas} personas
                      </span>
                      {reserva.nombre_cliente && (
                        <span className="info-line">
                          👤 A nombre de: {reserva.nombre_cliente}
                        </span>
                      )}
                    </div>
                    <div className="reservation-actions">
                      <span className={`status-pill ${reserva.estado.toLowerCase()}`}>
                        {reserva.estado}
                      </span>
                      <button className="btn-modify">Modificar</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No tienes reservaciones activas.</p>
              )}
            </div>
            
            <button 
              className="btn-full-width-gold" 
              onClick={() => navigate('/reservar')}
            >
              Nueva Reservación
            </button>
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