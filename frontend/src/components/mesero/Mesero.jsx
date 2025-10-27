import React from 'react';
import { useNavigate } from 'react-router-dom';
// Asumo que tu 'styles.css' se importa en un archivo superior como App.js o index.js
// Si no, descomenta la siguiente línea:
// import '../../styles.css'; 

import HedearUsuarios from '../common/HedearUsuarios.jsx';

// Puedes reemplazar estos íconos con los de una librería como React-Icons
const IconoUsuario = () => '👤';
const IconoDinero = () => '💲';
const IconoReloj = () => '🕓';

function Mesero({ mesasActivas, ordenesListas, onEntregarOrden }) {
  const navigate = useNavigate();

  return (
    <> 
      {/* El <div> principal DEBE tener la clase 'dashboard-frame'
        para que los estilos CSS funcionen.
      */}
      <div className="dashboard-frame">
        
        {/* Y el header debe estar DENTRO del 'dashboard-frame' 
          para que herede los estilos.
        */}
        <HedearUsuarios /> 

        {/* 2. Tarjetas de Estadísticas (KPIs) */}
        <section className="stats-grid">
          <div className="stat-card">
            <div>
              <p>Mesas Atendidas</p>
              <h2>12</h2>
            </div>
            <div className="stat-icon-wrapper yellow">
              <IconoUsuario />
            </div>
          </div>
          <div className="stat-card">
            <div>
              <p>Ventas del Día</p>
              <h2>$8450</h2>
            </div>
            <div className="stat-icon-wrapper green">
              <IconoDinero />
            </div>
          </div>
          <div className="stat-card">
            <div>
              <p>Propinas</p>
              <h2>$1200</h2>
            </div>
            <div className="stat-icon-wrapper blue">
              <IconoDinero />
            </div>
          </div>
          <div className="stat-card">
            <div>
              <p>Tiempo Promedio</p>
              <h2>45 min</h2>
            </div>
            <div className="stat-icon-wrapper purple">
              <IconoReloj />
            </div>
          </div>
        </section>

        {/* 3. Contenido Principal (2 Columnas) */}
        <main className="main-content-layout">
          
          {/* Columna Izquierda */}
          <section className="main-column">
            <div className="content-card">
              <h3><span role="img" aria-label="bandeja">🍽️</span> Mesas Activas</h3>
              <table className="mesas-table">
                <thead>
                  <tr>
                    <th># Mesa</th>
                    <th>Comensales</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mesasActivas.map((mesa) => (
                    <tr key={mesa.id}>
                      <td><strong>{mesa.numero}</strong></td>
                      <td>{mesa.comensales}</td>
                      <td>
                        <span className={`status-pill ${mesa.estado.toLowerCase()}`}>
                          {mesa.estado}
                        </span>
                      </td>
                      <td>
                        <button className="action-button">Ver</button>
                        <button className="action-button primary">Cobrar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Columna Derecha */}
          <aside className="sidebar-column">
            
            <div className="content-card">
              <h3><span role="img" aria-label="ticket">🧾</span> Pedidos Pendientes</h3>
              {ordenesListas && ordenesListas.length > 0 ? (
                ordenesListas.map(orden => (
                  <div key={orden.id} className="pedido-item">
                    <div className="pedido-header">
                      <span>Mesa #{orden.mesa}</span>
                      <span className="pedido-status listo">Listo</span>
                    </div>
                    <ul className="pedido-platos">
                      {orden.items.map(item => (
                        <li key={item.id}>{item.cantidad}x {item.name}</li>
                      ))}
                    </ul>
                    <button 
                      className="entregar-button"
                      onClick={() => onEntregarOrden(orden.id)}
                    >
                      Listo (Entregar)
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', padding: '20px', color: '#888' }}>No hay pedidos listos para entregar.</p>
              )}
            </div>
            
            <div className="content-card">
              <h3><span role="img" aria-label="rayo">⚡</span> Acciones Rápidas</h3>
              {/* Aquí irían tus botones de acción */}
              <div className="quick-actions-buttons">
                <button onClick={() => navigate('/asignar-mesa')}>Asignar Mesa Nueva</button>
                <button onClick={() => navigate('/tomar-orden')}>Tomar Orden</button>
                <button onClick={() => navigate('/ver-reservaciones')}>Ver Reservaciones</button>
              </div>
            </div>

          </aside>
        </main>

      </div>
    </>
  );
}

export default Mesero;