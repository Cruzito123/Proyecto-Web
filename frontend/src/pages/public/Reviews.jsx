// frontend/src/pages/public/Reviews.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header.jsx';
import ReviewForm from '../../components/common/ReviewForm.jsx';
import Footer from '../../components/common/Footer.jsx';
import { reviewAPI } from '../../services/api';

function Reviews() {
    const [filter, setFilter] = useState('all');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar reseñas al inicio
    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await reviewAPI.getAll();
            
            const transformedReviews = response.data.map(resena => ({
                id: resena.id,
                user: resena.nombre || 'Anónimo',
                role: resena.tipo || 'Local',
                rating: resena.calificacion,
                text: resena.comentario,
                fecha: resena.fecha,
                platilloId: resena.platillo,
                platilloNombre: resena.platillo_nombre
            }));
            
            setReviews(transformedReviews);
        } catch (error) {
            console.error('Error cargando reseñas:', error);
            setError('No se pudieron cargar las reseñas. Intenta recargar la página.');
        } finally {
            setLoading(false);
        }
    };

    const handleNewReview = async (formData) => {
        try {
            // ⚠️ IMPORTANTE: Cambia este ID por el del usuario logueado
            // Por ahora usamos 1 como ejemplo
            const userId = 1;
            
            const reviewData = {
                usuario: userId,
                calificacion: parseInt(formData.rating),
                comentario: formData.comentario,
                nombre: formData.nombre,
                tipo: formData.tipo,
            };
            
            // Solo agregar platillo si se seleccionó
            if (formData.platillo && formData.platillo !== "") {
                reviewData.platillo = parseInt(formData.platillo);
            }
            
            console.log('Enviando reseña a Django:', reviewData);
            
            const response = await reviewAPI.create(reviewData);
            console.log('Reseña creada:', response.data);
            
            // Agregar a la lista
            const newReview = {
                id: response.data.id,
                user: response.data.nombre,
                role: response.data.tipo,
                rating: response.data.calificacion,
                text: response.data.comentario,
                fecha: response.data.fecha,
                platilloId: response.data.platillo,
                platilloNombre: response.data.platillo_nombre
            };
            
            setReviews([newReview, ...reviews]);
            
            alert(`✅ ¡Reseña guardada exitosamente!\nID: ${response.data.id}`);
            
        } catch (error) {
            console.error('Error completo:', error);
            
            let errorMessage = 'No se pudo guardar la reseña.';
            
            if (error.response) {
                // Error de Django
                if (error.response.data) {
                    if (error.response.data.error) {
                        errorMessage = error.response.data.error;
                    } else if (typeof error.response.data === 'object') {
                        errorMessage = Object.entries(error.response.data)
                            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
                            .join('; ');
                    }
                }
            } else if (error.request) {
                errorMessage = 'No se recibió respuesta del servidor. Verifica que Django esté corriendo.';
            }
            
            alert(`❌ ${errorMessage}`);
        }
    };

    // Filtrar reseñas
    const filteredReviews = reviews.filter(review => {
        if (filter === 'all') return true;
        return review.role === filter;
    });

    return (
        <>
            <Header />
            <main className="reviews-main-content" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 className="page-title">Experiencias y Reseñas</h1>

                <ReviewForm onSubmit={handleNewReview} />

                <h2 style={{ marginTop: '40px' }}>Comentarios de Clientes</h2>

                {/* Estado */}
                {loading && <p>🔄 Cargando reseñas...</p>}
                {error && <p style={{ color: 'red', padding: '10px', background: '#ffebee' }}>{error}</p>}

                {/* Botones de filtro */}
                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={() => setFilter('all')}
                        style={{ 
                            padding: '8px 16px',
                            background: filter === 'all' ? '#d1a337' : '#f0f0f0',
                            color: filter === 'all' ? 'white' : '#333',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Todos ({reviews.length})
                    </button>
                    <button 
                        onClick={() => setFilter('Local')}
                        style={{ 
                            padding: '8px 16px',
                            background: filter === 'Local' ? '#d1a337' : '#f0f0f0',
                            color: filter === 'Local' ? 'white' : '#333',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Locales ({reviews.filter(r => r.role === 'Local').length})
                    </button>
                    <button 
                        onClick={() => setFilter('Extranjero')}
                        style={{ 
                            padding: '8px 16px',
                            background: filter === 'Extranjero' ? '#d1a337' : '#f0f0f0',
                            color: filter === 'Extranjero' ? 'white' : '#333',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Extranjeros ({reviews.filter(r => r.role === 'Extranjero').length})
                    </button>
                </div>

                {/* Lista de reseñas */}
                <div>
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map(r => (
                            <div key={r.id} style={{ 
                                border: '1px solid #ddd', 
                                borderRadius: '8px',
                                padding: '20px', 
                                marginBottom: '20px',
                                backgroundColor: '#f9f9f9'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '50%', 
                                        background: '#d1a337', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        marginRight: '10px'
                                    }}>
                                        {r.user.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block' }}>{r.user}</strong>
                                        <div style={{ fontSize: '14px', color: '#666' }}>
                                            <span style={{ 
                                                display: 'inline-block',
                                                padding: '2px 8px',
                                                background: r.role === 'Local' ? '#e3f2fd' : '#fff3e0',
                                                borderRadius: '10px',
                                                marginRight: '10px'
                                            }}>
                                                {r.role === 'Local' ? '🇲🇽 México' : '🌎 Internacional'}
                                            </span>
                                            {r.fecha && (
                                                <span style={{ color: '#999' }}>
                                                    {new Date(r.fecha).toLocaleDateString('es-MX')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ margin: '10px 0' }}>
                                    <span style={{ color: '#ffc107', fontSize: '20px' }}>
                                        {'★'.repeat(r.rating)}
                                        {'☆'.repeat(5 - r.rating)}
                                    </span>
                                    <span style={{ marginLeft: '10px', fontWeight: 'bold', color: '#666' }}>
                                        ({r.rating}/5)
                                    </span>
                                </div>

                                <p style={{ margin: 0, lineHeight: '1.6' }}>{r.text}</p>
                                
                                {/* Mostrar platillo si existe */}
                                {r.platilloId && (
                                    <div style={{ 
                                        marginTop: '15px', 
                                        padding: '8px 12px',
                                        background: '#f0f7ff',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        color: '#1976d2',
                                        borderLeft: '4px solid #1976d2'
                                    }}>
                                        🍽️ <strong>Platillo:</strong> {r.platilloNombre || `ID: ${r.platilloId}`}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        !loading && !error && (
                            <div style={{ 
                                textAlign: 'center', 
                                padding: '40px',
                                color: '#666',
                                border: '2px dashed #ddd',
                                borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '48px', marginBottom: '10px' }}>📝</div>
                                <p style={{ fontSize: '18px', marginBottom: '5px' }}>No hay reseñas para mostrar</p>
                                <p>¡Sé el primero en comentar!</p>
                            </div>
                        )
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Reviews;