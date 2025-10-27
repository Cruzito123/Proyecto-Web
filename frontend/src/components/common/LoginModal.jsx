import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginModal({ onClose, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [role, setRole] = useState('cliente');

    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordError(''); // Limpiar error previo

        // 1. Validación de longitud
        if (password.length <= 6) {
            setPasswordError('La contraseña debe tener más de 6 caracteres.');
            return;
        }

        // 2. Validación de carácter especial
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(password)) {
            setPasswordError('La contraseña debe contener al menos un carácter especial (ej: !@#$).');
            return;
        }

        // Si todas las validaciones pasan:
        onLoginSuccess(role);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 className="modal-title">Iniciar Sesión</h2>

                <form onSubmit={handleSubmit}>
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="•••••••"
                        required
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}

                    <label>Tipo de Usuario</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="cliente">Cliente</option>
                        <option value="mesero">Mesero</option>
                        <option value="chef">Cocinero</option>
                        <option value="admin">Administrador</option>
                    </select>

                    <button type="submit" className="btn-login">Iniciar Sesión</button>
                </form>
                
                {/* 🔹 Texto de registro abajo */}
                <p className="register-text">
                    ¿No tienes cuenta?{' '}
                    <Link to="/registro" className="register-link" onClick={onClose}>
                        Regístrate aquí
                    </Link>
                </p>
                
            </div>
        </div>
    );
}

export default LoginModal;
