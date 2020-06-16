import React from 'react';
import LogoPng from '../../assets/imagens/logo_header.png';
import { ReactComponent as SacolaDeCompras } from '../../assets/imagens/sacola_compras.svg';
import { ReactComponent as Menu } from '../../assets/imagens/menu.svg';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { purchasedProducts } from '../../actions';
import { closeButtonClick } from '../../actions';
import produtoIndisponivel from '../../assets/imagens/produto_indisponivel.png';

import $ from 'jquery';

import './Topbar.scss';

const Topbar = (props) => {
    const { purchProducts, purchasedProducts, totalPrice, stateButton, closeButtonClick } = props;
    
    const deleteProduct = (id) => {
        let productName = document.getElementById(`removeButton${id}`).value;
        let priceRemoved = [];
        let newTotalPrice = [...totalPrice];
        debugger
        //eslint-disable-next-line
        let newProducts = purchProducts.filter((elem) => {
            if(elem.name !== productName)
            {
                return elem;
            }
            else
            {
                priceRemoved = -(elem.price);
                newTotalPrice.push(priceRemoved);
            }
        })
        purchasedProducts(newProducts, newTotalPrice);
        document.getElementById('shoppingCart').style.display="block";
    }
    
    return (
        <header className="topbar">
            <button className="topbar__menu">
                <Menu />
            </button>
            <Link to="/" className="topbar__logo">
                <img src={LogoPng} alt="logo fashionista" />
            </Link>
            <Link to="/pesquisa" className="topbar__search">
                <i className="fa fa-search" aria-hidden="true"></i>
            </Link>
            <button className="topbar__shoppingCart" onClick={() => {
                closeButtonClick(!stateButton)
                if(stateButton)
                {
                    $('#shoppingCart').show(400);
                }
            }}>
                <SacolaDeCompras className="topbar__shoppingCart__image"/>
                <span className="topbar__shoppingCart__amountProducts">{purchProducts.length}</span>
            </button>

            <ul id="shoppingCart" className="topbar__shoppingCart__products">
                <button className="topbar__shoppingCart__products__closeButton" onClick={() => {
                    closeButtonClick(!stateButton)
                    if(stateButton===false)
                    {
                        $('#shoppingCart').hide(400);
                    }
                }}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
                
                {purchProducts.length===0 ?
                    <div className="topbar__shoppingCart__products__invalidMessage">
                        <i className="fa fa-frown-o" aria-hidden="true"></i>
                        <p>
                            Você ainda não adicionou nenhum item à sacola de compras.
                        </p>
                    </div> : 
                    <p className="topbar__shopingCart__products__totalPrice">Valor Total:   
                        <span> {totalPrice.reduce((elem, actual) => {
                            return (parseFloat(elem)+parseFloat(actual));
                            }).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
                        }
                        </span>
                    </p>        
                }
                
                {purchProducts.length>0 && purchProducts.map((elem, count=0) => (
                    <li key={count++}>
                        <div className="topbar__shoppingCart__products__image">
                            {elem.image === '' ? <img src={produtoIndisponivel} alt={elem.name} /> :
                                <img src={elem.image} alt={`Imagem do ${elem.name}`} />
                            }
                        </div>
                        <div className="topbar__shoppingCart__products__informations">
                            <p className="topbar__shoppingCart__products__informations 
                                topbar__shoppingCart__products__informations--name"
                            >
                                {elem.name}
                            </p>
                            <p className="topbar__shoppingCart__products__addInformations">
                                Tamanho: {elem.chosenSize}
                            </p>
                            <p  className="topbar__shoppingCart__products__addInformations">
                                Preço: {elem.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}
                            </p>
                            <p className="topbar__shoppingCart__products__addInformations">
                                Quantidade: {elem.amount}
                            </p>
                            <button id={`removeButton${count}`} className="topbar__shoppingCart__products__delete" 
                                value={elem.name} onClick={()=>deleteProduct(count)}>
                                Remover item
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </header>
    );
}

const mapStateToProps = store => ({
    purchProducts: store.clickState.purchProducts,
    totalPrice: store.clickState.totalPrice,
    stateButton: store.clickState.stateButton
});

const mapDispacthToProps = dispatch => bindActionCreators({purchasedProducts, closeButtonClick}, dispatch);
  
export default connect(mapStateToProps, mapDispacthToProps) (Topbar);