import React from 'react';
import { useNavigate } from 'react-router-dom';
import './mesero.css';

// Datos de prueba de reservaciones (en el futuro vendrán del backend)
const MOCK_RESERVATIONS = [
    { id: 1, nombre: "Carlos Santana", fecha: "2023-10-28", hora: "20:00", personas: 4, estado: "Confirmada" },
    { id: 2, nombre: "Ana Martínez", fecha: "2023-10-28", hora: "20:30", personas: 2, estado: "Confirmada" },
    { id: 3, nombre: "Luis Jiménez", fecha: "2023-10-28", hora: "21:00", personas: 5, estado: "Pendiente" },
    { id: 4, nombre: "Sofía Gómez", fecha: "2023-10-29", hora: "14:00", personas: 3, estado: "Confirmada" },
];

function VerReservaciones() {
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
                        {MOCK_RESERVATIONS.map(res => (
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