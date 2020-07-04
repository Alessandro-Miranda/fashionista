import { desctructurePrice } from "./index";

const purchase = (selectedProduct, purchProducts, size, totalPrice) => {
    document.getElementById('purchase').classList.add('cat__route__purchase--clicked');

    if(purchProducts.length===0)
    {
        let amount=parseInt(document.getElementById('amount').textContent);
        let product = [];

        let price = desctructurePrice(selectedProduct.totalPrice);
        let total_price = [price*amount];
        
        product.push({
            id: purchProducts.length,
            name: selectedProduct.name,
            image: selectedProduct.image,
            chosenSize: size,
            price: price,
            price_total: price*amount,
            amount: amount,
        });
        
        let prices;
        prices = total_price;

        return { product, prices };
    }
    else
    {
        let product=[...purchProducts];
        let prices = [...totalPrice];
        let amount = parseInt(document.getElementById('amount').textContent);
        let price = desctructurePrice(selectedProduct.totalPrice);

        product.push({
            id: purchProducts.length,
            name: selectedProduct.name,
            image: selectedProduct.image,
            chosenSize: size,
            price: price,
            price_total: price*amount,
            amount: amount
        });

        prices.push(price*amount);
        return { product, prices };
    }
};

export default purchase;