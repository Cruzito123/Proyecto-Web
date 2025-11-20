import React, { useState } from 'react';
// Importamos los componentes que serán las pestañas
import OrdenesActivas from '../../components/Chef/OrdenesActivas.jsx'; 
import Inventario from '../../components/Chef/Inventario.jsx';
import GestionMenu from '../../components/Chef/GestionMenu.jsx';
// Iconos
const IconoOrden = () => '🧾'; 
const IconoInventario = () => '📦'; 
const IconoPerfil = () => '👤'; 

function Chef() {
    // 💡 Hook: Controla qué pestaña está activa
    const [activeTab, setActiveTab] = useState('ordenes-activas');

    // Función que devuelve el componente a renderizar
    const renderContent = () => {
        switch (activeTab) {
            case 'ordenes-activas':
                // 🚨 Esta pestaña renderiza la vista con KPIs, Órdenes e Inventario Rápido
                return <OrdenesActivas />; 
            case 'gestion-menu':
                return <GestionMenu />; 
            case 'inventario':
                return <Inventario />; 
            case 'mi-perfil':
                // Placeholder para Mi Perfil
                return <div className="chef-content-main-layout" style={{padding: '20px'}}>
                         <h2>Mi Perfil de Chef</h2>
                         <p>Aquí puedes ver tu información, cambiar contraseña, etc.</p>
                       </div>; 
            default:
                return <h2>Selecciona una opción del panel.</h2>;
        }
    };
    
    return (
        <div className="chef-dashboard-container">
            <header className="chef-header">
                <h1>Cocina - Chef</h1>
                <p>Panel de gestión de cocina</p>
            </header>

            {/* 🚨 NAVEGACIÓN DE PESTAÑAS (Clases definidas en chef.css) */}
            <nav className="chef-tabs-nav">
                <button 
                    className={`chef-tab-btn ${activeTab === 'ordenes-activas' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ordenes-activas')}
                >
                    <IconoOrden /> Órdenes Activas
                </button>
                <button 
                    className={`chef-tab-btn ${activeTab === 'gestion-menu' ? 'active' : ''}`}
                    onClick={() => setActiveTab('gestion-menu')}
                >
                    Gestión de Menú
                </button>
                 <button 
                    className={`chef-tab-btn ${activeTab === 'inventario' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inventario')}
                >
                    <IconoInventario /> Inventario
                </button>
                <button 
                    className={`chef-tab-btn ${activeTab === 'mi-perfil' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mi-perfil')}
                >
                    <IconoPerfil /> Mi Perfil
                </button>
            </nav>

            {/* 🚨 CONTENIDO DINÁMICO */}
            <div className="chef-tab-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Chef;