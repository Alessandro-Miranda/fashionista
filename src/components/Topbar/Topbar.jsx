import React from 'react';
import LogoPng from '../../assets/imagens/logo_header.png';
import { ReactComponent as SacolaDeCompras } from '../../assets/imagens/sacola_compras.svg';
import { ReactComponent as Menu } from '../../assets/imagens/menu.svg';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Topbar.scss';

const Topbar = (props) => {
    console.log(props.purchProducts);
    return (
        <header className="cabecalho">
            <button className="cabecalho__menu">
                <Menu />
            </button>
            <Link to="/" className="cabecalho__logo">
                <img src={LogoPng} alt="logo fashionista" />
            </Link>

            <button className="cabecalho__sacola">
                <SacolaDeCompras className="cabecalho__sacola__image"/>
            </button>
        </header>
    );
}

const mapStateToProps = store => ({
    purchProducts: store.clickState.purchProducts
});
  
export default connect(mapStateToProps) (Topbar);