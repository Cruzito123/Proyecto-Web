// frontend/src/components/cliente/EditReservationModal.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

function EditReservationModal({ reservation, isOpen, onClose, onUpdate, onDelete }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Cargar datos de la reserva cuando se abre el modal
    React.useEffect(() => {
        if (reservation && isOpen) {
            reset({
                fecha: reservation.fecha,
                hora: reservation.hora,
                personas: reservation.num_personas
            });
        }
    }, [reservation, isOpen, reset]);

    const handleFormSubmit = async (data) => {
        try {
            const updateData = {
                fecha: data.fecha,
                hora: data.hora,
                num_personas: data.personas
            };

            console.log('Actualizando reserva:', updateData);

            const response = await fetch(`/api/reservaciones/${reservation.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la reserva');
            }

            const updatedReservation = await response.json();
            console.log('✅ Reserva actualizada:', updatedReservation);
            
            onUpdate(updatedReservation);
            onClose();
            alert('¡Reserva actualizada exitosamente!');
            
        } catch (error) {
            console.error('❌ Error actualizando reserva:', error);
            alert('Error al actualizar la reserva');
        }
    };

    const handleDeleteReservation = async () => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta reservación?')) {
            return;
        }

        try {
            console.log('Eliminando reserva ID:', reservation.id);

            const response = await fetch(`/api/reservaciones/${reservation.id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la reserva');
            }

            console.log('✅ Reserva eliminada ID:', reservation.id);
            
            onDelete(reservation.id);
            onClose();
            alert('¡Reserva eliminada exitosamente!');
            
        } catch (error) {
            console.error('❌ Error eliminando reserva:', error);
            alert('Error al eliminar la reserva');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Modificar Reservación</h3>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                <div className="reservation-info-modal">
                    <p><strong>ID de Reservación:</strong> #{reservation.id}</p>
                    <p><strong>Cliente:</strong> {reservation.nombre_cliente}</p>
                    <p><strong>Email:</strong> {reservation.email_cliente}</p>
                    <p><strong>Teléfono:</strong> {reservation.telefono_cliente}</p>
                </div>
                
                <form onSubmit={handleSubmit(handleFormSubmit)} className="reservation-form">
                    <div className="form-grid">
                        <div className="form-field">
                            <label>🗓️ Fecha</label>
                            <input
                                type="date"
                                {...register("fecha", { 
                                    required: "La fecha es obligatoria.",
                                    validate: value => new Date(value) >= new Date().setHours(0,0,0,0) || "La fecha debe ser igual o posterior a hoy."
                                })}
                            />
                            {errors.fecha && <p className="error-message">{errors.fecha.message}</p>}
                        </div>

                        <div className="form-field">
                            <label>⏰ Hora</label>
                            <input
                                type="time"
                                {...register("hora", { 
                                    required: "La hora es obligatoria.",
                                })}
                            />
                            {errors.hora && <p className="error-message">{errors.hora.message}</p>}
                        </div>

                        <div className="form-field">
                            <label>👥 Número de Personas</label>
                            <input
                                type="number"
                                {...register("personas", { 
                                    required: "El número es obligatorio.",
                                    min: { value: 1, message: "Mínimo 1 persona." },
                                    max: { value: 10, message: "Máximo 10 personas por reserva." },
                                    valueAsNumber: true
                                })}
                            />
                            {errors.personas && <p className="error-message">{errors.personas.message}</p>}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button 
                            type="button" 
                            className="btn-delete"
                            onClick={handleDeleteReservation}
                        >
                            🗑️ Eliminar
                        </button>
                        <div className="modal-action-buttons">
                            <button type="button" className="btn-cancel" onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn-confirm">
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditReservationModal;