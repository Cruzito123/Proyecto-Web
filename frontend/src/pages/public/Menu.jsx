
// frontend/src/pages/public/Menu.jsx

import React, { useState } from 'react';
import Header from '../../components/common/Header.jsx'; 
import PlatilloCard from '../../components/common/PlatilloCard.jsx'; // Nuevo componente
import MenuFilterButton from '../../components/common/MenuFilterButton.jsx'; // Nuevo componente

// Datos de prueba (MOCK_PLATILLOS) - En el futuro, esto vendrá de Django API
const MOCK_PLATILLOS = [
    { id: 1, name: "Boeuf Bourguignon", desc: "Tradicional estofado de res en vino tinto con champiñones y cebollitas", price: 385, category: "Carnes", tags: ["gluten"], isSpecial: false, imageUrl: "/img/plato1.jpg" },
    { id: 2, name: "Coq au Vin", desc: "Pollo cocinado en vino tinto con tocino, champiñones y hierbas provenzales", price: 340, category: "Carnes", tags: ["gluten"], isSpecial: true, imageUrl: "/img/plato2.jpg" },
    { id: 3, name: "Ratatouille Provenzal", desc: "Vegetales mediterráneos rostizados con hierbas frescas", price: 240, category: "Vegano", tags: ["vegano"], isSpecial: false, imageUrl: "/img/plato3.jpg" },
    { id: 4, name: "Buddha Bowl Francés", desc: "Quinoa, lentejas, vegetales asados y tahini de hierbas", price: 260, category: "Vegano", tags: ["vegano", "especial"], isSpecial: false, imageUrl: "/img/plato4.jpg" },
    { id: 5, name: "Crème brûlée", desc: "Clásico postre francés con costra de caramelo", price: 120, category: "Postres", tags: [], isSpecial: true, imageUrl: "/img/postre1.jpg" },
    { id: 6, name: "Tarta de Manzana", desc: "Suave tarta con compota de manzana y especias", price: 110, category: "Postres", tags: [], isSpecial: false, imageUrl: "/img/postre2.jpg" },
];

const CATEGORIAS = ["Todos", "Carnes", "Vegano", "Postres"];

function Menu() {
    // Estado dinámico para el filtro (Elemento dinámico)
    const [activeFilter, setActiveFilter] = useState("Todos");

    // Lógica de filtrado
    const filteredPlatillos = MOCK_PLATILLOS.filter(platillo => {
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
                    {filteredPlatillos.map(platillo => (
                        <PlatilloCard key={platillo.id} platillo={platillo} />
                    ))}
                </div>
                
                {filteredPlatillos.length === 0 && <p style={{textAlign: 'center', gridColumn: '1 / -1'}}>No hay platillos disponibles en esta categoría.</p>}
            </main>
        </>
    );
}

export default Menu;