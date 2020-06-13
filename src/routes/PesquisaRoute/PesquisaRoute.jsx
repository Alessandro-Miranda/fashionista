import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './pesquisaroute.scss';
import { connect } from 'react-redux';
import Produtoindisponivel from '../../assets/imagens/produto_indisponivel.png';

const PesquisaRoute = (props) => {
    const { products } = props;
    const [ search, setSearch ] = useState('')
    const [ searchProducts, setSearchProducts ] = useState([]);

    const handleChange = event => {
        event.preventDefault();
        setSearch(event.target.value);

        let result = products.filter((item) => item.name.toLowerCase().startsWith(search));

        setSearchProducts(result);
    }
    return (
        <div className="pesquisaRoute">
            <label>
                <input type="text" className="pesquisaRoute__input" autoFocus
                    placeholder="O que você está procurando?" value={search} onChange={handleChange}/>
            </label>
            <ul>
                {search !== '' ? searchProducts.map((elem, count=0) => {
                    return (
                        <Link to={`/catalogo/product=${elem.name}`} key={count++}
                           className="pesquisaRoute__link">
                            <li className="pesquisaRoute__link__content">
                                {elem.image === "" ? 
                                    <img src={Produtoindisponivel} alt="Produto indisponível" /> :
                                    <img src={elem.image} alt={elem.name}
                                        className="pesquisaRoute__link__content__image"/> }
                                <div>
                                    <h1 className="pesquisaRoute__link__content__description">{elem.name}</h1>
                                   <p className="pesquisaRoute__link__contetn__price">{elem.actual_price}</p>
                                </div>
                            </li>
                        </Link>
                   );
                }) : null}
            </ul>
        </div>
    );
};

const mapStateToProps = store => ({
    products: store.clickState.products
});

export default connect(mapStateToProps) (PesquisaRoute);