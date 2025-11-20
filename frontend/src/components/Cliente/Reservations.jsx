// frontend/src/pages/public/Reservations.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import ReservationForm from '../../components/common/ReservationForm.jsx';
import ReservationForm from './ReservationForm.jsx';

function Reservations() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Función para manejar éxito de la reservación
    const handleReservationSuccess = () => {
        // Podemos mostrar un mensaje o redirigir automáticamente
        setTimeout(() => {
            navigate('/cliente'); 
        }, 2000); 
    };


    const handleReservationSubmit = (data) => {
        console.log('Reservación procesada:', data);
        // Aquí podrías agregar lógica adicional si necesitas
        // como analytics, notificaciones, etc.
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
                    
                    {loading && (
                        <div className="loading-message">
                            <p>Procesando reservación...</p>
                        </div>
                    )}
                    
                    {/* El formulario ahora maneja su propio envío a la API */}
                    <ReservationForm />
                </div>
            </main>
        </>
    );
}

export default Reservations;