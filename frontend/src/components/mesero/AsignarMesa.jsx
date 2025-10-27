import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './mesero.css';

function AsignarMesa({ onMesaAsignada, mesasActivas }) {
    const [numeroMesa, setNumeroMesa] = useState('');
    const [numeroComensales, setNumeroComensales] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Validar que los números no sean negativos o cero
        if (parseInt(numeroMesa) <= 0 || parseInt(numeroComensales) <= 0) {
            alert("El número de mesa y de comensales debe ser mayor a cero.");
            return;
        }

        // 2. Validar que la mesa no esté ya asignada
        const mesaYaExiste = mesasActivas.some(
            (mesa) => mesa.numero === numeroMesa
        );

        if (mesaYaExiste) {
            alert(`La mesa número ${numeroMesa} ya se encuentra activa. Por favor, elige otro número.`);
            return;
        }

        // Llama a la función del componente padre (App.js)
        onMesaAsignada({ numero: numeroMesa, comensales: numeroComensales });
        navigate('/mesero'); // Regresar al panel del mesero
    };

    return (
        <div className="asignar-mesa-container">
            <div className="asignar-mesa-form">
                <h2>Asignar Nueva Mesa</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="numeroMesa">Número de Mesa</label>
                    <input
                        id="numeroMesa"
                        type="number"
                        value={numeroMesa}
                        onChange={(e) => setNumeroMesa(e.target.value)}
                        placeholder="Ej: 15"
                        required
                    />

                    <label htmlFor="numeroComensales">Número de Comensales</label>
                    <input
                        id="numeroComensales"
                        type="number"
                        value={numeroComensales}
                        onChange={(e) => setNumeroComensales(e.target.value)}
                        placeholder="Ej: 4"
                        required
                    />

                    <button type="submit" className="btn-asignar">Asignar Mesa</button>
                    <button type="button" className="btn-cancelar" onClick={() => navigate('/mesero')}>
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AsignarMesa;
