// frontend/src/components/admin/ContentNavbar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

function ContentNavbar() {
    return (
        // Usamos una clase de contenedor que definiremos en CSS
        <nav className="content-navbar-admin">
            <ul className="nav-list-content-admin">
                
                {/* 1. Gestión de Platillos */}
                <li>
                    <NavLink 
                        to="/gestion-platillos" 
                        // La clase 'active-content-nav' se activará cuando la ruta coincida
                        className={({ isActive }) => 
                            isActive ? "nav-link-content-admin active-content-nav" : "nav-link-content-admin"
                        }
                    >
                        Gestión de Platillos
                    </NavLink>
                </li>
                
                {/* 2. Gestión de Pedidos (Ejemplo) */}
                <li>
                    <NavLink 
                        to="/gestion-Clientes"
                        className={({ isActive }) => 
                            isActive ? "nav-link-content-admin active-content-nav" : "nav-link-content-admin"
                        }
                    >
                        Gestión de Clientes
                    </NavLink>
                </li>

                {/* 3. Gestión de Usuarios (Ejemplo) */}
                <li>
                    <NavLink 
                        to="/gestion-empleados" 
                        className={({ isActive }) => 
                            isActive ? "nav-link-content-admin active-content-nav" : "nav-link-content-admin"
                        }
                    >
                        Gestión de Empleados
                    </NavLink>
                </li>

            </ul>
        </nav>
    );
}

export default ContentNavbar;