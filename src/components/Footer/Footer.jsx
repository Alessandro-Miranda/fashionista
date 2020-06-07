import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import LogoFooter from '../../assets/imagens/logo_footer.png';

const Footer = () => (
    <footer className="rodape">
        {/*Parte principal do rodapé com logo e informações de contato*/}
        <div>
            <Link to="/" className="rodape__logo">
                <img src={LogoFooter} alt="Logo Fashionista" className="rodape__logo__imagem"/>
            </Link>
            {/*Informações de contato*/}
            <address className="rodape__contatos">
                <strong className="rodape__contatos__informacoes
                    rodape__contatos__informacoes--nome">fashionista modas</strong>
                {/*Lista para facilitar o display das informações*/}
                <ul className="rodape__contatos__informacoes">
                    <li>
                        <i className="far fa-envelope"></i>
                            <p className="rodape__contatos__informacoes--email">sac@fashionista.com.br</p>
                    </li>
                    
                    <li>
                        <i className="fab fa-instagram"></i>
                            <p>@fashionistamodas</p>
                    </li>

                    <li>
                        <i className="fab fa-whatsapp"></i>
                            <p>+55 (11) 90000-0009</p>
                    </li>        
                </ul>
            </address>
        </div>
        {/*Fim da parte principal do footer*/}
        <p className="rodape__copyright">Copyright &copy; Alessandro Miranda</p>
    </footer>
);

export default Footer;