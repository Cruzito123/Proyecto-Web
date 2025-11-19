
// frontend/src/pages/public/Menu.jsx

import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header.jsx'; 
import PlatilloCard from '../../components/common/PlatilloCard.jsx'; // Nuevo componente
import MenuFilterButton from '../../components/common/MenuFilterButton.jsx'; // Nuevo componente
import Footer from '../../components/common/Footer.jsx';

const API_URL = "http://localhost:8000";

const CATEGORIAS = ["Todos", "Carnes", "Vegano", "Postres"];

function Menu() {
    // Estado dinámico para el filtro (Elemento dinámico)
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [platillos, setPlatillos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlatillos = async () => {
            try {
                const response = await fetch(`${API_URL}/api/platillos/`);
                const data = await response.json();
                setPlatillos(data);
            } catch (error) {
                console.error("Error al obtener los platillos:", error);
            }
            setLoading(false);
        };

        fetchPlatillos();
    }, []); // El array vacío asegura que se ejecute solo una vez

    // Lógica de filtrado
    const filteredPlatillos = platillos.filter(platillo => {
        if (activeFilter === "Todos") return true;
        return platillo.category === activeFilter;
    });

    return (
        <>
            <Header />
            <main className="menu-main-content">
                <section className="menu-hero-text">
                    <h1 className="page-title">Nuestro Menú</h1>
                    <p className="page-subtitle">Descubre nuestra selección de platillos elaborados con ingredientes frescos y de la más alta calidad</p>
                </section>

                {/* BOTONES DE FILTRO DINÁMICO */}
                <div className="filter-buttons-container">
                    {CATEGORIAS.map(cat => (
                        <MenuFilterButton 
                            key={cat}
                            category={cat}
                            isActive={activeFilter === cat}
                            // Evento dinámico: onClick
                            onClick={() => setActiveFilter(cat)}
                        />
                    ))}
                </div>

                {/* LISTADO DE PLATILLOS */}
                <div className="platillos-grid">
                    {loading ? (
                        <p>Cargando menú...</p>
                    ) : (
                        filteredPlatillos.map(platillo => (
                            <PlatilloCard key={platillo.id} platillo={platillo} />
                        ))
                    )}
                </div>

                {filteredPlatillos.length === 0 && <p style={{textAlign: 'center', gridColumn: '1 / -1'}}>No hay platillos disponibles en esta categoría.</p>}
            </main>
            <Footer />
        </>
    );
}

export default Menu;