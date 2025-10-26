// frontend/src/pages/public/Home.jsx
import React from 'react';
import Header from '../../components/common/Header.jsx'; 
import MisionVision from '../../components/common/MisionVision.jsx'; // Contiene Misión y Visión
import Valores from '../../components/common/Valores.jsx'; // Contiene la lista de valores

function Home() {
    return (
        <div>
            <Header />
            
            <main className="home-main-content">
                
                {/* SECCIÓN HERO (Título y Slogan) */}
                <section className="hero-section">
                    <h1 className="hero-title">Le Jardine Mexican</h1>
                    <p className="hero-slogan">"Donde la Elegancia Francesa se Encuentra con el Corazón de México."</p>
                </section>

                {/* SECCIÓN MISIÓN Y VISIÓN (Contenido de tu HTML) */}
                <MisionVision />
                
                {/* SECCIÓN VALORES (Contenido de tu HTML) */}
                <Valores />
                
                {/* Aquí irán las secciones de Contacto, Menú Destacado, etc. */}
                
            </main>
        </div>
    );
}

export default Home;