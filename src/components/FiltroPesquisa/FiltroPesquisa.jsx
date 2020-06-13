import React from 'react';
import './filtro_pesquisa.scss';

const FiltroPesquisa = () => (
    <div>
        <label htmlFor="buscaInput" id="busca">
            <input type="text" id="buscaInput" placeholder="O que você está procurando?"
                className="busca__input" onFocus={()=> {
                    document.getElementById("busca").classList.add('busca__input--focus');
                }} onBlur={() => {
                    document.getElementById("busca").classList.remove('busca__input--focus');
                }}/>
            <button className="busca__button">
                <i className="fas fa-search busca__icon"></i> 
            </button>
        </label>
    </div>
);

export default FiltroPesquisa;