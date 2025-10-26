
// frontend/src/components/common/NewsletterForm.jsx

import React from 'react';
import { useForm } from 'react-hook-form';

function NewsletterForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const handleLocalSubmit = (data) => {
        onSubmit(data);
        reset(); 
    };

    return (
        <div className="newsletter-card-wrapper content-card">
            <h2 className="newsletter-title">Mantente Informado</h2>
            <p className="newsletter-subtitle">Suscríbete a nuestro boletín para recibir notificaciones sobre nuevos eventos y promociones especiales</p>

            <form onSubmit={handleSubmit(handleLocalSubmit)} className="newsletter-form-inline">
                
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="tu@email.com"
                        {...register("email", { 
                            required: "El correo es obligatorio.", 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Formato de correo inválido."
                            }
                        })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>

                <button type="submit" className="submit-button subscribe-button">
                    Suscribirse
                </button>
            </form>
        </div>
    );
}

export default NewsletterForm;
