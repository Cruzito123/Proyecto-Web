
// frontend/src/components/common/MenuFilterButton.jsx

import React from 'react';

function MenuFilterButton({ category, isActive, onClick }) {
    return (
        <button 
            className={`menu-filter-button ${isActive ? 'active-filter' : ''}`}
            onClick={onClick}
        >
            {category}
        </button>
    );
}

export default MenuFilterButton;
