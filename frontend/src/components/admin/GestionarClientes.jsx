import React, { useState, useEffect } from 'react';
import HeaderUsers from '../../components/common/HeaderUsers';
import EditClientModal from '../../components/admin/EditClientModal';
import '../../styles.css';
import ContentNavbar from './ContentNavbar';

const API_URL = "/api/usuarios/";

// Tarjeta específica para Clientes
const ClientCard = ({ client, onEdit, onDelete }) => (
  <div className="employee-card"> {/* Reutilizamos la clase de tarjeta para mantener el estilo */}
    <div className="employee-info">
      <h3>
        {client.nombre} 
        <span className="role-tag" style={{backgroundColor: '#e67e22'}}>Cliente</span>
      </h3>
      <p><i className="fas fa-envelope"></i> {client.correo}</p>
      <p><i className="fas fa-phone"></i> {client.telefono || "Sin teléfono"}</p>
    </div>

    <div className="employee-details">
      <p className="shift" style={{fontSize: '0.8rem'}}>
        Registrado el: {new Date(client.fecha_registro).toLocaleDateString()}
      </p>
    </div>

    <div className="employee-actions">
      <button className="btn-action edit" onClick={() => onEdit(client)}>Editar</button>
      <button className="btn-action delete" onClick={() => onDelete(client.id)}>Eliminar</button>
    </div>
  </div>
);

function GestionClientes() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState(null);

  // 1. CARGAR CLIENTES (READ)
  const fetchClients = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al cargar");
      const data = await response.json();
      
      // ✅ FILTRO: Solo usuarios con tipo 'cliente'
      const filteredClients = data.filter(user => 
        user.tipo_usuario === 'cliente' || !user.tipo_usuario
      );
      
      setClients(filteredClients);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // 2. ELIMINAR CLIENTE
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar a este cliente y todos sus datos asociados?")) return;
    try {
      const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      if (response.ok) {
        setClients(clients.filter(c => c.id !== id));
      } else {
        alert("Error al eliminar cliente.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 3. ACTUALIZAR CLIENTE
  const handleUpdateClient = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Cliente actualizado correctamente");
        setEditingClient(null);
        fetchClients();
      } else {
        alert("Error al actualizar.");
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
            <h2><span role="img" aria-label="client">👤</span> Gestión de Clientes</h2>
            <p>Base de datos de clientes registrados</p>
          </div>
          {/* Normalmente los clientes se registran solos, pero puedes poner botón de crear si quieres */}
        </div>

        <div className="employees-grid-list">
          {!loading && clients.length > 0 ? (
            clients.map(client => (
              <ClientCard 
                key={client.id} 
                client={client} 
                onEdit={setEditingClient} 
                onDelete={handleDelete} 
              />
            ))
          ) : (
            !loading && <p className="empty-state">No hay clientes registrados.</p>
          )}
        </div>

        {/* Modal de Edición */}
        {editingClient && (
          <EditClientModal 
            client={editingClient}
            onClose={() => setEditingClient(null)}
            onUpdate={handleUpdateClient} 
          />
        )}
      </main>
    </div>
  );
}

export default GestionClientes;
