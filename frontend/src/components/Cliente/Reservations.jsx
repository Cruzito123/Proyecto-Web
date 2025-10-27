
// frontend/src/pages/public/Reservations.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationForm from './ReservationForm.jsx'; // Componente del formulario de reservación



function Reservations({ onReservationSubmit }) {
    const navigate = useNavigate();

    const handleReservationSubmit = (data) => {
        onReservationSubmit(data);
        navigate('/cliente'); // Redirige al panel del cliente tras reservar
    };

    return (
        <>
            
            <main className="reservations-main-content">
                <section className="reservation-hero-text">
                    <h1 className="page-title">Reservaciones</h1>
                    <p className="page-subtitle">Reserva tu mesa y asegura una experiencia gastronómica inolvidable</p>
                </section>
                
                {/* Contenedor del formulario */}
                <div className="reservation-form-container">
                    <h2 className="form-title">Formulario de Reservación</h2>
                    <ReservationForm onSubmit={handleReservationSubmit} />
                </div>
            </main>
            
        </>
    );
}

export default Reservations;