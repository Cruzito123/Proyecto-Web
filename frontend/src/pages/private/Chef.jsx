import React, { useState } from 'react';


// Puedes reemplazar estos íconos con los de una librería como React-Icons
const IconoCompletado = () => '✅';
const IconoActivo = () => '🔥';
const IconoTiempo = () => '⏱️';
const IconoEspecial = () => '⭐';
const IconoOrden = () => '🧾';
const IconoInventario = () => '📦';
const IconoAccion = () => '⚡';
const IconoAlerta = () => '⚠️';


function PanelChef({ ordenesPendientes = [], onCompletarOrden }) {
  // Estado para controlar la visibilidad del modal de bienvenida
  const [mostrarModal, setMostrarModal] = useState(true);

  // --- MODAL DE BIENVENIDA ---
  // Si el estado es true, muestra el modal.
  if (mostrarModal) {
    return (
      <div className="chef-modal-overlay">
        <div className="chef-modal-content">
          <div className="chef-modal-icon">👨‍🍳</div>
          <h2>Bienvenido a tu Panel de Chef</h2>
          <p>Aquí encontrarás todas las herramientas para tu rol</p>
          
          <div className="chef-features-list">
             <div className="chef-feature-item">
               <span>⏱️</span> Órdenes en preparación en tiempo real
             </div>
             <div className="chef-feature-item">
               <span>⚠️</span> Sistema de prioridades y urgencias
             </div>
             <div className="chef-feature-item">
               <span>📦</span> Control de inventario
             </div>
             <div className="chef-feature-item">
               <span>✅</span> Seguimiento de órdenes completadas
             </div>
          </div>

          <button 
            className="chef-btn-ir-panel"
            onClick={() => setMostrarModal(false)} // Al hacer clic, oculta el modal
          >
            Ir a mi Panel
          </button>
        </div>
      </div>
    );
  }

  // --- PANEL PRINCIPAL DEL CHEF ---
  // Si mostrarModal es false, muestra el dashboard real.
  return (
    <div className="chef-dashboard-frame">
      
      {/* 1. Encabezado del Panel */}
      <header className="chef-header">
        <h1>Cocina - Chef weweqeqweq</h1>
        <p>Panel de gestión de cocina</p>
      </header>

      {/* 2. Tarjetas de Estadísticas (KPIs) */}
      <section className="chef-stats-grid">
        <div className="chef-stat-card">
          <div>
            <p>Órdenes Completadas</p>
            <h2>45</h2>
          </div>
          <div className="chef-stat-icon-wrapper green">
            <IconoCompletado />
          </div>
        </div>
        <div className="chef-stat-card">
          <div>
            <p>Órdenes Activas</p>
            <h2>8</h2>
          </div>
          <div className="chef-stat-icon-wrapper yellow">
            <IconoActivo />
          </div>
        </div>
        <div className="chef-stat-card">
          <div>
            <p>Tiempo Promedio</p>
            <h2>18 min</h2>
          </div>
          <div className="chef-stat-icon-wrapper blue">
            <IconoTiempo />
          </div>
        </div>
        <div className="chef-stat-card">
          <div>
            <p>Pedidos Especiales</p>
            <h2>12</h2>
          </div>
          <div className="chef-stat-icon-wrapper purple">
            <IconoEspecial />
          </div>
        </div>
      </section>

      {/* 3. Contenido Principal (2 Columnas) */}
      <main className="chef-main-content-layout">
        
        {/* Columna Izquierda (Órdenes) */}
        <section className="chef-main-column">
          <h3 className="chef-section-title"><IconoOrden /> Órdenes en Preparación</h3>
          
          {ordenesPendientes.length > 0 ? (
            ordenesPendientes.map(orden => (
              <div key={orden.id} className="chef-order-card">
                <div className="chef-order-header">
                  <h4>Mesa #{orden.mesa}</h4>
                  <span><IconoTiempo /> Recién llegada</span>
                </div>
                <div className="chef-order-item-list">
                  {orden.items.map(item => (
                    <div key={item.id} className="chef-order-item">
                      <span><strong>{item.cantidad}x</strong> {item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="chef-order-actions">
                  <button className="chef-btn-process">En Proceso</button>
                  <button className="chef-btn-complete" onClick={() => onCompletarOrden(orden.id)}>Completar</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', padding: '20px', color: '#777' }}>No hay órdenes pendientes en este momento.</p>
          )}

        </section>

        {/* Columna Derecha (Inventario y Acciones) */}
        <aside className="chef-sidebar-column">
          
          {/* Tarjeta de Inventario */}
          <div className="chef-content-card">
            <h3><IconoInventario /> Inventario</h3>
            <div className="chef-inventory-list">
              <div className="chef-inventory-item ok">
                <span>Vino Tinto</span>
                <span>15 botellas</span>
              </div>
              <div className="chef-inventory-item warning">
                <span>Pollo</span>
                <span>8 kg <IconoAlerta /></span>
              </div>
              <div className="chef-inventory-item ok">
                <span>Verduras Frescas</span>
                <span>25 kg</span>
              </div>
              <div className="chef-inventory-item danger">
                <span>Harina</span>
                <span>3 kg <IconoAlerta /></span>
              </div>
            </div>
            <button className="chef-btn-actualizar">Actualizar Inventario</button>
          </div>
          
          {/* Tarjeta de Acciones Rápidas */}
          <div className="chef-content-card">
            <h3><IconoAccion /> Acciones Rápidas</h3>
            <div className="chef-quick-actions">
              <button>Ver Menú del Día</button>
              <button>Gestionar Proveedores</button>
              <button>Reportar Problema</button>
            </div>
          </div>

        </aside>
      </main>

    </div>
  );
}

export default PanelChef;