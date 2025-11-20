
// frontend/src/components/Chef/OrdenesActivas.jsx

import React from 'react';

// Se puede reemplazar con data real de la API
const mockOrdenes = [
    { id: 1, mesa: 5, tiempo: '8 min', items: [{cantidad: 2, name: 'Coq au Vin'}, {cantidad: 1, name: 'Ratatouille'}], urgente: false },
    { id: 2, mesa: 12, tiempo: '18 min', items: [{cantidad: 1, name: 'Tarta Tatin'}], urgente: true },
];

// Iconos que usaste en tu código
const IconoCompletado = () => '✅';
const IconoActivo = () => '🔥';
const IconoTiempo = () => '⏱️';
const IconoEspecial = () => '⭐';
const IconoOrden = () => '🧾';

function OrdenesActivas() {
    const ordenesPendientes = mockOrdenes;
    const onCompletarOrden = (id) => console.log(`Completar orden ${id}`); // Simulación

    return (
        // Contenedor principal que usa el layout de 2 columnas de chef-main-content-layout
        <div className="chef-main-content-layout">
            
            {/* 🚨 1. Columna Izquierda (Órdenes Activas) */}
            <section className="chef-main-column">
                <h3 className="chef-section-title"><IconoOrden /> Órdenes en Preparación</h3>
                
                {ordenesPendientes.length > 0 ? (
                    ordenesPendientes.map(orden => (
                        <div key={orden.id} className={`chef-order-card ${orden.urgente ? 'urgent' : ''}`}>
                            <div className="chef-order-header">
                                <h4>Mesa #{orden.mesa}</h4>
                                <span>{orden.urgente ? <span className="urgent-label">URGENTE</span> : <IconoTiempo />} {orden.tiempo}</span>
                            </div>
                            <div className="chef-order-item-list">
                                {orden.items.map((item, index) => (
                                    <div key={index} className="chef-order-item">
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

            {/* 🚨 2. Columna Derecha (Estadísticas y KPIs) */}
            <aside className="chef-sidebar-column">
                <div className="kpis-summary">
                    <div className="kpi-card"><div><p>Órdenes Completadas</p><h2>45</h2></div><div className="chef-stat-icon-wrapper green"><IconoCompletado /></div></div>
                    <div className="kpi-card"><div><p>Órdenes Activas</p><h2>{ordenesPendientes.length}</h2></div><div className="chef-stat-icon-wrapper yellow"><IconoActivo /></div></div>
                    <div className="kpi-card"><div><p>Tiempo Promedio</p><h2>18 min</h2></div><div className="chef-stat-icon-wrapper blue"><IconoTiempo /></div></div>
                    <div className="kpi-card"><div><p>Pedidos Especiales</p><h2>12</h2></div><div className="chef-stat-icon-wrapper purple"><IconoEspecial /></div></div>
                </div>

                {/* Esta es la Tarjeta de Inventario de tu código original, ahora es solo un placeholder */}
                <div className="chef-content-card">
                    <h3 className="chef-section-title">Inventario Rápido</h3>
                    <p>Aquí se podría mostrar un resumen del inventario.</p>
                    <button className="chef-btn-actualizar">Ver Inventario Completo</button>
                </div>
            </aside>
        </div>
    );
}

export default OrdenesActivas;