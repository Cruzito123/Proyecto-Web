
// frontend/src/pages/public/Events.jsx

import React from 'react';
import Header from '../../components/common/Header.jsx';
import NewsletterForm from '../../components/common/NewsletterForm.jsx'; // Nuevo componente
import EventCard from '../../components/common/EventCard.jsx'; // Nuevo componente

// Datos de prueba simulados (MOCK_EVENTS)
const MOCK_EVENTS = [
    { id: 1, title: "Noche de Jazz en Vivo", desc: "Música en un ambiente íntimo.", type: "Música", color: "purple", img: "/img/event_jazz.jpg" },
    { id: 2, title: "Lanzamiento: Risotto de Trufa Negra", desc: "Prueba nuestro nuevo plato de temporada.", type: "Nuevo Platillo", color: "green", img: "/img/event_risotto.jpg" },
    { id: 3, title: "Cata de Vinos Franceses", desc: "Un recorrido por los viñedos de Borgoña.", type: "Evento Especial", color: "blue", img: "/img/event_wine.jpg" },
    { id: 4, title: "Show de Magia", desc: "Sorprende a tu mesa con nuestro mago residente.", type: "Evento Especial", color: "blue", img: "/img/event_magic.jpg" },
];

function Events() {
    const handleSubscriptionSubmit = (data) => {
        console.log("SUSCRIPCIÓN DE BOLETÍN ENVIADA:", data);
        alert(`📧 ¡Suscripción exitosa para ${data.email}!`);
    };

    return (
        <>
            <Header />
            <main className="events-main-content">
                <section className="events-hero-text">
                    <h1 className="page-title">Próximos Eventos</h1>
                    <p className="page-subtitle">No te pierdas nuestros eventos especiales, música en vivo y lanzamientos de nuevos platillos</p>
                </section>
                
                {/* Cuadrícula de Eventos (Implementa dinamismo y lectura de BD) */}
                <div className="events-grid">
                    {MOCK_EVENTS.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>

                {/* Formulario de Suscripción (Modal de la imagen) */}
                <section className="newsletter-section">
                    <NewsletterForm onSubmit={handleSubscriptionSubmit} />
                </section>
            </main>
        </>
    );
}

export default Events;