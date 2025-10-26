
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <div className="logo-container">
        <Link to="/" className="site-name">Le Jardine Mexican</Link>
      </div>
      <nav className="main-nav">
        <ul>
          {/* Estos enlaces serán estilizados para parecerse a tu Figma */}
          <li><Link to="/">Misión</Link></li>
          <li><Link to="/">Visión</Link></li> 
          <li><Link to="/">Valores</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          {/* Enlace de Admin */}
          <li><Link to="/gestion-platillos" className="admin-link">Gestión de Platillos</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;