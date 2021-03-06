import { CLICK_UPDATE_SHOPPING_CART } from '../actions/actionsType';
import { GET_UPDATE_PRODUCTS } from '../actions/actionsType';
import { GET_PURCHASED_PRODUCTS } from '../actions/actionsType';

const initialState = {
    shoppingCart: false,
    products: [],
    purchProducts: [],
    totalPrice: []
};

export const globalReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case CLICK_UPDATE_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: action.shoppingCart,
            };
        case GET_UPDATE_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        case GET_PURCHASED_PRODUCTS:
            return {
                ...state,
                purchProducts: action.purchProducts,
                totalPrice: action.totalPrice
            }
        default:
            return state;
    }
};