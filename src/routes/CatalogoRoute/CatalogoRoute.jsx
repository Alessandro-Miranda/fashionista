import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { purchasedProducts } from '../../actions';
import { connect } from 'react-redux';
import produtoIndisponivel from '../../assets/imagens/produto_indisponivel.png';
import purchase from '../../utils/purchase';
import { selectedProduct } from '../../utils/index';

import './catalogoroute.scss';

import $ from 'jquery';

const CatalogoRoute = ( props ) => {
    const { code_color } = useParams();
    const { purchasedProducts, products, purchProducts, totalPrice } = props;
    
    const [ size, setSize ] = useState('');
    
    /*Chama a função para fazer o tratamento de valor e 
    retornar o produto à ser adicionado ao carrinho de compras*/
    const getPurchase = () => {
        let getPurchaseds = purchase(selected_product, purchProducts, size, totalPrice);
        
        if(getPurchaseds !== undefined)
        {
            const { product, prices } = getPurchaseds;
            purchasedProducts(product, prices);
        }
        return confirmOrder();
    };

    const confirmOrder = () =>{
        $("#popup").fadeIn('slow');
        $("body").addClass("body__hide");
    };
    
    //Pega todas as informações do produto que serão apresentadas na tela
    let selected_product = selectedProduct(products, code_color);

    /*Se o produto selecionado estiver indisponível (sem imagem),
    após a página estar completamente carregada o botão para
    adicionar ao carrinho será desabilitado*/
    $(document).ready(function(){
        if(selectedProduct.image === "")
        {
            $("#purchase").attr('disabled', 'disabled')
                .css("background-color", "white")
                    .css("color", "lightgray");
        }
    });

    return (
        <section className="cat__route container">
            <article className="cat__route__product__content">
                {selected_product.image === "" ?
                    <img src={produtoIndisponivel} alt="Produto indiponivel" /> :
                    <img src={selected_product.image} alt={`Imagem do ${selected_product.name}`} 
                        className="cat__route__product__image"/>
                }
                <div className="cat__route__product__informations">
                    <h1>{selected_product.name}</h1>

                    {selected_product.promotion === selected_product.price ? 
                        <p className="cat__route__product__informations
                            cat__route__product__informations--complements">
                            Por apenas {selected_product.price}
                        </p> :
                        <div>
                            <p className="cat__route__product__informations
                                cat__route__product__informations--complements">
                                de <del>{selected_product.price}</del>
                            </p>
                            
                            <p className="cat__route__product__informations
                                cat__route__product__informations--complements">
                                por apenas {selected_product.promotion}
                            </p>

                            <p className="cat__route__product__informations
                                cat__route__product__informations--complements">
                                economize {selected_product.discount}
                            </p>
                        </div>
                    }

                    <h3 className="cat__route__product__informations
                                cat__route__product__informations--complements">
                        parcele em até {selected_product.payment}
                    </h3>
                    
                    <h3 className="cat__route__product__informations
                        cat__route__product__informations--complements">
                        tamanhos disponíveis:
                    </h3>
                    {selected_product.sizes !== undefined && selected_product.sizes.map((elem) => {
                        return (elem.available === true &&
                            <button value={elem.size} key={elem.size} 
                                id={elem.size} className="cat__route__sizes" onClick={() => {
                                    if(size === "")
                                    {
                                        document.getElementById(elem.size).classList
                                            .add('cat__route__sizes--selected');
                                        setSize(elem.size);
                                    }
                                    else if(size === elem.size)
                                    {
                                        document.getElementById(elem.size).classList
                                            .remove('cat__route__sizes--selected');
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
                                if(value < 10)
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
                            if(value - 1 === 0)
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
                                document.getElementById('purchase').classList
                                    .add('cat__route__purchase--clicked');
                                }
                            }
                            onBlur={() => {
                                document.getElementById('invalidSize').style.display='none';
                                document.getElementById('purchase').classList
                                    .remove('cat__route__purchase--clicked');
                            }}>
                            Adicionar ao carrinho
                        </button> :
                        <button id="purchase" className="cat__route__purchase" onClick={getPurchase}>
                            Adicionar ao carrinho
                        </button>
                    }
                    <div id="invalidSize" className="cat__route__invalidSize">Escolha um tamanho</div>
                    <Link to="/" className="cat__route__purchase--backHome">
                        <i className="fa fa-long-arrow-left"></i> Voltar para home        
                    </Link>
                </div>

                {/*Pop up de confirmação de inclusão de item na sacola de compras*/}
                <div className="cat__route__order__confirm__hide" id="popup">
                    <div className="cat__route__order__confirm__header">
                        <h2 className="cat__route__order__confirm__header__title">
                            Item adicionado à sacola de compras!!
                        </h2>
                        <i className="fa fa-times" aria-hidden="true"
                            onClick={()=>{
                                $("#popup").fadeOut("slow");
                                $("body").removeClass("body__hide");
                            }}></i>
                    </div>
                    <p className="cat__route__order__confirm__information">
                        Você incluiu à sua sacola o seguinte item:
                    </p>
                    <figure className="cat__route__order__confirm__product">
                        <img src={selected_product.image} alt={selected_product.name} />
                        <div className="cat__route__order__confirm__product__description">
                            <figcaption>{selected_product.name}</figcaption>
                            <figcaption className="cat__route__order__confirm__product__description__price">
                                {
                                    selected_product.promotion === selected_product.price ? 
                                        selected_product.price : selected_product.promotion
                                }
                            </figcaption>
                        </div>
                    </figure>
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