
import React from 'react';
import { useForm } from 'react-hook-form';

function BajaPlatillo({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const handleLocalSubmit = (data) => {
        // Confirmación antes de simular la eliminación
        if (window.confirm(`¿Estás seguro de eliminar el Platillo con ID ${data.id}?`)) {
            onSubmit(data);
            alert(`🗑️ Formulario de Baja Validado para ID: ${data.id}`);
        }
    };

    return (
        <div className="admin-card baja-platillo-card">
            <h2 className="admin-card-title">Baja de Platillo</h2>
            <form onSubmit={handleSubmit(handleLocalSubmit)} className="admin-form">
                
                {/* CAMPO: ID del Platillo a Eliminar */}
                <label>ID del Platillo a Eliminar</label>
                <input
                    type="number"
                    placeholder="Ingresa el ID"
                    // Validación simple: requerido y número positivo
                    {...register("id", { 
                        required: "El ID es obligatorio.",
                        min: { value: 1, message: "ID no válido." }
                    })}
                />
                {errors.id && <p className="error-message">{errors.id.message}</p>}

                <button type="submit" className="submit-button delete-button">Dar de Baja</button>
            </form>
        </div>
    );
}

export default BajaPlatillo;