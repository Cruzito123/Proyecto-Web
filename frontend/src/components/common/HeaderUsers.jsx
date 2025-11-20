// frontend/src/components/common/HedearUsuarios.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Asegúrate de que la ruta a tu logo.svg sea correcta
import logo from '../../logo.svg'; 
import '../../styles.css'; // Asegúrate de tener los estilos necesarios

function HedearUsuarios() {
    const navigate = useNavigate();
    
    // Función para obtener el nombre del usuario (si está guardado en localStorage)
    const getUserName = () => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
            try {
                const user = JSON.parse(userJson);
                // Retorna el nombre, o un valor por defecto si no existe
                return user.nombre || 'Usuario'; 
            } catch (e) {
                return 'Usuario';
            }
        }
        return 'Usuario';
    };

    const handleLogout = () => {
        // 1. Eliminar la sesión
        localStorage.removeItem('user');
        
        // 2. Redirigir al inicio o a la vista de login
        navigate('/', { replace: true });
    };

    const userName = getUserName();
    
    return (
        <header className="dashboard-header">
            <div className="logo-container-users">
                {/* 👈 Redirige a la ruta principal del dashboard (ejemplo: /gestion-platillos) */}
                <Link to="/gestion-platillos"> 
                    <img src={logo} alt="Logo Restaurante" className="header-logo-users" />
                </Link>
            </div>
            
            <nav className="user-nav-links">
                <ul className="user-nav-list-users">
                    
                    {/* Mensaje de Bienvenida */}
                    <li>
                        <span className="user-welcome-msg">
                           Bienvenido(a), {userName}
                        </span>
                    </li>
                    
                    {/* Botón de Cerrar Sesión */}
                    <li>
                        <button onClick={handleLogout} className="btn-logout-custom">
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default HedearUsuarios;