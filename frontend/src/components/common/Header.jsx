
import React, { useState } from 'react'; // para actualizar dats
import { Link, useLocation } from 'react-router-dom'; //  para saber qué enlace está activo

function Header() {
    // Usamos useLocation para determinar qué ruta está activa y aplicar el estilo dorado
    const location = useLocation();

    // Lógica simulada de autenticación y roles:
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('cliente'); // Puede ser 'cliente', 'admin', 'mesero'

    const handleLoginClick = () => {
        // Por ahora, solo simula el login
        setIsLoggedIn(true);
        setUserRole('admin'); // Simulamos que el usuario es un administrador
        // En el futuro, aquí iría la lógica para mostrar el modal de Login
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole('cliente');
    };


    return (
        <header className="main-header">
            {/* LOGO y NOMBRE */}
            <div className="logo-container">
                {/* ICONO DEL CHEF O EL LOGO AQUÍ */}
                <Link to="/" className="site-name">Le Jardine Mexican </Link>
            </div>

            {/* ENLACES DE NAVEGACIÓN */}
            <nav className="main-nav">
                <ul>
                    {/* El 'active-link' es lo que le da la línea dorada al enlace activo */}
                    <li><Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Inicio</Link></li>
                    <li><Link to="/menu" className={location.pathname === '/menu' ? 'active-link' : ''}>Menú</Link></li>
                    <li><Link to="/reservar" className={location.pathname === '/reservar' ? 'active-link' : ''}>Reservaciones</Link></li>
                    <li><Link to="/eventos" className={location.pathname === '/eventos' ? 'active-link' : ''}>Eventos</Link></li>
                    <li><Link to="/resenas" className={location.pathname === '/resenas' ? 'active-link' : ''}>Reseñas</Link></li>
                    <li><Link to="/lealtad" className={location.pathname === '/lealtad' ? 'active-link' : ''}>Lealtad</Link></li>
                    <li><Link to="/contacto" className={location.pathname === '/contacto' ? 'active-link' : ''}>Contacto</Link></li>
                
                
                {/* VISIBILIDAD CONDICIONAL para el Admin */}
                    {isLoggedIn && userRole === 'admin' && (
                        <li>
                            <Link to="/gestion-platillos" className={location.pathname === '/gestion-platillos' ? 'active-link' : ''}>
                                Gestión de Platillos
                            </Link>
                        </li>
                    )}
                
                </ul>
            </nav>
            
            {/* BOTÓN DE ACCIÓN (LOGIN/ADMIN) */}
            <div>
                {isLoggedIn ? (
                    // Si el usuario está logueado
                    <button onClick={handleLogout} className="login-button">Cerrar Sesión ({userRole})</button>
                ) : (
                    // Si el usuario no está logueado
                    <button onClick={handleLoginClick} className="login-button">Iniciar Sesión</button>
                )}
            </div>

        </header>
    );
}

export default Header;