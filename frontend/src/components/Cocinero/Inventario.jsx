// frontend/src/components/Chef/Inventario.jsx

import React, { useState } from 'react';
// Importa el componente para formularios (si lo creaste)
import InventarioForm from './InventarioForm.jsx'; 
// Asume que los estilos están en chef.css (importado en el componente padre)
const IconoAlerta = () => '⚠️';
const IconoOk = () => '✅';

// Data simulada (En el futuro, esto se cargará con AJAX GET)
const mockInventario = [
    { id: 1, item: "Vino Tinto", stock: 15, unidad: 'botellas', min_stock: 50, status: 'ok' },
    { id: 2, item: "Pollo", stock: 8, unidad: 'kg', min_stock: 10, status: 'warning' },
    { id: 3, item: "Verduras Frescas", stock: 25, unidad: 'kg', min_stock: 10, status: 'ok' },
    { id: 4, item: "Harina", stock: 3, unidad: 'kg', min_stock: 5, status: 'danger' },
];

function Inventario() {
    // Aquí podrías usar useState(mockInventario) y manejar la actualización
    const [stock, setStock] = useState(mockInventario);
    
    // Función de ejemplo para el formulario de actualización
    const handleUpdateStock = (data) => {
        console.log("Actualizando Stock via AJAX:", data);
        alert(`Simulación: Stock de ${data.item} actualizado a ${data.cantidad}.`);
    };

    return (
        <div className="chef-content-main-layout">
            
            {/* --- Tarjeta de Stock Actual (Columna Izquierda) --- */}
            <section className="chef-main-column">
                <h3 className="chef-section-title">Stock de Ingredientes</h3>
                
                <div className="inventory-grid">
                    {stock.map(item => (
                        <div key={item.id} className={`inventory-item-card ${item.status}`}>
                            <div className="inventory-info">
                                <h4>{item.item}</h4>
                                <p>Stock actual: <strong>{item.stock} {item.unidad}</strong></p>
                            </div>
                            <div className="inventory-status">
                                {item.status === 'danger' && <span className="status-label danger"><IconoAlerta /> ¡Reordenar!</span>}
                                {item.status === 'warning' && <span className="status-label warning">Bajo Stock</span>}
                                {item.status === 'ok' && <span className="status-label ok"><IconoOk /> Suficiente</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* --- Formulario de Actualización Rápida (Columna Derecha) --- */}
            <aside className="chef-sidebar-column">
                <div className="chef-content-card">
                    <h3 className="chef-section-title">Actualización Rápida</h3>
                    {/* Aquí iría el InventarioForm si lo creaste, o un formulario simple */}
                    <p>Formulario para registrar nuevas entradas de inventario o pedidos a proveedor.</p>
                    <button className="chef-btn-actualizar">Generar Pedido a Proveedor</button>
                </div>
                
                {/* Reutilizamos el Formulario de la Imagen 5 para la suscripción/notificación */}
                <div className="chef-content-card">
                    <h3 className="chef-section-title">Notificaciones de Stock</h3>
                    <p>Recibe alertas cuando el stock baje del mínimo.</p>
                    {/* Podrías usar el NewsletterForm aquí adaptado */}
                </div>
            </aside>
        </div>
    );
}

export default Inventario;