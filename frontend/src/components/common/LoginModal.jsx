import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// URL base de tu API de Django
const API_URL = "http://localhost:8000/api";

/* ----------------------------------------
   MODAL DE REGISTRO (CON DJANGO)
-----------------------------------------*/
function RegisterModal({ onClose }) {

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: "",
        role: "cliente"
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        // Validaciones básicas
        if (form.password.length <= 6) {
            setErrorMsg("La contraseña debe tener más de 6 caracteres.");
            return;
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(form.password)) {
            setErrorMsg("La contraseña debe tener un caracter especial.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/usuarios/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: form.nombre,
                    correo: form.email,          // ✔ correcto
                    contrasena: form.password,    // ✔ Django espera "contrasena"
                    tipo_usuario: form.role       // ✔ Django espera "tipo_usuario"
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMsg(data.detail || "Error al registrarse.");
                return;
            }

            setSuccessMsg("Usuario registrado correctamente.");
            setTimeout(() => onClose(), 1500);

        } catch (error) {
            setErrorMsg("Error al conectar con el servidor.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 className="modal-title">Crear Cuenta</h2>

                <form onSubmit={handleRegister}>
                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />

                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <label>Tipo de Usuario</label>
                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value="cliente">Cliente</option>
                        <option value="mesero">Mesero</option>
                        <option value="chef">Cocinero</option>
                        <option value="admin">Administrador</option>
                    </select>

                    {errorMsg && <p className="error-message">{errorMsg}</p>}
                    {successMsg && <p className="success-message">{successMsg}</p>}

                    <button type="submit" className="btn-login">Registrarse</button>
                </form>

            </div>
        </div>
    );
}



/* ----------------------------------------
   MODAL DE LOGIN (CON DJANGO)
-----------------------------------------*/
function LoginModal({ onClose, onLoginSuccess }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('cliente');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [openRegister, setOpenRegister] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setLoginError("");

        try {
            const res = await fetch(`${API_URL}/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo: email,          // ✔ correcto
                    contrasena: password,   // ✔ Django espera "contrasena"
                    tipo_usuario: role      // ✔ Django espera "tipo_usuario"
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setLoginError(data.detail || "Credenciales incorrectas");
                return;
            }

            localStorage.setItem("token", data.token || "");

            onLoginSuccess(role);
            onClose();

        } catch (err) {
            setLoginError("Error al conectar con el servidor.");
        }
    };

    if (openRegister) {
        return <RegisterModal onClose={() => setOpenRegister(false)} />;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 className="modal-title">Iniciar Sesión</h2>

                <form onSubmit={handleLogin}>
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {passwordError && <p className="error-message">{passwordError}</p>}
                    {loginError && <p className="error-message">{loginError}</p>}

                    <button type="submit" className="btn-login">Iniciar Sesión</button>
                </form>

                <p className="register-text">
                    ¿No tienes cuenta?{' '}
                    <span
                        className="register-link"
                        onClick={() => setOpenRegister(true)}
                    >
                        Regístrate aquí
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginModal;
