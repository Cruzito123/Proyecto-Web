import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 👈 Importar useNavigate

// URL base de tu API de Django
const API_URL = "http://localhost:8000/api";

/* ----------------------------------------
   MODAL DE REGISTRO (CORREGIDO)
-----------------------------------------*/
function RegisterModal({ onClose }) {
    // 👈 Usar el hook de navegación aquí
    const navigate = useNavigate(); 
    
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

        // Validaciones básicas (se mantienen)
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
                    correo: form.email,
                    contrasena: form.password,
                    tipo_usuario: form.role
                }),
            });

            // Leer la respuesta (si no es exitosa, se maneja el error)
            const userData = await response.json(); 

            if (!response.ok) {
                // El backend devuelve 'error' o 'detail' si no fue ok
                setErrorMsg(userData.detail || userData.error || "Error al registrarse.");
                return;
            }
            
            // ✅ REGISTRO EXITOSO: Lógica de Autenticación y Redirección
            const userRole = userData.tipo_usuario;
            
            // 1. Guardar el objeto de usuario (esencial para el estado de la app)
            localStorage.setItem("user", JSON.stringify(userData));

            // 2. Definir la ruta de redirección según el rol
            let path = '/';
             
            if (userRole === 'mesero') {
                path = '/mesero'; 
            } else if (userRole === 'chef') {
                path = '/chef'; 
            } else if (userRole === 'cliente') {
                path = '/cliente'; 
            }

            // 3. Cerrar modal y redirigir
            setSuccessMsg("Usuario registrado correctamente.");
            onClose(); // Cierra el modal de registro
            navigate(path, { replace: true }); // Redirige al frame del rol

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
   MODAL DE LOGIN (SE MANTIENE IGUAL)
-----------------------------------------*/
function LoginModal({ onClose, onLoginSuccess }) {
    // Hook para la redirección
    const navigate = useNavigate(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [openRegister, setOpenRegister] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");

        try {
            const res = await fetch(`${API_URL}/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo: email,
                    contrasena: password,
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setLoginError(data.error || data.detail || "Credenciales incorrectas");
                return;
            }

            // 1. Obtener el objeto de usuario que devuelve Django
            const userData = data.usuario;
            const userRole = userData.tipo_usuario;
            
            // 2. Guardar el objeto de usuario (en localStorage)
            localStorage.setItem("user", JSON.stringify(userData));

            // 3. Lógica de Redirección (Manejo del "Frame correspondiente")
            let path = '/';
            if (userRole === 'admin') {
                path = '/gestion-platillos';
            } else if (userRole === 'mesero') {
                path = '/mesero';
            } else if (userRole === 'chef') {
                path = '/chef';
            } else if (userRole === 'cliente') {
                path = '/cliente'; 
            }

            // 4. Redirigir y cerrar modal
            onLoginSuccess(userRole);
            onClose();
            navigate(path, { replace: true }); 

        } catch (err) {
            setLoginError("Error al conectar con el servidor.");
        }
    };

    if (openRegister) {
        // Al cerrar el modal de registro, se vuelve al modal de login
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