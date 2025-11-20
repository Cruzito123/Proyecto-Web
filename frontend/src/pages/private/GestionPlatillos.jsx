// frontend/src/pages/private/GestionPlatillos.jsx

import React, { useState } from 'react';
import HedearUsuarios from '../../components/common/HedearUsuarios.jsx';

import AltaPlatillo from '../../components/admin/AltaPlatillo.jsx';
import ModificarPlatillo from '../../components/admin/ModificarPlatillo.jsx';
import BajaPlatillo from '../../components/admin/BajaPlatillo.jsx';

// URL base de tu API de Django (ajusta si es necesario)
const API_URL = "http://localhost:8000/api/platillos/";

function GestionPlatillos() {
    const [message, setMessage] = useState('');

    // Función genérica para manejar la comunicación con la API
    const sendRequest = async (url, method, data = null) => {
        setMessage(''); // Limpiar mensajes
        
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                // ⚠️ Aquí debes agregar cualquier token de autenticación (JWT/Bearer)
                // "Authorization": `Bearer ${localStorage.getItem('token')}`, 
            },
        };

        if (data && method !== 'GET' && method !== 'DELETE') {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const responseData = await response.json();

            // 👈 DEBUG CRÍTICO: Muestra el estado y la respuesta de Django
            console.log(`[DEBUG - ${method}] URL: ${url}`);
            console.log(`[DEBUG - ${method}] Status: ${response.status}`);
            console.log(`[DEBUG - ${method}] Response Data:`, responseData);
            
            if (!response.ok) {
                // Si hay un error, usa el mensaje de error del servidor
                const errorMsg = responseData.detail || responseData.error || JSON.stringify(responseData) || 'Error desconocido';
                setMessage(`Error ${method} (${response.status}): ${errorMsg}`);
                return false;
            }

            // Éxito en la operación
            setMessage(`Operación ${method} exitosa.`);
            return true;

        } catch (error) {
            setMessage(`Error de conexión con el servidor: ${error.message}`);
            return false;
        }
    };

    // --- 1. Lógica para ALTA (CREATE - POST) ---
    const handleAlta = async (data) => {
        // El endpoint es la URL base: /api/platillos/
        const success = await sendRequest(API_URL, 'POST', data);
        if (success) {
            console.log("ALTA EXITOSA:", data);
            // Opcional: recargar la lista de platillos
        }
    };

    // --- 2. Lógica para MODIFICAR (UPDATE - PATCH) ---
    const handleModificar = async (data) => {
        // Necesitas el ID del platillo para la URL: /api/platillos/{id}/
        if (!data.id) {
            setMessage("Error: El formulario de modificación requiere un ID.");
            return;
        }
        const url = `${API_URL}${data.id}/`;
        
        // Usando PATCH para actualización parcial
        const success = await sendRequest(url, 'PATCH', data);
        
        if (success) {
            console.log("MODIFICACIÓN EXITOSA (PATCH):", data);
        }
    };

    // --- 3. Lógica para BAJA (DELETE - DELETE) ---
    const handleBaja = async (data) => {
        // Necesitas el ID del platillo para la URL: /api/platillos/{id}/
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
            <main className="gestion-main-content">
                <HedearUsuarios />
                <h1 className="page-title">Gestión de Platillos</h1>
                
                {/* 📢 Mensaje de estado (éxito o error) */}
                {message && (
                    <div className={`status-message ${message.startsWith('Error') ? 'error' : 'success'}`}>
                        {message}
                    </div>
                )}
                
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