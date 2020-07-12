import { CLICK_UPDATE_SHOPPING_CART } from './actionsType';
import { GET_UPDATE_PRODUCTS } from './actionsType';
import { GET_PURCHASED_PRODUCTS } from './actionsType';

export const clickButton = (value) => ({
    type: CLICK_UPDATE_SHOPPING_CART,
    shoppingCart: value,
});

export const updateProducts = (products) => {
    const product = products;

    return {
        type: GET_UPDATE_PRODUCTS,
        products: product,
        
    }
}

export const purchasedProducts = (purchasedsProduct, total_price) => {
    const purchasedsProd=purchasedsProduct;
    const totalPri = total_price;

    return {
        type: GET_PURCHASED_PRODUCTS,
        purchProducts: purchasedsProd,
        totalPrice: totalPri
    }
}