import React, { useEffect, useState } from 'react';
import Banners from '../../containers/Banners';
import MaisVendidos from '../../containers/MaisVendidos';
import Catalogos from '../../containers/Catalogos';
import Footer from '../../components/Footer';

import { connect } from 'react-redux';
import { updateProducts } from '../../actions';
import { bindActionCreators } from 'redux'

const HomeRoute = (props) => {
    const url="https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog";
    const [product, setProduct] = useState([]);
    const { updateProducts} = props;
    const mais_vendidos = [];

    useEffect(() => {
        fetch(url).then(res => res.json()).then(response => {
            setProduct(response);
        })
    }, []);

    if(product.length===22)
    {
        updateProducts(product);
    }

    for(var i=0; i<product.length; i++)
    {
        if(product[i].name==="ÓCULOS DE SOL BOLD" || product[i].name==="VESTIDO CURTO FESTIVAL" ||
            product[i].name==="CALÇA COMFORT TASSEL")
        {
            mais_vendidos.push(product[i]);
        }
    }
    
    return (
        <main onClick={() =>(
              document.getElementById('shoppingCart').style.display="none"
            )}>
            <Banners />
            <MaisVendidos products={mais_vendidos}/>
            <Catalogos/>
            <Footer />
        </main>
    );
};

const mapStateToProps = store => ({
    products: store.clickState.products
});

const mapDispacthToProps = dispatch => bindActionCreators({updateProducts}, dispatch);

export default connect(mapStateToProps, mapDispacthToProps) (HomeRoute);