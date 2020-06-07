import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { purchasedProducts } from '../../actions';
import { connect } from 'react-redux';
import produtoIndisponivel from '../../assets/imagens/produto_indisponivel.png';

import './catalogoroute.scss';

const CatalogoRoute = ( props ) => {
    const { name } = useParams();
    const { purchasedProducts, products, purchProducts } = props;
    let selectedProduct = {};

    const [ size, setSize ] = useState('');
    const [ teste, setTeste ] = useState(false)
    const [ purchaseds, setPurchaseds ] = useState('');

    for(var i=0;i<products.length; i++)
    {
        if(products[i].name === name)
        {
            selectedProduct = {
                name: products[i].name,
                price: products[i].regular_price,
                promotion: products[i].actual_price,
                image: products[i].image,
                sizes: products[i].sizes,
                discount: products[i].discount_percentage,
                payment: products[i].installments
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
                            <button id="purchase" className="cat__route__purchase"
                                onClick={() => {
                                    document.getElementById('purchase').classList.add('cat__route__purchase--clicked');
                                    setPurchaseds({
                                        name: selectedProduct.name,
                                        image: selectedProduct.image,
                                        chosenSize: size,
                                        price: selectedProduct.totalPrice
                                    });
                                    purchasedProducts(purchaseds);
                            }}>
                                Adicionar ao carrinho
                            </button>
                        
                    }
                    <div id="invalidSize" className="cat__route__invalidSize">Escolha um tamanho</div>
                </div>
                
            </article>
        </section>
    );
} 

const mapStateToProps = store => ({
    products: store.clickState.products,
    purchProducts: store.clickState.purchProducts
});
const mapDispacthToProps = dispatch => bindActionCreators({purchasedProducts}, dispatch);
  
export default connect(mapStateToProps, mapDispacthToProps) (CatalogoRoute);