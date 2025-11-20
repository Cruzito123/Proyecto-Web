// frontend/src/components/admin/PlatilloManagementForms.jsx

import React from 'react';
// Importa los componentes individuales
import AltaPlatillo from './AltaPlatillo.jsx';
import ModificarPlatillo from './ModificarPlatillo.jsx';
import BajaPlatillo from './BajaPlatillo.jsx';

// Este componente consolida la presentación de los tres formularios CRUD.
function PlatilloManagementForms({ onAltaSubmit, onModificarSubmit, onBajaSubmit }) {
    return (
        // Contenedor principal que alinea las 3 tarjetas en una fila
        <div className="crud-forms-container">
            
            {/* Formulario de CREACIÓN */}
            <AltaPlatillo onSubmit={onAltaSubmit} /> 
            
            {/* Formulario de MODIFICACIÓN */}
            <ModificarPlatillo onSubmit={onModificarSubmit} /> 
            
            {/* Formulario de ELIMINACIÓN */}
            <BajaPlatillo onSubmit={onBajaSubmit} />
            
        </div>
    );
}

export default PlatilloManagementForms;