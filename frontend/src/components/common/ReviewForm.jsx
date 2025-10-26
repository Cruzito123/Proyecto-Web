// frontend/src/components/common/ReviewForm.jsx (ACTUALIZADO)

import React from 'react';
import { useForm } from 'react-hook-form';

function ReviewForm({ onSubmit }) {
    // Aquí ya no usamos 'userName' en props, pues el campo Nombre es visible
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleLocalSubmit = (data) => {
        onSubmit(data); 
        alert(`💬 ¡Gracias por tu reseña, ${data.nombre}! (Validación exitosa)`);
        reset();
    };

    return (
        <div className="review-form-container content-card" style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Deja tu Reseña</h2>
            <form onSubmit={handleSubmit(handleLocalSubmit)} className="admin-form">
                
                {/* Contenedor de Nombre y Calificación */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                    
                    {/* CAMPO 1: Nombre */}
                    <div style={{ flex: 1 }}>
                        <label>Nombre</label>
                        <input
                            placeholder="Tu nombre"
                            // Validación: Requerido
                            {...register("nombre", { 
                                required: "El nombre es obligatorio.", 
                                minLength: { value: 3, message: "Mínimo 3 caracteres." }
                            })}
                        />
                        {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
                    </div>

                    {/* CAMPO 2: Calificación (Select para 1-5 estrellas) */}
                    <div style={{ flex: 1 }}>
                        <label>Calificación</label>
                        <select
                            {...register("rating", { 
                                required: "La calificación es obligatoria.",
                                valueAsNumber: true // Asegura que el valor sea un número
                            })}
                        >
                            <option value="">-- Calificación --</option>
                            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} estrellas</option>)}
                        </select>
                        {errors.rating && <p className="error-message">{errors.rating.message}</p>}
                    </div>
                </div>

                {/* CAMPO 3: Tipo (Local/Extranjero) */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Tipo</label>
                    <select
                        {...register("tipo", { 
                            required: "El tipo es obligatorio." 
                        })}
                    >
                        <option value="">-- Selecciona --</option>
                        <option value="Local">Local</option>
                        <option value="Extranjero">Internacional</option>
                    </select>
                    {errors.tipo && <p className="error-message">{errors.tipo.message}</p>}
                </div>

                {/* CAMPO 4: Comentario (Textarea) */}
                <label>Comentario</label>
                <textarea
                    placeholder="Cuéntanos sobre tu experiencia..."
                    rows="4"
                    {...register("comentario", { 
                        required: "El comentario es obligatorio.",
                        minLength: { value: 10, message: "Mínimo 10 caracteres para ser descriptivo." } 
                    })}
                />
                {errors.comentario && <p className="error-message">{errors.comentario.message}</p>}

                <button type="submit" className="submit-button" 
                    style={{ backgroundColor: '#d1a337', marginTop: '30px', width: '100%' }}>
                    Enviar Reseña
                </button>
            </form>
        </div>
    );
}

export default ReviewForm;