import React, { useState, useEffect } from 'react';
import '../../styles.css';

const EditClientModal = ({ client, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
    });

    useEffect(() => {
        if (client) {
            setFormData({
                nombre: client.nombre || '',
                correo: client.correo || '',
                telefono: client.telefono || '',
            });
        }
    }, [client]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(client.id, formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">Editar Cliente</h2>
                    <button className="close-btn-icon" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="input-group">
                        <label>Nombre Completo</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            value={formData.nombre} 
                            onChange={handleChange} 
                            className="input-field"
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="correo" 
                            value={formData.correo} 
                            onChange={handleChange} 
                            className="input-field"
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Teléfono</label>
                        <input 
                            type="text" 
                            name="telefono" 
                            value={formData.telefono} 
                            onChange={handleChange} 
                            className="input-field"
                        />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-create">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditClientModal;