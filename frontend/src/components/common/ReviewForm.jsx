// frontend/src/components/common/ReviewForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { platilloAPI } from '../../services/api';

function ReviewForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [platillos, setPlatillos] = useState([]);
    const [loadingPlatillos, setLoadingPlatillos] = useState(true);

    useEffect(() => {
        fetchPlatillos();
    }, []);

    const fetchPlatillos = async () => {
        try {
            const response = await platilloAPI.getAll();
            setPlatillos(response.data);
        } catch (error) {
            console.error('Error cargando platillos:', error);
            // Datos de ejemplo como fallback
            setPlatillos([
                { id: 1, nombre: "Sushi Roll California", precio: "110.00" },
                { id: 2, nombre: "Tacos de Birria", precio: "85.00" },
                { id: 3, nombre: "Enchiladas Suizas", precio: "95.00" },
            ]);
        } finally {
            setLoadingPlatillos(false);
        }
    };

    const handleLocalSubmit = (data) => {
        // Convertir platillo vacío a null
        if (data.platillo === "") {
            data.platillo = null;
        }
        
        onSubmit(data);
        reset();
    };

    return (
        <div className="review-form-container content-card" style={{ maxWidth: '800px', margin: '40px auto' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Deja tu Reseña</h2>
            <form onSubmit={handleSubmit(handleLocalSubmit)} className="admin-form">
                
                {/* Nombre y Calificación */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label>Nombre *</label>
                        <input
                            placeholder="Tu nombre"
                            {...register("nombre", { 
                                required: "El nombre es obligatorio.", 
                                minLength: { value: 3, message: "Mínimo 3 caracteres." }
                            })}
                        />
                        {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
                    </div>

                    <div style={{ flex: 1 }}>
                        <label>Calificación *</label>
                        <select
                            {...register("rating", { 
                                required: "La calificación es obligatoria.",
                                valueAsNumber: true
                            })}
                        >
                            <option value="">-- Calificación --</option>
                            <option value="5">5 estrellas</option>
                            <option value="4">4 estrellas</option>
                            <option value="3">3 estrellas</option>
                            <option value="2">2 estrellas</option>
                            <option value="1">1 estrella</option>
                        </select>
                        {errors.rating && <p className="error-message">{errors.rating.message}</p>}
                    </div>
                </div>

                {/* Tipo */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Tipo *</label>
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

                {/* Platillo OPCIONAL */}
                <div style={{ marginBottom: '15px' }}>
                    <label>¿Sobre qué platillo? (Opcional)</label>
                    <select
                        {...register("platillo")}
                        defaultValue=""
                        disabled={loadingPlatillos}
                    >
                        <option value="">-- Experiencia general del restaurante --</option>
                        
                        {loadingPlatillos ? (
                            <option disabled>Cargando platillos...</option>
                        ) : platillos.length > 0 ? (
                            platillos.map(platillo => {
                                const precio = parseFloat(platillo.precio) || 0;
                                return (
                                    <option key={platillo.id} value={platillo.id}>
                                        {platillo.nombre} - ${precio.toFixed(2)}
                                    </option>
                                );
                            })
                        ) : (
                            <option disabled>No hay platillos disponibles</option>
                        )}
                    </select>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                        Deja en blanco para comentar sobre la experiencia general
                    </p>
                </div>

                {/* Comentario */}
                <div style={{ marginBottom: '15px' }}>
                    <label>Comentario *</label>
                    <textarea
                        placeholder="Cuéntanos sobre tu experiencia..."
                        rows="4"
                        {...register("comentario", { 
                            required: "El comentario es obligatorio.",
                            minLength: { value: 10, message: "Mínimo 10 caracteres." } 
                        })}
                    />
                    {errors.comentario && <p className="error-message">{errors.comentario.message}</p>}
                </div>

                <button 
                    type="submit" 
                    className="submit-button" 
                    style={{ backgroundColor: '#d1a337', marginTop: '10px', width: '100%' }}
                >
                    Enviar Reseña
                </button>
            </form>
        </div>
    );
}

export default ReviewForm;