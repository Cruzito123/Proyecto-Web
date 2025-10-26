
// frontend/src/components/common/MisionVision.jsx
import React from 'react';

function MisionVision() {
  return (
    <section className="mision-vision-section">
      
      {/* Misión */}
      <div id="mision" className="content-card">
        <h2 className="card-title">Misión</h2>
        <p className="card-text">
            Ofrecer una experiencia gastronómica elegante y acogedora, donde los sabores tradicionales de México se fusionan con el arte refinado de la repostería francesa, incluyendo opciones veganas que celebran la diversidad gastronómica y el respeto por todos los estilos de vida. Deleitando los sentidos y creando momentos memorables para cada comensal.
        </p>
      </div>

      {/* Visión */}
      <div id="vision" className="content-card">
        <h2 className="card-title">Visión</h2>
        <p className="card-text">
            Ser reconocido como un referente de la alta cocina mexicana con un toque francés, ofreciendo platillos que conectan culturas y corazones, destacando por la calidad, el servicio excepcional y la experiencia tanto en el restaurante como desde la comodidad del hogar a través de pedidos en línea.
        </p>
      </div>

    </section>
  );
}

export default MisionVision;