
// frontend/src/pages/public/LoyaltyProgram.jsx

import React from 'react';
import Header from '../../components/common/Header.jsx';
import LoyaltyForm from '../../components/common/LoyaltyForm.jsx'; // Nuevo componente
import Footer from '../../components/common/Footer.jsx';

function LoyaltyProgram() {
    // Función placeholder para manejar el envío (En el futuro, POST a Django)
    const handleLoyaltySubmit = (data) => {
        console.log("REGISTRO DE LEALTAD ENVIADO:", data);
        alert(`🎉 ¡Gracias por unirte, ${data.email}! Recibirás 100 puntos.`);
    };

    return (
        <>
            <Header />
            <main className="loyalty-main-content">
                <section className="loyalty-hero-text">
                    <h1 className="page-title">Programa de Lealtad</h1>
                    <p className="page-subtitle">Únete a nuestro programa y disfruta de beneficios exclusivos en cada visita</p>
                </section>
                
                {/* Formulario de Registro */}
                <div className="loyalty-form-container">
                    <LoyaltyForm onSubmit={handleLoyaltySubmit} />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default LoyaltyProgram;
