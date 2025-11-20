import React, { useState } from 'react';
import '../../styles.css';

const AddEmployeeModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    tipo_usuario: 'empleado',
    puesto: '',
    salario: '',
    turno: 'Matutino'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.correo || !formData.contrasena) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <h2 className="modal-title">Nuevo Empleado</h2>
        
        <form onSubmit={handleSubmit} className="admin-form">
          <label>Nombre Completo:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

          <label>Correo Electrónico:</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />

          <label>Contraseña:</label>
          <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required />

          <label>Teléfono:</label>
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />

          <div className="form-row">
            <div className="form-group">
              <label>Puesto:</label>
              <input type="text" name="puesto" value={formData.puesto} onChange={handleChange} placeholder="Ej: Chef" />
            </div>
            <div className="form-group">
              <label>Tipo Usuario:</label>
              <select name="tipo_usuario" value={formData.tipo_usuario} onChange={handleChange}>
                <option value="empleado">Empleado</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salario:</label>
              <input type="number" name="salario" value={formData.salario} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Turno:</label>
              <select name="turno" value={formData.turno} onChange={handleChange}>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
                <option value="Nocturno">Nocturno</option>
              </select>
            </div>
          </div>

          {/* ✅ CAMBIO AQUÍ: El botón ahora dice explícitamente "Crear" */}
          <button type="submit" className="submit-button">Crear</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;