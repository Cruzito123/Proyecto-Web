
// frontend/src/components/Chef/GestionMenu.jsx

import React from 'react';
import AltaPlatillo from '../admin/AltaPlatillo.jsx'; // Reutilizamos el formulario
// Componente para listar y editar platillos (simulación)
const PlatillosLista = () => (
    <div className="menu-gestion-lista">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Platillo</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Boeuf Bourguignon</td>
                    <td>$385 MXN</td>
                    <td>Carnes</td>
                    <td><button className="btn-edit">Editar</button> <button className="btn-delete">Borrar</button></td>
                </tr>
                {/* Puedes añadir más filas aquí */}
                <tr>
                    <td>2</td>
                    <td>Buddha Bowl Francés</td>
                    <td>$260 MXN</td>
                    <td>Vegano</td>
                    <td><button className="btn-edit">Editar</button> <button className="btn-delete">Borrar</button></td>
                </tr>
            </tbody>
        </table>
    </div>
);


function GestionMenu() {
    // Función que será llamada por el formulario de Alta (AJAX POST)
    const handleNewPlatilloSubmit = (data) => {
        console.log("Creando Platillo via AJAX:", data);
        alert(`Platillo ${data.nombre} enviado para creación.`);
        // Aquí se llamaría a la función AJAX POST createPlatillo()
    };

    return (
        <div className="chef-content-main-layout">
            
            {/* --- 1. Tarjeta de Lista (Columna Izquierda) --- */}
            <section className="chef-main-column">
                <h3 className="chef-section-title">Menú Activo ({'2'} platillos)</h3>
                <PlatillosLista />
            </section>
            
            {/* --- 2. Tarjeta de Alta de Platillo (Columna Derecha) --- */}
            <aside className="chef-sidebar-column">
                <h3 className="chef-section-title">Añadir Nuevo Platillo</h3>
                {/* Reutilizamos el formulario de Alta con la validación de Hook Form */}
                <AltaPlatillo onSubmit={handleNewPlatilloSubmit} />
            </aside>
        </div>
    );
}

export default GestionMenu;