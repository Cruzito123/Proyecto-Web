
// frontend/src/pages/public/Reservations.jsx

import React from 'react';
import Header from '../../components/common/Header.jsx';
import ReservationForm from '../../components/common/ReservationForm.jsx'; // Nuevo componente

function Reservations() {
    // Función placeholder para manejar el envío (En el futuro, POST a Django)
    const handleReservationSubmit = (data) => {
        console.log("RESERVACIÓN VALIDADA Y ENVIADA:", data);
        alert("🎉 Reservación validada. (Pendiente envío a Django y correo)");
    };

    return (
        <>
            <Header />
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