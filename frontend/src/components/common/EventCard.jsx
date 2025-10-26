
// frontend/src/components/common/EventCard.jsx

import React from 'react';

function EventCard({ event }) {
    const { title, desc, type, color, img } = event;

    // Colores de la etiqueta dinámica
    const tagStyles = {
        purple: { backgroundColor: '#8a2be2', icon: '🎵' },
        green: { backgroundColor: '#4caf50', icon: '🍽️' },
        blue: { backgroundColor: '#2196f3', icon: '🍷' },
    };
    const { backgroundColor, icon } = tagStyles[color] || { backgroundColor: '#333', icon: '📅' };

    return (
        <div className="event-card">
            
            <div className="event-image-container">
                <img src={img || '/img/placeholder_event.jpg'} alt={title} className="event-image" />
                {/* Etiqueta Dinámica: Música, Nuevo Platillo, Evento Especial */}
                <span className="event-tag" style={{ backgroundColor }}>{type}</span>
            </div>

            <div className="event-info">
                <div className="event-icon-details">
                    <span className="event-icon">{icon}</span>
                    <h3 className="event-title">{title}</h3>
                </div>
                <p className="event-desc">{desc}</p>
            </div>
            
        </div>
    );
}

export default EventCard;