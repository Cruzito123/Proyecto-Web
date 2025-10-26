// frontend/src/pages/private/GestionPlatillos.jsx

import React from 'react';
import Header from '../../components/common/Header.jsx'; // Necesita el Header
import AltaPlatillo from '../../components/admin/AltaPlatillo.jsx';
import ModificarPlatillo from '../../components/admin/ModificarPlatillo.jsx';
import BajaPlatillo from '../../components/admin/BajaPlatillo.jsx';

function GestionPlatillos() {
    // Funciones placeholders (simuladas) para el envío de formularios
    const handleAlta = (data) => console.log("ALTA ENVIADA:", data);
    const handleModificar = (data) => console.log("MODIFICAR ENVIADO:", data);
    const handleBaja = (data) => console.log("BAJA ENVIADA:", data);

    return (
        <>
            <Header /> 
            <main className="gestion-main-content">
                <h1 className="page-title">Gestión de Platillos</h1>
                
                {/* Contenedor principal para alinear los 3 formularios en una fila */}
                <div className="crud-forms-container">
                    
                    {/* Formulario de CREACIÓN */}
                    <AltaPlatillo onSubmit={handleAlta} /> 
                    
                    {/* Formulario de MODIFICACIÓN */}
                    <ModificarPlatillo onSubmit={handleModificar} /> 
                    
                    {/* Formulario de ELIMINACIÓN */}
                    <BajaPlatillo onSubmit={handleBaja} />
                    
                </div>
            </main>
        </>
    );
}

export default GestionPlatillos;