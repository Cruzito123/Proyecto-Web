import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal'; // Importamos el componente del modal

function Header() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('cliente');
    const [showLoginModal, setShowLoginModal] = useState(false); // controla si se muestra el modal

    const handleLoginClick = () => {
        setShowLoginModal(true); // abre el modal
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole('cliente');
    };

    const handleLoginSuccess = (role) => {
        setIsLoggedIn(true);
        setUserRole(role);
        setShowLoginModal(false); // cierra el modal al iniciar sesión

        // Lógica de redirección según el rol
        switch (role) {
            case 'admin':
                navigate('/gestion-platillos');
                break;
            case 'mesero':
                navigate('/mesero'); // Redirige al dashboard del mesero
                break;
            case 'chef':
                navigate('/chef');
                break;
            case 'cliente':
            default:
                // Para el cliente, no hacemos nada y se queda en la página actual.
                break;
        }
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    return (
        <>
            <header className="main-header">
                <div className="logo-container">
                    <Link to="/" className="site-name">Le Jardine Mexicain</Link>
                </div>

                <nav className="main-nav">
                    <ul>
                        <li><Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Inicio</Link></li>
                        <li><Link to="/menu" className={location.pathname === '/menu' ? 'active-link' : ''}>Menú</Link></li>
                        <li><Link to="/reservar" className={location.pathname === '/reservar' ? 'active-link' : ''}>Reservaciones</Link></li>
                        <li><Link to="/eventos" className={location.pathname === '/eventos' ? 'active-link' : ''}>Eventos</Link></li>
                        <li><Link to="/resenas" className={location.pathname === '/resenas' ? 'active-link' : ''}>Reseñas</Link></li>
                        <li><Link to="/lealtad" className={location.pathname === '/lealtad' ? 'active-link' : ''}>Lealtad</Link></li>
                        <li><Link to="/contacto" className={location.pathname === '/contacto' ? 'active-link' : ''}>Contacto</Link></li>

                        {isLoggedIn && userRole === 'admin' && (
                            <li>
                                <Link to="/gestion-platillos" className={location.pathname === '/gestion-platillos' ? 'active-link' : ''}>
                                    Gestión de Platillos
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                <div>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="login-button">
                            Cerrar Sesión ({userRole})
                        </button>
                    ) : (
                        <button onClick={handleLoginClick} className="login-button">
                            Iniciar Sesión
                        </button>
                    )}
                </div>
            </header>

            {/* Modal de login */}
            {showLoginModal && (
                <LoginModal
                    onClose={handleCloseModal}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
}

export default Header;
