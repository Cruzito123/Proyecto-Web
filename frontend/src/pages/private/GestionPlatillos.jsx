// frontend/src/pages/private/GestionPlatillos.jsx

import React, { useState } from 'react'; 
// Importar el nuevo componente consolidado
import PlatilloManagementForms from '../../components/admin/PlatilloManagementForms.jsx'; 
// Importar componentes de Header
import HedearUser from '../../components/common/HeaderUsers.jsx';
import ContentNavbar from '../../components/admin/ContentNavbar.jsx';

// URL base de tu API de Django (ajusta si es necesario)
const API_URL = "http://localhost:8000/api/platillos/";

function GestionPlatillos() {
    const [message, setMessage] = useState('');

    // Función genérica para manejar la comunicación con la API
    const sendRequest = async (url, method, data = null) => {
        setMessage(''); 
        
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (data && method !== 'GET' && method !== 'DELETE') {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const responseData = await response.json();
            
            if (!response.ok) {
                const errorMsg = responseData.detail || responseData.error || JSON.stringify(responseData) || 'Error desconocido';
                setMessage(`Error ${method} (${response.status}): ${errorMsg}`);
                return false;
            }

            setMessage(`Operación ${method} exitosa.`);
            return true;

        } catch (error) {
            setMessage(`Error de conexión con el servidor: ${error.message}`);
            return false;
        }
    };

    // --- 1. Lógica para ALTA (CREATE - POST) ---
    const handleAlta = async (data) => {
        const success = await sendRequest(API_URL, 'POST', data);
        if (success) {
            console.log("ALTA EXITOSA:", data);
        }
    };

    // --- 2. Lógica para MODIFICAR (UPDATE - PATCH) ---
    const handleModificar = async (data) => {
        if (!data.id) {
            setMessage("Error: El formulario de modificación requiere un ID.");
            return;
        }
        const url = `${API_URL}${data.id}/`;
        const success = await sendRequest(url, 'PATCH', data); 
        
        if (success) {
            console.log("MODIFICACIÓN EXITOSA (PATCH):", data);
        }
    };

    // --- 3. Lógica para BAJA (DELETE - DELETE) ---
    const handleBaja = async (data) => {
        if (!data.id) {
            setMessage("Error: El formulario de baja requiere un ID.");
            return;
        }
        const url = `${API_URL}${data.id}/`;
        const success = await sendRequest(url, 'DELETE');
        if (success) {
            console.log("BAJA EXITOSA. ID:", data.id);
        }
    };

    return (
        <>
            {/* 1. Header Principal */}
            <HedearUser /> 
            
            {/* 2. Barra de Navegación Secundaria */}
            
           
            <main className="gestion-main-content">
             <ContentNavbar />
                
                {/* 📢 Mensaje de estado (éxito o error) */}
                {message && (
                    <div className={`status-message ${message.startsWith('Error') ? 'error' : 'success'}`}>
                        {message}
                    </div>
                )}
                
                {/* 👈 Renderiza el componente consolidado y le pasa los handlers */}
                <PlatilloManagementForms 
                    onAltaSubmit={handleAlta}
                    onModificarSubmit={handleModificar}
                    onBajaSubmit={handleBaja}
                />
                
            </main>
        </>
    );
}

export default GestionPlatillos;