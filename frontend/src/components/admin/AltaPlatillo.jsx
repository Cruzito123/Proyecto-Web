// frontend/src/components/admin/AltaPlatillo.jsx

import React from 'react';
import { useForm } from 'react-hook-form';

function AltaPlatillo({ onSubmit }) {
    // Inicializa React Hook Form
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    // Función que se ejecuta SOLO si la validación del formulario es exitosa
    const handleLocalSubmit = (data) => {
        onSubmit(data); // Envía los datos validados al componente padre
        alert("🎉 ¡Formulario de Alta Validado! Datos listos para la API.");
        reset(); // Limpia el formulario
    };

    return (
        <div className="admin-card alta-platillo-card">
            <h2 className="admin-card-title">Alta de Platillo</h2>
            <form onSubmit={handleSubmit(handleLocalSubmit)} className="admin-form">
                
                {/* CAMPO 1: Nombre del Platillo */}
                <label>Nombre del Platillo</label>
                <input
                    placeholder="Nombre del platillo"
                    // Registro de campo con reglas de validación
                    {...register("nombre", { 
                        required: "El nombre del platillo es obligatorio.", 
                        maxLength: { value: 100, message: "Máximo 100 caracteres." } 
                    })}
                />
                {/* Muestra el error si existe */}
                {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}

                {/* CAMPO 2: Descripción */}
                <label>Descripción</label>
                <textarea
                    placeholder="Descripción del platillo"
                    {...register("descripcion", { 
                        required: "La descripción es obligatoria.",
                        minLength: { value: 10, message: "Mínimo 10 caracteres." } 
                    })}
                />
                {errors.descripcion && <p className="error-message">{errors.descripcion.message}</p>}

                {/* CAMPO 3: Precio */}
                <label>Precio en MXN</label>
                <input
                    type="number"
                    step="0.01"
                    placeholder="Precio en MXN"
                    {...register("precio", { 
                        required: "El precio es obligatorio.",
                        min: { value: 1, message: "El precio debe ser un número positivo." },
                        valueAsNumber: true
                    })}
                />
                {errors.precio && <p className="error-message">{errors.precio.message}</p>}
                
                {/* CAMPO 4: Categoría */}
                <label>Categoría</label>
                <select
                    {...register("categoria", { 
                        required: "La categoría es obligatoria." 
                    })}
                >
                    <option value="">-- Selecciona Categoría --</option>
                    <option value="principal">Plato Principal</option>
                    <option value="postre">Postre Francés</option>
                    <option value="vegana">Opción Vegana</option>
                </select>
                {errors.categoria && <p className="error-message">{errors.categoria.message}</p>}

                <button type="submit" className="submit-button">Dar de Alta</button>
            </form>
        </div>
    );
}

export default AltaPlatillo;