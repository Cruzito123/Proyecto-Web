import React from 'react';
import Header from '../../components/common/Header.jsx'; 
import MisionVision from '../../components/common/MisionVision.jsx'; // Contiene Misión y Visión
import Valores from '../../components/common/Valores.jsx'; // Contiene la lista de valores
import Footer from '../../components/common/Footer.jsx';
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

               
                <MisionVision />
                
              
                <Valores />
                
                
                <Footer />
            </main>
        </div>
    );
}

export default Home;