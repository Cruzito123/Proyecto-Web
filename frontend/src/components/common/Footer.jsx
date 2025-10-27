import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f1624] text-gray-300 py-12 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo y descripción */}
        <div>
          <h2 className="text-lg font-semibold text-[#ffb100] flex items-center gap-2">
            <span role="img" aria-label="chef">👨‍🍳</span> La Belle Époque
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Experiencia culinaria francesa auténtica en el corazón de la ciudad.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="#" className="bg-[#1a2536] p-3 rounded-full hover:bg-[#ffb100] hover:text-black transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-[#1a2536] p-3 rounded-full hover:bg-[#ffb100] hover:text-black transition">
              <FaInstagram />
            </a>
            <a href="#" className="bg-[#1a2536] p-3 rounded-full hover:bg-[#ffb100] hover:text-black transition">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#ffb100] transition">Inicio</a></li>
            <li><a href="#" className="hover:text-[#ffb100] transition">Acerca de</a></li>
            <li><a href="#" className="hover:text-[#ffb100] transition">Menú</a></li>
            <li><a href="#" className="hover:text-[#ffb100] transition">Reservaciones</a></li>
            <li><a href="#" className="hover:text-[#ffb100] transition">Eventos</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="text-[#ffb100]" size={18} />
              <span>Av. Paseo de la Reforma 505<br />CDMX, México</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="text-[#ffb100]" size={18} />
              <span>+52 (55) 1234-5678</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-[#ffb100]" size={18} />
              <span>info@labelleepoque.com</span>
            </li>
          </ul>
        </div>

        {/* Horarios */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Horarios</h3>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between">
              <span>Lun - Vie:</span>
              <span>13:00 - 23:00</span>
            </li>
            <li className="flex justify-between">
              <span>Sábado:</span>
              <span>12:00 - 00:00</span>
            </li>
            <li className="flex justify-between">
              <span>Domingo:</span>
              <span>12:00 - 22:00</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} La Belle Époque. Todos los derechos reservados.
      </div>
    </footer>
  );
}
