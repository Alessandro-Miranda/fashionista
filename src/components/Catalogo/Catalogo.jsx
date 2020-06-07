import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './catalogo.scss';

import produtoIndisponivel from '../../assets/imagens/produto_indisponivel.png';
import { bindActionCreators } from 'redux';
import { clickButton } from '../../actions';
import { connect } from 'react-redux';
import Loading from '../Loading';

const Catalogo = ( props ) => {
    const [cart, setCart] = useState(false);
    const { clickButton, products } = props;
    
    if(products.length > 0)
    {
        return products.map((elem, count=1) => {
            return (    
                <artilce className="catalogo" key={count++} index={elem.style}>
                    <i id="icon" className="far fa-heart catalogo__icone" ></i>
                    {elem.on_sale===true ?
                    <span className="catalogo__desconto">{elem.discount_percentage} off</span> : null
                    }
                    <Link to={`/catalogo/product=${elem.name}`} className="catalogo__route">
                        <div className="catalogo__image">
                            {elem.image==="" ?
                                <img src={produtoIndisponivel} alt="produto 1" className="catalogo__produto catalogo__produto--border"/> :
                                <img src={elem.image} alt="produto 1" className="catalogo__produto catalogo__produto--border"/>
                            }
                            <p className="catalogo__descricao">
                            {elem.name}
                            </p>
                            {elem.on_sale===true ? 
                                <p className="catalogo__descricao 
                                    catalogo__descricao--preco catalogo__descricao--preco--promocional">
                                    de <del>{elem.regular_price}</del> por <ins>{elem.actual_price}</ins>
                                </p> :
                                <p className="catalogo__descricao catalogo__descricao--preco">
                                    {elem.regular_price}
                                </p>
                            }
                        </div>
                    </Link>
                    <i id={`carrinhoCatalogoIcone${elem.style}`} className="fas fa-cart-plus catalogo__icone__carrinho"
                        onClick={() => {
                            setCart(!cart);
                            clickButton(cart);
        
                            if(cart===false)
                            {
                                document.getElementById(`carrinhoCatalogoIcone${elem.style}`).classList
                                    .add("catalogo__icone__carrinho--active");
                            }
                            else
                            {
                                document.getElementById(`carrinhoCatalogoIcone${elem.style}`).classList
                                    .remove("catalogo__icone__carrinho--active");
                            }
                        }}></i>
                </artilce>
            );
        })
    }
    else
    {
        return <Loading />;
    }
}; 

const mapStateToProps = store => ({
    shoppingCart: store.clickState.shoppingCart,
    products: store.clickState.products
});
const mapDispacthToProps = dispatch => bindActionCreators({clickButton}, dispatch);
  
export default connect(mapStateToProps, mapDispacthToProps) (Catalogo);  