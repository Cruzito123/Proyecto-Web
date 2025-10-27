import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Logo y descripción */}
        <div className="footer-section">
          <h2 className="footer-logo">
            <span role="img" aria-label="chef">👨‍🍳</span> Le Jardine Mexicain
          </h2>
          <p className="footer-desc">
            Experiencia culinaria francesa auténtica en el corazón de la ciudad.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link"><FaFacebookF /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div className="footer-section">
          <h3 className="footer-title">Enlaces Rápidos</h3>
          <ul className="footer-links">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Acerca de</a></li>
            <li><a href="#">Menú</a></li>
            <li><a href="#">Reservaciones</a></li>
            <li><a href="#">Eventos</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer-section">
          <h3 className="footer-title">Contacto</h3>
          <ul className="footer-contact">
            <li><MapPin className="icon" /> Paseos Revolucionarios del Puerto 540<br />Colonia Industrial, Morelia, Mich</li>
            <li><Phone className="icon" /> 4456789</li>
            <li><Mail className="icon" /> lejardinmexicain1@gmail.com</li>
          </ul>
        </div>

        {/* Horarios */}
        <div className="footer-section">
          <h3 className="footer-title">🕒 Horarios</h3>
          <ul className="footer-hours">
            <li><span>Lun - Vie:</span><span>13:00 - 23:00</span></li>
            <li><span>Sábado:</span><span>12:00 - 00:00</span></li>
            <li><span>Domingo:</span><span>12:00 - 22:00</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Le Jardine Mexican — Todos los derechos reservados.
      </div>
    </footer>
  );
}
