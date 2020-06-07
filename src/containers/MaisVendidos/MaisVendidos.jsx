import React from 'react';
import MaisVendido from '../../components/MaisVendido';
import './maisvendidos.scss';

const MaisVendidos = (product) => (
    <div className="container">
        <section className="mais__vendidos">
            <h1 className="mais__vendidos__title">mais vendidos</h1>
            <MaisVendido productInfo={product}/>
        </section>
    </div>
);
export default MaisVendidos;