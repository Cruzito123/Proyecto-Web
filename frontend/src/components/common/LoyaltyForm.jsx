
// frontend/src/components/common/LoyaltyForm.jsx

import React from 'react';
import { useForm } from 'react-hook-form';

function LoyaltyForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    // Función de envío. Solo se llama si la validación pasa.
    const handleLocalSubmit = (data) => {
        onSubmit(data);
        reset(); 
    };

    return (
        <div className="loyalty-card-wrapper content-card">
            <div className="loyalty-icon-container">
                {/* Ícono del Regalo (o de Lealtad) */}
                🎁
            </div>
            <h3 className="loyalty-subtitle">Únete Hoy</h3>
            <p className="loyalty-points-info">Recibe 100 puntos de bienvenida al registrarte</p>

            <form onSubmit={handleSubmit(handleLocalSubmit)} className="loyalty-form">
                
                <label className="loyalty-label">Correo Electrónico</label>
                <input
                    type="email"
                    placeholder="tu@email.com"
                    // Validación de Correo Electrónico
                    {...register("email", { 
                        required: "El correo es obligatorio.", 
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Formato de correo inválido."
                        }
                    })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}

                <button type="submit" className="submit-button loyalty-confirm-button">
                    Registrarse
                </button>
            </form>
        </div>
    );
}

export default LoyaltyForm;