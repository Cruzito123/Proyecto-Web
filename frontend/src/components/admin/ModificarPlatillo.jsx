import React from 'react';
import { useForm } from 'react-hook-form';

function ModificarPlatillo({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const handleLocalSubmit = (data) => {
        // 1. Crear el objeto que se enviará a la API (API Data)
        const apiData = {};
        
        // Verifica que al menos un campo de modificación esté lleno
        if (!data.nuevoNombre && !data.nuevoPrecio && !data.nuevaDesc) {
            alert("⚠️ Debes rellenar al menos un campo para modificar.");
            return;
        }
        
        // 2. Mapeo de datos: Campos del formulario a campos de la API de Django
        
        // Mapeo de Nuevo Nombre a 'nombre'
        if (data.nuevoNombre) {
            apiData.nombre = data.nuevoNombre;
        }
        
        // Mapeo de Nuevo Precio a 'precio'
        if (data.nuevoPrecio) {
            // Aseguramos que el precio se envíe como un número flotante,
            // que es lo que espera el DecimalField de Django.
            apiData.precio = parseFloat(data.nuevoPrecio); 
        }
        
        // Mapeo de Nueva Descripción a 'descripcion'
        if (data.nuevaDesc) {
            apiData.descripcion = data.nuevaDesc;
        }

        // 3. Incluir el ID para que el componente padre pueda construir la URL
        apiData.id = data.id; // El ID ya viene como número gracias a valueAsNumber: true

        // 4. Enviar los datos MAPEADOS (apiData) a la función del padre (GestionPlatillos)
        onSubmit(apiData);
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
                        valueAsNumber: true, // Asegura que se envíe como número
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
                        // Validación condicional
                        validate: value => (!value || parseFloat(value) > 0) || "El precio debe ser positivo."
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