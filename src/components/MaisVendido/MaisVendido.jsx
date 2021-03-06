import React from 'react';
import { Link } from 'react-router-dom';
import './maisvendido.scss';
import Loading from '../Loading';

const MaisVendido = ({ productInfo }) => {  
    const { products } = productInfo;

    if(products.length > 0)
    {
        return products.map((elem) => {
                return (
                    <artilce className="mais__vendido" key={elem.code_color}>
                        <i id="icon" className="far fa-heart mais__vendido__icone" ></i>
                        
                        <Link to={`/catalogo/product=${elem.code_color}`} className="mais__vendido__route">
                            <div className="mais__vendido__image">
                                <img src={elem.image} alt="produto 1" className="mais__vendido__produto"/>
                                <p className="mais__vendido__descricao">
                                    {elem.name}
                                </p>
                                <p className="mais__vendido__descricao mais__vendido__descricao--preco">
                                    {elem.actual_price}
                                </p>
                            </div>
                        </Link>
                    </artilce>
                )
            })
    }
    else
    {
        return <Loading />
    }
    
};

export default MaisVendido;  