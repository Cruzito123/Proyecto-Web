import React, { useState } from 'react';

function ModificarPlatillo({ onSubmit }) {
    const [form, setForm] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: 'Carnes',
        es_vegano: false,
        contiene_alergenos: false,
        imagen_url: '' // ✅ Nuevo estado
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Filtramos campos vacíos para enviar solo lo que se quiere modificar
        const dataToUpdate = {};
        for (const key in form) {
            if (form[key] !== '' && form[key] !== false) {
                dataToUpdate[key] = form[key];
            }
        }
        // Aseguramos que el ID vaya siempre
        dataToUpdate.id = form.id;
        
        // Si es booleano, lo enviamos aunque sea false si el usuario interactuó (simplificación)
        // Para este ejemplo simple, enviamos todo el form o lógica custom
        onSubmit(form); 
    };

    return (
        <div className="admin-card">
            <h3 className="admin-card-title">Modificar Platillo</h3>
            <p className="hint-text">Ingresa el ID del platillo y los datos nuevos.</p>
            
            <form onSubmit={handleSubmit} className="admin-form">
                <label>ID del Platillo (Obligatorio):</label>
                <input 
                    type="number" name="id" 
                    value={form.id} onChange={handleChange} required 
                />

                <label>Nuevo Nombre:</label>
                <input 
                    type="text" name="nombre" 
                    value={form.nombre} onChange={handleChange} 
                />

                <label>Nueva Descripción:</label>
                <textarea 
                    name="descripcion" 
                    value={form.descripcion} onChange={handleChange} 
                />

                <label>Nuevo Precio:</label>
                <input 
                    type="number" name="precio" step="0.01" 
                    value={form.precio} onChange={handleChange} 
                />

                <label>Nueva Categoría:</label>
                <select name="categoria" value={form.categoria} onChange={handleChange}>
                    <option value="Carnes">Carnes</option>
                    <option value="Vegano">Vegano</option>
                    <option value="Postres">Postres</option>
                    <option value="Pastas">Pastas</option>
                    <option value="Bebidas">Bebidas</option>
                </select>

                {/* ✅ NUEVO CAMPO: URL DE IMAGEN */}
                <label>Nueva URL de Imagen:</label>
                <input 
                    type="text" 
                    name="imagen_url" 
                    value={form.imagen_url} 
                    onChange={handleChange} 
                    placeholder="https://..."
                />

                <div style={{marginTop: '15px'}}>
                    <label>
                        <input 
                            type="checkbox" name="es_vegano" 
                            checked={form.es_vegano} onChange={handleChange} 
                        /> Es Vegano
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="checkbox" name="contiene_alergenos" 
                            checked={form.contiene_alergenos} onChange={handleChange} 
                        /> Contiene Alérgenos
                    </label>
                </div>

                <button type="submit" className="submit-button">Modificar Platillo</button>
            </form>
        </div>
    );
}

export default ModificarPlatillo;