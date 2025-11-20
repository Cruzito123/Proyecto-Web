import React, { useState } from 'react';

function AltaPlatillo({ onSubmit }) {
    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: 'Carnes', // Valor por defecto
        es_vegano: false,
        contiene_alergenos: false,
        imagen_url: '' // ✅ Nuevo estado para la imagen
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
        // Enviamos los datos al padre (GestionPlatillos)
        onSubmit(form);
        // Opcional: Limpiar formulario tras envío exitoso
        // setForm({ ...form, nombre: '', precio: '' ... }); 
    };

    return (
        <div className="admin-card">
            <h3 className="admin-card-title">Alta de Platillo</h3>
            <form onSubmit={handleSubmit} className="admin-form">
                <label>Nombre:</label>
                <input 
                    type="text" name="nombre" 
                    value={form.nombre} onChange={handleChange} required 
                />

                <label>Descripción:</label>
                <textarea 
                    name="descripcion" 
                    value={form.descripcion} onChange={handleChange} 
                />

                <label>Precio:</label>
                <input 
                    type="number" name="precio" step="0.01" 
                    value={form.precio} onChange={handleChange} required 
                />

                <label>Categoría:</label>
                <select name="categoria" value={form.categoria} onChange={handleChange}>
                    <option value="Carnes">Carnes</option>
                    <option value="Vegano">Vegano</option>
                    <option value="Postres">Postres</option>
                    <option value="Pastas">Pastas</option>
                    <option value="Bebidas">Bebidas</option>
                </select>

                {/* ✅ NUEVO CAMPO: URL DE IMAGEN */}
                <label>URL de la Imagen:</label>
                <input 
                    type="text" 
                    name="imagen_url" 
                    value={form.imagen_url} 
                    onChange={handleChange} 
                    placeholder="https://ejemplo.com/foto.jpg"
                />
                {form.imagen_url && (
                    <div style={{marginTop: '10px'}}>
                        <small>Vista previa:</small><br/>
                        <img src={form.imagen_url} alt="Vista previa" style={{width: '100px', height: 'auto', borderRadius: '4px'}} />
                    </div>
                )}

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

                <button type="submit" className="submit-button">Crear Platillo</button>
            </form>
        </div>
    );
}

export default AltaPlatillo;