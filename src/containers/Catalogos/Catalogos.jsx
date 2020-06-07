import React from 'react';
import Catalogo from '../../components/Catalogo';
import './catalogos.scss';

const Catalogos = () => {
    return (
        <div className="container">
            <section className="catalogos">
                <h1 className="catalogos__title">catálogo</h1>
                <Catalogo />
            </section>
        </div>
        
    );
};

export default Catalogos;