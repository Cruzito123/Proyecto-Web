
// frontend/src/components/common/PlatilloCard.jsx

import React from 'react';

function PlatilloCard({ platillo }) {
    const { name, desc, price, tags, isSpecial, imageUrl } = platillo;
    
    // Función auxiliar para formatear el precio
    const formatPrice = (p) => `$${p} MXN`;
    
    return (
        <div className="platillo-card">
            
            {/* Imagen del Plato (Estofado de res o Pollo al vino) */}
            <div className="platillo-image-container">
                <img src={imageUrl || '/img/placeholder.jpg'} alt={name} className="platillo-image" />
                {isSpecial && <span className="tag special-tag">Especial</span>}
                {tags.includes('vegano') && <span className="tag vegan-tag">🌱 Vegano</span>}
            </div>

            <div className="platillo-info">
                <h3 className="platillo-name">{name}</h3>
                <p className="platillo-desc">{desc}</p>
                <div className="platillo-details">
                    <span className="platillo-price">{formatPrice(price)}</span>
                    {tags.includes('gluten') && <span className="tag allergen-tag">🌾 gluten</span>}
                </div>
            </div>
            
        </div>
    );
}

export default PlatilloCard;