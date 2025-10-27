import React from 'react';


import HedearUsuarios from '../../components/common/HedearUsuarios.jsx';


const IconoUsuario = () => '👤';
const IconoDinero = () => '💲';
const IconoReloj = () => '🕓';

function Mesero() {
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
              {/* Aquí iría tu componente de Tabla de Mesas */}
              <p style={{ textAlign: 'center', padding: '20px' }}>
                (Aquí va la tabla de mesas activas)
              </p>
            </div>
          </section>

          {/* Columna Derecha */}
          <aside className="sidebar-column">
            
            <div className="content-card">
              <h3><span role="img" aria-label="ticket">🧾</span> Pedidos Pendientes</h3>
              {/* Aquí iría tu componente de Pedidos */}
              <p style={{ padding: '10px' }}>
                (Contenido de pedidos pendientes...)
              </p>
            </div>
            
            <div className="content-card">
              <h3><span role="img" aria-label="rayo">⚡</span> Acciones Rápidas</h3>
              {/* Aquí irían tus botones de acción */}
              <div className="quick-actions-buttons">
                <button>Asignar Mesa Nueva</button>
                <button>Tomar Orden</button>
                <button>Ver Reservaciones</button>
              </div>
            </div>

          </aside>
        </main>

      </div>
    </>
  );
}

export default Mesero;