import React, { useState } from 'react';
import '../../styles.css';

const AddEmployeeModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    contrasena: '',
    puesto: '',
    salario: '',
    turno: 'Matutino',
    tipo_usuario: 'empleado'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones simples
    if (!formData.nombre || !formData.correo || !formData.contrasena) {
      alert("Los campos Nombre, Correo y Contraseña son obligatorios.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      {/* Agregamos la clase modal-wide para hacerlo más ancho */}
      <div className="modal-container modal-wide">
        
        {/* Encabezado */}
        <div className="modal-header">
          <h2 className="modal-title">Nuevo Empleado</h2>
          <button className="close-btn-icon" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form-layout">
          <div className="modal-body-grid">
            
            {/* COLUMNA IZQUIERDA: Información Personal */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-user-circle"></i> Información Personal
              </h3>
              
              <div className="input-group">
                <label>Nombre Completo *</label>
                <input 
                  type="text" 
                  name="nombre" 
                  value={formData.nombre} 
                  onChange={handleChange} 
                  placeholder="Ej: Juan Pérez"
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label>Correo Electrónico *</label>
                <input 
                  type="email" 
                  name="correo" 
                  value={formData.correo} 
                  onChange={handleChange} 
                  placeholder="juan@ejemplo.com"
                  className="input-field"
                />
              </div>

              <div className="input-group">
                <label>Teléfono</label>
                <input 
                  type="text" 
                  name="telefono" 
                  value={formData.telefono} 
                  onChange={handleChange} 
                  placeholder="(555) 123-4567"
                  className="input-field"
                />
              </div>
            </div>

            {/* COLUMNA DERECHA: Información Laboral y Cuenta */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-briefcase"></i> Información Laboral
              </h3>

              <div className="form-row-compact">
                <div className="input-group">
                  <label>Puesto</label>
                  <input 
                    type="text" 
                    name="puesto" 
                    value={formData.puesto} 
                    onChange={handleChange} 
                    placeholder="Ej: Chef"
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label>Salario Mensual</label>
                  <input 
                    type="number" 
                    name="salario" 
                    value={formData.salario} 
                    onChange={handleChange} 
                    placeholder="$0.00"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-row-compact">
                <div className="input-group">
                  <label>Turno</label>
                  <select name="turno" value={formData.turno} onChange={handleChange} className="input-field">
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                    <option value="Nocturno">Nocturno</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Rol Sistema</label>
                  <select name="tipo_usuario" value={formData.tipo_usuario} onChange={handleChange} className="input-field">
                    <option value="empleado">Empleado</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="input-group highlight-group">
                <label>Contraseña de Acceso *</label>
                <input 
                  type="password" 
                  name="contrasena" 
                  value={formData.contrasena} 
                  onChange={handleChange} 
                  placeholder="••••••••"
                  className="input-field"
                />
              </div>
            </div>

          </div>

          {/* Pie del Modal con Botones */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-create">
              Crear Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;