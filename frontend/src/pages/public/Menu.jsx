import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header.jsx'; 
import PlatilloCard from '../../components/common/PlatilloCard.jsx'; 
import MenuFilterButton from '../../components/common/MenuFilterButton.jsx'; 
import Footer from '../../components/common/Footer.jsx';

// Asegúrate de que esta URL sea correcta y tu servidor Django esté corriendo
const API_URL = "http://localhost:8000";

// ⚠️ IMPORTANTE: Estas categorías deben coincidir EXACTAMENTE (mayúsculas/minúsculas) 
// con lo que escribiste en el campo 'categoria' de tu base de datos.
const CATEGORIAS = ["Todos", "Carnes", "Vegano", "Postres", "Pastas", "Bebidas"]; 

function Menu() {
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [platillos, setPlatillos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlatillos = async () => {
            try {
                // Petición a tu API Django
                const response = await fetch(`${API_URL}/api/platillos/`);
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                const data = await response.json();
                setPlatillos(data);
            } catch (error) {
                console.error("Error al obtener los platillos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlatillos();
    }, []);

    // Lógica de filtrado corregida
    const filteredPlatillos = platillos.filter(platillo => {
        if (activeFilter === "Todos") return true;
        // ✅ CORRECCIÓN: Usamos 'categoria' (campo de Django) en lugar de 'category'
        return platillo.categoria === activeFilter;
    });

    return (
        <>
            <Header />
            <main className="menu-main-content">
                <section className="menu-hero-text">
                    <h1 className="page-title">Nuestro Menú</h1>
                    <p className="page-subtitle">
                        Descubre nuestra selección de platillos elaborados con ingredientes frescos.
                    </p>
                </section>

                {/* BOTONES DE FILTRO */}
                <div className="filter-buttons-container">
                    {CATEGORIAS.map(cat => (
                        <MenuFilterButton 
                            key={cat}
                            category={cat}
                            isActive={activeFilter === cat}
                            onClick={() => setActiveFilter(cat)}
                        />
                    ))}
                </div>

                {/* LISTADO DE PLATILLOS */}
                <div className="platillos-grid">
                    {loading ? (
                        <p style={{textAlign: 'center'}}>Cargando delicias...</p>
                    ) : (
                        filteredPlatillos.map(platillo => (
                            // Pasamos el objeto completo 'platillo' al componente
                            <PlatilloCard key={platillo.id} platillo={platillo} />
                        ))
                    )}
                </div>

                {/* Mensaje si no hay resultados en el filtro */}
                {!loading && filteredPlatillos.length === 0 && (
                    <div style={{textAlign: 'center', gridColumn: '1 / -1', padding: '20px'}}>
                        <p>No hay platillos disponibles en la categoría <strong>{activeFilter}</strong> por el momento.</p>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}

export default Menu;