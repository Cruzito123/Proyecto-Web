import React, { useState, useEffect } from 'react';
import '../../styles.css';

const EditEmployeeModal = ({ employee, onClose, onUpdate }) => {
    // Inicializamos el estado con los datos del empleado que recibimos
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        tipo_usuario: '',
        puesto: '',
        salario: '',
        turno: ''
    });

    // Hook para cargar los datos cuando el componente se monta o cambia el empleado
    useEffect(() => {
        if (employee) {
            setFormData({
                nombre: employee.nombre || '',
                correo: employee.correo || '',
                telefono: employee.telefono || '',
                tipo_usuario: employee.tipo_usuario || 'empleado',
                puesto: employee.puesto || '',
                salario: employee.salario || '',
                turno: employee.turno || ''
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviamos el ID original y los nuevos datos
        onUpdate(employee.id, formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={onClose}>&times;</button>
                
                <h2 className="modal-title">Editar Empleado</h2>
                
                <form onSubmit={handleSubmit} className="admin-form">
                    <label>Nombre Completo:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={formData.nombre} 
                        onChange={handleChange} 
                        required 
                    />

                    <label>Correo Electrónico:</label>
                    <input 
                        type="email" 
                        name="correo" 
                        value={formData.correo} 
                        onChange={handleChange} 
                        required 
                    />

                    <label>Teléfono:</label>
                    <input 
                        type="text" 
                        name="telefono" 
                        value={formData.telefono} 
                        onChange={handleChange} 
                    />

                    <div className="form-row">
                        <div className="form-group">
                            <label>Puesto:</label>
                            <input 
                                type="text" 
                                name="puesto" 
                                value={formData.puesto} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Tipo Usuario:</label>
                            <select name="tipo_usuario" value={formData.tipo_usuario} onChange={handleChange}>
                                <option value="empleado">Empleado</option>
                                <option value="admin">Administrador</option>
                                <option value="cliente">Cliente</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Salario:</label>
                            <input 
                                type="number" 
                                name="salario" 
                                value={formData.salario} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Turno:</label>
                            <select name="turno" value={formData.turno} onChange={handleChange}>
                                <option value="">-- Seleccionar --</option>
                                <option value="Matutino">Matutino</option>
                                <option value="Vespertino">Vespertino</option>
                                <option value="Nocturno">Nocturno</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="delete-button" onClick={onClose} style={{backgroundColor: '#ccc', color: '#333'}}>Cancelar</button>
                        <button type="submit" className="submit-button">Actualizar Datos</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployeeModal;