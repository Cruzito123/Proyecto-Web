import React from 'react';
import { useNavigate } from 'react-router-dom';
import './mesero.css';

function VerReservaciones({ reservaciones = [] }) {
    const navigate = useNavigate();

    return (
        <div className="reservaciones-container">
            <div className="reservaciones-card">
                <h2>Reservaciones del Día</h2>
                <p>Listado de clientes con reservación para hoy y mañana.</p>

                <table className="reservaciones-table">
                    <thead>
                        <tr>
                            <th>Nombre Cliente</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Personas</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservaciones.map(res => (
                            <tr key={res.id}>
                                <td>{res.nombre}</td>
                                <td>{res.fecha}</td>
                                <td>{res.hora}</td>
                                <td>{res.personas}</td>
                                <td><span className={`status-${res.estado.toLowerCase()}`}>{res.estado}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn-regresar" onClick={() => navigate('/mesero')}>Regresar al Panel</button>
            </div>
        </div>
    );
}

export default VerReservaciones;