import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './mesero.css';

function TomarOrden({ onNuevaOrden, mesasActivas }) {
    const [numeroMesa, setNumeroMesa] = useState('');
    const [orden, setOrden] = useState([]);
    
    // ✅ NUEVO: Estado para guardar el menú real de la BD
    const [menuItems, setMenuItems] = useState([]); 
    const [loadingMenu, setLoadingMenu] = useState(true);

    const navigate = useNavigate();

    // ✅ NUEVO: Cargar platillos desde la API al iniciar
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('/api/platillos/');
                if (response.ok) {
                    const data = await response.json();
                    setMenuItems(data); // Guardamos los platillos reales
                } else {
                    console.error("Error al cargar menú");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            } finally {
                setLoadingMenu(false);
            }
        };
        fetchMenu();
    }, []);

    const agregarPlatillo = (platillo) => {
        setOrden(prevOrden => {
            const platilloExistente = prevOrden.find(item => item.id === platillo.id);
            if (platilloExistente) {
                return prevOrden.map(item =>
                    item.id === platillo.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
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
        onNuevaOrden({ mesa: numeroMesa, items: orden });
        navigate('/mesero');
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
                        className="select-mesa"
                        required
                    >
                        <option value="">-- Selecciona una mesa --</option>
                        {mesasActivas && mesasActivas.map(mesa => (
                            <option key={mesa.id} value={mesa.numero}>Mesa {mesa.numero} ({mesa.comensales} comensales)</option>
                        ))}
                    </select>

                    <h3>Menú Disponible</h3>
                    <div className="menu-disponible-grid">
                        {loadingMenu ? (
                            <p>Cargando menú...</p>
                        ) : (
                            menuItems.map(item => (
                                <button key={item.id} type="button" className="platillo-btn" onClick={() => agregarPlatillo(item)}>
                                    <div className="platillo-info">
                                        <span className="platillo-nombre">{item.nombre}</span>
                                        <span className="platillo-precio">${parseFloat(item.precio).toFixed(2)}</span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>

                    <h3>Orden Actual</h3>
                    <div className="orden-actual-list">
                        {orden.length > 0 ? (
                            orden.map(item => (
                                <div key={item.id} className="orden-item">
                                    <span>{item.cantidad}x {item.nombre}</span>
                                    <span>${(item.precio * item.cantidad).toFixed(2)}</span>
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
