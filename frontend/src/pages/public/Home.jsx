
// frontend/src/pages/public/Home.jsx
import React from 'react';
import Header from '../../components/common/Header'; // Importación

function Home() {
  return (
    <div>
      <Header /> {/* Usando el componente de barra de navegación */}
      <main>
        <h1>Bienvenido a Le Jardine Mexican</h1> 
        <p>Comienza a construir el Hero Section de Figma aquí.</p>
      </main>
    </div>
  );
}

export default Home;