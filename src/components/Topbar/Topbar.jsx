import React from 'react';
import LogoPng from '../../assets/imagens/logo_header.png';
import { ReactComponent as SacolaDeCompras } from '../../assets/imagens/sacola_compras.svg';
import { ReactComponent as Menu } from '../../assets/imagens/menu.svg';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Topbar.scss';

const Topbar = (props) => {
    const { purchProducts } = props;

    return (
        <header className="topbar">
            <button className="topbar__menu">
                <Menu />
            </button>
            <Link to="/" className="topbar__logo">
                <img src={LogoPng} alt="logo fashionista" />
            </Link>

            <button className="topbar__shoppingCart">
                <SacolaDeCompras className="topbar__shoppingCart__image"/>
                <span className="topbar__sacola__shoppingCart__products">{purchProducts.length}</span>
            </button>
        </header>
    );
}

const mapStateToProps = store => ({
    purchProducts: store.clickState.purchProducts
});
  
export default connect(mapStateToProps) (Topbar);