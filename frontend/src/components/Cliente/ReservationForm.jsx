// frontend/src/components/common/ReservationForm.jsx

import React from 'react';
import { useForm } from 'react-hook-form';

function ReservationForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    // Función de envío a la base de datos
    const handleLocalSubmit = async (data) => {
        try {
            console.log('Datos del formulario:', data);
            
            // Preparar datos para la API
            const reservationData = {
                nombre_cliente: data.nombre,
                email_cliente: data.email,
                telefono_cliente: data.telefono,
                fecha: data.fecha,
                hora: data.hora,
                num_personas: data.personas,
                estado: 'pendiente'
            };

            console.log('Enviando a la API:', reservationData);

            
            const response = await fetch('/api/reservaciones/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData)
            });

            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Error del servidor: ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Reserva creada exitosamente:', result);
            
            // Resetear formulario
            reset();
            
            // Mostrar mensaje de éxito
            alert('¡Reserva creada exitosamente! Recibirás un correo de confirmación.');
            
        } catch (error) {
            console.error('❌ Error creando reserva:', error);
            alert(`Error al crear la reserva: ${error.message}`);
        }
    };

    return (
        <div className="reservation-card-wrapper content-card">
            <form onSubmit={handleSubmit(handleLocalSubmit)} className="reservation-form">
                
                {/* Contenedor Flex para la cuadrícula de 2 columnas */}
                <div className="form-grid">
                    
                    {/* Fila 1 */}
                    <div className="form-field">
                        <label>👤 Nombre Completo</label>
                        <input
                            placeholder="Juan Pérez"
                            {...register("nombre", { 
                                required: "El nombre es obligatorio.", 
                                minLength: { value: 5, message: "Mínimo 5 caracteres." } 
                            })}
                        />
                        {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
                    </div>

                    <div className="form-field">
                        <label>📧 Correo Electrónico</label>
                        <input
                            type="email"
                            placeholder="juan@ejemplo.com"
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

                    {/* Fila 2 */}
                    <div className="form-field">
                        <label>📞 Teléfono</label>
                        <input
                            type="tel"
                            placeholder="+52 123 456 7890"
                            {...register("telefono", { 
                                required: "El teléfono es obligatorio.",
                                minLength: { value: 10, message: "Mínimo 10 dígitos." },
                                pattern: {
                                    value: /^[0-9+()-\s]+$/,
                                    message: "Solo se permiten números y signos básicos (+, espacios)."
                                }
                            })}
                        />
                        {errors.telefono && <p className="error-message">{errors.telefono.message}</p>}
                    </div>

                    <div className="form-field">
                        <label>👥 Número de Personas</label>
                        <input
                            type="number"
                            placeholder="2"
                            {...register("personas", { 
                                required: "El número es obligatorio.",
                                min: { value: 1, message: "Mínimo 1 persona." },
                                max: { value: 10, message: "Máximo 10 personas por reserva." },
                                valueAsNumber: true
                            })}
                        />
                        {errors.personas && <p className="error-message">{errors.personas.message}</p>}
                    </div>
                    
                    {/* Fila 3 */}
                    <div className="form-field">
                        <label>🗓️ Fecha</label>
                        <input
                            type="date"
                            placeholder="dd/mm/aaaa"
                            {...register("fecha", { 
                                required: "La fecha es obligatoria.",
                                // Validación simple de que la fecha sea en el futuro (o hoy)
                                validate: value => new Date(value) >= new Date().setHours(0,0,0,0) || "La fecha debe ser igual o posterior a hoy."
                            })}
                        />
                        {errors.fecha && <p className="error-message">{errors.fecha.message}</p>}
                    </div>

                    <div className="form-field">
                        <label>⏰ Hora</label>
                        <input
                            type="time"
                            placeholder="--:--"
                            {...register("hora", { 
                                required: "La hora es obligatoria.",
                                // En el futuro, aquí se validaría el rango de 13:00 a 23:00 hrs
                            })}
                        />
                        {errors.hora && <p className="error-message">{errors.hora.message}</p>}
                    </div>

                </div> {/* Fin de form-grid */}

                <button type="submit" className="submit-button large-confirm-button">
                    Confirmar Reservación
                </button>
                
                <p className="email-hint">
                    Recibirás un correo de confirmación inmediatamente después de realizar tu reservación
                </p>
            </form>
        </div>
    );
}

export default ReservationForm;
