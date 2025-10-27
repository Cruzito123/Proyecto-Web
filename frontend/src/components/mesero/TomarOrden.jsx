import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './mesero.css';

// Datos de prueba del menú (en el futuro vendrán del backend)
const MENU_ITEMS = [
    { id: 1, name: "Boeuf Bourguignon", price: 385 },
    { id: 2, name: "Coq au Vin", price: 340 },
    { id: 3, name: "Ratatouille Provenzal", price: 240 },
    { id: 4, name: "Buddha Bowl Francés", price: 260 },
    { id: 5, name: "Crème brûlée", price: 120 },
    { id: 6, name: "Tarta de Manzana", price: 110 },
];

function TomarOrden({ onNuevaOrden, mesasActivas }) {
    const [numeroMesa, setNumeroMesa] = useState('');
    const [orden, setOrden] = useState([]);
    const navigate = useNavigate();

    const agregarPlatillo = (platillo) => {
        setOrden(prevOrden => {
            const platilloExistente = prevOrden.find(item => item.id === platillo.id);
            if (platilloExistente) {
                // Si ya existe, incrementa la cantidad
                return prevOrden.map(item =>
                    item.id === platillo.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            // Si no existe, lo añade con cantidad 1
            return [...prevOrden, { ...platillo, cantidad: 1 }];
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (orden.length === 0) {
            alert("Debes agregar al menos un platillo a la orden.");
            return;
        }
        if (!numeroMesa) {
            alert("Por favor, selecciona una mesa para la orden.");
            return;
        }
        // Llama a la función del componente padre (App.js)
        onNuevaOrden({ mesa: numeroMesa, items: orden });
        navigate('/mesero'); // Regresar al panel
    };

    return (
        <div className="tomar-orden-container">
            <div className="tomar-orden-form">
                <h2>Tomar Nueva Orden</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="numeroMesa">Seleccionar Mesa</label>
                    <select
                        id="numeroMesa"
                        value={numeroMesa}
                        onChange={(e) => setNumeroMesa(e.target.value)}
                        className="select-mesa" // Puedes añadir estilos para este select
                        required
                    >
                        <option value="">-- Selecciona una mesa --</option>
                        {mesasActivas.map(mesa => (
                            <option key={mesa.id} value={mesa.numero}>Mesa {mesa.numero} ({mesa.comensales} comensales)</option>
                        ))}
                    </select>

                    <h3>Menú Disponible</h3>
                    <div className="menu-disponible-grid">
                        {MENU_ITEMS.map(item => (
                            <button key={item.id} type="button" className="platillo-btn" onClick={() => agregarPlatillo(item)}>
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <h3>Orden Actual</h3>
                    <div className="orden-actual-list">
                        {orden.length > 0 ? (
                            orden.map(item => (
                                <div key={item.id} className="orden-item">
                                    <span>{item.cantidad}x {item.name}</span>
                                    <span>${(item.price * item.cantidad).toFixed(2)}</span>
                                </div>
                            ))
                        ) : (
                            <p className="orden-vacia">Aún no has agregado platillos.</p>
                        )}
                    </div>

                    <button type="submit" className="btn-enviar-orden">Enviar a Cocina</button>
                    <button type="button" className="btn-cancelar" onClick={() => navigate('/mesero')}>Cancelar</button>
                </form>
            </div>
        </div>
    );
}

export default TomarOrden;