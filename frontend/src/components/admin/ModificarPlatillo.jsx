// frontend/src/components/admin/ModificarPlatillo.jsx

import React from 'react';
import { useForm } from 'react-hook-form';

function ModificarPlatillo({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const handleLocalSubmit = (data) => {
        // Verifica que al menos un campo de modificación (nombre, precio, etc.) esté lleno
        if (!data.nuevoNombre && !data.nuevoPrecio && !data.nuevaDesc) {
            alert("⚠️ Debes rellenar al menos un campo para modificar.");
            return;
        }
        onSubmit(data);
        alert(`✏️ Formulario de Modificación Validado para ID: ${data.id}.`);
    };

    return (
        <div className="admin-card modificar-platillo-card">
            <h2 className="admin-card-title">Modificar Platillo</h2>
            <form onSubmit={handleSubmit(handleLocalSubmit)} className="admin-form">
                
                {/* CAMPO 1: ID del Platillo a Modificar (Obligatorio) */}
                <label>ID del Platillo a Modificar</label>
                <input
                    type="number"
                    placeholder="Ingresa el ID"
                    {...register("id", { 
                        required: "El ID es obligatorio para modificar.",
                        min: { value: 1, message: "ID no válido." }
                    })}
                />
                {errors.id && <p className="error-message">{errors.id.message}</p>}

                <p className="hint-text">Rellena solo los campos que deseas cambiar:</p>
                
                {/* CAMPO 2: Nuevo Nombre (Opcional) */}
                <label>Nuevo Nombre</label>
                <input {...register("nuevoNombre")} placeholder="Nuevo nombre del platillo" />

                {/* CAMPO 3: Nuevo Precio (Opcional, pero debe ser un número positivo si se ingresa) */}
                <label>Nuevo Precio</label>
                <input
                    type="number"
                    step="0.01"
                    placeholder="Nuevo precio en MXN"
                    {...register("nuevoPrecio", {
                        // Validación condicional: solo valida si hay un valor ingresado
                        validate: value => (!value || value > 0) || "El precio debe ser positivo."
                    })}
                />
                {errors.nuevoPrecio && <p className="error-message">{errors.nuevoPrecio.message}</p>}
                
                {/* CAMPO 4: Nueva Descripción (Opcional) */}
                <label>Nueva Descripción</label>
                <textarea {...register("nuevaDesc")} placeholder="Nueva descripción" />

                <button type="submit" className="submit-button update-button">Modificar Platillo</button>
            </form>
        </div>
    );
}

export default ModificarPlatillo;