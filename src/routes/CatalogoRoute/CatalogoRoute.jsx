import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { purchasedProducts } from '../../actions';
import { connect } from 'react-redux';
import produtoIndisponivel from '../../assets/imagens/produto_indisponivel.png';
import purchase from '../../utils/purchase';

import './catalogoroute.scss';

import $ from 'jquery';

const CatalogoRoute = ( props ) => {
    const { code_color } = useParams();
    const { purchasedProducts, products, purchProducts, totalPrice } = props;
    let selectedProduct = {};
    const [ size, setSize ] = useState('');
    
    const getPurchase = () => {
        let getPurchaseds = purchase(selectedProduct, purchProducts, size, totalPrice);
        if(getPurchaseds!== undefined)
        {
            const { product, prices } = getPurchaseds;
            purchasedProducts(product, prices);
        }
    }
    
    for(var i=0;i<products.length; i++)
    {
        if(products[i].code_color === code_color)
        {
            selectedProduct = {
                name: products[i].name,
                price: products[i].regular_price,
                promotion: products[i].actual_price,
                image: products[i].image,
                sizes: products[i].sizes,
                discount: products[i].discount_percentage,
                payment: products[i].installments,
            }
            if(selectedProduct.promotion==='')
            {
                selectedProduct = {
                    ...selectedProduct,
                    totalPrice: selectedProduct.price
                }
            }
            else
            {
                selectedProduct = {
                    ...selectedProduct,
                    totalPrice: selectedProduct.promotion
                }
            }
        }
    }
    $(document).ready(function(){
        if(selectedProduct.image==="")
        {
            $("#purchase").attr('disabled', 'disabled')
                .css("background-color", "white")
                    .css("color", "lightgray");
        }
    })
    return (
        <section className="cat__route container">
            <article className="cat__route__product__content">
                {selectedProduct.image === "" ?
                    <img src={produtoIndisponivel} alt="Produto indiponivel" /> :
                    <img src={selectedProduct.image} alt={`Imagem do ${selectedProduct.name}`} 
                        className="cat__route__product__image"/>
                }
                <div className="cat__route__product__informations">
                    <h1>{selectedProduct.name}</h1>

                    {selectedProduct.promotion === selectedProduct.price ? 
                        <p className="cat__route__product__informations
                            cat__route__product__informations--complements">
                            Por apenas {selectedProduct.price}
                        </p> :
                        <div>
                            <p className="cat__route__product__informations
                                cat__route__product__informations--complements">
                                de <del>{selectedProduct.price}</del>
                            </p>
                            
                            <p className="cat__route__product__informations
                                cat__route__product__informations--complements">
                                por apenas {selectedProduct.promotion}
                            </p>

                            <p className="cat__route__product__informations
                                cat__route__product__informations--complements">
                                economize {selectedProduct.discount}
                            </p>
                        </div>
                    }

                    <h3 className="cat__route__product__informations
                                cat__route__product__informations--complements">
                        parcele em até {selectedProduct.payment}
                    </h3>
                    
                    <h3 className="cat__route__product__informations
                        cat__route__product__informations--complements">
                        tamanhos disponíveis:
                    </h3>
                    {selectedProduct.sizes !== undefined && selectedProduct.sizes.map((elem) => {
                        return (elem.available === true &&
                            <button value={elem.size} key={elem.size} 
                                id={elem.size} className="cat__route__sizes" onClick={() => {
                                    if(size ==="")
                                    {
                                        document.getElementById(elem.size).classList
                                            .add('cat__route__sizes--selected');
                                        setSize(elem.size);
                                    }
                                    else if(size === elem.size)
                                    {
                                        document.getElementById(elem.size).classList.remove('cat__route__sizes--selected');
                                        setSize('');
                                    }
                                    else
                                    {
                                        document.getElementById(size).classList
                                            .remove('cat__route__sizes--selected');
                                        document.getElementById(elem.size).classList
                                            .add('cat__route__sizes--selected');
                                        setSize(elem.size);
                                    }
                                }}>
                                {elem.size}
                            </button>
                        ); 
                        })
                    }
                    <div className="cat__route__product__amount">
                        <h3 className="cat__route__product__informations
                            cat__route__product__informations--complements">
                            Quantidade: <span id="amount">1</span>
                            
                        </h3>
                        <button id="plusButton" className="cat__route__product__amount__button"
                            onClick={() => {
                                let value = parseInt(document.getElementById('amount').textContent);
                                if(value<10)
                                {
                                    document.getElementById('amount').textContent = value+1;
                                }
                                else
                                {  
                                    document.getElementById('amount').textContent=10;
                                }
                                
                            }}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>

                        <button className="cat__route__product__amount__button" onClick={()=> {
                            let value = parseInt(document.getElementById('amount').textContent);
                            if(value - 1 ===0)
                            {
                                document.getElementById('amount').textContent=1
                            }
                            else
                            {
                                document.getElementById('amount').textContent=value-1;
                            }
                            
                            
                        }}>
                            <i className="fa fa-minus" aria-hidden="true"></i>
                        </button>
                    </div>
                    {size === "" ?
                        <button id="purchase" className="cat__route__purchase"
                            onClick={()=> {
                                document.getElementById('invalidSize').style.display='block';
                                document.getElementById('purchase').classList.add('cat__route__purchase--clicked');
                                }
                            }
                            onBlur={() => {
                                document.getElementById('invalidSize').style.display='none';
                                document.getElementById('purchase').classList
                                    .remove('cat__route__purchase--clicked');
                            }}>
                            Adicionar ao carrinho
                        </button> :
                        <Link to="/" className="cat__route__purchase--backHome">
                            <button id="purchase" className="cat__route__purchase"
                                onClick={getPurchase}>
                                Adicionar ao carrinho
                            </button>
                        </Link>
                    }
                    <div id="invalidSize" className="cat__route__invalidSize">Escolha um tamanho</div>
                </div>
                
            </article>
        </section>
    );
} 

const mapStateToProps = store => ({
    products: store.clickState.products,
    purchProducts: store.clickState.purchProducts,
    totalPrice: store.clickState.totalPrice
});
const mapDispacthToProps = dispatch => bindActionCreators({purchasedProducts}, dispatch);
  
export default connect(mapStateToProps, mapDispacthToProps) (CatalogoRoute);