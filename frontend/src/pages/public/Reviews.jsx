
// frontend/src/pages/public/Reviews.jsx
import React, { useState } from 'react';
import Header from '../../components/common/Header.jsx';
import ReviewForm from '../../components/common/ReviewForm.jsx';

// Datos simulados (En el futuro, esto vendrá de Django API)
const MOCK_REVIEWS = [
    { id: 1, user: 'Juan R.', role: 'Local', rating: 5, text: "Excelente fusión, el mejor postre francés que he probado en México." },
    { id: 2, user: 'Sarah K.', role: 'Extranjero', rating: 4, text: "Amazing atmosphere and delicious vegan options. Highly recommend." },
    { id: 3, user: 'Paco G.', role: 'Local', rating: 3, text: "Buen servicio, pero el platillo principal tardó un poco en llegar." },
    { id: 4, user: 'Jean M.', role: 'Extranjero', rating: 5, text: "A truly Belle Époque experience! The Mexican flavors were surprising." }
];

function Reviews() {
    // Estado para el filtro dinámico
    const [filter, setFilter] = useState('all');
    const [reviews, setReviews] = useState(MOCK_REVIEWS);
    const isLoggedIn = true; // Simular que el usuario puede dejar un comentario

    // Lógica de filtrado dinámico
    const filteredReviews = reviews.filter(review => {
        if (filter === 'all') return true;
        return review.role === filter;
    });

    const handleNewReview = (data) => {
        // Simulación de agregar nueva reseña (En el futuro, esto actualiza la DB)
        const newReview = { id: Date.now(), user: 'Usuario Logueado', role: 'Local', rating: data.rating, text: data.comentario };
        setReviews([newReview, ...reviews]);
    };


    return (
        <>
            <Header />
            <main className="reviews-main-content" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 className="page-title">Experiencias y Reseñas</h1>

                {/* Sección de Formulario */}
                {isLoggedIn ? (
                    <ReviewForm userName="Cliente VIP" onSubmit={handleNewReview} />
                ) : (
                    <p className="hint-text">Inicia sesión para dejar un comentario.</p>
                )}

                <h2 style={{ marginTop: '40px' }}>Comentarios de Clientes</h2>

                {/* Botones de Filtro Dinámico */}
                <div className="filter-buttons" style={{ marginBottom: '20px' }}>
                    <button onClick={() => setFilter('all')} style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}>Todos</button>
                    <button onClick={() => setFilter('Local')} style={{ fontWeight: filter === 'Local' ? 'bold' : 'normal', marginLeft: '10px' }}>Locales</button>
                    <button onClick={() => setFilter('Extranjero')} style={{ fontWeight: filter === 'Extranjero' ? 'bold' : 'normal', marginLeft: '10px' }}>Extranjeros</button>
                </div>


                <div className="reviews-list-grid">
                    {filteredReviews.map(r => (
                        <div key={r.id} className="review-item-card">
                            
                            <div className="review-user-info">
                                <span className="user-icon">👤</span>
                                <div>
                                    <strong>{r.user}</strong>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                                        {r.role === 'Local' ? 'México' : r.role} 
                                    </p>
                                </div>
                            </div>

                            {/* Muestra las estrellas */}
                            <p className="rating-stars">
                                {'⭐'.repeat(r.rating)}
                            </p>

                            <p>{r.text}</p>
                        </div>
                    ))}
                    {/* ... (el resto del código) ... */}
                </div>

            </main>
        </>
    );
}

export default Reviews;

