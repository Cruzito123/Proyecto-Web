import React, { useState, useEffect } from 'react';
import HeaderUsers from '../../components/common/HeaderUsers';
import AddEmployeeModal from '../../components/admin/AddEmployeeModal';

import EditEmployeeModal from '../../components/admin/EditEmployeeModal'; // 👈 1. IMPORTAR NUEVO MODAL
import '../../styles.css';
import ContentNavbar from './ContentNavbar';

const API_URL = "http://127.0.0.1:8000/api/usuarios/";

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const roleClass = employee.puesto?.toLowerCase().includes('chef') ? 'chef' : 'waiter';
  return (
    <div className="employee-card">
      <div className="employee-info">
        <h3>
          {employee.nombre} 
          <span className={`role-tag ${roleClass}`}>
            {employee.puesto || employee.tipo_usuario}
          </span>
        </h3>
        <p><i className="fas fa-envelope"></i> {employee.correo}</p>
        <p><i className="fas fa-phone"></i> {employee.telefono || "Sin teléfono"}</p>
      </div>
      <div className="employee-details">
        <p className="salary">{employee.salario ? `$${employee.salario}` : 'Sin salario'}</p>
        <p className="shift">Turno: {employee.turno || 'No asignado'}</p>
      </div>
      <div className="employee-actions">
        {/* El botón editar ahora llama a onEdit pasando el objeto completo */}
        <button className="btn-action edit" onClick={() => onEdit(employee)}>Editar</button>
        <button className="btn-action delete" onClick={() => onDelete(employee.id)}>Eliminar</button>
      </div>
    </div>
  );
};

function GestionEmpleados() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para los Modales
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // 👈 2. ESTADO PARA EL EMPLEADO EN EDICIÓN

// 1. CARGAR EMPLEADOS (READ) - CON FILTRO ESPECÍFICO
  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al cargar empleados");
      const data = await response.json();
      
      // ✅ FILTRO ACTUALIZADO: Solo mostramos Admin, Chef y Mesero
      const staff = data.filter(user => {
        // Normalizamos a minúsculas para evitar errores (ej: "Chef" vs "chef")
        const tipo = user.tipo_usuario ? user.tipo_usuario.toLowerCase() : '';
        const puesto = user.puesto ? user.puesto.toLowerCase() : '';

        // LA LÓGICA:
        // 1. Si el tipo_usuario es 'admin', pasa.
        // 2. Si el puesto contiene la palabra 'chef' (ej: "Chef Ejecutivo"), pasa.
        // 3. Si el puesto contiene la palabra 'mesero', pasa.
        return tipo === 'admin' || puesto.includes('chef') || puesto.includes('mesero');
      });

      setEmployees(staff);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

// 2. GUARDAR NUEVO (CREATE) - CON VALIDACIÓN DE CORREO
  const handleSaveNewEmployee = async (newEmployeeData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployeeData),
      });

      if (response.ok) {
        // Éxito
        alert("Empleado creado exitosamente.");
        setShowAddModal(false);
        fetchEmployees(); 
      } else {
        // Error: Analizamos qué pasó
        const errorData = await response.json();
        
        // ✅ VALIDACIÓN ESPECÍFICA PARA CORREO DUPLICADO
        if (errorData.correo) {
            alert("⛔ Error: Este correo electrónico ya está registrado. Por favor usa otro.");
        } else {
            // Otro tipo de error (ej: contraseña muy corta, campo faltante)
            alert("Error al crear: " + JSON.stringify(errorData));
        }
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de conexión con el servidor.");
    }
  };

  // 3. PREPARAR EDICIÓN (Abrir Modal)
  const handleEditClick = (employee) => {
    setEditingEmployee(employee); // 👈 Guarda el empleado y esto hará que se renderice el modal
  };

  // 4. ACTUALIZAR DATOS (UPDATE - PATCH)
  const handleUpdateEmployee = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: 'PATCH', // Usamos PATCH para actualizar parcialmente
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Datos actualizados correctamente");
        setEditingEmployee(null); // Cerrar modal
        fetchEmployees(); // Recargar lista
      } else {
        const err = await response.json();
        alert("Error al actualizar: " + JSON.stringify(err));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  // 5. ELIMINAR
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar empleado de la base de datos?")) return;
    try {
      const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      if (response.ok) {
        setEmployees(employees.filter(emp => emp.id !== id));
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="page-container-gray">
      <HeaderUsers />
     
      <main className="gestion-empleados-content">
         <ContentNavbar />
        <div className="section-header-card">
          <div className="header-title-group">
            <h2>👥 Gestión de Empleados</h2>
            <p>Administra el equipo de La Belle Époque</p>
          </div>
          
          <button className="btn-new-employee" onClick={() => setShowAddModal(true)}>
            + Nuevo Empleado
          </button>
        </div>

        <div className="employees-grid-list">
          {!loading && employees.map(emp => (
            <EmployeeCard 
              key={emp.id} 
              employee={emp} 
              onEdit={handleEditClick} // 👈 Pasamos la nueva función
              onDelete={handleDelete} 
            />
          ))}
        </div>

        {/* --- MODAL DE CREACIÓN --- */}
        {showAddModal && (
          <AddEmployeeModal 
            onClose={() => setShowAddModal(false)} 
            onSave={handleSaveNewEmployee} 
          />
        )}

        {/* --- MODAL DE EDICIÓN (Solo se muestra si editingEmployee tiene datos) --- */}
        {editingEmployee && (
          <EditEmployeeModal 
            employee={editingEmployee}
            onClose={() => setEditingEmployee(null)} // Al cerrar, limpiamos el estado
            onUpdate={handleUpdateEmployee} 
          />
        )}

      </main>
    </div>
  );
}

export default GestionEmpleados;