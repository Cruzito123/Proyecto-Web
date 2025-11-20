import React from 'react';

function PlatilloCard({ platillo }) {
    // 1. Desestructuramos usando los nombres REALES de tu base de datos Django
    const { 
        nombre, 
        descripcion, 
        precio, 
        es_vegano, 
        contiene_alergenos, 
        imagen_url 
    } = platillo;
    
    const formatPrice = (p) => `$${p} MXN`;
    
    return (
        <div className="platillo-card">
            
            <div className="platillo-image-container">
                {/* Usamos imagen_url o una por defecto si está vacía */}
                <img 
                    src={imagen_url || 'https://via.placeholder.com/300?text=Platillo'} 
                    alt={nombre} 
                    className="platillo-image" 
                />
                
                {/* Etiquetas dinámicas basadas en tus booleanos de la DB */}
                {es_vegano && <span className="tag vegan-tag">🌱 Vegano</span>}
            </div>

            <div className="platillo-info">
                {/* Usamos nombre y descripcion */}
                <h3 className="platillo-name">{nombre}</h3>
                <p className="platillo-desc">{descripcion}</p>
                
                <div className="platillo-details">
                    <span className="platillo-price">{formatPrice(precio)}</span>
                    
                    {/* Etiqueta de alérgenos si es True en la DB */}
                    {contiene_alergenos && (
                        <span className="tag allergen-tag" style={{backgroundColor: '#ffebee', color: '#c62828'}}>
                            ⚠️ Alérgenos
                        </span>
                    )}
                </div>
            </div>
            
        </div>
    );
}

export default PlatilloCard;