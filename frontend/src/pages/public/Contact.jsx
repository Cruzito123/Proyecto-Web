
// frontend/src/pages/public/Contact.jsx

import React from 'react';
import Header from '../../components/common/Header.jsx';
import Footer from '../../components/common/Footer.jsx';

// Componente reutilizable para cada tarjeta de información
const ContactCard = ({ icon, title, children }) => (
    <div className="contact-info-card">
        <div className="info-icon-container">{icon}</div>
        <div className="info-details">
            <h3 className="card-title">{title}</h3>
            {children}
        </div>
    </div>
);

function Contact() {
    return (
        <>
            <Header />
            <main className="contact-main-content">
                <section className="contact-hero-text">
                    <h1 className="page-title">Contáctanos</h1>
                    <p className="page-subtitle">Visítanos o ponte en contacto con nosotros para cualquier consulta</p>
                </section>
                
                {/* Contenedor principal de las tarjetas */}
                <div className="contact-details-grid">
                    
                    {/* Tarjeta 1: Dirección */}
                    <ContactCard icon="📍" title="Dirección">
                        <p>Av. Paseo de la Reforma 505</p>
                        <p>Cuauhtémoc, 06500</p>
                        <p>Ciudad de México, CDMX</p>
                        {/* Aquí iría el componente de Mapa interactivo */}
                        <a href="https://maps.app.goo.gl/ejemplo" target="_blank" rel="noopener noreferrer" className="map-link">Ver en Mapa</a>
                    </ContactCard>

                    {/* Tarjeta 2: Teléfono */}
                    <ContactCard icon="📞" title="Teléfono">
                        <p>+52 (55) 1234-5678</p>
                        <p>+52 (55) 8765-4321</p>
                    </ContactCard>

                    {/* Tarjeta 3: Correo Electrónico */}
                    <ContactCard icon="✉️" title="Correo Electrónico">
                        <p>info@lejardinmexican.com</p>
                        <p>reservaciones@lejardinmexican.com</p>
                    </ContactCard>
                    
                    {/* Tarjeta 4: Horarios */}
                    <ContactCard icon="⏱️" title="Horarios">
                        <p>Lunes - Viernes: 13:00 - 23:00</p>
                        <p>Sábado: 12:00 - 00:00</p>
                        <p>Domingo: 12:00 - 22:00</p>
                    </ContactCard>

                </div>
                
                {/* Aquí iría la integración con Uber Eats, Rappi, etc. */}
                <section className="delivery-integration">
                    <h2 className="delivery-title">¿Prefieres Delivery?</h2>
                    <p>Encuéntranos en nuestras plataformas asociadas para disfrutar en casa:</p>
                    <div className="delivery-icons">
                        {/* Íconos de Delivery: En el futuro usarías imágenes de la carpeta public/ */}
                        <span className="delivery-icon">Uber Eats</span>
                        <span className="delivery-icon">Rappi</span>
                        <span className="delivery-icon">Didi Food</span>
                    </div>
                </section>

                {/* Aquí iría el componente de Footer */}
            </main>
            <Footer />
        </>
    );
}

export default Contact;